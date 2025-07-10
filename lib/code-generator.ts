export interface CodeGenerationOptions {
  componentName: string;
  props: Record<string, unknown>;
  language: 'tsx' | 'jsx' | 'vue' | 'svelte';
  includeImports?: boolean;
  includeWrapper?: boolean;
  wrapperComponent?: string;
  children?: string;
}

export const generateComponentCode = (
  options: CodeGenerationOptions
): string => {
  const {
    componentName,
    props,
    language = 'tsx',
    includeImports = true,
    includeWrapper = false,
    wrapperComponent = 'div',
    children = '',
  } = options;

  // Filter out undefined and null props
  const cleanProps = Object.entries(props)
    .filter(([, value]) => value !== undefined && value !== null)
    .reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, unknown>
    );

  const formatPropValue = (value: unknown): string => {
    if (typeof value === 'string') {
      return `"${value}"`;
    } else if (typeof value === 'boolean') {
      return value ? 'true' : 'false';
    } else if (typeof value === 'number') {
      return value.toString();
    } else if (Array.isArray(value)) {
      return JSON.stringify(value);
    } else if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const generatePropsString = (props: Record<string, unknown>): string => {
    const propEntries = Object.entries(props);
    if (propEntries.length === 0) {
      return '';
    }

    const propStrings = propEntries.map(([key, value]) => {
      if (typeof value === 'boolean' && value === true) {
        return `  ${key}`;
      } else if (typeof value === 'boolean' && value === false) {
        return `  ${key}={false}`;
      } else {
        return `  ${key}={${formatPropValue(value)}}`;
      }
    });

    return propStrings.length > 0 ? '\n' + propStrings.join('\n') + '\n' : '';
  };

  const generateImports = (): string => {
    if (!includeImports) {
      return '';
    }

    switch (language) {
      case 'tsx':
      case 'jsx':
        return `import React from 'react'
import { ${componentName} } from 'liquidify'

`;
      case 'vue':
        return `<script setup lang="ts">
import { ${componentName} } from 'liquidify'
</script>

`;
      case 'svelte':
        return `<script>
  import { ${componentName} } from 'liquidify'
</script>

`;
      default:
        return '';
    }
  };

  const generateComponent = (): string => {
    const propsString = generatePropsString(cleanProps);
    const hasChildren = children && children.trim().length > 0;

    switch (language) {
      case 'tsx':
      case 'jsx':
        if (hasChildren) {
          return `<${componentName}${propsString}>\n  ${children}\n</${componentName}>`;
        } else {
          return `<${componentName}${propsString} />`;
        }

      case 'vue':
        if (hasChildren) {
          return `<${componentName}${propsString}>\n  ${children}\n</${componentName}>`;
        } else {
          return `<${componentName}${propsString} />`;
        }

      case 'svelte':
        if (hasChildren) {
          return `<${componentName}${propsString}>\n  ${children}\n</${componentName}>`;
        } else {
          return `<${componentName}${propsString} />`;
        }

      default:
        return '';
    }
  };

  const generateWrapper = (content: string): string => {
    if (!includeWrapper) {
      return content;
    }

    switch (language) {
      case 'tsx':
      case 'jsx':
        return `export function Example() {
  return (
    <${wrapperComponent}>
      ${content
        .split('\n')
        .map(line => '      ' + line)
        .join('\n')
        .trim()}
    </${wrapperComponent}>
  )
}`;

      case 'vue':
        return `<template>
  <${wrapperComponent}>
    ${content
      .split('\n')
      .map(line => '    ' + line)
      .join('\n')
      .trim()}
  </${wrapperComponent}>
</template>`;

      case 'svelte':
        return `<${wrapperComponent}>
  ${content
    .split('\n')
    .map(line => '  ' + line)
    .join('\n')
    .trim()}
</${wrapperComponent}>`;

      default:
        return content;
    }
  };

  const imports = generateImports();
  const component = generateComponent();
  const wrappedComponent = generateWrapper(component);

  return imports + wrappedComponent;
};

export const generateFullExample = (
  componentName: string,
  props: Record<string, unknown>,
  children?: string
): string => {
  return generateComponentCode({
    componentName,
    props,
    language: 'tsx',
    includeImports: true,
    includeWrapper: true,
    children,
  });
};

