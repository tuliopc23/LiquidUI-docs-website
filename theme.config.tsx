import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Glass UI</span>,
  project: {
    link: 'https://github.com/tulio-pinheiro-cunha/glass-ui',
  },
  chat: {
    link: 'https://discord.gg/glass-ui',
  },
  docsRepositoryBase: 'https://github.com/tulio-pinheiro-cunha/glass-ui-docs',
  footer: {
    text: 'Glass UI Documentation © 2024',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Glass UI'
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Glass UI" />
      <meta property="og:description" content="Modern, accessible React component library with glassmorphism design" />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
  sidebar: {
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <span className="cursor-default">{title}</span>
      }
      return <>{title}</>
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  editLink: {
    text: 'Edit this page on GitHub →'
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback'
  },
  search: {
    placeholder: 'Search documentation...'
  },
  banner: {
    key: 'glass-ui-v1',
    text: (
      <a href="/getting-started">
        🎉 Glass UI v1.0 is released. Read more →
      </a>
    )
  }
}

export default config
