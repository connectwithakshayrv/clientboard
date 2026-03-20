"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

/* ===========================
   TYPES
   =========================== */

interface Client {
  id: string;
  creator_id: string;
  name: string;
  email: string | null;
  project_name: string | null;
  status: string;
  created_at: string;
  portal_slug: string | null;
}

interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}

type Tab = "overview" | "clients" | "settings";

/* ===========================
   DASHBOARD SHELL
   =========================== */

export default function DashboardShell({
  userEmail,
  userFullName,
}: {
  userEmail: string;
  userFullName: string;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Modals
  const [showAddClient, setShowAddClient] = useState(false);
  const [showAddUpdate, setShowAddUpdate] = useState<string | null>(null); // client_id

  const addToast = useCallback((message: string, type: "success" | "error") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const fetchClients = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      addToast("Failed to load clients", "error");
    } else {
      setClients(data || []);
    }
    setLoading(false);
  }, [addToast]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const activeCount = clients.filter((c) => c.status === "active").length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* ===== TOP NAVBAR ===== */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-sm shadow-primary-500/20">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-display font-bold text-lg text-slate-900">
                Client<span className="gradient-text">Board</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm text-slate-500">
                {userEmail}
              </span>
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-sm font-bold">
                {userEmail.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* ===== DESKTOP SIDEBAR ===== */}
        <aside className="hidden md:flex w-60 flex-col bg-white border-r border-slate-200 py-6 px-3">
          <div className="space-y-1">
            <SidebarItem
              icon={<HomeIcon />}
              label="Overview"
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            />
            <SidebarItem
              icon={<UsersIcon />}
              label="Clients"
              active={activeTab === "clients"}
              onClick={() => setActiveTab("clients")}
              badge={clients.length > 0 ? String(clients.length) : undefined}
            />
            <SidebarItem
              icon={<GearIcon />}
              label="Settings"
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
            />
          </div>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {activeTab === "overview" && (
              <OverviewTab
                totalClients={clients.length}
                activeCount={activeCount}
                loading={loading}
              />
            )}
            {activeTab === "clients" && (
              <ClientsTab
                clients={clients}
                loading={loading}
                onAddClient={() => setShowAddClient(true)}
                onAddUpdate={(id) => setShowAddUpdate(id)}
                addToast={addToast}
              />
            )}
            {activeTab === "settings" && (
              <SettingsTab
                userEmail={userEmail}
                userFullName={userFullName}
                addToast={addToast}
              />
            )}
          </div>
        </main>
      </div>

      {/* ===== MOBILE BOTTOM TABS ===== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40">
        <div className="flex items-center justify-around h-16">
          <BottomTab
            icon={<HomeIcon />}
            label="Overview"
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          />
          <BottomTab
            icon={<UsersIcon />}
            label="Clients"
            active={activeTab === "clients"}
            onClick={() => setActiveTab("clients")}
          />
          <BottomTab
            icon={<GearIcon />}
            label="Settings"
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
        </div>
      </div>

      {/* ===== MODALS ===== */}
      {showAddClient && (
        <AddClientModal
          onClose={() => setShowAddClient(false)}
          onSuccess={() => {
            setShowAddClient(false);
            fetchClients();
            addToast("Client added successfully!", "success");
          }}
          addToast={addToast}
        />
      )}
      {showAddUpdate && (
        <AddUpdateModal
          clientId={showAddUpdate}
          onClose={() => setShowAddUpdate(null)}
          onSuccess={() => {
            setShowAddUpdate(null);
            addToast("Update posted successfully!", "success");
          }}
          addToast={addToast}
        />
      )}

      {/* ===== TOASTS ===== */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-fade-up ${
              toast.type === "success"
                ? "bg-emerald-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircleIcon />
            ) : (
              <ErrorCircleIcon />
            )}
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===========================
   SIDEBAR ITEM
   =========================== */

function SidebarItem({
  icon,
  label,
  active,
  onClick,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-primary-50 text-primary-700 shadow-sm"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
      }`}
    >
      <span className={active ? "text-primary-600" : "text-slate-400"}>
        {icon}
      </span>
      {label}
      {badge && (
        <span className="ml-auto text-xs bg-slate-200 text-slate-600 rounded-full px-2 py-0.5">
          {badge}
        </span>
      )}
    </button>
  );
}

/* ===========================
   BOTTOM TAB
   =========================== */

function BottomTab({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-1 transition-colors ${
        active ? "text-primary-600" : "text-slate-400"
      }`}
    >
      {icon}
      <span className="text-[10px] font-semibold">{label}</span>
    </button>
  );
}

