import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import Razorpay from "razorpay";

const PLANS: Record<string, { name: string; amount: number }> = {
  starter: { name: "Starter", amount: 39900 },
  pro: { name: "Pro", amount: 79900 },
  agency: { name: "Agency", amount: 199900 },
};

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

    // Parse request body
    const { plan } = await request.json();

    if (!plan || !PLANS[plan]) {
      return NextResponse.json(
        { error: "Invalid plan. Choose: starter, pro, or agency." },
        { status: 400 }
      );
    }

    const selectedPlan = PLANS[plan];

    // Create Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // Create order
    const order = await razorpay.orders.create({
      amount: selectedPlan.amount,
      currency: "INR",
      receipt: `cb_${plan}_${user.id.slice(0, 8)}_${Date.now()}`,
      notes: {
        plan,
        userId: user.id,
        userEmail: user.email || "",
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: selectedPlan.amount,
      currency: "INR",
      planName: selectedPlan.name,
    });
  } catch (error: unknown) {
    console.error("Razorpay create-order error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
