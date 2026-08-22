"use client";

import { Music2, Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

type MusicPlayerProps = {
  source?: string;
};

export default function MusicPlayer({ source }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  if (!source) return null;

  const toggle = async () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }
    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={source} loop preload="none" onEnded={() => setPlaying(false)} />
      <button className="floating-control music-control" type="button" onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>
        {playing ? <Pause size={17} /> : <Music2 size={17} />}
      </button>
    </>
  );
}
