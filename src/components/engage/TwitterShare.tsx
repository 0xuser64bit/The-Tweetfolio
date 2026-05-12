import React, { useState } from "react";

const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleShare}
        aria-label={copied ? "Link copied" : "Copy link to this tweet"}
        className="group/share p-2 -m-2 rounded-full hover:bg-x-accent/10 transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-[18px] h-[18px] fill-x-text-secondary group-hover/share:fill-x-accent transition-colors"
          aria-hidden="true"
        >
          <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z" />
        </svg>
      </button>
      {copied && (
        <div
          role="status"
          className="absolute -top-9 left-1/2 -translate-x-1/2 bg-x-text-primary text-x-primary text-[12px] font-medium px-2 py-1 rounded whitespace-nowrap"
        >
          Link copied
        </div>
      )}
    </div>
  );
};

export default ShareButton;
