import React from "react";
import useCopyLink from "../../hooks/useCopyLink";

const ShareButton = ({
  targetId,
  variant = "icon",
}: {
  targetId?: string;
  variant?: "icon" | "menu";
}) => {
  const { status, url, copy } = useCopyLink(targetId);
  const copied = status === "copied";

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    void copy();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleShare}
        aria-label={copied ? "Link copied" : "Copy link to this tweet"}
        className={
          variant === "menu"
            ? "w-full text-left px-4 py-3 text-[15px] text-x-text-primary hover:bg-x-hover transition-colors"
            : "group/share p-2 -m-2 rounded-full hover:bg-x-accent/10 transition-colors"
        }
      >
        {variant === "menu" ? (
          copied ? (
            "Link copied"
          ) : (
            "Copy link to post"
          )
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="w-4.5 h-4.5 fill-x-text-secondary group-hover/share:fill-x-accent transition-colors"
            aria-hidden="true"
          >
            <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z" />
          </svg>
        )}
      </button>
      {copied && (
        <div
          role="status"
          className="absolute -top-9 left-1/2 -translate-x-1/2 bg-x-text-primary text-x-primary text-[12px] font-medium px-2 py-1 rounded whitespace-nowrap"
        >
          Link copied
        </div>
      )}
      {status === "error" && (
        <div
          role="status"
          className="absolute bottom-full right-0 mb-3 w-64 rounded-xl border border-x-border bg-x-primary p-3 shadow-lg z-30 text-[13px] text-x-text-primary"
        >
          Copy is unavailable. Select this link instead:
          <input
            aria-label="Post link"
            readOnly
            value={url}
            onFocus={(event) => event.currentTarget.select()}
            className="mt-2 w-full rounded border border-x-border bg-x-secondary p-2"
          />
        </div>
      )}
    </div>
  );
};

export default ShareButton;
