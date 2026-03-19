import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function Contact() {
  return (
    <section id="contact" className="px-4 md:px-10 py-20 max-w-[800px] mx-auto min-h-[70vh] flex flex-col justify-center">
      <ScrollReveal>
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide text-accent mb-12">
          CONTACT
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="space-y-8">
          <div>
            <span className="font-body text-xs uppercase tracking-[0.15em] text-accent/60 block mb-2">
              Email
            </span>
            <a
              href="mailto:leonardostroka@gmail.com"
              className="font-display text-2xl md:text-3xl text-accent hover:text-accent-hover transition-colors"
            >
              leonardostroka@gmail.com
            </a>
          </div>

          <div>
            <span className="font-body text-xs uppercase tracking-[0.15em] text-accent/60 block mb-2">
              WhatsApp
            </span>
            <a
              href="https://wa.me/5511936185081"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-2xl md:text-3xl text-accent hover:text-accent-hover transition-colors"
            >
              +55 11 93618-5081
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
