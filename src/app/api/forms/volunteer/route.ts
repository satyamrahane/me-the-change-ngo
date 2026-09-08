import { NextRequest, NextResponse } from "next/server";
import { volunteerFormSchema } from "@/lib/validations/forms";
import { checkRateLimit, sanitizeText } from "@/lib/security/rate-limit";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";
import { sendFormNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting based on client IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous-client";
    const rateLimit = checkRateLimit(`volunteer:${ip}`, { maxRequests: 5, windowMs: 60 * 1000 });

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

    // 3. Honeypot check (Spam Protection)
    if (body.website && body.website.trim() !== "") {
      // Reject bot submission silently or with generic bad request
      return NextResponse.json(
        { success: false, error: "Submission could not be processed." },
        { status: 400 }
      );
    }

    // 4. Zod Schema Validation
    const validationResult = volunteerFormSchema.safeParse(body);
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

    // 5. Sanitize text inputs
    const sanitizedData = {
      fullName: sanitizeText(data.fullName),
      email: data.email.toLowerCase(),
      phone: sanitizeText(data.phone),
      city: sanitizeText(data.city),
      availability: data.availability,
      areasOfInterest: data.areasOfInterest.map((a) => sanitizeText(a)),
      message: data.message ? sanitizeText(data.message) : "",
    };

    // 6. Supabase Persistence
    let recordId: string | undefined;
    let persistenceStatus: "saved" | "development_mode" = "development_mode";

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { data: inserted, error: dbError } = await supabase
        .from("volunteer_applications")
        .insert({
          full_name: sanitizedData.fullName,
          email: sanitizedData.email,
          phone: sanitizedData.phone,
          city: sanitizedData.city,
          availability: sanitizedData.availability,
          areas_of_interest: sanitizedData.areasOfInterest,
          message: sanitizedData.message || null,
          status: "pending",
          user_agent: req.headers.get("user-agent") || null,
        })
        .select("id")
        .single();

      if (dbError) {
        console.error("[Volunteer API] Supabase insertion error:", dbError.message);
        return NextResponse.json(
          {
            success: false,
            error: "We couldn't submit your application right now due to a database error. Please try again.",
          },
          { status: 500 }
        );
      }

      recordId = inserted?.id;
      persistenceStatus = "saved";
    } else {
      // In development or when Supabase is unconfigured, log for local verification
      if (process.env.NODE_ENV !== "production") {
        console.log("[Volunteer API - DEV LOG] Application submitted:", {
          ...sanitizedData,
          supabaseConfigured: false,
        });
      }
    }

    // 7. Dispatch Email Notification (fails safely if unconfigured)
    await sendFormNotification({
      type: "volunteer",
      senderName: sanitizedData.fullName,
      senderEmail: sanitizedData.email,
      senderPhone: sanitizedData.phone,
      details: {
        City: sanitizedData.city,
        Availability: sanitizedData.availability,
        "Areas of Interest": sanitizedData.areasOfInterest,
        Notes: sanitizedData.message || "None provided",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your volunteer application has been received. Our team will review it and get in touch.",
        id: recordId,
        status: persistenceStatus,
        configured: isSupabaseConfigured(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Volunteer API] Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your request. Please try again.",
      },
      { status: 500 }
    );
  }
}
