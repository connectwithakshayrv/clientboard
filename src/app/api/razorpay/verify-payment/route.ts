import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan,
    } = await request.json();

    // Validate inputs
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !plan) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      );
    }

    // Calculate period end (30 days from now)
    const currentPeriodEnd = new Date();
    currentPeriodEnd.setDate(currentPeriodEnd.getDate() + 30);

    // Upsert subscription
    const { error: upsertError } = await supabase
      .from("subscriptions")
      .upsert(
        {
          creator_id: user.id,
          razorpay_subscription_id: razorpay_payment_id,
          plan,
          status: "active",
          current_period_end: currentPeriodEnd.toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "creator_id" }
      );

    if (upsertError) {
      console.error("Subscription upsert error:", upsertError);
      return NextResponse.json(
        { error: "Failed to activate subscription" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, plan });
  } catch (error: unknown) {
    console.error("Razorpay verify-payment error:", error);
    const message =
      error instanceof Error ? error.message : "Payment verification failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
