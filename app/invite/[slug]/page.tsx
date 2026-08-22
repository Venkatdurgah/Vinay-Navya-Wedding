import type { Metadata } from "next";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { getWedding, weddings } from "@/lib/weddings";
import Countdown from "@/components/Countdown";
import MusicPlayer from "@/components/MusicPlayer";
import SectionNav from "@/components/SectionNav";
import ShareButton from "@/components/ShareButton";
import WeddingHero from "@/components/WeddingHero";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(weddings).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const wedding = weddings[slug];
  if (!wedding) return {};

  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
  const og = `${base}/invite/${slug}/opengraph-image`;

  return {
    title: wedding.ogTitle,
    description: wedding.ogDescription,
    openGraph: {
      title: wedding.ogTitle,
      description: wedding.ogDescription,
      type: "website",
      url: `${base}/invite/${slug}`,
      images: [{ url: og, width: 1200, height: 630, alt: `${wedding.bride} + ${wedding.groom}` }]
    },
    twitter: {
      card: "summary_large_image",
      title: wedding.ogTitle,
      description: wedding.ogDescription,
      images: [og]
    }
  };
}

export default async function WeddingPage({ params }: Props) {
  const { slug } = await params;
  const wedding = weddings[slug];
  if (!wedding) notFound();

  return (
    <main className="invite">
      <SectionNav />
      <WeddingHero wedding={wedding} />

      <section className="section center" id="story">
        <div className="eyebrow">A new chapter</div>
        <h2>Two hearts.<br />One beautiful beginning.</h2>
        <p className="lead">
          With love in their hearts and family by their side, {wedding.bride} and {wedding.groom}{" "}
          invite you to be part of their special celebration.
        </p>
        <div className="date-card">
          <div className="eyebrow">The wedding</div>
          <div className="big-date">{wedding.weddingDate}</div>
          <div className="time">{wedding.weddingTime}</div>
          <Countdown target={wedding.weddingDateTime} />
        </div>
        <ShareButton couple={`${wedding.bride} + ${wedding.groom}`} />
      </section>

      <section className="section" id="events">
        <div className="eyebrow">Celebrations</div>
        <h2>Save the date</h2>
        <div className="events">
          {wedding.events.map((event, index) => (
            <article className="event" key={event.title}>
              <div className="event-marker"><CalendarDays size={18} /><span>0{index + 1}</span></div>
              <div>
                <h3>{event.title}</h3>
                <p>{event.note}</p>
              </div>
              <div className="event-date">
                <div>{event.date}</div>
                <div>{event.time}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="venue">
        <div className="eyebrow"><MapPin size={13} /> The venue</div>
        <h2>Where we celebrate</h2>
        <div className="venue">
          <div className="venue-label">ALLURI SATYANARAYANARAJU SAMSKRUTIKA</div>
          <div className="venue-name">Kalyana Mandapam</div>
          <p className="venue-detail">{wedding.venue}</p>
          <a className="map-btn" href={wedding.venueUrl} target="_blank" rel="noopener noreferrer">
            View location <ArrowUpRight size={15} />
          </a>
        </div>
      </section>

      <section className="section" id="gallery">
        <div className="eyebrow">Our moments</div>
        <h2>A glimpse of us</h2>
        <div className="gallery">
          {wedding.photos.map((photo, index) => (
            <img loading="lazy" key={photo} src={photo} alt={`${wedding.bride} and ${wedding.groom} — wedding moment ${index + 1}`} />
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="names-small">{wedding.bride} &amp; {wedding.groom}</div>
        <p>{wedding.theme ?? "With family and friends"}</p>
        <p>With love, we invite you to celebrate with us.</p>
      </footer>
      <MusicPlayer source={wedding.music} />
    </main>
  );
}