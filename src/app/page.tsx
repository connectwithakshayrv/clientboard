import Link from "next/link";

/* ===========================
   ICONS (inline SVGs for zero-dependency)
   =========================== */

function FolderScatterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
      <path d="M2 10h20" />
    </svg>
  );
}

function MoonAlertIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      <path d="M17 3v4" />
      <path d="M19 5h-4" />
    </svg>
  );
}

function ClipboardXIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m15 11-6 6" />
      <path d="m9 11 6 6" />
    </svg>
  );
}

function LayoutDashboardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-10 h-10"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-10 h-10"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-10 h-10"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

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

function ArrowRightIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

/* ===========================
   NAVBAR
   =========================== */

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-md shadow-primary-500/20 group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-shadow">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-display font-bold text-xl text-slate-900">
              Client<span className="gradient-text">Board</span>
            </span>
          </Link>

          {/* Nav links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#problem"
              className="text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors"
            >
              Why ClientBoard
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors"
            >
              Pricing
            </a>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              id="nav-cta"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-bg text-white text-sm font-semibold shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ===========================
   HERO SECTION
   =========================== */

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-bg-subtle -z-10" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary-200/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-200/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-xs font-semibold text-primary-700 tracking-wide uppercase">
              Built for Indian Freelancers
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 leading-[1.1] animate-fade-up">
            Stop managing clients
            <br />
            on WhatsApp.{" "}
            <span className="gradient-text">Finally.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto animate-fade-up [animation-delay:150ms]">
            Give every client a beautiful portal — share files, updates and get
            feedback in one link. No more scattered chats.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:300ms]">
            <Link
              href="/signup"
              id="hero-cta"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-bg text-white font-semibold text-lg shadow-xl shadow-primary-500/25 hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              Get Started Free
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-slate-200 text-slate-600 font-semibold text-lg hover:border-primary-300 hover:text-primary-600 transition-all duration-200"
            >
              See How It Works
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center justify-center gap-3 text-sm text-slate-400 animate-fade-up [animation-delay:450ms]">
            <div className="flex -space-x-2">
              {["bg-primary-400", "bg-accent-400", "bg-emerald-400", "bg-amber-400"].map(
                (bg, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {["A", "P", "S", "R"][i]}
                  </div>
                )
              )}
            </div>
            <span>
              Trusted by <strong className="text-slate-600">500+</strong>{" "}
              freelancers across India
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================
   PROBLEM SECTION
   =========================== */

const painPoints = [
  {
    icon: <FolderScatterIcon />,
    title: "Files scattered across WhatsApp, email and Telegram",
    description:
      "You're sending the same file to 3 apps. Clients can't find the latest version. Neither can you.",
    color: "from-red-500 to-orange-500",
    bgLight: "bg-red-50",
    textColor: "text-red-600",
  },
  {
    icon: <MoonAlertIcon />,
    title: "Clients messaging you at midnight for updates",
    description:
      "\"Bhai, kab tak hoga?\" at 11 PM. You deserve boundaries without losing clients.",
    color: "from-amber-500 to-yellow-500",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    icon: <ClipboardXIcon />,
    title: "No record of feedback or approvals",
    description:
      "They said 'approved' on a call. Now they want changes. No proof, no trail, no peace.",
    color: "from-primary-500 to-accent-500",
    bgLight: "bg-primary-50",
    textColor: "text-primary-600",
  },
];

function ProblemSection() {
  return (
    <section id="problem" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-bold tracking-widest uppercase text-primary-600 mb-3">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Sound familiar?
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Every freelancer in India faces these problems daily. We built
            ClientBoard to fix them.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {painPoints.map((point, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl border border-slate-100 bg-white hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Decorative gradient bar */}
              <div
                className={`absolute top-0 left-8 right-8 h-1 rounded-b-full bg-gradient-to-r ${point.color} opacity-0 group-hover:opacity-100 transition-opacity`}
              />

              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${point.bgLight} ${point.textColor} mb-6`}
              >
                {point.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                {point.title}
              </h3>

              <p className="text-slate-500 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================
   HOW IT WORKS SECTION
   =========================== */

const steps = [
  {
    step: "01",
    icon: <LayoutDashboardIcon />,
    title: "Create your portal",
    description:
      "Set up a branded client portal in under 2 minutes. Add your logo, colors and project details.",
  },
  {
    step: "02",
    icon: <LinkIcon />,
    title: "Share the link",
    description:
      "Send your unique portal link to clients via WhatsApp, email — anywhere. No app download needed.",
  },
  {
    step: "03",
    icon: <EyeIcon />,
    title: "Clients see everything",
    description:
      "Files, updates, invoices, feedback — all organized beautifully. Clients love it. You look professional.",
  },
];

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-bold tracking-widest uppercase text-primary-600 mb-3">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Three steps.{" "}
            <span className="gradient-text">That&apos;s it.</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Get started in minutes, not hours. No learning curve.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary-200 via-primary-300 to-accent-200" />

          {steps.map((s, i) => (
            <div key={i} className="relative text-center group">
              {/* Step number circle */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white border-2 border-slate-100 shadow-lg shadow-slate-100 group-hover:border-primary-200 group-hover:shadow-xl group-hover:shadow-primary-100 transition-all duration-300 mb-6">
                <div className="text-primary-600 group-hover:text-primary-700 transition-colors">
                  {s.icon}
                </div>
                {/* Step badge */}
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-lg gradient-bg text-white text-xs font-bold flex items-center justify-center shadow-md">
                  {s.step}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {s.title}
              </h3>

              <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================
   PRICING SECTION
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
    cta: "Start Free Trial",
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
    cta: "Start Free Trial",
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
    cta: "Contact Sales",
    popular: false,
  },
];

function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-bold tracking-widest uppercase text-primary-600 mb-3">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            No hidden fees. No surprise charges. Cancel anytime.
          </p>
        </div>

        {/* Cards */}
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
              {/* Popular badge */}
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

                {/* Price */}
                <div className="mt-6 mb-6">
                  <span className="text-4xl font-display font-extrabold text-slate-900">
                    {plan.price}
                  </span>
                  <span className="text-slate-400 text-lg">{plan.period}</span>
                </div>

                {/* Features */}
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

                {/* CTA */}
                <Link
                  href="/pricing"
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
  );
}

/* ===========================
   FOOTER
   =========================== */

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                ClientBoard
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              The simplest way for Indian freelancers and creators to manage
              client communication. Built with ❤️ in India.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {["Features", "Pricing", "Integrations", "Changelog"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {["About", "Blog", "Careers", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Refund Policy"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2026 ClientBoard. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {/* Twitter */}
            <a
              href="#"
              aria-label="Twitter"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===========================
   PAGE
   =========================== */

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
