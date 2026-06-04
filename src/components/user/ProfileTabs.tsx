import React from "react";
import useActiveSection from "../../hooks/useActiveSection";

const tabs = [
  { label: "Posts", sectionId: "section-pinned" },
  { label: "Projects", sectionId: "section-projects" },
  { label: "Experience", sectionId: "section-experience" },
  { label: "Open Source", sectionId: "section-contributions" },
];

const TAB_SECTION_IDS = tabs.map((t) => t.sectionId);

const ProfileTabs = () => {
  const active = useActiveSection(TAB_SECTION_IDS);

  const handleTabClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="flex border-b border-x-border"
      role="navigation"
      aria-label="Profile sections"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.sectionId;
        return (
          <button
            key={tab.label}
            type="button"
            onClick={() => handleTabClick(tab.sectionId)}
            aria-current={isActive ? "true" : undefined}
            className="flex-1 hover:bg-x-hover transition-colors px-2 py-3.5"
          >
            <span className="relative inline-block">
              <span
                className={`block text-[14px] whitespace-nowrap ${
                  isActive
                    ? "font-bold text-x-text-primary"
                    : "font-medium text-x-text-secondary"
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-3.5 left-0 right-0 h-1 rounded-full bg-x-accent"
                />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ProfileTabs;
