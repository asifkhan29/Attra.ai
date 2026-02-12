import ScrollReveal from "./ScrollReveal";

const stats = [
  { value: "200+", label: "Enterprise Clients" },
  { value: "98%", label: "Client Retention" },
  { value: "$2.1B", label: "Value Generated" },
  { value: "45", label: "Countries Served" },
];

export default function StatsSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter-custom">
              Trusted by industry leaders.
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <div className="text-center">
                <div className="text-5xl lg:text-6xl font-bold tracking-tighter-custom">{stat.value}</div>
                <div className="mt-3 text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
