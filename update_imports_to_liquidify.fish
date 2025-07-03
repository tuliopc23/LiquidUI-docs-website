#!/usr/bin/env fish

# Script to update all imports from @tuliocunha23/liquidui to liquidify

set -l old_package "@tuliocunha23/liquidui"
set -l new_package "liquidify"

echo "🔄 Updating all imports from $old_package to $new_package..."

# Find all files with the old import and update them
set -l files_to_update (find . \( -name "*.tsx" -o -name "*.ts" -o -name "*.mdx" -o -name "*.md" -o -name "*.js" -o -name "*.json" \) -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./.next/*" | xargs grep -l "$old_package" 2>/dev/null)

for file in $files_to_update
    if test -f "$file"
        echo "📝 Updating $file"
        sed -i '' "s|$old_package|$new_package|g" "$file"
    end
end

echo "✅ Import update complete!"
echo "🔍 Files updated:"
for file in $files_to_update
    echo "  - $file"
end
