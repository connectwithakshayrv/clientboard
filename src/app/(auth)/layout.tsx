import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-warm-bg flex flex-col">
      {/* Nav */}
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-5">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-warm-btn-primary-bg flex items-center justify-center">
            <span className="text-warm-btn-primary-text font-bold text-lg">C</span>
          </div>
          <span className="font-display font-bold text-xl text-warm-text-primary">
            Client<span className="text-warm-accent">Board</span>
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
