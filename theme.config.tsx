import React from 'react'
import dynamic from 'next/dynamic'
// Tree-shaken lucide-react imports (destructured for better tree-shaking)
import { Sparkles, MessageCircle } from 'lucide-react';

// Dynamic imports for framer-motion
const MotionDiv = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.div })),
  { ssr: false }
);

const MotionSpan = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.span })),
  { ssr: false }
);

const MotionA = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.a })),
  { ssr: false }
);

const Logo = () => (
  <MotionDiv
    className="flex items-center gap-3"
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <div className="relative">
      <MotionDiv
        className="w-8 h-8 glass-effect rounded-lg flex items-center justify-center"
        animate={{
          boxShadow: [
            "0 0 20px rgba(99, 102, 241, 0.3)",
            "0 0 30px rgba(168, 85, 247, 0.4)",
            "0 0 20px rgba(99, 102, 241, 0.3)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Sparkles className="w-4 h-4 text-primary" />
      </MotionDiv>
    </div>
    <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
      LiquidiUI
    </span>
  </MotionDiv>
)

const config = {
  logo: (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">L</span>
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        LiquidUI
      </span>
    </div>
  ),
  project: {
    link: 'https://github.com/tuliopc23/LiquidUI-docs-website'
  },
  chat: {
    link: 'https://discord.gg/liquidi-ui',
    icon: <MessageCircle className="w-5 h-5" />
  },
  docsRepositoryBase: 'https://github.com/tuliopc23/LiquidUI-docs-website/tree/main',
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <div>
          <a
            className="flex items-center gap-1 text-current"
            target="_blank"
            rel="noopener noreferrer"
            title="LiquidUI Documentation"
            href="https://docs-one-taupe.vercel.app"
          >
            Built with LiquidUI
          </a>
        </div>
      </div>
    )
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s | LiquidiUI Documentation',
      description: 'Physics-based glassmorphism component library for React with 30+ components, content-aware adaptation, and magnetic interactions.',
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="LiquidUI" />
      <meta property="og:description" content="React component library with glassmorphism design" />
      <meta property="og:url" content="https://docs-one-taupe.vercel.app" />
      <meta name="description" content="LiquidUI - React component library with glassmorphism design and physics-based interactions" />
      <meta name="keywords" content="React, Components, UI, Glassmorphism, TypeScript, Design System" />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
  sidebar: {
    titleComponent({ title, type }: { title: string; type: string }) {
      if (type === 'separator') {
        return (
          <div className="glass-effect px-3 py-1 rounded-md my-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {title}
            </span>
          </div>
        )
      }
      return (
        <MotionSpan
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex items-center gap-2"
        >
          {title}
        </MotionSpan>
      )
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
    title: (
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-effect px-3 py-2 rounded-lg"
      >
        <span className="text-sm font-semibold">On This Page</span>
      </MotionDiv>
    )
  },
  editLink: {
    text: (
      <MotionSpan
        whileHover={{ x: 2 }}
        className="flex items-center gap-1 text-sm"
      >
        Edit this page on GitHub →
      </MotionSpan>
    )
  },
  feedback: {
    content: (
      <MotionSpan
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-1 text-sm"
      >
        Question? Give us feedback →
      </MotionSpan>
    ),
    labels: 'feedback'
  },
  search: {
    placeholder: 'Search LiquidiUI docs...',
  },
  banner: {
    key: 'liquidi-ui-v1',
    text: (
      <MotionA
        href="/getting-started"
        className="glass-effect px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        🎉 LiquidiUI v1.0 is released with physics-based interactions. Get started →
      </MotionA>
    )
  },
  primaryHue: {
    dark: 217,
    light: 217
  },
  primarySaturation: {
    dark: 91,
    light: 91
  }
}

export default config
