import React, { useState } from 'react';
import { Palette, Download, RotateCcw, Eye, Code2, Sliders } from 'lucide-react';
import { cn } from '../lib/liquidify-utils';

interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  glassBg: string;
  glassBlur: number;
  borderRadius: number;
  borderOpacity: number;
  shadowIntensity: number;
}

interface ThemeCustomizerProps {
  initialTheme?: Partial<ThemeConfig>;
  previewComponent?: React.ReactNode;
  className?: string;
}

const defaultTheme: ThemeConfig = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  accent: '#F59E0B',
  background: '#FFFFFF',
  foreground: '#1F2937',
  glassBg: 'rgba(255, 255, 255, 0.1)',
  glassBlur: 16,
  borderRadius: 16,
  borderOpacity: 0.2,
  shadowIntensity: 0.1,
};

export function ThemeCustomizer({
  initialTheme = {},
  previewComponent,
  className,
}: ThemeCustomizerProps) {
  const [theme, setTheme] = useState<ThemeConfig>({
    ...defaultTheme,
    ...initialTheme,
  });
  const [activeTab, setActiveTab] = useState<'customize' | 'preview' | 'export'>('customize');
  const [copied, setCopied] = useState(false);

  const updateTheme = (key: keyof ThemeConfig, value: string | number) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const resetTheme = () => {
    setTheme({ ...defaultTheme, ...initialTheme });
  };

  const exportTheme = () => {
    const cssVariables = `
:root {
  --liquid-primary: ${theme.primary};
  --liquid-secondary: ${theme.secondary};
  --liquid-accent: ${theme.accent};
  --liquid-background: ${theme.background};
  --liquid-foreground: ${theme.foreground};
  --liquid-glass-bg: ${theme.glassBg};
  --liquid-glass-blur: ${theme.glassBlur}px;
  --liquid-border-radius: ${theme.borderRadius}px;
  --liquid-border-opacity: ${theme.borderOpacity};
  --liquid-shadow-intensity: ${theme.shadowIntensity};
}

.liquid-glass {
  backdrop-filter: blur(var(--liquid-glass-blur));
  background: var(--liquid-glass-bg);
  border: 1px solid rgba(255, 255, 255, var(--liquid-border-opacity));
  border-radius: var(--liquid-border-radius);
  box-shadow: 0 8px 32px rgba(0, 0, 0, var(--liquid-shadow-intensity));
}

.liquid-button {
  background: var(--liquid-primary);
  color: var(--liquid-background);
  padding: 0.75rem 1.5rem;
  border-radius: var(--liquid-border-radius);
  transition: all 0.3s ease;
}

.liquid-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, var(--liquid-shadow-intensity));
}`;

    return cssVariables;
  };

  const handleExport = async () => {
    const css = exportTheme();
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const PreviewComponent = () => (
    <div
      className="p-8 space-y-6"
      style={{
        '--liquid-primary': theme.primary,
        '--liquid-secondary': theme.secondary,
        '--liquid-accent': theme.accent,
        '--liquid-background': theme.background,
        '--liquid-foreground': theme.foreground,
        '--liquid-glass-bg': theme.glassBg,
        '--liquid-glass-blur': `${theme.glassBlur}px`,
        '--liquid-border-radius': `${theme.borderRadius}px`,
        '--liquid-border-opacity': theme.borderOpacity.toString(),
        '--liquid-shadow-intensity': theme.shadowIntensity.toString(),
      } as React.CSSProperties}
    >
      {previewComponent || (
        <>
          {/* Glass Card */}
          <div
            className="p-6"
            style={{
              backdropFilter: `blur(${theme.glassBlur}px)`,
              background: theme.glassBg,
              border: `1px solid rgba(255, 255, 255, ${theme.borderOpacity})`,
              borderRadius: `${theme.borderRadius}px`,
              boxShadow: `0 8px 32px rgba(0, 0, 0, ${theme.shadowIntensity})`,
            }}
          >
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: theme.foreground }}
            >
              Glass Card Preview
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: theme.foreground, opacity: 0.7 }}
            >
              This is how your glassmorphism components will look with the current theme.
            </p>
            <div className="flex gap-3">
              <button
                className="px-4 py-2 rounded transition-all hover:scale-105"
                style={{
                  background: theme.primary,
                  color: theme.background,
                  borderRadius: `${theme.borderRadius * 0.5}px`,
                }}
              >
                Primary Button
              </button>
              <button
                className="px-4 py-2 rounded transition-all hover:scale-105"
                style={{
                  background: theme.secondary,
                  color: theme.background,
                  borderRadius: `${theme.borderRadius * 0.5}px`,
                }}
              >
                Secondary Button
              </button>
              <button
                className="px-4 py-2 rounded transition-all hover:scale-105"
                style={{
                  background: theme.accent,
                  color: theme.background,
                  borderRadius: `${theme.borderRadius * 0.5}px`,
                }}
              >
                Accent Button
              </button>
            </div>
          </div>

          {/* Input Example */}
          <div
            className="p-4"
            style={{
              backdropFilter: `blur(${theme.glassBlur}px)`,
              background: theme.glassBg,
              border: `1px solid rgba(255, 255, 255, ${theme.borderOpacity})`,
              borderRadius: `${theme.borderRadius}px`,
              boxShadow: `0 8px 32px rgba(0, 0, 0, ${theme.shadowIntensity})`,
            }}
          >
            <input
              type="text"
              placeholder="Glass input field"
              className="w-full px-3 py-2 bg-transparent border-none outline-none"
              style={{
                color: theme.foreground,
                borderRadius: `${theme.borderRadius * 0.5}px`,
              }}
            />
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className={cn(
      "backdrop-blur-xl bg-white/10 dark:bg-white/5",
      "border border-white/20 dark:border-white/10",
      "rounded-2xl overflow-hidden shadow-xl",
      className
    )}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Theme Customizer
            </h2>
          </div>
          <button
            onClick={resetTheme}
            className="flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-white/10 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-white/10">
        {[
          { id: 'customize', label: 'Customize', icon: Sliders },
          { id: 'preview', label: 'Preview', icon: Eye },
          { id: 'export', label: 'Export', icon: Code2 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-white/10 text-gray-900 dark:text-white border-b-2 border-blue-500"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/5"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'customize' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Colors */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Colors</h3>
              {[
                { key: 'primary', label: 'Primary', value: theme.primary },
                { key: 'secondary', label: 'Secondary', value: theme.secondary },
                { key: 'accent', label: 'Accent', value: theme.accent },
                { key: 'background', label: 'Background', value: theme.background },
                { key: 'foreground', label: 'Foreground', value: theme.foreground },
              ].map((color) => (
                <div key={color.key} className="flex items-center gap-3">
                  <label className="text-sm text-gray-700 dark:text-gray-300 min-w-[80px]">
                    {color.label}
                  </label>
                  <input
                    type="color"
                    value={color.value}
                    onChange={(e) => updateTheme(color.key as keyof ThemeConfig, e.target.value)}
                    className="w-12 h-8 rounded border border-white/20 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={color.value}
                    onChange={(e) => updateTheme(color.key as keyof ThemeConfig, e.target.value)}
                    className="flex-1 px-2 py-1 text-sm bg-white/10 border border-white/20 rounded"
                  />
                </div>
              ))}
            </div>

            {/* Glass Effects */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Glass Effects</h3>
              {[
                { key: 'glassBlur', label: 'Blur', value: theme.glassBlur, min: 0, max: 50, step: 1 },
                { key: 'borderRadius', label: 'Border Radius', value: theme.borderRadius, min: 0, max: 50, step: 1 },
                { key: 'borderOpacity', label: 'Border Opacity', value: theme.borderOpacity, min: 0, max: 1, step: 0.1 },
                { key: 'shadowIntensity', label: 'Shadow Intensity', value: theme.shadowIntensity, min: 0, max: 1, step: 0.1 },
              ].map((setting) => (
                <div key={setting.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      {setting.label}
                    </label>
                    <span className="text-xs text-gray-500">
                      {setting.value}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={setting.min}
                    max={setting.max}
                    step={setting.step}
                    value={setting.value}
                    onChange={(e) => updateTheme(
                      setting.key as keyof ThemeConfig,
                      parseFloat(e.target.value)
                    )}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <PreviewComponent />
        )}

        {activeTab === 'export' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                CSS Variables
              </h3>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy CSS'}
              </button>
            </div>
            <pre className="p-4 bg-gray-900/20 rounded-lg overflow-x-auto text-xs">
              <code>{exportTheme()}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}