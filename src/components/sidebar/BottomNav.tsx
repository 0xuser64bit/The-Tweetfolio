import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlineHome,
  HiHome,
  HiOutlineBriefcase,
  HiBriefcase,
  HiOutlineCode,
  HiCode,
  HiOutlineAcademicCap,
  HiAcademicCap,
  HiOutlineLightningBolt,
  HiLightningBolt,
} from "react-icons/hi";
import useActiveSection from "../../hooks/useActiveSection";

const SECTION_IDS = [
  "section-pinned",
  "section-projects",
  "section-contributions",
  "section-experience",
  "section-skills",
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const active = useActiveSection(isHome ? SECTION_IDS : []);

  const scrollTo = (id: string) => {
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const items = [
    {
      label: "Home",
      sectionId: "section-pinned",
      outline: <HiOutlineHome className="text-[26px]" />,
      filled: <HiHome className="text-[26px]" />,
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    {
      label: "Projects",
      sectionId: "section-projects",
      outline: <HiOutlineBriefcase className="text-[26px]" />,
      filled: <HiBriefcase className="text-[26px]" />,
      onClick: () => navigate("/proof-of-work"),
    },
    {
      label: "Open Source",
      sectionId: "section-contributions",
      outline: <HiOutlineCode className="text-[26px]" />,
      filled: <HiCode className="text-[26px]" />,
      onClick: () => scrollTo("section-contributions"),
    },
    {
      label: "Experience",
      sectionId: "section-experience",
      outline: <HiOutlineLightningBolt className="text-[26px]" />,
      filled: <HiLightningBolt className="text-[26px]" />,
      onClick: () => scrollTo("section-experience"),
    },
    {
      label: "Skills",
      sectionId: "section-skills",
      outline: <HiOutlineAcademicCap className="text-[26px]" />,
      filled: <HiAcademicCap className="text-[26px]" />,
      onClick: () => scrollTo("section-skills"),
    },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-x-primary/90 backdrop-blur-md border-t border-x-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <ul className="flex items-center py-1">
        {items.map((item) => {
          const isActive = isHome && active === item.sectionId;
          return (
            <li key={item.label} className="flex-1">
              <button
                type="button"
                onClick={item.onClick}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
                className="w-full flex items-center justify-center py-2 text-x-text-primary"
              >
                <span aria-hidden="true" className={isActive ? "text-x-text-primary" : "text-x-text-secondary"}>
                  {isActive ? item.filled : item.outline}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNav;
