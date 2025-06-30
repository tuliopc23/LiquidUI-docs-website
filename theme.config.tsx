import React from "react";
import { motion } from "framer-motion";
import { Sparkles, MessageCircle } from "lucide-react";

const Logo = () => (
  <motion.div
    className="flex items-center gap-3"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    role="img"
    aria-label="LiquidUI logo"
  >
    <div className="relative">
      <motion.div
        className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        aria-hidden="true"
      >
        <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
      </motion.div>
    </div>
    <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent tracking-tight">
      LiquidUI
    </span>
  </motion.div>
);

const config = {
  // Nextra 4.3-style UX enhancements
  faviconGlyph: '💧', // Custom favicon using emoji (4.3 equivalent)
  
  // Enhanced search configuration (FlexSearch equivalent)
  search: {
    placeholder: "Search LiquidUI docs...",
    loading: "Loading...",
    emptyResult: "No results found.",
    error: "Failed to load search index."
  },
  logo: <Logo />,
  project: {
    link: "https://github.com/tuliopc23/LiquidUI-docs-website",
  },
  chat: {
    link: "https://discord.gg/liquidif-ui",
    icon: <MessageCircle className="w-5 h-5 text-blue-500" />,
  },
  navbar: {
    extraContent: (
      <a
        href="https://liquidui-storybook.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        Storybook
      </a>
    ),
  },
  docsRepositoryBase:
    "https://github.com/tuliopc23/LiquidUI-docs-website/tree/main",
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 ios-logo apple-gradient-2 animate-liquid-morph"></div>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent hero-text">
            LiquidUI
          </span>
        </div>
        <div>
          <a
            className="flex items-center gap-2 text-current hover:text-blue-600 transition-colors body-text"
            target="_blank"
            rel="noopener noreferrer"
            title="LiquidUI Documentation"
            href="https://docs-one-taupe.vercel.app"
          >
            <Sparkles className="w-4 h-4" />
            Built with LiquidUI
          </a>
        </div>
      </div>
    ),
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s | LiquidUI Documentation",
      description:
        "The future of UI design with glassmorphism components that flow like liquid glass. Build beautiful, responsive interfaces with Apple-inspired aesthetics.",
    };
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="LiquidUI" />
      <meta
        property="og:description"
        content="The future of UI design with glassmorphism components that flow like liquid glass"
      />
      <meta property="og:url" content="https://docs-one-taupe.vercel.app" />
      <meta
        name="description"
        content="LiquidUI - The future of UI design with glassmorphism components that flow like liquid glass. Build beautiful, responsive interfaces with Apple-inspired aesthetics."
      />
      <meta
        name="keywords"
        content="React, Components, UI, Glassmorphism, TypeScript, Design System, Liquid Glass, Apple Design, Neubrutalism"
      />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
  sidebar: {
    titleComponent({ title, type }: { title: string; type: string }) {
      if (type === "separator") {
        return (
          <div className="liquid-glass px-4 py-2 rounded-2xl my-3 border border-white/20">
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider body-text flex items-center gap-2">
              <div className="w-3 h-3 ios-logo apple-gradient-3"></div>
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
          <div className="w-4 h-4 ios-logo apple-gradient-4"></div>
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
        <div className="w-3 h-3 ios-logo apple-gradient-2"></div>
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
        <div className="w-3 h-3 ios-logo apple-gradient-3"></div>
        Question? Give us feedback →
      </motion.span>
    ),
    labels: "feedback",
  },
  banner: {
    key: "liquidif-ui-v2",
    text: (
      <motion.a
        href="/getting-started"
        className="liquid-glass px-6 py-3 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-300 body-text flex items-center gap-3"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-5 h-5 ios-logo apple-gradient animate-liquid-morph"></div>
        🎉 LiquidUI v0.17 is released with liquid glass components. Get started
        →
      </motion.a>
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
    storageKey: 'liquidui-theme',
  },
};

export default config;
