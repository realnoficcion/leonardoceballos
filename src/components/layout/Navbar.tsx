"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { useLenis } from "@/components/animations/LenisProvider";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection("#" + entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.preventDefault();

      if (pathname === "/") {
        lenis?.scrollTo(href, { offset: -60, duration: 1.5 });
      } else {
        router.push("/" + href);
      }

      setIsMenuOpen(false);
    },
    [pathname, lenis, router]
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center justify-between px-6 md:px-10 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-sm border-b border-accent/20"
            : "bg-transparent"
        }`}
      >
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="font-display text-xl md:text-2xl tracking-[0.2em] text-accent hover:text-accent-hover transition-colors"
        >
          {SITE.name.toUpperCase()}
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`font-body text-xs uppercase tracking-[0.15em] transition-colors ${
                activeSection === link.href
                  ? "text-accent"
                  : "text-accent/70 hover:text-accent"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden relative w-6 h-5 flex flex-col justify-between"
          aria-label="Toggle menu"
        >
          <span
            className={`w-full h-[2px] bg-accent transition-all duration-300 origin-center ${
              isMenuOpen ? "rotate-45 translate-y-[9px]" : ""
            }`}
          />
          <span
            className={`w-full h-[2px] bg-accent transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-full h-[2px] bg-accent transition-all duration-300 origin-center ${
              isMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-expo-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className={`font-display text-4xl tracking-[0.15em] transition-colors ${
              activeSection === link.href
                ? "text-accent"
                : "text-accent/70 hover:text-accent"
            }`}
          >
            {link.label.toUpperCase()}
          </a>
        ))}
      </div>
    </>
  );
}
