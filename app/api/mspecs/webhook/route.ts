import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const secret = request.headers.get("x-webhook-secret");

    if (secret !== process.env.MSPECS_WEBHOOK_SECRET) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    console.log("Mspecs webhook:", body);

    return NextResponse.json({
      success: true,
      received: true,
    });
  } catch (error) {
    console.error("Webhook error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Invalid request",
      },
      { status: 400 }
    );
  }
}