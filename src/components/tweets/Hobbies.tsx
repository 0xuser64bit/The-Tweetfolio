import React from "react";
import { HobbiesData } from "../../config";

const hobbyMeta: Record<string, { emoji: string; vibe: string }> = {
  Anime: { emoji: "🎌", vibe: "One Piece > everything" },
  Cricket: { emoji: "🏏", vibe: "Weekend warrior" },
  Books: { emoji: "📚", vibe: "Currently reading something" },
  Music: { emoji: "🎧", vibe: "Lo-fi and Garba in code sessions" },
};

const Hobbies = () => {
  return (
    <div>
      <h2 className="text-[20px] font-extrabold text-x-text-primary mb-2">
        ⚡ When I&apos;m not coding
      </h2>
      <ul className="flex flex-col gap-1.5">
        {HobbiesData?.map((hobby) => {
          const meta = hobbyMeta[hobby] || { emoji: "⭐", vibe: "" };
          return (
            <li key={hobby} className="text-[15px] leading-5">
              <span className="text-x-accent font-medium">
                {meta.emoji} #{hobby.toLowerCase()}
              </span>
              {meta.vibe && (
                <span className="text-x-text-secondary"> — {meta.vibe}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Hobbies;
