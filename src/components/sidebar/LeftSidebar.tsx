import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineHome, HiHome } from "react-icons/hi";
import { HiOutlineUser, HiUser, HiOutlineBriefcase, HiBriefcase } from "react-icons/hi";
import { HiOutlineBell, HiBell } from "react-icons/hi";
import { HiOutlineMail, HiMail } from "react-icons/hi";
import { CONTACT_EMAIL } from "../../config";
import { openGmailCompose } from "../../utils/openGmail";

interface NavItem {
  label: string;
  iconOutline: React.ReactNode;
  iconFilled: React.ReactNode;
  action: () => void;
  isActive?: boolean;
}

const LeftSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const scrollTo = (id: string) => {
    if (!isHome) {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems: NavItem[] = [
    {
      label: "Home",
      iconOutline: <HiOutlineHome className="text-[26px]" />,
      iconFilled: <HiHome className="text-[26px]" />,
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      isActive: true,
    },
    {
      label: "Profile",
      iconOutline: <HiOutlineUser className="text-[26px]" />,
      iconFilled: <HiUser className="text-[26px]" />,
      action: () => scrollTo("section-pinned"),
    },
    {
      label: "Projects",
      iconOutline: <HiOutlineBriefcase className="text-[26px]" />,
      iconFilled: <HiBriefcase className="text-[26px]" />,
      action: () => navigate("/proof-of-work"),
    },
    {
      label: "Achievements",
      iconOutline: <HiOutlineBell className="text-[26px]" />,
      iconFilled: <HiBell className="text-[26px]" />,
      action: () => scrollTo("section-achievements"),
    },
    {
      label: "Contact",
      iconOutline: <HiOutlineMail className="text-[26px]" />,
      iconFilled: <HiMail className="text-[26px]" />,
      action: () => openGmailCompose(CONTACT_EMAIL),
    },
  ];

  return (
    <div className="sticky top-0 pt-3 flex flex-col h-screen">
      {/* X Logo */}
      <div className="mb-1 p-3">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-x-text-primary">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="flex items-center gap-5 px-3 py-3 rounded-full hover:bg-x-tertiary transition-colors text-x-text-primary group w-fit"
          >
            <span>{item.isActive ? item.iconFilled : item.iconOutline}</span>
            <span className={`text-xl ${item.isActive ? 'font-bold' : 'font-normal'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Post / CTA Button */}
      <button
        onClick={() => openGmailCompose(CONTACT_EMAIL)}
        className="mt-4 bg-x-accent text-white rounded-full py-3 px-5 font-bold text-[17px] text-center hover:bg-x-accent/90 transition-colors block w-full cursor-pointer"
      >
        Hire Me
      </button>
    </div>
  );
};

export default LeftSidebar;
