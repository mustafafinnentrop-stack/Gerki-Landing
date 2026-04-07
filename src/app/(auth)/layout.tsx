export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2">
            <img src="/gerki-icon.svg" alt="Gerki" className="w-8 h-8 rounded-lg" />
            <span className="text-xl font-bold text-foreground">Gerki</span>
          </a>
        </div>
        {children}
      </div>
    </div>
  );
}
