import React from "react";
import { Link, useRouteError } from "react-router-dom";

const XMark = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-10 h-10 mx-auto mb-4 fill-x-text-primary"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface Props {
  /** HTTP status this view represents. Defaults to 404. */
  status?: number;
}

/**
 * Presentational error view. Also rendered into the static `404.html` shipped
 * in the build output, so it must not depend on router state.
 */
export const ErrorView: React.FC<Props> = ({ status = 404 }) => {
  const message =
    status === 404
      ? "Hmm…this page doesn't exist."
      : "Something went wrong on our end.";

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-x-primary">
      <div className="w-full max-w-105 text-center">
        <XMark />
        <h1 className="text-[20px] font-extrabold text-x-text-primary mb-1">
          {message}
        </h1>
        <p className="text-[15px] text-x-text-secondary mb-5">
          Try heading back to the feed.
        </p>
        <Link
          to="/"
          className="inline-block bg-x-text-primary text-x-primary rounded-full px-5 py-2 font-bold text-[14px] hover:opacity-90 transition-opacity"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

/**
 * Router-aware wrapper used as `errorElement`. Reads the thrown route error to
 * pick the right copy, then delegates to `ErrorView`.
 */
const Error: React.FC<Props> = ({ status }) => {
  const err = useRouteError() as { status?: number } | null;
  return <ErrorView status={status ?? err?.status ?? 404} />;
};

export default Error;
