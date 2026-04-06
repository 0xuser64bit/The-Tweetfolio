import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineHome, HiOutlineBriefcase, HiOutlineBell, HiOutlineMail } from "react-icons/hi";
import { CONTACT_EMAIL } from "../../config";

const BottomNav = () => {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const items = [
    {
      icon: <HiOutlineHome className="text-2xl" />,
      label: "Home",
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    {
      icon: <HiOutlineBriefcase className="text-2xl" />,
      label: "Projects",
      action: () => navigate("/proof-of-work"),
    },
    {
      icon: <HiOutlineBell className="text-2xl" />,
      label: "Skills",
      action: () => scrollTo("section-skills"),
    },
    {
      icon: <HiOutlineMail className="text-2xl" />,
      label: "Contact",
      action: () => { window.location.href = `mailto:${CONTACT_EMAIL}`; },
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-x-primary/95 backdrop-blur-md border-t border-x-border">
      <div className="flex justify-around items-center py-2 pb-safe">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="flex flex-col items-center gap-0.5 px-4 py-1.5 text-x-text-primary hover:text-x-accent transition-colors"
            aria-label={item.label}
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
