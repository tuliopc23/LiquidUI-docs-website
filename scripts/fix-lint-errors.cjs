#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Common lint fixes
const LINT_FIXES = [
  // Curly braces
  {
    pattern: /if\s*\([^)]+\)\s*([^{].*)/g,
    replacement: (match, p1) => {
      if (p1.includes('{')) return match; // Already has braces
      return match.replace(p1, `{\n    ${p1.trim()}\n  }`);
    },
    description: 'Add curly braces to if statements',
  },

  // Self-closing components
  {
    pattern: /<(\w+)([^>]*?)><\/\1>/g,
    replacement: '<$1$2 />',
    description: 'Convert empty components to self-closing',
  },

  // Remove useless fragments
  {
    pattern: /<>([^<]+)<\/>/g,
    replacement: '$1',
    description: 'Remove unnecessary fragments with single child',
  },
  {
    pattern: /<React\.Fragment>([^<]+)<\/React\.Fragment>/g,
    replacement: '$1',
    description: 'Remove unnecessary React.Fragment with single child',
  },

  // Prefer const
  {
    pattern: /let\s+(\w+)\s*=\s*([^;]+);/g,
    replacement: (match, varName, value) => {
      // Only replace if the variable isn't reassigned later
      return match; // Will be handled by more complex logic
    },
    description: 'Convert let to const where possible',
  },

  // Remove unused imports (basic patterns)
  {
    pattern: /import\s+{\s*([^}]*),\s*(\w+),\s*([^}]*)\s*}\s+from/g,
    replacement: (match, before, unused, after) => {
      // This is a simplified approach - real unused import detection needs AST
      return match;
    },
    description: 'Remove unused imports',
  },
];

// Prettier formatting fixes
const PRETTIER_FIXES = [
  // Quote consistency
  {
    pattern: /"([^"\\]*(\\.[^"\\]*)*)"/g,
    replacement: "'$1'",
    description: 'Convert double quotes to single quotes',
  },

  // Spacing fixes
  {
    pattern: /(\w+)=\{/g,
    replacement: '$1={',
    description: 'Remove space before equals in JSX props',
  },
];

function findFilesToProcess() {
  const extensions = ['.ts', '.tsx', '.js', '.jsx'];
  const excludeDirs = ['node_modules', '.next', 'dist', 'build', 'scripts'];

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

function fixCurlyBraces(content) {
  const lines = content.split('\n');
  let modified = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fix simple if statements without braces
    const ifMatch = line.match(/^(\s*)if\s*\([^)]+\)\s*([^{].*)$/);
    if (ifMatch) {
      const indent = ifMatch[1];
      const statement = ifMatch[2].trim();

      // Skip if it's already part of a complex structure
      if (!statement.includes('{') && !statement.includes('//')) {
        lines[i] = `${indent}if ${line.match(/if\s*(\([^)]+\))/)[1]} {`;
        lines.splice(i + 1, 0, `${indent}  ${statement}`);
        lines.splice(i + 2, 0, `${indent}}`);
        modified = true;
        i += 2; // Skip the lines we just added
      }
    }
  }

  return { content: lines.join('\n'), modified };
}

function removeUnusedVariables(content) {
  let modified = content;
  let changeCount = 0;

  // Find variable declarations and check if they're used
  const lines = modified.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Match variable declarations
    const varMatch = line.match(/^\s*(const|let|var)\s+(\w+)\s*=/);
    if (varMatch) {
      const varName = varMatch[2];

      // Check if variable is used elsewhere (simple check)
      const usageRegex = new RegExp(`\\b${varName}\\b`, 'g');
      const usages = modified.match(usageRegex) || [];

      // If only used in declaration (length === 1), it might be unused
      if (usages.length === 1) {
        // Additional checks to avoid false positives
        if (
          !line.includes('export') &&
          !line.includes('console') &&
          !line.includes('return')
        ) {
          console.log(
            `Potentially unused variable: ${varName} at line ${i + 1}`
          );
          // Don't auto-remove, just warn
        }
      }
    }
  }

  return { content: modified, changeCount };
}

function fixSelfClosingComponents(content) {
  let modified = content;
  let changeCount = 0;

  // Fix empty components
  const emptyComponentRegex = /<(\w+)([^>]*?)><\/\1>/g;
  const matches = [...modified.matchAll(emptyComponentRegex)];

  for (const match of matches) {
    const replacement = `<${match[1]}${match[2]} />`;
    modified = modified.replace(match[0], replacement);
    changeCount++;
  }

  return { content: modified, changeCount };
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let modified = content;
    let totalChanges = 0;

    // Apply curly brace fixes
    const { content: bracesFixed, modified: bracesModified } =
      fixCurlyBraces(modified);
    if (bracesModified) {
      modified = bracesFixed;
      totalChanges++;
    }

    // Apply self-closing component fixes
    const { content: componentsFixed, changeCount: componentChanges } =
      fixSelfClosingComponents(modified);
    modified = componentsFixed;
    totalChanges += componentChanges;

    // Apply unused variable detection
    removeUnusedVariables(modified);

    // Write back if modified
    if (totalChanges > 0) {
      fs.writeFileSync(filePath, modified, 'utf8');
      console.log(`✅ ${filePath}: Fixed ${totalChanges} lint issue(s)`);
      return { file: filePath, changes: totalChanges };
    }

    return null;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return null;
  }
}

function main() {
  console.log('🔧 Fixing lint errors...\n');

  const files = findFilesToProcess();
  console.log(`Found ${files.length} files to process\n`);

  const results = [];
  let totalChanges = 0;

  for (const file of files) {
    const result = processFile(file);
    if (result) {
      results.push(result);
      totalChanges += result.changes;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`Files processed: ${files.length}`);
  console.log(`Files modified: ${results.length}`);
  console.log(`Total fixes applied: ${totalChanges}`);

  if (results.length > 0) {
    console.log('\n📝 Modified files:');
    results.forEach(r => {
      console.log(`  ${r.file} (${r.changes} fixes)`);
    });
  }

  console.log('\n✨ Run `npm run lint` to check remaining issues');
}

if (require.main === module) {
  main();
}
