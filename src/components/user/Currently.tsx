import React from "react";
import { ProjectsData } from "../../config";

/**
 * "Currently" — a live status line that makes the profile feel like a person,
 * not a business card. Shows what's being built right now, with a pulsing
 * gold dot that says "this is happening live."
 */
const Currently = () => {
  const latest = ProjectsData?.[0];

  return (
    <div className="flex items-start gap-2.5 mt-3 rounded-xl border border-x-border bg-x-secondary/50 px-3.5 py-3">
      <span className="relative flex h-2.5 w-2.5 mt-1 shrink-0">
        <span className="absolute inline-flex h-full w-full rounded-full bg-x-retweet opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-x-retweet" />
      </span>
      <div className="min-w-0">
        <p className="meta-mono text-x-text-secondary uppercase tracking-wider">
          currently
        </p>
        <p className="text-[15px] text-x-text-primary leading-snug mt-0.5">
          {latest ? (
            <>
              Shipping{" "}
              <span className="font-semibold text-x-text-primary">
                {latest.projectName}
              </span>{" "}
              — a non-custodial USDC point of sale on Solana. Open to collabs.
            </>
          ) : (
            "Open to new projects and collaborations."
          )}
        </p>
      </div>
    </div>
  );
};

export default Currently;