/* ===========================
   OVERVIEW TAB
   =========================== */

function OverviewTab({
  totalClients,
  activeCount,
  loading,
}: {
  totalClients: number;
  activeCount: number;
  loading: boolean;
}) {
  const stats = [
    {
      label: "Total Clients",
      value: totalClients,
      icon: <UsersIcon />,
      color: "from-primary-500 to-primary-600",
      bg: "bg-primary-50",
      text: "text-primary-600",
    },
    {
      label: "Active Projects",
      value: activeCount,
      icon: <FolderIcon />,
      color: "from-emerald-500 to-emerald-600",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      label: "Portal Views",
      value: 0,
      icon: <EyeIcon />,
      color: "from-amber-500 to-amber-600",
      bg: "bg-amber-50",
      text: "text-amber-600",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-extrabold text-slate-900 mb-1">
        Overview
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        Here&apos;s what&apos;s happening with your clients.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div
              className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${stat.bg} ${stat.text} mb-4`}
            >
              {stat.icon}
            </div>
            {loading ? (
              <div className="h-9 w-16 bg-slate-100 rounded-lg animate-pulse mb-1" />
            ) : (
              <p className="text-3xl font-display font-extrabold text-slate-900 mb-1">
                {stat.value}
              </p>
            )}
            <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===========================
   CLIENTS TAB
   =========================== */

function ClientsTab({
  clients,
  loading,
  onAddClient,
  onAddUpdate,
  addToast,
}: {
  clients: Client[];
  loading: boolean;
  onAddClient: () => void;
  onAddUpdate: (clientId: string) => void;
  addToast: (msg: string, type: "success" | "error") => void;
}) {
  async function copyLink(slug: string) {
    const url = `https://clientboard.app/portal/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      addToast("Link copied to clipboard!", "success");
    } catch {
      addToast("Failed to copy link", "error");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-slate-900 mb-1">
            Clients
          </h1>
          <p className="text-sm text-slate-500">
            Manage your clients and their portals.
          </p>
        </div>
        <button
          onClick={onAddClient}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-200"
        >
          <PlusIcon />
          <span className="hidden sm:inline">Add New Client</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {loading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-40 bg-slate-100 rounded-lg" />
                  <div className="h-4 w-56 bg-slate-100 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : clients.length === 0 ? (
        /* ===== EMPTY STATE ===== */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary-50 text-primary-400 mb-6">
            <svg
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
            No clients yet
          </h3>
          <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
            Add your first client to create a portal and start sharing updates,
            files and collecting feedback.
          </p>
          <button
            onClick={onAddClient}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white text-sm font-semibold shadow-md shadow-primary-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <PlusIcon />
            Add Your First Client
          </button>
        </div>
      ) : (
        /* ===== CLIENT LIST ===== */
        <div className="grid gap-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 hover:shadow-lg hover:shadow-slate-100 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Left side */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm">
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-bold text-slate-900 truncate">
                        {client.name}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          client.status === "active"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {client.status}
                      </span>
                    </div>
                    {client.project_name && (
                      <p className="text-sm text-slate-500 mt-0.5 truncate">
                        {client.project_name}
                      </p>
                    )}
                    {client.email && (
                      <p className="text-xs text-slate-400 mt-0.5 truncate">
                        {client.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <button
                    onClick={() => onAddUpdate(client.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 transition-colors"
                  >
                    <EditIcon />
                    Add Update
                  </button>
                  {client.portal_slug && (
                    <>
                      <button
                        onClick={() => copyLink(client.portal_slug!)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 transition-colors"
                      >
                        <ShareIcon />
                        Share Link
                      </button>
                      <a
                        href={`/portal/${client.portal_slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg gradient-bg text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all"
                      >
                        <ExternalIcon />
                        Open Portal
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===========================
   SETTINGS TAB
   =========================== */

function SettingsTab({
  userEmail,
  userFullName,
  addToast,
}: {
  userEmail: string;
  userFullName: string;
  addToast: (msg: string, type: "success" | "error") => void;
}) {
  const router = useRouter();
  const [fullName, setFullName] = useState(userFullName);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    });
    if (error) {
      addToast("Failed to save name", "error");
    } else {
      addToast("Name saved successfully!", "success");
    }
    setSaving(false);
  }

  async function handleLogout() {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-2xl font-display font-extrabold text-slate-900 mb-1">
        Settings
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        Manage your account and preferences.
      </p>

      <div className="space-y-6 max-w-xl">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-5">
            Profile
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={userEmail}
                disabled
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold shadow-md shadow-primary-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving && <Spinner />}
              Save Changes
            </button>
          </div>
        </div>

        {/* Plan Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
            Plan
          </h2>
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
              Free Plan
            </span>
          </div>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold shadow-md shadow-primary-500/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            Upgrade Plan
          </a>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl border border-red-100 p-6">
          <h2 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-4">
            Account
          </h2>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {loggingOut ? <Spinner /> : <LogoutIcon />}
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===========================
   ADD CLIENT MODAL
   =========================== */

function AddClientModal({
  onClose,
  onSuccess,
  addToast,
}: {
  onClose: () => void;
  onSuccess: () => void;
  addToast: (msg: string, type: "success" | "error") => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectName, setProjectName] = useState("");
  const [saving, setSaving] = useState(false);

  function generateSlug(text: string) {
    const base = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    const suffix = Math.random().toString(36).slice(2, 8);
    return base ? `${base}-${suffix}` : suffix;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      addToast("Authentication error. Please log in again.", "error");
      setSaving(false);
      return;
    }

    const slug = generateSlug(projectName || name);

    const { error } = await supabase.from("clients").insert({
      creator_id: user.id,
      name,
      email: email || null,
      project_name: projectName || null,
      portal_slug: slug,
      status: "active",
    });

    if (error) {
      addToast(error.message || "Failed to add client", "error");
      setSaving(false);
      return;
    }

    onSuccess();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 animate-fade-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-extrabold text-slate-900">
            Add New Client
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Client Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Priya Sharma"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Client Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@example.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Website Redesign"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
            />
            {projectName && (
              <p className="text-xs text-slate-400 mt-1.5">
                Portal slug:{" "}
                <span className="font-mono text-primary-500">
                  {projectName
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")}
                  -xxx
                </span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !name.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl gradient-bg text-white text-sm font-semibold shadow-md shadow-primary-500/20 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving && <Spinner />}
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ===========================
   ADD UPDATE MODAL
   =========================== */

function AddUpdateModal({
  clientId,
  onClose,
  onSuccess,
  addToast,
}: {
  clientId: string;
  onClose: () => void;
  onSuccess: () => void;
  addToast: (msg: string, type: "success" | "error") => void;
}) {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      addToast("Authentication error", "error");
      setSaving(false);
      return;
    }

    const { error } = await supabase.from("updates").insert({
      client_id: clientId,
      creator_id: user.id,
      content,
    });

    if (error) {
      addToast(error.message || "Failed to post update", "error");
      setSaving(false);
      return;
    }

    onSuccess();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 animate-fade-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-extrabold text-slate-900">
            Post Update
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Update <span className="text-red-500">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
              placeholder="Share a progress update with your client..."
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !content.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl gradient-bg text-white text-sm font-semibold shadow-md shadow-primary-500/20 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving && <Spinner />}
              Post Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ===========================
   ICONS
   =========================== */

function HomeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ErrorCircleIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}
