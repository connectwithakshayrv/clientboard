import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen gradient-bg-subtle flex flex-col">
      {/* Nav */}
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-5">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-md shadow-primary-500/20">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="font-display font-bold text-xl text-slate-900">
            Client<span className="gradient-text">Board</span>
          </span>
        </Link>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        {children}
      </div>
    </div>
  );
}
