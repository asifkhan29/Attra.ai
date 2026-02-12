import ScrollReveal from "./ScrollReveal";

export default function CTASection() {
  return (
    <section id="contact" className="py-24 lg:py-36 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 text-center">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-wider opacity-60 mb-4">Ready to start?</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter-custom max-w-2xl mx-auto">
            Let's build your AI future, together.
          </h2>
          <p className="mt-6 text-lg opacity-70 max-w-lg mx-auto">
            Schedule a consultation with our team of AI architects and strategists.
          </p>
          <div className="mt-10">
            <a
              href="#"
              className="inline-flex items-center px-10 py-4 rounded-pill bg-primary-foreground text-primary text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Schedule a Call
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
