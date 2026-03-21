"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

/* ===========================
   TYPES
   =========================== */

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: { email: string };
  theme: { color: string };
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

/* ===========================
   PLAN DATA
   =========================== */

const plans = [
  { key: "starter", name: "Starter", price: "₹399", period: "/mo", description: "Perfect for freelancers just getting started", features: ["Up to 3 active clients", "File sharing (500 MB)", "Client portal links", "Basic branding", "Email support"], popular: false },
  { key: "pro", name: "Pro", price: "₹799", period: "/mo", description: "For serious freelancers & growing creators", features: ["Unlimited clients", "File sharing (5 GB)", "Custom domain support", "Advanced branding", "Feedback & approval tracking", "Priority support", "Invoice integration"], popular: true },
  { key: "agency", name: "Agency", price: "₹1999", period: "/mo", description: "For agencies & teams who need more power", features: ["Everything in Pro", "Team members (up to 5)", "White-label portals", "File sharing (25 GB)", "Client analytics", "API access", "Dedicated account manager"], popular: false },
];

const faqs = [
  { q: "Is there a free trial?", a: "Yes — 3 clients free forever. Upgrade when needed." },

  { q: "Which payment methods are accepted?", a: "UPI, credit/debit cards, net banking, wallets." },
];

/* ===========================
   PAGE
   =========================== */

export default function PricingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setIsLoggedIn(true);
        if (data.user.email) setUserEmail(data.user.email);
      }
      setAuthChecked(true);
    }
    checkAuth();
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  function loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) { resolve(true); return; }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  function handleButtonClick(planKey: string, planName: string) {
    if (!isLoggedIn) { 
      window.location.href = `/login?redirect=/pricing`; 
      return; 
    }
    handleCheckout(planKey, planName);
  }

  async function handleCheckout(planKey: string, planName: string) {
    setLoadingPlan(planKey);
    const loaded = await loadRazorpayScript();
    if (!loaded) { setToast({ message: "Failed to load payment gateway.", type: "error" }); setLoadingPlan(null); return; }

    try {
      const res = await fetch("/api/razorpay/create-order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan: planKey }) });
      if (!res.ok) { const err = await res.json(); setToast({ message: err.error || "Failed to create order", type: "error" }); setLoadingPlan(null); return; }
      const { orderId, amount } = await res.json();

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount, currency: "INR", name: "COLLABILL", description: `${planName} Plan - Monthly`, order_id: orderId,
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature, plan: planKey }) });
            if (verifyRes.ok) { window.location.href = `/dashboard?payment=success&plan=${planKey}`; }
            else { setToast({ message: "Payment verification failed.", type: "error" }); setLoadingPlan(null); }
          } catch { setToast({ message: "Payment verification failed.", type: "error" }); setLoadingPlan(null); }
        },
        prefill: { email: userEmail },
        theme: { color: "#8b4513" },
        modal: { ondismiss: () => { setLoadingPlan(null); } },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch { setToast({ message: "Something went wrong.", type: "error" }); setLoadingPlan(null); }
  }

  return (
    <div className="min-h-screen bg-warm-bg">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-warm-bg/90 backdrop-blur-lg border-b border-warm-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/logo.svg" alt="COLLABILL" className="h-7 sm:h-8 w-auto transition-transform group-hover:scale-105" />
            </Link>
            <div className="flex items-center gap-3">
              {authChecked && isLoggedIn ? (
                <Link href="/dashboard" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-warm-btn-primary-bg text-warm-btn-primary-text text-sm font-semibold hover:bg-warm-accent transition-colors">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="hidden sm:inline-flex text-sm font-medium text-warm-text-secondary hover:text-warm-accent transition-colors">Log in</Link>
                  <Link href="/signup" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-warm-btn-primary-bg text-warm-btn-primary-text text-sm font-semibold hover:bg-warm-accent transition-colors">Get Started Free</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* SIGN IN BANNER */}
      {authChecked && !isLoggedIn && (
        <div className="bg-warm-surface border-b border-warm-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <p className="text-center text-sm text-warm-accent font-medium">
              <span className="inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                Please sign in to subscribe to a plan
              </span>
            </p>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="pt-16 sm:pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block text-sm font-bold tracking-widest uppercase text-warm-accent mb-3">Pricing</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-warm-text-primary tracking-tight">Simple, transparent pricing</h1>
            <p className="mt-4 text-lg text-warm-text-secondary">No hidden fees. No surprise charges. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* PLAN CARDS */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {plans.map((plan) => (
              <div key={plan.key} className={`relative rounded-lg p-8 transition-all duration-300 hover:-translate-y-1 ${plan.popular ? "border-2 border-warm-accent bg-warm-surface" : "border border-warm-border bg-warm-surface hover:bg-white"}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-lg bg-warm-btn-primary-bg text-warm-btn-primary-text text-xs font-bold tracking-wide uppercase">Most Popular</span>
                  </div>
                )}
                <div className={plan.popular ? "pt-2" : ""}>
                  <h3 className="text-lg font-bold text-warm-text-primary font-display">{plan.name}</h3>
                  <p className="text-sm text-warm-text-secondary mt-1">{plan.description}</p>
                  <div className="mt-6 mb-6">
                    <span className="text-4xl font-display font-bold text-warm-text-primary">{plan.price}</span>
                    <span className="text-warm-text-secondary text-lg">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className={`mt-0.5 flex-shrink-0 ${plan.popular ? "text-warm-accent" : "text-warm-text-secondary"}`}><CheckIcon /></span>
                        <span className="text-sm text-warm-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleButtonClick(plan.key, plan.name)}
                    disabled={loadingPlan !== null}
                    className={`block w-full text-center py-3.5 rounded-lg font-semibold text-sm transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${plan.popular ? "bg-warm-btn-primary-bg text-warm-btn-primary-text hover:bg-warm-accent" : "bg-warm-bg text-warm-text-primary hover:bg-white border border-warm-border"}`}
                  >
                    {loadingPlan === plan.key ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                        Processing...
                      </span>
                    ) : "Get Started"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-warm-text-primary">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-warm-surface rounded-lg border border-warm-border p-6 hover:bg-white transition-colors">
                <h3 className="font-display font-bold text-warm-text-primary mb-2">{faq.q}</h3>
                <p className="text-sm text-warm-text-secondary leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-warm-text-primary mb-4">Ready to get started?</h2>
          <p className="text-warm-text-secondary mb-8">Start free with up to 3 clients. No credit card required.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-warm-btn-primary-bg text-warm-btn-primary-text font-semibold text-lg hover:bg-warm-accent transition-colors duration-200">Get Started Free</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-warm-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-xs text-warm-text-secondary">© 2026 COLLABILL. All rights reserved.</p>
          <Link href="/" className="text-xs text-warm-text-secondary hover:text-warm-accent transition-colors font-medium">← Back to Home</Link>
        </div>
      </footer>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-up">
          <div className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${toast.type === "success" ? "bg-emerald-700 text-white" : "bg-red-700 text-white"}`}>
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}

function CheckIcon() {
  return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="20 6 9 17 4 12" /></svg>);
}
