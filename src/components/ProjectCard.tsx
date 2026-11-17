import { Link } from 'react-router-dom';
import { useState, type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { hexToRgbTriple } from '../utils/liquidGlass';
import { accentText } from '../theme/contrast';

export interface ProjectCardProps {
  title: string;
  tagline: string;
  image: string;
  background?: string;
  path: string;
  accentColor?: string;
  index?: number;
  ctaLabel?: string;
}

const MotionLink = motion.create(Link);

export default function ProjectCard({
  title,
  tagline,
  image,
  path,
  accentColor = '#FF7A3D',
  index = 0,
  ctaLabel = 'Learn more',
}: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const accentRgb = hexToRgbTriple(accentColor);
  const cardStyle: CSSProperties = { borderTop: `2px solid ${accentColor}` };
  if (accentRgb) (cardStyle as Record<string, string>)['--lg-accent'] = accentRgb;

  return (
    <MotionLink
      to={path}
      className="group block h-full rounded-3xl liquid-glass liquid-glass-card liquid-glass-interactive transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-0"
      style={cardStyle}
      aria-label={`${title} — ${tagline}`}
      initial={{ y: 16 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.3 } }}
    >
      <div className="p-6 flex flex-col h-full">
      {/* App icon */}
      <div className="mb-5">
        {!imageLoaded && (
          <div className="w-16 h-16 rounded-xl bg-panel animate-pulse" />
        )}
        <img
          src={image}
          alt={`${title} icon`}
          width={64}
          height={64}
          className={`w-16 h-16 object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Text */}
      <h3 className="text-xl font-bold text-ink tracking-tight">{title}</h3>
      <p className="mt-2 text-muted text-sm leading-relaxed">{tagline}</p>

      {/* Learn more */}
      <div
        className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200"
        style={{ color: accentText(accentColor) }}
      >
        {ctaLabel}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
      </div>
      </div>
    </MotionLink>
  );
}
