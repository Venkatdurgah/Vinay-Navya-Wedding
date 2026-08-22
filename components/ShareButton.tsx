"use client";

import { Share2 } from "lucide-react";

export default function ShareButton({ couple }: { couple: string }) {
  const share = () => {
    const message = `💍 ${couple}\n\nWe invite you to celebrate our special day with us.\n\n26 August 2026\n\nWedding Invitation:\n${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <button className="share-button" type="button" onClick={share}>
      <Share2 size={17} />
      Share Invitation
    </button>
  );
}
