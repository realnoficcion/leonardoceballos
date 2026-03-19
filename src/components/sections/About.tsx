import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function About() {
  return (
    <section id="about" className="px-4 md:px-10 py-20 max-w-[800px] mx-auto">
      <ScrollReveal>
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wide text-accent mb-12">
          ABOUT
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="space-y-6 font-body text-sm md:text-base leading-relaxed text-accent/90">
          <p>
            Leonardo Ceballos is a multidisciplinary creative working at the
            intersection of video, sound, motion, and code.
          </p>
          <p>
            With a focus on creating compelling visual narratives, Leonardo has
            collaborated extensively with brands and creators.
          </p>
          <p>
            His work spans short-form content, brand campaigns, original
            soundtracks, sound design, motion with AI, and 3D rendering —
            always with a cinematic eye and meticulous attention to detail.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="mt-16 pt-12 border-t border-accent/20">
          <h3 className="font-display text-2xl tracking-wide text-accent mb-6">TOOLS</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "Premiere Pro",
              "CapCut",
              "Logic Pro",
              "Ableton Live",
              "Claude",
              "Next.js",
            ].map((tool) => (
              <span
                key={tool}
                className="font-body text-xs uppercase tracking-wider text-accent/70"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
