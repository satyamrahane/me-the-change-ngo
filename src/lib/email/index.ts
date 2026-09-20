/**
 * Email Notification Service for "Me The Change" (NGO)
 *
 * SAFETY & CONFIGURATION:
 * - Reads RESEND_API_KEY and NOTIFICATION_EMAIL from environment variables.
 * - If credentials are not supplied, operates in documented development mode (logs to server stdout).
 * - Never claims an email was dispatched unless the upstream email service responds with HTTP success.
 */

export interface FormNotificationPayload {
  type: "volunteer" | "contact" | "csr";
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  subject?: string;
  details: Record<string, string | number | string[] | undefined>;
}

export interface EmailSendResult {
  sent: boolean;
  mode: "production" | "development";
  messageId?: string;
  error?: string;
}

export async function sendFormNotification(
  payload: FormNotificationPayload
): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.NOTIFICATION_EMAIL;

  // Development / Unconfigured Mode
  if (
    !apiKey ||
    !recipientEmail ||
    apiKey.includes("placeholder") ||
    recipientEmail.includes("placeholder")
  ) {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `[Email Notification - DEV MODE] New ${payload.type.toUpperCase()} submission:`,
        {
          name: payload.senderName,
          email: payload.senderEmail,
          phone: payload.senderPhone,
          details: payload.details,
          timestamp: new Date().toISOString(),
          note: "Set RESEND_API_KEY and NOTIFICATION_EMAIL to enable live mail delivery.",
        }
      );
    }
    return {
      sent: false,
      mode: "development",
      error: "Email credentials not configured in environment.",
    };
  }

  // Production Delivery via Resend API (HTTP direct to avoid heavy external SDK dependency)
  try {
    const formattedDetails = Object.entries(payload.details)
      .filter(([, val]) => val !== undefined && val !== "")
      .map(([key, val]) => `<strong>${key}:</strong> ${Array.isArray(val) ? val.join(", ") : val}`)
      .join("<br/>");

    const emailHtml = `
      <div style="font-family: sans-serif; line-height: 1.5; color: #1e293b;">
        <h2 style="color: #1b4d3e;">New ${payload.type.toUpperCase()} Submission — Me The Change</h2>
        <p>A new inquiry was received via the website portal.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <p><strong>From:</strong> ${payload.senderName} (${payload.senderEmail})</p>
        ${payload.senderPhone ? `<p><strong>Phone:</strong> ${payload.senderPhone}</p>` : ""}
        ${payload.subject ? `<p><strong>Subject:</strong> ${payload.subject}</p>` : ""}
        <div style="margin-top: 16px; background-color: #f8fafc; padding: 12px; border-radius: 8px;">
          ${formattedDetails}
        </div>
      </div>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || "Me The Change Notifications <notifications@methechange.org>",
        to: [recipientEmail],
        reply_to: payload.senderEmail,
        subject: `[Website Form] New ${payload.type.toUpperCase()}: ${payload.senderName}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[Email Notification] Resend API error:", response.status, errText);
      return {
        sent: false,
        mode: "production",
        error: `Upstream email service error: ${response.status}`,
      };
    }

    const resData = (await response.json()) as { id?: string };
    return {
      sent: true,
      mode: "production",
      messageId: resData.id,
    };
  } catch (error) {
    console.error("[Email Notification] Exception sending notification:", error);
    return {
      sent: false,
      mode: "production",
      error: error instanceof Error ? error.message : "Unknown email error",
    };
  }
}
