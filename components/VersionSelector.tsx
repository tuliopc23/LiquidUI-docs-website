import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Tag, Clock, ExternalLink } from 'lucide-react';
import { cn } from 'liquidify';

interface Version {
  version: string;
  date: string;
  status: 'latest' | 'stable' | 'deprecated' | 'beta';
  changelog?: string;
  breaking?: boolean;
  features?: string[];
  fixes?: string[];
}

interface VersionSelectorProps {
  currentVersion: string;
  versions?: Version[];
  onVersionChange?: (version: string) => void;
  className?: string;
}

const versionData: Version[] = [
  {
    version: '1.0.17',
    date: '2024-12-02',
    status: 'latest',
    changelog: '/changelog#v1.0.17',
    features: [
      'New GlassNavbar component',
      'Enhanced performance optimization',
      'Improved TypeScript definitions',
      'Added glassmorphism animations'
    ],
    fixes: [
      'Fixed build warnings',
      'Resolved SSR hydration issues',
      'Updated documentation'
    ]
  },
  {
    version: '1.0.16',
    date: '2024-11-28',
    status: 'stable',
    changelog: '/changelog#v1.0.16',
    features: [
      'Glass physics improvements',
      'New animation presets',
      'Better accessibility support'
    ],
    fixes: [
      'Fixed button hover states',
      'Improved responsive design'
    ]
  },
  {
    version: '1.0.15',
    date: '2024-11-25',
    status: 'stable',
    changelog: '/changelog#v1.0.15',
    breaking: true,
    features: [
      'Complete component API redesign',
      'New theming system',
      'Enhanced glass effects'
    ],
    fixes: [
      'Breaking: Changed prop names for consistency',
      'Breaking: Updated component structure'
    ]
  },
  {
    version: '1.0.14',
    date: '2024-11-20',
    status: 'deprecated',
    changelog: '/changelog#v1.0.14'
  },
  {
    version: '2.0.0-beta.1',
    date: '2024-12-01',
    status: 'beta',
    changelog: '/changelog#v2.0.0-beta.1',
    features: [
      'Next.js 15 support',
      'React 19 compatibility',
      'New component architecture'
    ]
  }
];

export function VersionSelector({
  currentVersion,
  versions = versionData,
  onVersionChange,
  className
}: VersionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(currentVersion);

  const handleVersionSelect = (version: string) => {
    setSelectedVersion(version);
    setIsOpen(false);
    onVersionChange?.(version);
  };

  const getStatusColor = (status: Version['status']) => {
    switch (status) {
      case 'latest': return 'bg-green-500/20 text-green-600 dark:text-green-400';
      case 'stable': return 'bg-blue-500/20 text-blue-600 dark:text-blue-400';
      case 'deprecated': return 'bg-red-500/20 text-red-600 dark:text-red-400';
      case 'beta': return 'bg-orange-500/20 text-orange-600 dark:text-orange-400';
      default: return 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
    }
  };

  const currentVersionData = versions.find(v => v.version === selectedVersion);

  return (
    <div className={cn("relative", className)}>
      {/* Version Selector Dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2",
          "backdrop-blur-xl bg-white/10 dark:bg-white/5",
          "border border-white/20 dark:border-white/10",
          "rounded-lg shadow-lg hover:bg-white/15 transition-all"
        )}
      >
        <Tag className="w-4 h-4" />
        <span className="font-mono text-sm">v{selectedVersion}</span>
        {currentVersionData && (
          <span className={cn(
            "px-2 py-0.5 text-xs rounded-full",
            getStatusColor(currentVersionData.status)
          )}>
            {currentVersionData.status}
          </span>
        )}
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className={cn(
              "absolute top-full left-0 mt-2 w-80 z-50",
              "backdrop-blur-xl bg-white/10 dark:bg-white/5",
              "border border-white/20 dark:border-white/10",
              "rounded-lg shadow-xl overflow-hidden"
            )}
          >
            <div className="max-h-96 overflow-y-auto">
              {versions
                .sort((a, b) => {
                  // Sort by version number (latest first)
                  const aNum = parseFloat(a.version.replace(/[^\d.]/g, ''));
                  const bNum = parseFloat(b.version.replace(/[^\d.]/g, ''));
                  return bNum - aNum;
                })
                .map((version) => (
                  <motion.button
                    key={version.version}
                    onClick={() => handleVersionSelect(version.version)}
                    className={cn(
                      "w-full px-4 py-3 text-left hover:bg-white/10 transition-colors",
                      "border-b border-white/10 last:border-b-0",
                      selectedVersion === version.version && "bg-white/15"
                    )}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold">
                            v{version.version}
                          </span>
                          <span className={cn(
                            "px-2 py-0.5 text-xs rounded-full",
                            getStatusColor(version.status)
                          )}>
                            {version.status}
                          </span>
                          {version.breaking && (
                            <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-600 dark:text-red-400 rounded-full">
                              breaking
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-600 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          {new Date(version.date).toLocaleDateString()}
                          {version.changelog && (
                            <>
                              <span>•</span>
                              <a
                                href={version.changelog}
                                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Changelog
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </>
                          )}
                        </div>
                        
                        {/* Version Features/Fixes Preview */}
                        {(version.features || version.fixes) && (
                          <div className="mt-2 space-y-1">
                            {version.features && version.features.slice(0, 2).map((feature, i) => (
                              <div key={i} className="text-xs text-green-600 dark:text-green-400">
                                + {feature}
                              </div>
                            ))}
                            {version.fixes && version.fixes.slice(0, 1).map((fix, i) => (
                              <div key={i} className="text-xs text-blue-600 dark:text-blue-400">
                                • {fix}
                              </div>
                            ))}
                            {((version.features?.length || 0) + (version.fixes?.length || 0)) > 3 && (
                              <div className="text-xs text-gray-500">
                                +{((version.features?.length || 0) + (version.fixes?.length || 0)) - 3} more changes
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {selectedVersion === version.version && (
                        <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      )}
                    </div>
                  </motion.button>
                ))}
            </div>
            
            <div className="px-4 py-3 border-t border-white/10 bg-white/5">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Select a version to view its specific documentation and examples.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Version Comparison Component
export function VersionComparison({ 
  fromVersion, 
  toVersion, 
  className 
}: { 
  fromVersion: string; 
  toVersion: string; 
  className?: string;
}) {
  const versions = versionData;
  const from = versions.find(v => v.version === fromVersion);
  const to = versions.find(v => v.version === toVersion);

  if (!from || !to) return null;

  return (
    <div className={cn(
      "backdrop-blur-xl bg-white/10 dark:bg-white/5",
      "border border-white/20 dark:border-white/10",
      "rounded-lg p-6",
      className
    )}>
      <div className="flex items-center gap-3 mb-4">
        <Tag className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">
          Version Comparison: v{fromVersion} → v{toVersion}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">
            New Features
          </h4>
          <ul className="space-y-1">
            {to.features?.map((feature, i) => (
              <li key={i} className="text-sm text-green-600 dark:text-green-400">
                + {feature}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
            Bug Fixes
          </h4>
          <ul className="space-y-1">
            {to.fixes?.map((fix, i) => (
              <li key={i} className="text-sm text-blue-600 dark:text-blue-400">
                • {fix}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {to.breaking && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
            ⚠️ Breaking Changes
          </h4>
          <p className="text-sm text-red-600 dark:text-red-400">
            This version contains breaking changes. Please review the migration guide.
          </p>
        </div>
      )}
    </div>
  );
}