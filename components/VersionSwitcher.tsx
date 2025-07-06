import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

const versions = [
  { version: 'v1.0.21', label: 'Latest (v1.0.21)', url: '/' },
  { version: 'v1.0.0', label: 'v1.0.0', url: '/v1.0.0' },
  { version: 'next', label: 'Next (Unreleased)', url: '/next' },
]

export const VersionSwitcher: React.FC = () => {
  const [currentVersion, setCurrentVersion] = useState(versions[0])

  return (
    <div className="version-switcher relative">
      <Menu>
        <Menu.Button className="flex items-center px-3 py-1 text-sm rounded-md glass-button">
          {currentVersion.label}
          <ChevronDownIcon className="w-4 h-4 ml-1" />
        </Menu.Button>
        <Menu.Items className="absolute z-10 mt-1 w-48 origin-top-right glass-card rounded-md shadow-lg">
          <div className="py-1">
            {versions.map((version) => (
              <Menu.Item key={version.version}>
                {({ active }) => (
                  <a
                    href={version.url}
                    className={`${
                      active ? 'bg-white/10' : ''
                    } block px-4 py-2 text-sm`}
                    onClick={() => setCurrentVersion(version)}
                  >
                    {version.label}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  )
}

export default VersionSwitcher