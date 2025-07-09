# Prettier Setup for Liquidify Documentation

This document outlines the Prettier configuration and formatting workflow for the Liquidify documentation project.

## 🎯 What's Configured

### Files Added

- `.prettierrc` - Prettier configuration file
- `.prettierignore` - Files to exclude from formatting
- `.husky/pre-commit` - Git pre-commit hook for automatic formatting

### Package.json Scripts Added

- `format` - Format all files with Prettier
- `format:check` - Check if files are formatted correctly
- `format:fix` - Format files and show what changed
- `test:all` - Updated to include format checking

### Dependencies Added

- `eslint-config-prettier` - Disables ESLint rules that conflict with Prettier
- `eslint-plugin-prettier` - Runs Prettier as an ESLint rule
- `husky` - Git hooks management
- `lint-staged` - Run linters on staged files

## 🚀 Usage

### Format All Files

```bash
npm run format
```

### Check Formatting

```bash
npm run format:check
```

### Format and Show Changes

```bash
npm run format:fix
```

### Run All Quality Checks

```bash
npm run test:all
```

## ⚙️ Configuration

### Prettier Settings (.prettierrc)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "embeddedLanguageFormatting": "auto",
  "singleAttributePerLine": false
}
```

### ESLint Integration

The ESLint configuration has been updated to:

- Extend `prettier` configuration to disable conflicting rules
- Include `prettier` plugin
- Add `prettier/prettier` as an error rule

## 🔄 Workflow

### Pre-commit Hook

A pre-commit hook is configured to automatically format staged files before commit:

- Runs `lint-staged` on commit
- Formats `.js`, `.jsx`, `.ts`, `.tsx`, `.json`, `.css`, `.md`, `.mdx` files
- Stages the formatted files

### CI/CD Integration

The `test:all` script now includes formatting checks:

1. Type checking (`tsc --noEmit`)
2. Linting (`next lint`)
3. Format checking (`prettier --check`)
4. Tests (`jest --ci`)

## 📁 Ignored Files

The following files/folders are ignored by Prettier:

- `node_modules/`
- `.next/`
- Build outputs
- Lock files
- Generated files
- `.fish` scripts
- Binary files

## 🎨 Benefits

1. **Consistent Code Style** - All code follows the same formatting rules
2. **Automated Formatting** - No manual formatting needed
3. **Team Collaboration** - Eliminates style debates and merge conflicts
4. **Quality Assurance** - Integrated into CI/CD pipeline
5. **Developer Experience** - Format-on-save integration possible

## 🔧 Editor Integration

### VS Code

Install the Prettier extension and add to your settings:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### WebStorm/IntelliJ

Enable Prettier in Settings → Languages & Frameworks → JavaScript → Prettier

## 🐛 Troubleshooting

### Formatting Not Working

1. Check if `.prettierrc` exists in project root
2. Verify Prettier is installed: `npm ls prettier`
3. Run manually: `npx prettier --write .`

### ESLint Conflicts

If you see ESLint errors about formatting:

1. Ensure `eslint-config-prettier` is in your extends array
2. Check that `prettier/prettier` rule is configured
3. Restart your editor

### Pre-commit Hook Issues

1. Ensure husky is installed: `npm run prepare`
2. Check hook permissions: `chmod +x .husky/pre-commit`
3. Test manually: `npx lint-staged`

## 📝 Notes

- Prettier is already installed as a dependency (v3.6.2)
- Configuration is optimized for React/Next.js projects
- All existing code has been formatted according to these rules
- The setup is ready for immediate use
