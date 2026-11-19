interface ComingSoonBadgeProps {
  /** Where it will launch, e.g. "Mac App Store". */
  store?: string;
  className?: string;
}

/**
 * The stand-in for the App Store badge while an app is not out yet. Same
 * footprint as `AppStoreBadge`, but it is not a link: a hairline outline
 * with a dashed edge and an amber dot. Nothing here is clickable.
 */
export default function ComingSoonBadge({ store = 'Mac App Store', className = '' }: ComingSoonBadgeProps) {
  return (
    <p
      className={`m-0 inline-flex h-12 w-[220px] items-center gap-3 rounded-lg border border-dashed border-line/30 px-4 text-ink ${className}`}
    >
      <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#E8892F]" />
      <span className="flex flex-col text-left leading-none">
        <span className="text-[9px] tracking-wide text-muted">Coming soon to the</span>
        <span className="-mt-px whitespace-nowrap text-[16px] font-semibold tracking-tight">{store}</span>
      </span>
    </p>
  );
}
