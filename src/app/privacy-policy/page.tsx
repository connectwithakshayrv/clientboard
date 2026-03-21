import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ClientBoard",
  description: "How ClientBoard collects, uses, and protects your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-warm-bg/90 backdrop-blur-lg border-b border-warm-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-warm-btn-primary-bg flex items-center justify-center">
                <span className="text-warm-btn-primary-text font-bold text-lg">C</span>
              </div>
              <span className="font-display font-bold text-xl text-warm-text-primary">Client<span className="text-warm-accent">Board</span></span>
            </Link>
            <Link href="/" className="text-sm text-warm-text-secondary hover:text-warm-accent transition-colors font-medium">← Back to Home</Link>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-warm-text-primary mb-2">Privacy Policy</h1>
        <p className="text-sm text-warm-text-secondary mb-10">Last updated: 21 March 2026</p>

        <div className="space-y-8">
          <Section title="1. Introduction">
            <p>ClientBoard (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a client portal tool built for Indian freelancers and creators. This Privacy Policy explains how we collect, use, and protect your personal information when you use our service at clientboard.app.</p>
            <p>By using ClientBoard, you agree to the collection and use of information as described in this policy.</p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-warm-text-secondary text-sm leading-relaxed">
              <li><strong className="text-warm-text-primary">Account Information</strong> — Your email address and name when you sign up.</li>
              <li><strong className="text-warm-text-primary">Client Data</strong> — Client names, emails, project names, and portal content that you create.</li>
              <li><strong className="text-warm-text-primary">Project Updates & Files</strong> — Content you post to client portals, including text updates and file links.</li>
              <li><strong className="text-warm-text-primary">Feedback</strong> — Messages submitted by clients through portal feedback forms.</li>
              <li><strong className="text-warm-text-primary">Payment Information</strong> — Processed securely by Razorpay. We do not store your card details.</li>
              <li><strong className="text-warm-text-primary">Usage Data</strong> — Basic analytics such as page visits and feature usage.</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="list-disc pl-5 space-y-1.5 text-warm-text-secondary text-sm leading-relaxed">
              <li>To provide and maintain the ClientBoard service.</li>
              <li>To create and manage your account.</li>
              <li>To process payments and manage subscriptions.</li>
              <li>To send important service-related communications.</li>
              <li>To improve our product and user experience.</li>
            </ul>
          </Section>

          <Section title="4. Data Storage & Security">
            <p>Your data is stored securely using <strong className="text-warm-text-primary">Supabase</strong>, a trusted database and authentication platform. All data is encrypted in transit (TLS) and at rest. Payments are processed by <strong className="text-warm-text-primary">Razorpay</strong>, a PCI-DSS compliant payment gateway.</p>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or destruction.</p>
          </Section>

          <Section title="5. Third-Party Sharing">
            <p><strong className="text-warm-text-primary">We do not sell, rent, or share your personal data with third parties</strong> for marketing purposes. Your data is only shared with:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-warm-text-secondary text-sm leading-relaxed">
              <li><strong className="text-warm-text-primary">Supabase</strong> — For data storage and authentication.</li>
              <li><strong className="text-warm-text-primary">Razorpay</strong> — For payment processing.</li>
              <li><strong className="text-warm-text-primary">Vercel</strong> — For application hosting.</li>
            </ul>
          </Section>

          <Section title="6. Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-warm-text-secondary text-sm leading-relaxed">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your account and associated data.</li>
              <li>Export your data in a standard format.</li>
            </ul>
            <p>To exercise any of these rights, email us at <strong className="text-warm-text-primary">hello@clientboard.app</strong>.</p>
          </Section>

          <Section title="7. Contact Us">
            <p>If you have questions about this Privacy Policy, contact us:</p>
            <ul className="list-none space-y-1 text-warm-text-secondary text-sm">
              <li>📧 Email: <strong className="text-warm-text-primary">hello@clientboard.app</strong></li>
              <li>🏢 Company: <strong className="text-warm-text-primary">ClientBoard, India</strong></li>
            </ul>
          </Section>
        </div>
      </main>

      {/* FOOTER */}
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
