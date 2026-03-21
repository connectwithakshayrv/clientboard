"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: insertError } = await supabase.from("contact_messages").insert({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    if (insertError) {
      setError("Something went wrong. Please try again or email us directly.");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-warm-text-primary mb-3">Get in Touch</h1>
          <p className="text-warm-text-secondary max-w-lg mx-auto">Have a question, feedback, or just want to say hi? We&apos;d love to hear from you. We reply within 24 hours.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT — Contact Info */}
          <div className="space-y-6">
            <div className="bg-warm-surface rounded-lg border border-warm-border p-6">
              <h2 className="text-lg font-display font-bold text-warm-text-primary mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-warm-bg flex items-center justify-center text-warm-accent flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-warm-text-primary">Email</p>
                    <a href="mailto:hello@clientboard.app" className="text-sm text-warm-accent hover:text-warm-accent-hover transition-colors">hello@clientboard.app</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-warm-bg flex items-center justify-center text-warm-accent flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-warm-text-primary">Twitter</p>
                    <a href="https://twitter.com/clientboard" target="_blank" rel="noopener noreferrer" className="text-sm text-warm-accent hover:text-warm-accent-hover transition-colors">@clientboard</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-warm-bg flex items-center justify-center text-warm-accent flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-warm-text-primary">Response Time</p>
                    <p className="text-sm text-warm-text-secondary">We reply within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-warm-surface rounded-lg border border-warm-border p-6">
              <h2 className="text-lg font-display font-bold text-warm-text-primary mb-3">Quick Links</h2>
              <ul className="space-y-2">
                <li><Link href="/privacy-policy" className="text-sm text-warm-accent hover:text-warm-accent-hover transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-warm-accent hover:text-warm-accent-hover transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* RIGHT — Contact Form */}
          <div className="bg-warm-surface rounded-lg border border-warm-border p-6 sm:p-8">
            {sent ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-emerald-50 text-emerald-600 mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-display font-bold text-warm-text-primary mb-2">Message sent!</h3>
                <p className="text-sm text-warm-text-secondary mb-6">Thanks for reaching out. We&apos;ll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); }} className="text-sm text-warm-accent hover:text-warm-accent-hover font-medium transition-colors">Send another message</button>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-display font-bold text-warm-text-primary mb-5">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-warm-text-primary mb-1.5">Name <span className="text-red-500">*</span></label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" className="w-full px-4 py-3 rounded-lg border border-warm-border bg-warm-bg text-warm-text-primary text-sm placeholder:text-warm-text-secondary/60 focus:outline-none focus:border-warm-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-warm-text-primary mb-1.5">Email <span className="text-red-500">*</span></label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg border border-warm-border bg-warm-bg text-warm-text-primary text-sm placeholder:text-warm-text-secondary/60 focus:outline-none focus:border-warm-accent transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-warm-text-primary mb-1.5">Message <span className="text-red-500">*</span></label>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} placeholder="How can we help?" className="w-full px-4 py-3 rounded-lg border border-warm-border bg-warm-bg text-warm-text-primary text-sm placeholder:text-warm-text-secondary/60 focus:outline-none focus:border-warm-accent transition-colors resize-none" />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                      <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  <button type="submit" disabled={loading || !name.trim() || !email.trim() || !message.trim()} className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg bg-warm-btn-primary-bg text-warm-btn-primary-text font-semibold text-sm hover:bg-warm-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading && (
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                    )}
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-warm-border py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-xs text-warm-text-secondary">© 2026 ClientBoard. All rights reserved.</p>
          <Link href="/" className="text-xs text-warm-text-secondary hover:text-warm-accent transition-colors font-medium">← Back to Home</Link>
        </div>
      </footer>
    </div>
  );
}
