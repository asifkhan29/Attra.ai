import ScrollReveal from "./ScrollReveal";
import serviceStrategyImg from "@/assets/service-strategy.jpg";
import serviceLlmImg from "@/assets/service-llm.jpg";
import serviceDataImg from "@/assets/service-data.jpg";

const services = [
  {
    title: "AI Strategy",
    description: "We craft bespoke AI roadmaps that align with your business objectives, ensuring measurable ROI from day one.",
    image: serviceStrategyImg,
  },
  {
    title: "LLM Integration",
    description: "From fine-tuning to deployment, we operationalize large language models for enterprise-grade performance.",
    image: serviceLlmImg,
  },
  {
    title: "Data Engineering",
    description: "Build the foundation for AI success with scalable data pipelines, governance frameworks, and clean architecture.",
    image: serviceDataImg,
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-24 lg:py-36 bg-muted">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <ScrollReveal>
          <div className="mb-16">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">What We Do</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter-custom max-w-lg">
              Services built for the AI-native enterprise.
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <div className="group relative bg-background rounded-lg overflow-hidden cursor-pointer">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold tracking-tight-custom">{service.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  <span className="mt-6 inline-block text-sm font-semibold border-b border-foreground pb-0.5 group-hover:border-muted-foreground transition-colors">
                    Learn more
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
