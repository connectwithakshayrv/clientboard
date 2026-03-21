import { createClient } from "@/lib/supabase-server";
import Link from "next/link";
import FeedbackForm from "./feedback-form";
import type { Metadata } from "next";

interface PortalUpdate { id: string; content: string; created_at: string; }
interface PortalFile { id: string; name: string; url: string; created_at: string; }

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createClient();
  const { data: client } = await supabase.from("clients").select("name, project_name").eq("portal_slug", params.slug).single();
  if (!client) return { title: "Portal Not Found — ClientBoard" };
  return { title: `${client.project_name || client.name} — ClientBoard Portal`, description: `Client portal for ${client.name}` };
}

export default async function PortalPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: client } = await supabase.from("clients").select("*").eq("portal_slug", params.slug).single();
  if (!client) return <PortalNotFound />;

  const [updatesResult, filesResult] = await Promise.all([
    supabase.from("updates").select("id, content, created_at").eq("client_id", client.id).order("created_at", { ascending: false }),
    supabase.from("files").select("id, name, url, created_at").eq("client_id", client.id).order("created_at", { ascending: false }),
  ]);
  const updates: PortalUpdate[] = updatesResult.data || [];
  const files: PortalFile[] = filesResult.data || [];

  return (
    <div className="min-h-screen bg-warm-bg animate-fade-in">
      <header className="border-b border-warm-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-7 h-7 rounded-lg bg-warm-btn-primary-bg flex items-center justify-center"><span className="text-warm-btn-primary-text font-bold text-xs">C</span></div>
            <span className="font-display font-bold text-sm text-warm-text-secondary">ClientBoard</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-warm-text-primary leading-tight">{client.project_name || client.name}</h1>
              <p className="text-sm text-warm-text-secondary mt-1">{client.name}{client.email && <span className="text-warm-text-secondary/50"> · {client.email}</span>}</p>
            </div>
            <span className={`inline-flex items-center self-start px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${client.status === "active" ? "bg-warm-badge-bg text-warm-badge-text border border-warm-accent/20" : "bg-warm-border text-warm-text-secondary"}`}>
              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${client.status === "active" ? "bg-warm-accent" : "bg-warm-text-secondary"}`} />
              {client.status}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 sm:space-y-14">
        {/* UPDATES */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-warm-surface text-warm-accent">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
            </div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-warm-text-primary">Project Updates</h2>
          </div>
          {updates.length === 0 ? (
            <EmptyState icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>} message="No updates posted yet" />
          ) : (
            <div className="space-y-4">{updates.map((update, i) => (
              <div key={update.id} className="relative pl-6 sm:pl-8" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="absolute left-0 top-0 bottom-0 w-px bg-warm-border" />
                <div className="absolute left-[-3.5px] top-2 w-2 h-2 rounded-full bg-warm-accent ring-4 ring-warm-bg" />
                <div className="bg-warm-surface rounded-lg p-4 sm:p-5 border border-warm-border">
                  <p className="text-sm sm:text-base text-warm-text-primary leading-relaxed whitespace-pre-wrap">{update.content}</p>
                  <p className="text-xs text-warm-text-secondary mt-3 font-medium">{formatDate(update.created_at)}</p>
                </div>
              </div>
            ))}</div>
          )}
        </section>

        {/* FILES */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-warm-surface text-warm-accent">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
            </div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-warm-text-primary">Files & Deliverables</h2>
          </div>
          {files.length === 0 ? (
            <EmptyState icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>} message="No files shared yet" />
          ) : (
            <div className="space-y-2">{files.map((file) => (
              <div key={file.id} className="flex items-center justify-between gap-3 p-4 rounded-lg bg-warm-surface border border-warm-border hover:bg-white transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-warm-bg border border-warm-border flex items-center justify-center text-warm-text-secondary flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-warm-text-primary truncate">{file.name || "Untitled File"}</p>
                    <p className="text-xs text-warm-text-secondary">{formatDate(file.created_at)}</p>
                  </div>
                </div>
                {file.url && (
                  <a href={file.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-warm-btn-primary-bg text-warm-btn-primary-text text-xs font-semibold hover:bg-warm-accent transition-colors flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                    View
                  </a>
                )}
              </div>
            ))}</div>
          )}
        </section>

        {/* FEEDBACK */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-warm-surface text-warm-accent">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
            </div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-warm-text-primary">Leave Feedback</h2>
          </div>
          <div className="bg-warm-surface rounded-lg border border-warm-border p-5 sm:p-6">
            <FeedbackForm clientId={client.id} clientName={client.name} />
          </div>
        </section>
      </main>

      <footer className="border-t border-warm-border py-8 mt-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-xs text-warm-text-secondary hover:text-warm-accent transition-colors">
            Powered by <span className="font-display font-bold">Client<span className="text-warm-accent">Board</span></span>
          </Link>
        </div>
      </footer>
    </div>
  );
}

function PortalNotFound() {
  return (
    <div className="min-h-screen bg-warm-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-lg bg-warm-surface text-warm-text-secondary mb-6">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
        </div>
        <h1 className="text-2xl font-display font-bold text-warm-text-primary mb-2">Portal not found</h1>
        <p className="text-sm text-warm-text-secondary mb-8">This portal link might be incorrect or the project may have been removed.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-warm-btn-primary-bg text-warm-btn-primary-text text-sm font-semibold hover:bg-warm-accent transition-colors">Go to ClientBoard</Link>
      </div>
    </div>
  );
}

function EmptyState({ icon, message }: { icon: React.ReactNode; message: string }) {
  return (
    <div className="bg-warm-surface rounded-lg border border-warm-border p-8 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-warm-bg border border-warm-border text-warm-text-secondary mb-3">{icon}</div>
      <p className="text-sm text-warm-text-secondary font-medium">{message}</p>
    </div>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
