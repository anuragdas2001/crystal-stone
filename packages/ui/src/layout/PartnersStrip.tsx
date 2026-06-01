const partners = [
  "Max Estates",
  "Brigade",
  "Sattva",
  "Cushman & Wakefield",
];

export default function PartnersStrip() {
  return (
    <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
      <span className="section-eyebrow block mb-4">Partnerships</span>
      <h2 className="section-title mb-12">Trusted by over 150+ major companies</h2>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
        {partners.map((name) => (
          <span
            key={name}
            className="font-label-md text-on-surface-variant uppercase tracking-widest text-sm border border-outline-variant/30 px-6 py-3"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
