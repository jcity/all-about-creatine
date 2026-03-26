import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (!audienceId) {
      console.error("RESEND_AUDIENCE_ID is not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Add contact to audience
    const { error } = await resend.contacts.create({
      email,
      audienceId,
    });

    if (error) {
      // Resend returns a specific error for duplicates
      if (error.message?.includes("already exists")) {
        return NextResponse.json(
          { error: "You're already subscribed!" },
          { status: 409 }
        );
      }
      console.error("Resend contact error:", error);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    // Send notification email (fire-and-forget)
    resend.emails.send({
      from: "All About Creatine <onboarding@resend.dev>",
      to: "jcm112388@gmail.com",
      subject: "New subscriber on All About Creatine",
      text: `New newsletter subscriber: ${email}`,
    }).catch((err) => {
      console.error("Failed to send notification email:", err);
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
