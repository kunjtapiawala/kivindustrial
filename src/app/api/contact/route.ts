import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const contactSchema = z.object({
  partName: z.string().min(1, "Part name is required").max(200),
  partNumber: z.string().max(200).optional(),
  quantity: z.number().int().positive("Quantity must be at least 1"),
  urgency: z.enum(["Immediate (24-48h)", "Soon (1-2 weeks)", "Flexible (2+ weeks)"]),
  contactEmail: z.string().email("Valid email required"),
  contactPhone: z.string().min(7, "Phone number is required").max(50),
  additionalInfo: z.string().max(2000).optional(),
});

const resolveEnv = () => {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
  const sender = process.env.CONTACT_SENDER_EMAIL ?? process.env.SMTP_USER;

  if (!host || !port || !user || !pass || !recipient || !sender) {
    throw new Error("Missing email environment configuration");
  }

  return { host, port, user, pass, recipient, sender };
};

export async function POST(request: Request) {
  let parsed;

  try {
    const body = await request.json();
    parsed = contactSchema.safeParse(body);
  } catch {
    return NextResponse.json(
      { message: "Invalid request body" },
      {
        status: 400,
      },
    );
  }

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Validation failed",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { partName, partNumber, quantity, urgency, contactEmail, contactPhone, additionalInfo } = parsed.data;

  try {
    const { host, port, user, pass, recipient, sender } = resolveEnv();

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const messageLines = [
      `Part: ${partName}`,
      partNumber ? `Part Number: ${partNumber}` : undefined,
      `Quantity: ${quantity}`,
      `Urgency: ${urgency}`,
      `Requester Email: ${contactEmail}`,
      `Requester Phone: ${contactPhone}`,
    ].filter(Boolean) as string[];

    if (additionalInfo) {
      messageLines.push("", "Additional Info:", additionalInfo);
    }

    await transporter.sendMail({
      to: recipient,
      from: sender,
      replyTo: contactEmail,
      subject: `New sourcing request: ${partName}`,
      text: messageLines.join("\n"),
      html: `<p><strong>Part:</strong> ${escapeHtml(partName)}</p>
        ${partNumber ? `<p><strong>Part Number:</strong> ${escapeHtml(partNumber)}</p>` : ""}
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Urgency:</strong> ${escapeHtml(urgency)}</p>
        <p><strong>Requester Email:</strong> ${escapeHtml(contactEmail)}</p>
        <p><strong>Requester Phone:</strong> ${escapeHtml(contactPhone)}</p>
        ${
          additionalInfo
            ? `<p><strong>Additional Info:</strong><br/>${escapeHtml(additionalInfo).replace(/\n/g, "<br/>")}</p>`
            : ""
        }`,
    });

    return NextResponse.json({ message: "Request submitted" }, { status: 200 });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json(
      { message: "Unable to send request" },
      {
        status: 500,
      },
    );
  }
}
