import React from "react";
import { motion } from "framer-motion";
import { Sparkles, MessageCircle } from "lucide-react";
import { LiquidifyLogo } from "./components/LiquidifyLogo";
import { StorybookLogo } from "./components/StorybookLogo";
import { VersionSelector } from "./components/VersionSelector";

const Logo = () => (
  <motion.div
    className="flex items-center gap-3"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    role="img"
    aria-label="LiqUIdify logo"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <LiquidifyLogo size={32} className="shadow-lg" />
    </motion.div>
    <span className="text-xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-600 bg-clip-text text-transparent tracking-tight">
      LiqUIdify
    </span>
  </motion.div>
);

const config = {
  // Nextra 4.3-style UX enhancements

  // Enhanced search configuration (FlexSearch equivalent)
  search: {
    placeholder: "Search LiqUIdify docs...",
    loading: "Loading...",
    emptyResult: "No results found.",
    error: "Failed to load search index."
  },
  logo: <Logo />,
  project: {
    link: "https://github.com/tuliopc23/Liquidify",
  },
  navbar: {
    extraContent: (
      <div className="flex items-center gap-3">
        <VersionSelector
          currentVersion="1.0.22"
          className="hidden sm:block"
        />
        <a
          href="https://liquidify.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <StorybookLogo size={16} className="w-4 h-4" />
          Storybook
        </a>
      </div>
    ),
  },
  docsRepositoryBase:
    "https://github.com/tuliopc23/Liquidify-docs/tree/main",
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <div className="flex items-center gap-2 mb-4">
          <LiquidifyLogo size={24} />
          <span className="text-lg font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-600 bg-clip-text text-transparent hero-text">
            LiqUIdify
          </span>
        </div>
        <div>
          <a
            className="flex items-center gap-2 text-current hover:text-blue-600 transition-colors body-text"
            target="_blank"
            rel="noopener noreferrer"
            title="LiqUIdify Documentation"
            href="https://liquidify-docs.vercel.app"
          >
            <Sparkles className="w-4 h-4" />
            Built with LiqUIdify
          </a>
        </div>
      </div>
    ),
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s | LiqUIdify Documentation",
      description:
        "The future of UI design with glassmorphism components that flow like liquid glass. Build beautiful, responsive interfaces with Apple-inspired aesthetics.",
    };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="LiqUIdify" />
      <meta
        property="og:description"
        content="The future of UI design with glassmorphism components that flow like liquid glass"
      />
      <meta property="og:url" content="https://liquidify-docs.vercel.app" />
      <meta
        name="description"
        content="LiqUIdify - The future of UI design with glassmorphism components that flow like liquid glass. Build beautiful, responsive interfaces with Apple-inspired aesthetics."
      />
      <meta
        name="keywords"
        content="React, Components, UI, Glassmorphism, TypeScript, Design System, Liquid Glass, Apple Design, Neubrutalism"
      />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="icon" href="/favicon.png" type="image/png" />
      <link rel="icon" href="/favicon.ico" />
      
      {/* Preload critical fonts for better performance */}
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap"
        as="style"
        onLoad={(e) => {
          const target = e.target as HTMLLinkElement;
          target.onload = null;
          target.rel = 'stylesheet';
        }}
      />
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        as="style"
        onLoad={(e) => {
          const target = e.target as HTMLLinkElement;
          target.onload = null;
          target.rel = 'stylesheet';
        }}
      />
    </>
  ),
  sidebar: {
    titleComponent({ title, type }: { title: string; type: string }) {
      if (type === "separator") {
        return (
          <div className="liquid-glass px-4 py-2 rounded-2xl my-3 border border-white/20">
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider body-text flex items-center gap-2">
              <LiquidifyLogo size={12} />
              {title}
            </span>
          </div>
        );
      }
      return (
        <motion.span
          whileHover={{ x: 3, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex items-center gap-2 body-text hover:text-blue-600 transition-colors"
        >
          {title}
        </motion.span>
      );
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
    title: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="liquid-glass px-4 py-3 rounded-2xl border border-white/20"
      >
        <span className="text-sm font-semibold body-text flex items-center gap-2">
          <LiquidifyLogo size={16} />
          On This Page
        </span>
      </motion.div>
    ),
  },
  editLink: {
    text: (
      <motion.span
        whileHover={{ x: 3, scale: 1.02 }}
        className="flex items-center gap-2 text-sm body-text hover:text-blue-600 transition-colors"
      >
        <LiquidifyLogo size={12} />
        Edit this page on GitHub →
      </motion.span>
    ),
  },
  feedback: {
    content: (
      <motion.span
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-2 text-sm body-text hover:text-blue-600 transition-colors"
      >
        <LiquidifyLogo size={12} />
        Question? Give us feedback →
      </motion.span>
    ),
    labels: "feedback",
  },
  banner: {
    key: "liquidif-ui-v2",
    text: (
      <a
        href="/getting-started"
        className="liquid-glass px-6 py-3 rounded-2xl border border-white/20 transition-all duration-200 body-text flex items-center gap-3 hover:shadow-lg hover:border-white/30 enhanced-button"
        style={{
          textDecoration: 'none',
          color: 'inherit',
          willChange: 'transform, box-shadow',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      >
        <LiquidifyLogo size={20} />
        🚀 LiqUIdify v1.0.22 is now live with physics system and new components!
        →
      </a>
    ),
  },
  primaryHue: {
    dark: 217,
    light: 217,
  },
  primarySaturation: {
    dark: 91,
    light: 91,
  },
  darkMode: true,
  nextThemes: {
    defaultTheme: 'system',
    storageKey: 'liquIdify-theme',
  },
};

export default config;
