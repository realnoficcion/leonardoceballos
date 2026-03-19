import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-accent/20 py-12 px-6 md:px-10">
      <div className="max-w-[1230px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-display text-lg tracking-[0.15em] text-accent">
            {SITE.name.toUpperCase()}
          </span>
          <span className="text-accent/60 text-xs">
            Multidisciplinary Creative
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="mailto:leonardostroka@gmail.com"
            className="text-xs text-accent/70 hover:text-accent transition-colors uppercase tracking-wider"
          >
            Email
          </a>
          <a
            href="https://wa.me/5511936185081"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent/70 hover:text-accent transition-colors uppercase tracking-wider"
          >
            WhatsApp
          </a>
        </div>

        <span className="text-accent/50 text-xs">
          &copy; {new Date().getFullYear()} {SITE.name}
        </span>
      </div>
    </footer>
  );
}
