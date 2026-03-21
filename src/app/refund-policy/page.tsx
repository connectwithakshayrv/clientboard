import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy — ClientBoard",
  description: "ClientBoard's refund policy for subscription plans.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <nav className="sticky top-0 z-50 bg-warm-bg/90 backdrop-blur-lg border-b border-warm-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-warm-btn-primary-bg flex items-center justify-center"><span className="text-warm-btn-primary-text font-bold text-lg">C</span></div>
              <span className="font-display font-bold text-xl text-warm-text-primary">Client<span className="text-warm-accent">Board</span></span>
            </Link>
            <Link href="/" className="text-sm text-warm-text-secondary hover:text-warm-accent transition-colors font-medium">← Back to Home</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-warm-text-primary mb-2">Refund Policy</h1>
        <p className="text-sm text-warm-text-secondary mb-10">Last updated: 21 March 2026</p>

        <div className="space-y-8">
          <Section title="7-Day Satisfaction Guarantee">
            <p>We want you to love ClientBoard. If you&apos;re not satisfied with your subscription, you can request a <strong className="text-warm-text-primary">full refund within 7 days</strong> of your purchase — no questions asked.</p>
          </Section>

          <Section title="How to Request a Refund">
            <p>To request a refund, simply email us at:</p>
            <div className="bg-warm-surface rounded-lg border border-warm-border p-4 mt-2">
              <p className="text-warm-text-primary font-semibold">📧 hello@clientboard.app</p>
              <p className="text-xs text-warm-text-secondary mt-1">Include your registered email address and the reason for the refund.</p>
            </div>
            <p>We&apos;ll process your refund within 5–7 business days. The amount will be credited back to your original payment method.</p>
          </Section>

          <Section title="After 7 Days">
            <p>Refunds are <strong className="text-warm-text-primary">not available after 7 days</strong> from the date of purchase. However, you can cancel your subscription at any time. When you cancel:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-warm-text-secondary text-sm leading-relaxed">
              <li>Your access continues until the end of the current billing period.</li>
              <li>No further charges will be made.</li>
              <li>Your data remains available for 30 days after account deactivation.</li>
            </ul>
          </Section>

          <Section title="Exceptions">
            <p>Refunds may be denied if:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-warm-text-secondary text-sm leading-relaxed">
              <li>The account was used to violate our <Link href="/terms" className="text-warm-accent hover:text-warm-accent-hover font-medium">Terms of Service</Link>.</li>
              <li>A refund was previously issued for the same account.</li>
              <li>The request is made after the 7-day window.</li>
            </ul>
          </Section>

          <Section title="Contact">
            <p>For any refund-related questions, reach out at <strong className="text-warm-text-primary">hello@clientboard.app</strong>. We reply within 24 hours.</p>
          </Section>
        </div>
      </main>

      <footer className="border-t border-warm-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-xs text-warm-text-secondary">© 2026 ClientBoard. All rights reserved.</p>
          <Link href="/" className="text-xs text-warm-text-secondary hover:text-warm-accent transition-colors font-medium">← Back to Home</Link>
        </div>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-display font-bold text-warm-text-primary mb-3">{title}</h2>
      <div className="space-y-3 text-sm text-warm-text-secondary leading-relaxed">{children}</div>
    </div>
  );
}
