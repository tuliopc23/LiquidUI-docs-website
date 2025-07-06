import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

interface DocSearchItem {
  url: string;
  [key: string]: unknown;
}

interface DocSearchConfig {
  apiKey: string;
  indexName: string;
  appId: string;
  container: string;
  transformItems: (items: DocSearchItem[]) => DocSearchItem[];
  navigator: {
    navigate: (params: { itemUrl: string }) => void;
  };
}

declare global {
  interface Window {
    docsearch: (config: DocSearchConfig) => void;
  }
}

export const Search: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    if (window.docsearch) {
      window.docsearch({
        apiKey: 'placeholder_api_key', // Replace with your Algolia API key
        indexName: 'liquidify',
        appId: 'placeholder_app_id', // Replace with your Algolia App ID
        container: '#docsearch',
        transformItems: (items: DocSearchItem[]) => {
          return items.map((item) => {
            // Transform the URL to match your site structure
            const url = new URL(item.url)
            return {
              ...item,
              url: url.pathname + url.hash,
            }
          })
        },
        navigator: {
          navigate({ itemUrl }: { itemUrl: string }) {
            router.push(itemUrl)
          },
        },
      })
    }
  }, [router])

  return (
    <div className="search-container">
      <div id="docsearch" className="docsearch-container" />
    </div>
  )
}

export default Search