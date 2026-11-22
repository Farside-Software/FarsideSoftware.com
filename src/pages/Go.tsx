import { useEffect, useMemo } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { findApp } from '../data/apps';
import { appStoreLink } from '../utils/appStore';
import { usePageMeta } from '../hooks';
import NotFound from './NotFound';
import AppIcon from '../components/AppIcon';

/**
 * Short tracked links for social posts and printed material:
 *
 *   farsidesoftware.com/go/maestro?ct=x            -> App Store with ct=x
 *   farsidesoftware.com/go/opalite?ct=x&platform=mac -> Mac App Store
 *
 * `ct` defaults to `go` so an untagged link still shows up in App Analytics.
 */
export default function Go() {
  const { app: slug = '' } = useParams();
  const [params] = useSearchParams();
  const app = findApp(slug.toLowerCase());

  const target = useMemo(() => {
    if (!app?.appStoreUrl && !app?.macAppStoreUrl) return null;
    const channel = (params.get('ct') ?? 'go').replace(/[^a-z0-9_-]/gi, '').slice(0, 40) || 'go';
    // A Mac-only app has no App Store URL, so it always goes to the Mac listing.
    const wantsMac = (params.get('platform') === 'mac' || !app.appStoreUrl) && app.macAppStoreUrl;
    return appStoreLink(wantsMac ? app.macAppStoreUrl! : app.appStoreUrl!, channel);
  }, [app, params]);

  usePageMeta({
    title: app ? `Get ${app.name} on the App Store` : 'Not found',
    description: app?.job ?? '',
    noindex: true,
  });

  useEffect(() => {
    if (target) window.location.replace(target);
  }, [target]);

  // An app that is not out yet has no store page: send the link to its own page.
  if (app?.comingSoon) return <Navigate to={app.path} replace />;
  if (!app || !target) return <NotFound />;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center pt-20">
      <AppIcon src={app.icon} darkSrc={app.iconDark} size={96} className="mb-6 h-24 w-24 rounded-[1.5rem]" />
      <h1 className="text-2xl font-semibold text-ink">Opening {app.name} on the App Store…</h1>
      <p className="mt-3 text-muted">
        Not redirected?{' '}
        <a href={target} className="text-link underline underline-offset-4">
          Continue to the App Store
        </a>
      </p>
    </div>
  );
}
