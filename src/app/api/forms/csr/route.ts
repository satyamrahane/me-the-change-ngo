import { NextRequest, NextResponse } from "next/server";
import { csrFormSchema } from "@/lib/validations/forms";
import { checkRateLimit, sanitizeText } from "@/lib/security/rate-limit";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { sendFormNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous-client";
    const rateLimit = checkRateLimit(`csr:${ip}`, { maxRequests: 5, windowMs: 60 * 1000 });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many submissions. Please wait ${rateLimit.resetInSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    // 2. Parse JSON
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON format in request body." },
        { status: 400 }
      );
    }

    // 3. Honeypot check
    if (body.website && body.website.trim() !== "") {
      return NextResponse.json(
        { success: false, error: "Submission could not be processed." },
        { status: 400 }
      );
    }

    // 4. Validation
    const validationResult = csrFormSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0]?.toString() || "form";
        fieldErrors[fieldName] = issue.message;
      }
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please check the highlighted fields.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 5. Sanitize
    const sanitizedData = {
      companyName: sanitizeText(data.companyName),
      contactPerson: sanitizeText(data.contactPerson),
      email: data.email.toLowerCase(),
      phone: sanitizeText(data.phone),
      areaOfInterest: sanitizeText(data.areaOfInterest),
      message: sanitizeText(data.message),
    };

    // 6. Supabase Persistence
    let recordId: string | undefined;
    let persistenceStatus: "saved" | "development_mode" = "development_mode";

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data: inserted, error: dbError } = await supabase
        .from("csr_inquiries")
        .insert({
          company_name: sanitizedData.companyName,
          contact_person: sanitizedData.contactPerson,
          email: sanitizedData.email,
          phone: sanitizedData.phone,
          area_of_interest: sanitizedData.areaOfInterest,
          message: sanitizedData.message,
          status: "pending",
          user_agent: req.headers.get("user-agent") || null,
        })
        .select("id")
        .single();

      if (dbError) {
        console.error("[CSR API] Supabase insertion error:", dbError.message);
        return NextResponse.json(
          {
            success: false,
            error: "We couldn't submit your inquiry right now due to a database error. Please try again.",
          },
          { status: 500 }
        );
      }

      recordId = inserted?.id;
      persistenceStatus = "saved";
    } else {
      if (process.env.NODE_ENV !== "production") {
        console.log("[CSR API - DEV LOG] Inquiry received:", {
          ...sanitizedData,
          supabaseConfigured: false,
        });
      }
    }

    // 7. Dispatch Email Notification
    await sendFormNotification({
      type: "csr",
      senderName: sanitizedData.contactPerson,
      senderEmail: sanitizedData.email,
      senderPhone: sanitizedData.phone,
      subject: `CSR Partnership Inquiry from ${sanitizedData.companyName}`,
      details: {
        Company: sanitizedData.companyName,
        "Contact Person": sanitizedData.contactPerson,
        "Area of Interest": sanitizedData.areaOfInterest,
        Message: sanitizedData.message,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your interest. Your partnership inquiry has been received. Our leadership team will connect with you.",
        id: recordId,
        status: persistenceStatus,
        configured: isSupabaseConfigured(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[CSR API] Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your request. Please try again.",
      },
      { status: 500 }
    );
  }
}
