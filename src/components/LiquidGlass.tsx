import { useRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { hexToRgbTriple } from '../utils/liquidGlass';

export type LiquidGlassVariant = 'default' | 'pill' | 'card' | 'lens';

interface LiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  variant?: LiquidGlassVariant;
  interactive?: boolean;
  children?: ReactNode;
  /** Hex or rgb accent that tints the glass body. Maps to --lg-accent. */
  accentColor?: string;
  /** Legacy: accepted for compatibility, ignored by the flat surface. */
  lightAngle?: number;
}

const variantClass: Record<LiquidGlassVariant, string> = {
  default: '',
  pill: 'liquid-glass-pill',
  card: 'liquid-glass-card',
  lens: 'liquid-glass-lens',
};

/**
 * A flat panel surface (the name is legacy). `accentColor` sets
 * --lg-accent for children that read it.
 */
export default function LiquidGlass({
  variant = 'default',
  interactive = false,
  className = '',
  accentColor,
  style,
  children,
  ...rest
}: LiquidGlassProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mergedStyle: CSSProperties = { ...style };
  if (accentColor) {
    const rgb = hexToRgbTriple(accentColor);
    if (rgb) (mergedStyle as Record<string, string>)['--lg-accent'] = rgb;
  }

  return (
    <div
      ref={ref}
      style={mergedStyle}
      className={`liquid-glass ${variantClass[variant]} ${interactive ? 'liquid-glass-interactive' : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}
