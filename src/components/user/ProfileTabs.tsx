import React, { useState } from "react";

const tabs = [
  { label: "Posts", sectionId: "section-pinned" },
  { label: "Projects", sectionId: "section-projects" },
  { label: "Experience", sectionId: "section-experience" },
  { label: "Open Source", sectionId: "section-contributions" },
];

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("Posts");

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.label);
    const element = document.getElementById(tab.sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex border-b border-x-border overflow-x-auto no-scrollbar snap-x" role="tablist" aria-label="Profile sections">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          role="tab"
          aria-selected={activeTab === tab.label}
          aria-controls={tab.sectionId}
          onClick={() => handleTabClick(tab)}
          className="flex-1 min-w-[fit-content] px-4 sm:px-2 relative py-4 text-center hover:bg-x-tertiary transition-colors snap-start"
        >
          <span
            className={`text-[13px] sm:text-[15px] whitespace-nowrap block ${
              activeTab === tab.label
                ? "font-bold text-x-text-primary"
                : "font-medium text-x-text-secondary"
            }`}
          >
            {tab.label}
          </span>
          {activeTab === tab.label && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 rounded-full bg-x-accent" />
          )}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;
