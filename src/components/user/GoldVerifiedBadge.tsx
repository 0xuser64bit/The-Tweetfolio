import React, { useId } from "react";

/**
 * X (Twitter) "Verified Organizations" gold checkmark badge.
 *
 * Faithful reproduction of X's official gold badge SVG:
 * a gold-gradient shield with a darker-gold (#D18800) checkmark.
 * `className` controls sizing (e.g. "w-5 h-5").
 */
const GoldVerifiedBadge: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const uid = useId();
  const outerGradient = `${uid}-gold-outer`;
  const innerGradient = `${uid}-gold-inner`;

  const badgePath =
    "M13.348 3.772L11 1.5 8.651 3.772l-3.235-.458-.565 3.219-2.886 1.531L3.4 11l-1.435 2.936 2.886 1.531.565 3.219 3.235-.458L11 20.5l2.348-2.272 3.236.458.564-3.219 2.887-1.531L18.6 11l1.435-2.936-2.887-1.531-.564-3.219-3.236.458zM6 11.39l3.74 3.74 6.2-6.77L14.47 7l-4.8 5.23-2.26-2.26L6 11.39z";
  const checkPath =
    "M6 11.39l3.74 3.74 6.197-6.767h.003V9.76l-6.2 6.77L6 12.79v-1.4zm0 0z";

  return (
    <svg
      viewBox="0 0 22 22"
      className={className}
      role="img"
      aria-label="Verified organization"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={outerGradient}
          x1="4"
          y1="1.5"
          x2="19.5"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F4E72A" />
          <stop offset="0.539" stopColor="#CD8105" />
          <stop offset="0.68" stopColor="#CB7B00" />
          <stop offset="1" stopColor="#F4EC26" />
          <stop offset="1" stopColor="#F4E72A" />
        </linearGradient>
        <linearGradient
          id={innerGradient}
          x1="5"
          y1="2.5"
          x2="17.5"
          y2="19.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F9E87F" />
          <stop offset="0.406" stopColor="#E2B719" />
          <stop offset="0.989" stopColor="#E2B719" />
        </linearGradient>
      </defs>
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        fill={`url(#${outerGradient})`}
        d={badgePath}
      />
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        fill={`url(#${innerGradient})`}
        d={badgePath}
      />
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        fill="#D18800"
        d={checkPath}
      />
    </svg>
  );
};

export default GoldVerifiedBadge;
