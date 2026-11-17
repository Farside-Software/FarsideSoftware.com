import { type CSSProperties, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { hexToRgbTriple } from '../utils/liquidGlass';
import { readableOn } from '../theme/contrast';

export type GlassButtonTone = 'solid' | 'ghost';
export type GlassButtonSize = 'sm' | 'md' | 'lg';
export type GlassButtonShape = 'pill' | 'rect';

interface BaseProps {
  children: ReactNode;
  /** Hex fill for the solid tone; defaults to Signal. */
  accentColor?: string;
  /** `solid` fills with the accent; `ghost` is an outline. */
  tone?: GlassButtonTone;
  /** Omit for full geometry control via className (e.g. App Store badge). */
  size?: GlassButtonSize;
  /** `pill` (default) is fully rounded; `rect` is an 8px rounded rectangle. */
  shape?: GlassButtonShape;
  className?: string;
  /** Override text color. Solid buttons pick a readable one; ghost uses ink. */
  textColor?: string;
  ariaLabel?: string;
}

type AsLink = BaseProps & {
  to: string;
  href?: never;
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
};
type AsAnchor = BaseProps & {
  href: string;
  to?: never;
  target?: string;
  rel?: string;
  download?: boolean | string;
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
};
type AsButton = BaseProps & {
  onClick?: (event: ReactMouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  to?: never;
  href?: never;
};

type GlassButtonProps = AsLink | AsAnchor | AsButton;

const sizeClass: Record<GlassButtonSize, string> = {
  sm: 'liquid-glass-button-sm',
  md: 'liquid-glass-button-md',
  lg: 'liquid-glass-button-lg',
};

/**
 * Flat button. Renders a react-router <Link> when `to` is provided, an
 * <a> when `href` is provided, or a <button> otherwise.
 *
 * Solid buttons are filled with the accent (Signal when none is given)
 * and pick Night or Regolith text, whichever reads better on that fill.
 * Ghost buttons are an outline. Keep to one solid button per view.
 *
 * Geometry: pass `size` for a standard padded pill, or omit `size`
 * (and pass `shape="rect"` + width/height classes) for composite
 * badges like the App Store / GitHub badges.
 */
export default function GlassButton(props: GlassButtonProps) {
  const {
    children,
    accentColor,
    tone = 'solid',
    size,
    shape = 'pill',
    className = '',
    textColor,
    ariaLabel,
  } = props;

  const accentRgb = accentColor ? hexToRgbTriple(accentColor) : null;
  const style: CSSProperties = {};
  if (accentRgb) (style as Record<string, string>)['--lg-accent'] = accentRgb;
  if (textColor) style.color = textColor;
  else if (tone === 'solid') style.color = readableOn(accentColor ?? '#FF7A3D');

  const classes = [
    'liquid-glass',
    'liquid-glass-pill',
    'liquid-glass-button',
    shape === 'rect' ? 'is-rect' : 'is-pill',
    size ? sizeClass[size] : '',
    'liquid-glass-interactive',
    tone === 'ghost' ? 'is-ghost' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const shared = {
    className: classes,
    style,
    'aria-label': ariaLabel,
  };

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} onClick={(props as AsLink).onClick} {...shared}>
        {children}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    const { href, target, rel, download, onClick } = props as AsAnchor;
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        download={download}
        onClick={onClick}
        {...shared}
      >
        {children}
      </a>
    );
  }

  const { onClick, type = 'button', disabled } = props as AsButton;
  return (
    <button type={type} onClick={onClick} disabled={disabled} {...shared}>
      {children}
    </button>
  );
}
