export type WeddingEvent = {
  title: string;
  date: string;
  time: string;
  note?: string;
};

export type Wedding = {
  slug: string;
  bride: string;
  groom: string;
  weddingDate: string;
  weddingTime: string;
  receptionDate?: string;
  theme?: string;
  venue: string;
  venueUrl: string;
  hero: string;
  photos: string[];
  music?: string;
  weddingDateTime: string;
  events: WeddingEvent[];
  ogTitle: string;
  ogDescription: string;
};

export const weddings: Record<string, Wedding> = {
  "vinay-navya": {
    slug: "vinay-navya",
    bride: "VINAY",
    groom: "NAVYA",
    weddingDate: "26 August 2026",
    weddingTime: "11:44 PM",
    weddingDateTime: "2026-08-26T23:44:00+05:30",
    receptionDate: "28 August 2026",
    theme: "Reception on 28 August 2026",
    venue: "Alluri Satyanarayanaraju Samskrutika Kalyana Mandapam",
    venueUrl: "https://maps.app.goo.gl/LywSAWTycfbgK7SD6",
    hero: "/weddings/vinay-navya/photo-3.jpg",
    photos: [
      "/weddings/vinay-navya/photo-1.jpg",
      "/weddings/vinay-navya/photo-2.jpg",
      "/weddings/vinay-navya/photo-3.jpg",
      "/weddings/vinay-navya/photo-4.jpg"
    ],
    events: [
      {
        title: "Wedding",
        date: "26 August 2026",
        time: "11:44 PM",
        note: "Join us as Vinay & Navya begin their journey together."
      },
      {
        title: "Reception",
        date: "28 August 2026",
        time: "11:00 AM",
        note: "A celebration with family and friends."
      }
    ],
    ogTitle: "VINAY + NAVYA — Wedding Invitation",
    ogDescription: "Join Vinay and Navya as they celebrate their wedding and reception."
  }
};

export function getWedding(slug: string) {
  return weddings[slug] ?? weddings["vinay-navya"];
}