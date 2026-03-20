import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — ClientBoard",
  description:
    "Simple, transparent pricing for Indian freelancers and creators. Start free, upgrade when you need more.",
};

/* ===========================
   PLAN DATA
   =========================== */

const plans = [
  {
    name: "Starter",
    price: "₹399",
    period: "/mo",
    description: "Perfect for freelancers just getting started",
    features: [
      "Up to 3 active clients",
      "File sharing (500 MB)",
      "Client portal links",
      "Basic branding",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹799",
    period: "/mo",
    description: "For serious freelancers & growing creators",
    features: [
      "Unlimited clients",
      "File sharing (5 GB)",
      "Custom domain support",
      "Advanced branding",
      "Feedback & approval tracking",
      "Priority support",
      "Invoice integration",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Agency",
    price: "₹1999",
    period: "/mo",
    description: "For agencies & teams who need more power",
    features: [
      "Everything in Pro",
      "Team members (up to 5)",
      "White-label portals",
      "File sharing (25 GB)",
      "Client analytics",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Get Started",
    popular: false,
  },
];

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes — 3 clients free forever. Upgrade when needed.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, cancel anytime with no questions asked.",
  },
  {
    q: "Which payment methods are accepted?",
    a: "UPI, credit/debit cards, net banking, wallets.",
  },
];

/* ===========================
   PAGE
   =========================== */

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ===== NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-md shadow-primary-500/20">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="font-display font-bold text-xl text-slate-900">
                Client<span className="gradient-text">Board</span>
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden sm:inline-flex text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-bg text-white text-sm font-semibold shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== BANNER ===== */}
      <div className="bg-primary-50 border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-center text-sm text-primary-700 font-medium">
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              Payment setup coming soon — sign up free and we&apos;ll notify you when billing goes live.
            </span>
          </p>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <section className="pt-16 sm:pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block text-sm font-bold tracking-widest uppercase text-primary-600 mb-3">
              Pricing
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-lg text-slate-500">
              No hidden fees. No surprise charges. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PLAN CARDS ===== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? "border-2 border-primary-500 shadow-2xl shadow-primary-500/10 bg-white"
                    : "border border-slate-200 bg-white hover:shadow-xl hover:shadow-slate-200/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full gradient-bg text-white text-xs font-bold tracking-wide uppercase shadow-lg shadow-primary-500/30">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={plan.popular ? "pt-2" : ""}>
                  <h3 className="text-lg font-bold text-slate-900">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {plan.description}
                  </p>

                  <div className="mt-6 mb-6">
                    <span className="text-4xl font-display font-extrabold text-slate-900">
                      {plan.price}
                    </span>
                    <span className="text-slate-400 text-lg">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex-shrink-0 ${
                            plan.popular
                              ? "text-primary-500"
                              : "text-slate-400"
                          }`}
                        >
                          <CheckIcon />
                        </span>
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/signup"
                    className={`block w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      plan.popular
                        ? "gradient-bg text-white shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-0.5"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-display font-bold text-slate-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER CTA ===== */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-slate-500 mb-8">
            Start free with up to 3 clients. No credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-bg text-white font-semibold text-lg shadow-xl shadow-primary-500/25 hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-1 transition-all duration-300"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            © 2026 ClientBoard. All rights reserved.
          </p>
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-primary-600 transition-colors font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}

/* ===========================
   CHECK ICON
   =========================== */

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
