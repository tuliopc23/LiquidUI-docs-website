import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Package, Code2, Hash, FileText } from 'lucide-react';
import { cn } from 'liquidify';

interface PropType {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}

interface ApiMethod {
  name: string;
  parameters?: PropType[];
  returns?: string;
  description: string;
  example?: string;
}

interface ApiExplorerProps {
  componentName: string;
  description?: string;
  props?: PropType[];
  methods?: ApiMethod[];
  examples?: Record<string, string>;
  imports?: string;
}

export function ApiExplorer({
  componentName,
  description,
  props = [],
  methods = [],
  examples = {},
  imports,
}: ApiExplorerProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    props: true,
    methods: false,
    examples: false,
  });
  const [selectedProp, setSelectedProp] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getTypeColor = (type: string) => {
    if (type.includes('string')) return 'text-green-600 dark:text-green-400';
    if (type.includes('number')) return 'text-blue-600 dark:text-blue-400';
    if (type.includes('boolean')) return 'text-purple-600 dark:text-purple-400';
    if (type.includes('function')) return 'text-orange-600 dark:text-orange-400';
    if (type.includes('React.ReactNode')) return 'text-pink-600 dark:text-pink-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className={cn(
      "backdrop-blur-xl bg-white/10 dark:bg-white/5",
      "border border-white/20 dark:border-white/10",
      "rounded-2xl overflow-hidden shadow-xl",
      "my-6"
    )}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5 text-blue-500" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {componentName} API
          </h2>
        </div>
        {description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
        {imports && (
          <div className="mt-3 p-3 bg-gray-900/10 dark:bg-gray-900/30 rounded-lg">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              {imports}
            </code>
          </div>
        )}
      </div>

      {/* Props Section */}
      {props.length > 0 && (
        <div className="border-b border-white/10">
          <button
            onClick={() => toggleSection('props')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Props ({props.length})
              </h3>
            </div>
            <div className={cn(
              "w-4 h-4 text-gray-400 transition-transform",
              expandedSections.props && "rotate-180"
            )}>
              <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </div>
          </button>

          {expandedSections.props && (
            <div className="overflow-hidden">
              <div className="px-6 pb-4">
                <div className="space-y-3">
                  {props.map((prop) => (
                    <div
                      key={prop.name}
                      className={cn(
                        "p-4 rounded-lg border transition-all cursor-pointer",
                        selectedProp === prop.name
                          ? "bg-blue-500/10 border-blue-500/30"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      )}
                      onClick={() => setSelectedProp(
                        selectedProp === prop.name ? null : prop.name
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <code className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                              {prop.name}
                            </code>
                            {prop.required && (
                              <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-600 dark:text-red-400 rounded-full">
                                required
                              </span>
                            )}
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <code className={cn("font-mono text-xs", getTypeColor(prop.type))}>
                              {prop.type}
                            </code>
                            {prop.default && (
                              <>
                                <span className="text-gray-500">•</span>
                                <code className="font-mono text-xs text-gray-600 dark:text-gray-400">
                                  default: {prop.default}
                                </code>
                              </>
                            )}
                          </div>
                        </div>
                        <ChevronRight
                          className={cn(
                            "w-4 h-4 text-gray-400 transition-transform",
                            selectedProp === prop.name && "rotate-90"
                          )}
                        />
                      </div>

                      {selectedProp === prop.name && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {prop.description}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Methods Section */}
      {methods.length > 0 && (
        <div className="border-b border-white/10">
          <button
            onClick={() => toggleSection('methods')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Methods ({methods.length})
              </h3>
            </div>
            <div className={cn(
              "w-4 h-4 text-gray-400 transition-transform",
              expandedSections.methods && "rotate-180"
            )}>
              <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </div>
          </button>

          {expandedSections.methods && (
            <div className="overflow-hidden">
              <div className="px-6 pb-4">
                <div className="space-y-3">
                  {methods.map((method) => (
                    <div
                      key={method.name}
                      className="p-4 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <code className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                            {method.name}(
                            {method.parameters?.map(p => p.name).join(', ')}
                            )
                          </code>
                          {method.returns && (
                            <div className="mt-1">
                              <code className={cn("font-mono text-xs", getTypeColor(method.returns))}>
                                returns: {method.returns}
                              </code>
                            </div>
                          )}
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {method.description}
                          </p>
                          {method.example && (
                            <div className="mt-3 p-3 bg-gray-900/10 dark:bg-gray-900/30 rounded-lg">
                              <code className="text-xs">{method.example}</code>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Examples Section */}
      {Object.keys(examples).length > 0 && (
        <div>
          <button
            onClick={() => toggleSection('examples')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Examples ({Object.keys(examples).length})
              </h3>
            </div>
            <div className={cn(
              "w-4 h-4 text-gray-400 transition-transform",
              expandedSections.examples && "rotate-180"
            )}>
              <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </div>
          </button>

          {expandedSections.examples && (
            <div className="overflow-hidden">
              <div className="px-6 pb-4">
                <div className="space-y-4">
                  {Object.entries(examples).map(([name, code]) => (
                    <div key={name} className="space-y-2">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {name}
                      </h4>
                      <div className="p-4 bg-gray-900/10 dark:bg-gray-900/30 rounded-lg overflow-x-auto">
                        <pre className="text-xs">
                          <code>{code}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}