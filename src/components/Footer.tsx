export function Footer() {
  return (
    <footer className="bg-surface w-full py-12 border-t border-outline-variant/15 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center px-10 max-w-7xl mx-auto w-full gap-4">
        <div className="font-body text-xs font-medium uppercase tracking-widest text-on-surface-variant">
          © 2024 QR Flow. No tracking, no accounts.
        </div>
        <div className="flex gap-8">
          <a className="font-body text-xs font-medium uppercase tracking-widest text-on-surface-variant hover:underline decoration-primary underline-offset-4 transition-all duration-300" href="#">Privacy</a>
          <a className="font-body text-xs font-medium uppercase tracking-widest text-on-surface-variant hover:underline decoration-primary underline-offset-4 transition-all duration-300" href="#">Terms</a>
          <a className="font-body text-xs font-medium uppercase tracking-widest text-on-surface-variant hover:underline decoration-primary underline-offset-4 transition-all duration-300" href="#">Open Source</a>
        </div>
      </div>
    </footer>
  );
}
