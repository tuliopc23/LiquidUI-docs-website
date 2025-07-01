import React from "react";
import { cn } from "./utils/classNames";

interface NavLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface GlassNavbarProps {
  brand: React.ReactNode;
  links: NavLink[];
  actions?: React.ReactNode;
  position?: "fixed" | "sticky" | "relative";
  transparent?: boolean;
  className?: string;
}

const GlassNavbar: React.FC<GlassNavbarProps> = ({
  brand,
  links,
  actions,
  position = "fixed",
  transparent = false,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "glass-effect backdrop-blur-xl border border-white/20",
        "w-full z-40",
        position === "fixed" && "fixed top-0 left-0",
        position === "sticky" && "sticky top-0 left-0",
        position === "relative" && "relative",
        transparent ? "bg-transparent" : "bg-white/10 dark:bg-black/20",
        "flex items-center justify-between",
        "px-4 md:px-6",
        "py-2 md:py-3",
        className
      )}
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingLeft: "max(env(safe-area-inset-left), 1rem)",
        paddingRight: "max(env(safe-area-inset-right), 1rem)",
      }}
    >
      <div className="flex items-center gap-4">
        {brand}
      </div>
      <div className="hidden md:flex items-center gap-4">
        {links.map((link) => (
          <a key={link.label} href={link.href} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200">
            {link.icon}
            <span>{link.label}</span>
          </a>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {actions}
      </div>
    </div>
  );
};

export { GlassNavbar };
