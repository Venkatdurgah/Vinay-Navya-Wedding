import { Compass } from "lucide-react";

const links = [
  ["Invitation", "invitation"],
  ["Our story", "story"],
  ["Events", "events"],
  ["Venue", "venue"],
  ["Gallery", "gallery"]
];

export default function SectionNav() {
  return (
    <nav className="section-nav" aria-label="Invitation sections">
      <Compass size={17} aria-hidden="true" />
      <div className="section-links">
        {links.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}
      </div>
    </nav>
  );
}
