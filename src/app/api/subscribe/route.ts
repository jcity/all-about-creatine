import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      // Stub response so build doesn't fail in dev / before Vercel env is set
      return NextResponse.json(
        { ok: true, message: "Newsletter signup stub — API key not configured yet" },
        { status: 200 }
      );
    }

    if (!audienceId) {
      console.error("RESEND_AUDIENCE_ID is not configured");
      return NextResponse.json(
        { ok: true, message: "Newsletter signup stub — audience not configured yet" },
        { status: 200 }
      );
    }

    // Dynamically import resend only when key is present
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { error } = await resend.contacts.create({
      email,
      audienceId,
    });

    // Resend returns a specific error for duplicates
    if (error?.message?.includes("already exists")) {
      return NextResponse.json(
        { ok: true, message: "Already subscribed" },
        { status: 200 }
      );
    }

    if (error) {
      console.error("Resend contact error:", error);
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, message: "Subscribed!" });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}
