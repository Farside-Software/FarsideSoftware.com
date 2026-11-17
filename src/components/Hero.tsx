import { motion, useMotionValue, useSpring, type MotionValue } from 'framer-motion';
import { useState, useRef, useCallback, type ReactNode } from 'react';
import { SITE_NAME } from '../config/site';
import GlassButton from './GlassButton';
import AppStoreBadge from './AppStoreBadge';

interface TiltProps { rotateX: MotionValue<number>; rotateY: MotionValue<number>; }

function TiltIcon({ children }: { children: (props: TiltProps) => ReactNode }) {
  const iconRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = iconRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rotateX.set((e.clientY - rect.top) / rect.height * -20 + 10);
    rotateY.set((e.clientX - rect.left) / rect.width * 20 - 10);
  }, [rotateX, rotateY]);
  const onMouseLeave = useCallback(() => { rotateX.set(0); rotateY.set(0); }, [rotateX, rotateY]);

  return (
    <div ref={iconRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="inline-block" style={{ perspective: 600 }}>
      {children({ rotateX: springX, rotateY: springY })}
    </div>
  );
}


interface ActionButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'github' | 'linkedin';
  download?: boolean;
}

interface HeroProps {
  heading: string;
  description: string;
  imageSrc: string;
  imageSrcs?: string[];
  headshotSrc?: string;
  appStoreHref?: string;
  macAppStoreHref?: string;
  showAppStoreButton?: boolean;
  systemRequirements?: string[];
  cropImage?: boolean;
  githubHref?: string;
  webHref?: string;
  variant?: 'app' | 'home';
  platforms?: string[];
  actionButtons?: ActionButton[];
}

/** Only the primary action is a Signal fill; the rest are outline buttons. */
const buttonTone: Record<ActionButton['variant'], 'solid' | 'ghost'> = {
  primary: 'solid',
  secondary: 'ghost',
  github: 'ghost',
  linkedin: 'ghost',
};

