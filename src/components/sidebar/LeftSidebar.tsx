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

interface NavItem {
  label: string;
  sectionId: string;
  iconOutline: React.ReactNode;
  iconFilled: React.ReactNode;
  onClick: () => void;
}

const SECTION_IDS = [
  "section-pinned",
  "section-projects",
  "section-contributions",
  "section-experience",
  "section-skills",
];

const LeftSidebar = () => {
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

  const navItems: NavItem[] = [
    {
      label: "Home",
      sectionId: "section-pinned",
      iconOutline: <HiOutlineHome className="text-[26px]" />,
      iconFilled: <HiHome className="text-[26px]" />,
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    {
      label: "Projects",
      sectionId: "section-projects",
      iconOutline: <HiOutlineBriefcase className="text-[26px]" />,
      iconFilled: <HiBriefcase className="text-[26px]" />,
      onClick: () => navigate("/proof-of-work"),
    },
    {
      label: "Open Source",
      sectionId: "section-contributions",
      iconOutline: <HiOutlineCode className="text-[26px]" />,
      iconFilled: <HiCode className="text-[26px]" />,
      onClick: () => scrollTo("section-contributions"),
    },
    {
      label: "Experience",
      sectionId: "section-experience",
      iconOutline: <HiOutlineLightningBolt className="text-[26px]" />,
      iconFilled: <HiLightningBolt className="text-[26px]" />,
      onClick: () => scrollTo("section-experience"),
    },
    {
      label: "Skills",
      sectionId: "section-skills",
      iconOutline: <HiOutlineAcademicCap className="text-[26px]" />,
      iconFilled: <HiAcademicCap className="text-[26px]" />,
      onClick: () => scrollTo("section-skills"),
    },
  ];

  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 h-screen pt-2 flex flex-col"
    >
      {/* X logo */}
      <div className="p-3">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-x-text-primary" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      <ul className="flex flex-col gap-1 mt-1">
        {navItems.map((item) => {
          const isActive = isHome && active === item.sectionId;
          return (
            <li key={item.label}>
              <button
                onClick={item.onClick}
                aria-current={isActive ? "page" : undefined}
                className="flex items-center gap-5 px-3 py-3 rounded-full hover:bg-x-hover transition-colors text-x-text-primary"
              >
                {/* Fixed-size icon container prevents shift when swapping outline ↔ filled */}
                <span aria-hidden="true" className="w-[26px] h-[26px] flex items-center justify-center shrink-0">
                  {isActive ? item.iconFilled : item.iconOutline}
                </span>
                {/* Invisible bold text reserves the wider bold width permanently,
                    so toggling font-weight never changes the button's size */}
                <span className="hidden xl:inline relative text-xl">
                  <span className="invisible font-bold" aria-hidden="true">
                    {item.label}
                  </span>
                  <span
                    className={`absolute inset-0 ${
                      isActive ? "font-bold" : "font-normal"
                    }`}
                  >
                    {item.label}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default LeftSidebar;
