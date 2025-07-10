#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Common any type replacements
const ANY_TYPE_REPLACEMENTS = {
  // React/Props related
  'props: any': 'props: Record<string, unknown>',
  'props?: any': 'props?: Record<string, unknown>',
  ': any[]': ': unknown[]',
  ': any': ': unknown',
  '= any': '= unknown',
  '<any>': '<unknown>',
  'any,': 'unknown,',
  'any)': 'unknown)',
  'any |': 'unknown |',
  '| any': '| unknown',

  // Function parameters
  'event: any': 'event: Event',
  'e: any': 'e: Event',
  'error: any': 'error: Error',
  'err: any': 'err: Error',
  'value: any': 'value: unknown',
  'data: any': 'data: unknown',
  'item: any': 'item: unknown',
  'obj: any': 'obj: Record<string, unknown>',
  'config: any': 'config: Record<string, unknown>',
  'options: any': 'options: Record<string, unknown>',
  'params: any': 'params: Record<string, unknown>',

  // Component specific
  'children: any': 'children: React.ReactNode',
  'component: any': 'component: React.ComponentType<any>',
  'ref: any': 'ref: React.Ref<any>',

  // Generic object types
  'Record<string, any>': 'Record<string, unknown>',
  'Array<any>': 'Array<unknown>',

  // Function types
  '(...args: any[])': '(...args: unknown[])',
  '(args: any[])': '(args: unknown[])',
  '(...args: any)': '(...args: unknown[])',
};

// Specific context-aware replacements
const CONTEXT_REPLACEMENTS = [
  // React component props
  {
    pattern: /interface\s+\w+Props\s*\{[^}]*(\w+):\s*any/g,
    replacement: (match, propName) => {
      if (propName.includes('children'))
        return match.replace('any', 'React.ReactNode');
      if (propName.includes('onClick') || propName.includes('onPress'))
        return match.replace('any', '() => void');
      if (propName.includes('className')) return match.replace('any', 'string');
      return match.replace('any', 'unknown');
    },
  },

  // Event handlers
  {
    pattern: /on\w+:\s*\([^)]*\)\s*=>\s*any/g,
    replacement: match => match.replace('any', 'void'),
  },

  // GSAP and animation related
  {
    pattern: /gsap\.[^(]*\([^,]*,\s*any/g,
    replacement: match => match.replace('any', 'gsap.TweenVars'),
  },

  // CSS/Style related
  {
    pattern: /style\s*:\s*any/g,
    replacement: 'style: React.CSSProperties',
  },
  {
    pattern: /className\s*:\s*any/g,
    replacement: 'className: string',
  },
];

function findFilesToProcess() {
  const extensions = ['.ts', '.tsx'];
  const excludeDirs = ['node_modules', '.next', 'dist', 'build'];

  function scanDirectory(dir) {
    const files = [];
    try {
      const items = fs.readdirSync(dir);

      for (const item of items) {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory() && !excludeDirs.includes(item)) {
          files.push(...scanDirectory(itemPath));
        } else if (
          stat.isFile() &&
          extensions.some(ext => item.endsWith(ext))
        ) {
          files.push(itemPath);
        }
      }
    } catch (error) {
      console.warn(`Could not scan directory ${dir}:`, error.message);
    }

    return files;
  }

  return scanDirectory(process.cwd());
}

function analyzeAnyUsage(content) {
  const anyMatches = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const anyRegex = /\bany\b/g;
    let match;
    while ((match = anyRegex.exec(line)) !== null) {
      // Skip comments and strings
      const beforeMatch = line.substring(0, match.index);
      if (
        beforeMatch.includes('//') ||
        beforeMatch.split('"').length % 2 === 0
      ) {
        continue;
      }

      anyMatches.push({
        line: index + 1,
        content: line.trim(),
        context: getContext(lines, index),
      });
    }
  });

  return anyMatches;
}

function getContext(lines, lineIndex) {
  const start = Math.max(0, lineIndex - 2);
  const end = Math.min(lines.length, lineIndex + 3);
  return lines.slice(start, end).map((line, i) => ({
    number: start + i + 1,
    content: line,
    current: start + i === lineIndex,
  }));
}

function replaceAnyTypes(content) {
  let modified = content;
  let changeCount = 0;

  // Apply context-aware replacements first
  for (const { pattern, replacement } of CONTEXT_REPLACEMENTS) {
    if (typeof replacement === 'function') {
      modified = modified.replace(pattern, (...args) => {
        const result = replacement(...args);
        if (result !== args[0]) changeCount++;
        return result;
      });
    } else {
      const before = modified;
      modified = modified.replace(pattern, replacement);
      if (modified !== before) changeCount++;
    }
  }

  // Apply simple replacements
  for (const [search, replace] of Object.entries(ANY_TYPE_REPLACEMENTS)) {
    const before = modified;
    modified = modified.replace(new RegExp(escapeRegex(search), 'g'), replace);
    if (modified !== before) {
      changeCount += (before.match(new RegExp(escapeRegex(search), 'g')) || [])
        .length;
    }
  }

  return { content: modified, changeCount };
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const analysis = analyzeAnyUsage(content);

    if (analysis.length > 0) {
      console.log(`\n📁 ${filePath}`);
      console.log(`Found ${analysis.length} 'any' usage(s):`);

      const { content: newContent, changeCount } = replaceAnyTypes(content);

      if (changeCount > 0) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✅ Replaced ${changeCount} 'any' type(s)`);
      } else {
        console.log(
          `⚠️  No automatic replacements made (manual review needed)`
        );
        analysis.slice(0, 5).forEach(match => {
          console.log(`  Line ${match.line}: ${match.content}`);
        });
      }

      return { file: filePath, found: analysis.length, replaced: changeCount };
    }

    return null;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return null;
  }
}

function main() {
  console.log('🔍 Scanning for TypeScript files with "any" types...\n');

  const files = findFilesToProcess();
  console.log(`Found ${files.length} TypeScript files to analyze\n`);

  const results = [];
  let totalFound = 0;
  let totalReplaced = 0;

  for (const file of files) {
    const result = processFile(file);
    if (result) {
      results.push(result);
      totalFound += result.found;
      totalReplaced += result.replaced;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`Files processed: ${files.length}`);
  console.log(`Files with 'any' types: ${results.length}`);
  console.log(`Total 'any' occurrences found: ${totalFound}`);
  console.log(`Total replacements made: ${totalReplaced}`);
  console.log(
    `Replacement rate: ${totalFound > 0 ? Math.round((totalReplaced / totalFound) * 100) : 0}%`
  );

  if (results.length > 0) {
    console.log('\n📝 Files that still need manual review:');
    results
      .filter(r => r.found > r.replaced)
      .forEach(r => {
        console.log(`  ${r.file} (${r.found - r.replaced} remaining)`);
      });
  }

  console.log('\n✨ Run `npm run lint` to check for remaining issues');
}

if (require.main === module) {
  main();
}

module.exports = { replaceAnyTypes, analyzeAnyUsage };
