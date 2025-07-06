import React from 'react'
import { useRouter } from 'next/router'
import { Menu } from '@headlessui/react'
import { GlobeIcon, ChevronDownIcon } from '@heroicons/react/solid'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'ja', name: '日本語' },
]

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter()
  const { locale, pathname, query, asPath } = router
  
  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]
  
  const changeLanguage = (code: string) => {
    router.push({ pathname, query }, asPath, { locale: code })
  }

  return (
    <div className="language-switcher relative">
      <Menu>
        <Menu.Button className="flex items-center px-3 py-1 text-sm rounded-md glass-button">
          <GlobeIcon className="w-4 h-4 mr-1" />
          {currentLanguage.name}
          <ChevronDownIcon className="w-4 h-4 ml-1" />
        </Menu.Button>
        <Menu.Items className="absolute z-10 mt-1 w-40 origin-top-right glass-card rounded-md shadow-lg">
          <div className="py-1">
            {languages.map((language) => (
              <Menu.Item key={language.code}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-white/10' : ''
                    } block w-full text-left px-4 py-2 text-sm`}
                    onClick={() => changeLanguage(language.code)}
                  >
                    {language.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  )
}

export default LanguageSwitcher