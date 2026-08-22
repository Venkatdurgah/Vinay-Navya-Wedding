"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  target: string;
};

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const empty: Remaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function getRemaining(target: string): Remaining {
  const difference = Math.max(0, new Date(target).getTime() - Date.now());
  const totalSeconds = Math.floor(difference / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  };
}

export default function Countdown({ target }: CountdownProps) {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const update = () => setRemaining(getRemaining(target));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const values = remaining ?? empty;
  const units = [
    [values.days, "Days"],
    [values.hours, "Hours"],
    [values.minutes, "Minutes"],
    [values.seconds, "Seconds"]
  ] as const;

  return (
    <div className="countdown" aria-label="Countdown to the wedding">
      {units.map(([value, label]) => (
        <div className="countdown-unit" key={label}>
          <strong>{remaining ? String(value).padStart(2, "0") : "--"}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