export default function Hero({
  heading,
  description,
  imageSrc,
  imageSrcs,
  headshotSrc,
  appStoreHref = '#',
  macAppStoreHref,
  showAppStoreButton = true,
  systemRequirements = [],
  cropImage = false,
  githubHref,
  webHref,
  variant = 'app',
  platforms = [],
  actionButtons = [],
}: HeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isHome = variant === 'home';
  const pills = isHome ? platforms : systemRequirements;

  // 3D tilt for app icon
  const iconRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = iconRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * -20);
    rotateY.set(x * 20);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  if (isHome) {
    return (
      <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-page pt-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          {/* Logo + Headshot — overlapping, behind text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex items-center justify-center mb-8"
          >
            <div className="w-[140px] h-[140px] rounded-full border-[3px] border-line/20 flex items-center justify-center relative z-10">
              <img
                src={imageSrc}
                alt={SITE_NAME}
                className="w-[102px] h-[102px] object-contain"
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            {headshotSrc && (
              <div className="w-[140px] h-[140px] rounded-full border-[3px] border-line/20 relative -ml-8 z-0 overflow-hidden">
                <img
                  src={headshotSrc}
                  alt="Nick Molargik"
                  width={182}
                  height={182}
                  className="w-[182px] h-[182px] max-w-none -ml-[21px] -mt-[7px]"
                />
              </div>
            )}
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-[2.25rem] sm:text-[3rem] md:text-display font-extrabold tracking-[-0.02em] leading-[1.05] text-ink [text-wrap:balance]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {heading}
          </motion.h1>

          <motion.h4
            className="mt-2 text-[1.25rem] sm:text-title font-semibold tracking-[-0.01em] text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Nick Molargik
          </motion.h4>

          {/* Description */}
          <motion.p
            className="mt-6 text-base sm:text-xl md:text-2xl text-muted max-w-2xl mx-auto leading-relaxed [text-wrap:balance]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>

          {/* Platform pills */}
          {pills.length > 0 && (
            <motion.div
              className="flex flex-wrap justify-center gap-2 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {pills.map((pill, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.05, duration: 0.3 }}
                  className="liquid-glass liquid-glass-pill liquid-glass-interactive inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-muted"
                >
                  {pill}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* Action buttons */}
          {actionButtons.length > 0 && (
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-3 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {actionButtons.map((button, idx) => {
                const isAnchor = button.href.startsWith('#');
                return (
                  <GlassButton
                    key={idx}
                    href={button.href}
                    download={button.download}
                    target={!isAnchor && !button.download ? '_blank' : undefined}
                    tone={buttonTone[button.variant]}
                    size="md"
                    onClick={isAnchor ? (e) => {
                      e.preventDefault();
                      document.querySelector(button.href)?.scrollIntoView({ behavior: 'smooth' });
                    } : undefined}
                  >
                    {button.label}
                  </GlassButton>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  // App variant
  return (
    <section className="relative w-full bg-page pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* App icon(s) with 3D tilt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          {imageSrcs && imageSrcs.length > 1 ? (
            <div className="flex items-center justify-center gap-6">
              {imageSrcs.map((src, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <TiltIcon>
                    {({ rotateX: rx, rotateY: ry }) => (
                      <motion.img
                        src={src}
                        alt={`${heading} icon ${idx + 1}`}
                        className="w-[120px] h-[120px] rounded-[1.75rem] object-cover"
                        style={{ rotateX: rx, rotateY: ry }}
                      />
                    )}
                  </TiltIcon>
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              ref={iconRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="inline-block"
              style={{ perspective: 600 }}
            >
              <motion.img
                src={imageSrc}
                alt={`${heading} icon`}
                className={`mx-auto w-[134px] h-[134px] rounded-[2rem] ${cropImage ? 'object-cover' : 'object-contain'} transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ rotateX: springX, rotateY: springY }}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          )}
        </motion.div>

        {/* App name */}
        <motion.h1
          className="text-headline text-ink"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {heading}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-4 text-lg text-muted max-w-2xl mx-auto leading-relaxed [text-wrap:balance]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {description}
        </motion.p>

        {/* System requirement pills */}
        {pills.length > 0 && (
          <motion.div
            className="flex flex-wrap justify-center gap-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {pills.map((pill, idx) => (
              <span
                key={idx}
                className="liquid-glass liquid-glass-pill liquid-glass-interactive inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-muted"
              >
                {pill}
              </span>
            ))}
          </motion.div>
        )}

        {/* App Store, GitHub & Web */}
        {(showAppStoreButton || githubHref || webHref) && (
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {showAppStoreButton && appStoreHref && (
              <AppStoreBadge href={appStoreHref} appName={heading} />
            )}
            {showAppStoreButton && macAppStoreHref && (
              <AppStoreBadge href={macAppStoreHref} appName={heading} store="mac" />
            )}
            {githubHref && (
              <GlassButton
                href={githubHref}
                target="_blank"
                shape="rect"
                tone="ghost"
                className="w-[200px] h-12 gap-3"
                ariaLabel={`View ${heading} on GitHub`}
              >
                <span className="flex flex-col leading-none text-right">
                  <span className="text-[9px] tracking-wide">View code on</span>
                  <span className="text-[18px] font-semibold -mt-px tracking-tight">GitHub</span>
                </span>
                <svg className="w-7 h-7 text-ink flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </GlassButton>
            )}
            {webHref && (
              <GlassButton
                to={webHref}
                shape="rect"
                tone="ghost"
                className="w-[200px] h-12"
                ariaLabel="View your portfolio on Opalite Web"
              >
                <span className="flex flex-col leading-none text-center">
                  <span className="text-[9px] tracking-wide text-muted">View your portfolio</span>
                  <span className="text-[18px] font-semibold -mt-px tracking-tight">Log In</span>
                </span>
              </GlassButton>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
