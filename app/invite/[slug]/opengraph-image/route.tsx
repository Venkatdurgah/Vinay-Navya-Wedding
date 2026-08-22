import { ImageResponse } from "next/og";
import { getWedding } from "@/lib/weddings";

export const alt = "Wedding invitation";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const wedding = getWedding(slug);
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const imageUrl = `${site}${wedding.photos[0]}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "58px",
          color: "#f7f0e4",
          backgroundColor: "#120c09",
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.02), rgba(18,12,9,.95)), url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 8, color: "#f1dba8" }}>WEDDING INVITATION</div>
        <div style={{ display: "flex", fontSize: 72, marginTop: 16, fontWeight: 700 }}>{wedding.bride} + {wedding.groom}</div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 18 }}>{wedding.weddingDate} • {wedding.weddingTime}</div>
      </div>
    ),
    size
  );
}