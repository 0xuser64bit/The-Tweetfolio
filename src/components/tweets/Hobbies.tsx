import React from "react";
import { HobbiesData } from "../../config";

const hobbyMeta: Record<string, { emoji: string; vibe: string }> = {
  Anime: { emoji: "🎌", vibe: "One Piece > everything" },
  Cricket: { emoji: "🏏", vibe: "Weekend warrior" },
  Books: { emoji: "📚", vibe: "Currently reading something" },
  Music: { emoji: "🎧", vibe: "Lo-fi & code sessions" },
};

const Hobbies = () => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">⚡ When I'm not coding</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {HobbiesData?.map((hobby) => {
          const meta = hobbyMeta[hobby] || { emoji: "⭐", vibe: "" };
          return (
            <div
              key={hobby}
              className="bg-x-secondary rounded-2xl p-4 hover:bg-x-tertiary transition-colors group"
            >
              <div className="text-3xl mb-2">{meta.emoji}</div>
              <p className="font-bold text-[15px] text-x-text-primary">{hobby}</p>
              {meta.vibe && (
                <p className="text-[13px] text-x-text-secondary mt-0.5">{meta.vibe}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hobbies;
