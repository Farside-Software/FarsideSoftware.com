import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import FarsideMark from '../components/FarsideMark';

export default function NotFound() {
  return (
    <div className="bg-page pt-36 pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-8xl font-extrabold leading-none tracking-[-0.04em] tabular-nums text-link">404</p>
          <h1 className="mt-6 text-[2.75rem] font-extrabold leading-[1] tracking-[-0.04em] text-ink sm:text-6xl">
            Page Not Found
          </h1>
          <p className="mt-6 max-w-md text-xl leading-relaxed text-muted">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-signal px-6 py-3 text-sm font-semibold text-night transition hover:bg-signal/90"
            >
              <Home size={18} />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line/20 px-6 py-3 text-sm font-medium text-muted transition hover:bg-line/10"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>
        <div className="hidden lg:col-span-5 lg:block">
          <FarsideMark className="w-full max-w-[380px]" />
        </div>
      </div>
    </div>
  );
}
