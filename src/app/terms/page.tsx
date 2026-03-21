import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — COLLABILL",
  description: "Terms and conditions for using the COLLABILL platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-warm-bg">
      <nav className="sticky top-0 z-50 bg-warm-bg/90 backdrop-blur-lg border-b border-warm-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/logo.svg" alt="COLLABILL" className="h-7 sm:h-8 w-auto transition-transform group-hover:scale-105" />
            </Link>
            <Link href="/" className="text-sm text-warm-text-secondary hover:text-warm-accent transition-colors font-medium">← Back to Home</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-warm-text-primary mb-2">Terms of Service</h1>
        <p className="text-sm text-warm-text-secondary mb-10">Last updated: 21 March 2026</p>

        <div className="space-y-8">
          <Section title="1. Service Description">
            <p>COLLABILL is a SaaS platform that enables freelancers and creators in India to create professional client portals for sharing project updates, files, and collecting feedback. By creating an account or using our service, you agree to these Terms of Service.</p>
          </Section>

          <Section title="2. Account Registration">
            <p>To use COLLABILL, you must create an account by providing a valid email address. You are responsible for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-warm-text-secondary text-sm leading-relaxed">
              <li>Maintaining the confidentiality of your account credentials.</li>
              <li>All activities that occur under your account.</li>
              <li>Providing accurate and up-to-date information.</li>
              <li>Notifying us immediately of any unauthorized access.</li>
            </ul>
          </Section>

          <Section title="3. User Responsibilities">
            <p>When using COLLABILL, you agree to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-warm-text-secondary text-sm leading-relaxed">
              <li>Use the service only for lawful purposes.</li>
              <li>Not upload malicious, offensive, or illegal content.</li>
              <li>Respect the intellectual property rights of others.</li>
              <li>Not attempt to reverse-engineer, hack, or disrupt the service.</li>
              <li>Not use the platform to send spam or unsolicited communications.</li>
            </ul>
          </Section>

          <Section title="4. Payment Terms">
            <p>COLLABILL offers monthly subscription plans:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-warm-text-secondary text-sm leading-relaxed">
              <li><strong className="text-warm-text-primary">Starter</strong> — ₹399/month (up to 3 clients)</li>
              <li><strong className="text-warm-text-primary">Pro</strong> — ₹799/month (unlimited clients)</li>
              <li><strong className="text-warm-text-primary">Agency</strong> — ₹1,999/month (team + white label)</li>
            </ul>
            <p>Payments are processed securely via Razorpay. Subscriptions renew automatically each month.</p>
            <p><strong className="text-warm-text-primary">All payments are final and non-refundable.</strong> COLLABILL does not offer refunds under any circumstances. Please try the free plan before upgrading to a paid plan.</p>
          </Section>

          <Section title="5. Intellectual Property">
            <p>You retain full ownership of all content you upload to COLLABILL (files, updates, project data). We do not claim any intellectual property rights over your content.</p>
            <p>The COLLABILL brand, logo, design, and codebase are the intellectual property of COLLABILL and may not be copied or reproduced without permission.</p>
          </Section>

          <Section title="6. Account Termination">
            <p>We may suspend or terminate your account if:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-warm-text-secondary text-sm leading-relaxed">
              <li>You violate these Terms of Service.</li>
              <li>Your account is used for fraudulent or illegal activity.</li>
              <li>You fail to pay subscription fees for an extended period.</li>
            </ul>
            <p>You may delete your account at any time by contacting us at <strong className="text-warm-text-primary">connectwithakshayrv@gmail.com</strong>. Upon deletion, your data will be permanently removed within 30 days.</p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>COLLABILL is provided &quot;as is&quot; without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service. Our total liability is limited to the amount you paid for the service in the last 12 months.</p>
          </Section>

          <Section title="8. Governing Law">
            <p>These Terms are governed by and construed in accordance with the laws of <strong className="text-warm-text-primary">India</strong>. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.</p>
          </Section>

          <Section title="9. Contact">
            <p>For questions about these Terms, contact us at <strong className="text-warm-text-primary">connectwithakshayrv@gmail.com</strong>.</p>
          </Section>
        </div>
      </main>

      <footer className="border-t border-warm-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-xs text-warm-text-secondary">© 2026 COLLABILL. All rights reserved.</p>
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
