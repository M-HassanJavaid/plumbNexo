import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site.config";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      businessName,
      serviceArea,
      currentWebsite,
      workType,
      contactName,
      contactMethod,
      contactValue,
      notes,
      company_website, // Honeypot
      timeToSubmit,
    } = body;

    // Honeypot bot trap
    if (company_website) {
      return NextResponse.json({ success: true, message: "Processed" });
    }

    // Server-side validation
    if (!businessName || !serviceArea || !contactName || !contactValue) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const leadData = {
      businessName: String(businessName).trim(),
      serviceArea: String(serviceArea).trim(),
      currentWebsite: currentWebsite ? String(currentWebsite).trim() : "None provided",
      workType: workType || "Residential",
      contactName: String(contactName).trim(),
      contactMethod: contactMethod || "Phone",
      contactValue: String(contactValue).trim(),
      notes: notes ? String(notes).trim() : "None",
      submittedAt: new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
        dateStyle: "full",
        timeStyle: "short",
      }),
    };

    const recipientEmail =
      process.env.EMAIL_ADDRESS || siteConfig.demoInboxEmail || "plumbnexo@gmail.com";
    const senderEmail = process.env.EMAIL_ADDRESS || "plumbnexo@gmail.com";
    const emailPassword = process.env.EMAIL_PASS;

    // HTML Email template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>New Demo Request</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #F7F8F2; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #122B2A;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F7F8F2; padding: 32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid rgba(18, 43, 42, 0.1); box-shadow: 0 10px 30px rgba(18, 43, 42, 0.05); overflow: hidden;">
                <!-- Header -->
                <tr>
                  <td style="background-color: #122B2A; padding: 24px 32px; text-align: left;">
                    <table role="presentation" width="100%">
                      <tr>
                        <td>
                          <span style="display: inline-block; background-color: #B8F36B; color: #122B2A; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 10px; border-radius: 999px; margin-bottom: 8px;">
                            New Lead
                          </span>
                          <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">
                            Demo Request: ${leadData.businessName}
                          </h1>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 32px;">
                    <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #52635F; border-bottom: 1px solid rgba(18, 43, 42, 0.08); padding-bottom: 8px;">
                      Business Details
                    </h2>

                    <table role="presentation" width="100%" style="border-collapse: collapse; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 8px 0; font-weight: 700; color: #122B2A; width: 160px; font-size: 14px;">Business Name:</td>
                        <td style="padding: 8px 0; color: #122B2A; font-size: 15px; font-weight: 600;">${leadData.businessName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 700; color: #122B2A; font-size: 14px;">Service Area:</td>
                        <td style="padding: 8px 0; color: #52635F; font-size: 15px;">${leadData.serviceArea}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 700; color: #122B2A; font-size: 14px;">Type of Work:</td>
                        <td style="padding: 8px 0; color: #122B2A; font-size: 15px;">
                          <span style="background-color: #F7F8F2; padding: 3px 8px; border-radius: 6px; font-size: 13px; font-weight: 600;">
                            ${leadData.workType}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 700; color: #122B2A; font-size: 14px;">Current Website:</td>
                        <td style="padding: 8px 0; color: #52635F; font-size: 15px;">${leadData.currentWebsite}</td>
                      </tr>
                    </table>

                    <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #52635F; border-bottom: 1px solid rgba(18, 43, 42, 0.08); padding-bottom: 8px;">
                      Contact Details
                    </h2>

                    <table role="presentation" width="100%" style="border-collapse: collapse; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 8px 0; font-weight: 700; color: #122B2A; width: 160px; font-size: 14px;">Contact Name:</td>
                        <td style="padding: 8px 0; color: #122B2A; font-size: 15px; font-weight: 600;">${leadData.contactName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 700; color: #122B2A; font-size: 14px;">Reach Method:</td>
                        <td style="padding: 8px 0; color: #122B2A; font-size: 15px;">
                          ${leadData.contactMethod} — <strong>${leadData.contactValue}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-weight: 700; color: #122B2A; font-size: 14px; vertical-align: top;">Notes / Info:</td>
                        <td style="padding: 8px 0; color: #52635F; font-size: 15px; line-height: 1.5;">${leadData.notes}</td>
                      </tr>
                    </table>

                    <div style="background-color: #F7F8F2; border-radius: 12px; padding: 16px; font-size: 12px; color: #52635F; line-height: 1.6;">
                      <strong>Submitted At:</strong> ${leadData.submittedAt}
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #F7F8F2; padding: 16px 32px; text-align: center; font-size: 12px; color: #52635F; border-top: 1px solid rgba(18, 43, 42, 0.08);">
                    PlumbNexo Website Free Demo Lead System
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Plain text alternative
    const emailText = `
New Free Demo Request: ${leadData.businessName}
----------------------------------------
Business Name: ${leadData.businessName}
Service Area: ${leadData.serviceArea}
Type of Work: ${leadData.workType}
Current Website: ${leadData.currentWebsite}

Contact Name: ${leadData.contactName}
Preferred Reach: ${leadData.contactMethod} (${leadData.contactValue})
Notes: ${leadData.notes}

Submitted: ${leadData.submittedAt}
    `;

    // Send via Nodemailer using Gmail credentials
    if (emailPassword) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: senderEmail,
          pass: emailPassword,
        },
      });

      const replyToAddress =
        leadData.contactMethod === "Email" && leadData.contactValue.includes("@")
          ? leadData.contactValue
          : senderEmail;

      await transporter.sendMail({
        from: `"PlumbNexo Demo Requests" <${senderEmail}>`,
        to: recipientEmail,
        replyTo: replyToAddress,
        subject: `New Free Demo Request: ${leadData.businessName}`,
        text: emailText,
        html: emailHtml,
      });

      console.log(`[Demo Request] Nodemailer sent demo request to ${recipientEmail}`);
    } else {
      console.warn(
        "[Demo Request] EMAIL_PASS not found in environment. Demo data received:",
        leadData
      );
    }

    // Forward to optional webhook (Zapier, Make, Google Sheets) if configured
    const webhookUrl = process.env.LEAD_WEBHOOK_URL || siteConfig.leadWebhookUrl;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadData),
        });
      } catch (webhookErr) {
        console.error("Webhook dispatch error:", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Demo request received successfully",
    });
  } catch (error) {
    console.error("Error processing demo request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