export const generateVariantExamples = (
  componentName: string,
  variants: Array<{
    name: string;
    props: Record<string, unknown>;
    description?: string;
  }>
): string => {
  const examples = variants.map((variant, index) => {
    const code = generateComponentCode({
      componentName,
      props: variant.props,
      language: 'tsx',
      includeImports: index === 0,
      includeWrapper: false,
      children: componentName === 'GlassButton' ? 'Click me' : 'Content',
    });

    return `// ${variant.name}${variant.description ? ` - ${variant.description}` : ''}
${code}`;
  });

  const imports = `import React from 'react'
import { ${componentName} } from 'liquidify'

export function VariantsExample() {
  return (
    <div className="space-y-4">
${examples
  .map(example => {
    const lines = example.split('\n');
    const comment = lines[0];
    const component = lines.slice(1).join('\n');
    return `      ${comment}
      ${component
        .split('\n')
        .map(line => '      ' + line)
        .join('\n')
        .trim()}`;
  })
  .join('\n\n')}
    </div>
  )
}`;

  return imports;
};

export const generatePlaygroundCode = (
  componentName: string,
  props: Record<string, unknown>,
  interactive: boolean = true
): string => {
  const baseCode = generateComponentCode({
    componentName,
    props,
    language: 'tsx',
    includeImports: false,
    includeWrapper: false,
    children: componentName === 'GlassButton' ? 'Click me' : 'Content',
  });

  if (!interactive) {
    return `import React from 'react'
import { ${componentName} } from 'liquidify'

export function PlaygroundExample() {
  return (
    <div className="p-8 flex justify-center">
      ${baseCode
        .split('\n')
        .map(line => '      ' + line)
        .join('\n')
        .trim()}
    </div>
  )
}`;
  }

  const stateVars = Object.entries(props)
    .filter(
      ([, value]) =>
        typeof value === 'boolean' ||
        typeof value === 'number' ||
        typeof value === 'string'
    )
    .map(([key, value]) => {
      const type =
        typeof value === 'string'
          ? 'string'
          : typeof value === 'number'
            ? 'number'
            : 'boolean';
      const defaultValue = typeof value === 'string' ? `'${value}'` : value;
      return `  const [${key}, set${key.charAt(0).toUpperCase() + key.slice(1)}] = useState<${type}>(${defaultValue})`;
    });

  return `import React, { useState } from 'react'
import { ${componentName} } from 'liquidify'

export function InteractivePlayground() {
${stateVars.join('\n')}

  return (
    <div className="space-y-6">
      <div className="controls space-y-4">
        {/* Add your controls here */}
      </div>
      
      <div className="preview p-8 flex justify-center">
        ${baseCode
          .split('\n')
          .map(line => '        ' + line)
          .join('\n')
          .trim()}
      </div>
    </div>
  )
}`;
};

export const generateThemeAwareCode = (
  componentName: string,
  props: Record<string, unknown>
): string => {
  return `import React from 'react'
import { ${componentName}, ThemeProvider } from 'liquidify'

export function ThemeAwareExample() {
  return (
    <ThemeProvider>
      <div className="p-8">
        ${generateComponentCode({
          componentName,
          props,
          language: 'tsx',
          includeImports: false,
          includeWrapper: false,
          children: componentName === 'GlassButton' ? 'Click me' : 'Content',
        })
          .split('\n')
          .map(line => '        ' + line)
          .join('\n')
          .trim()}
      </div>
    </ThemeProvider>
  )
}`;
};

export const generateAccessibleCode = (
  componentName: string,
  props: Record<string, unknown>
): string => {
  const accessibleProps = {
    ...props,
    'aria-label': `${componentName} example`,
    role: componentName === 'GlassButton' ? 'button' : undefined,
  };

  return `import React from 'react'
import { ${componentName} } from 'liquidify'

export function AccessibleExample() {
  return (
    <div className="p-8">
      ${generateComponentCode({
        componentName,
        props: accessibleProps,
        language: 'tsx',
        includeImports: false,
        includeWrapper: false,
        children:
          componentName === 'GlassButton'
            ? 'Accessible Button'
            : 'Accessible Content',
      })
        .split('\n')
        .map(line => '      ' + line)
        .join('\n')
        .trim()}
    </div>
  )
}`;
};
