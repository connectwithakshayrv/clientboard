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
        <Link href="/" className="flex items-center justify-center gap-2 mb-8 group">
          <img src="/logo.svg" alt="COLLABILL" className="h-7 sm:h-8 w-auto transition-transform group-hover:scale-105" />
        </Link>
      </nav>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        {children}
      </div>
    </div>
  );
}
