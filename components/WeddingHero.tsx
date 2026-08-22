import type { Wedding } from "@/lib/weddings";

export default function WeddingHero({ wedding }: { wedding: Wedding }) {
  return (
    <section className="hero" id="invitation" aria-labelledby="invitation-title">
      <div className="hero-media" style={{ backgroundImage: `url("${wedding.hero}")` }} />
      <div className="hero-frame" aria-hidden="true" />
      <div className="hero-monogram" aria-hidden="true">V<span>N</span></div>
      <div className="hero-content">
        <div className="rings" aria-hidden="true"><span /> <span /></div>
        <div className="kicker">Wedding Invitation</div>
        <h1 className="names" id="invitation-title">
          <span>{wedding.bride}</span>
          <span className="amp">&amp;</span>
          <span>{wedding.groom}</span>
        </h1>
        <div className="date-line">
          <span>{wedding.weddingDate}</span>
          <span className="dot">·</span>
          <span>{wedding.weddingTime}</span>
        </div>
      </div>
      <a className="scroll" href="#story">Scroll to discover <span aria-hidden="true">↓</span></a>
    </section>
  );
}
