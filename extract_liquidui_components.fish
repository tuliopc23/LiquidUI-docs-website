#!/usr/bin/env fish

# Script to extract all exported symbols from @tuliocunha23/liquidui library
# Compatible with Fish shell

set -l index_file "node_modules/@tuliocunha23/liquidui/dist/index.d.ts"
set -l output_file "library_components.json"
set -l temp_file (mktemp)

# Check if the index file exists
if not test -f $index_file
    echo "Error: $index_file not found"
    exit 1
end

echo "Parsing LiquidUI library exports..."

# Initialize JSON array
echo '[' > $temp_file

set -l components_found 0

# Function to extract exports from a specific file
function extract_exports_from_file
    set -l file_path $argv[1]
    set -l prefix $argv[2]
    
    if test -f $file_path
        # Extract named exports (export { ... })
        grep -E "^export \{.*\}" $file_path | sed -E 's/^export \{([^}]+)\}.*/\1/' | tr ',' '\n' | while read -l export_name
            set export_name (string trim $export_name)
            if test -n "$export_name"
                echo "  {\"name\": \"$export_name\", \"type\": \"named\", \"source\": \"$prefix\"},"
            end
        end
        
        # Extract default exports that are re-exported with name
        grep -E "^export \{.*\} from" $file_path | sed -E 's/^export \{([^}]+)\} from.*/\1/' | tr ',' '\n' | while read -l export_name
            set export_name (string trim $export_name)
            if test -n "$export_name"
                echo "  {\"name\": \"$export_name\", \"type\": \"named\", \"source\": \"$prefix\"},"
            end
        end
        
        # Extract const/function/class declarations that are exported
        grep -E "^export (const|function|class|interface|type|declare)" $file_path | while read -l line
            set export_name (echo $line | sed -E 's/^export (const|function|class|interface|type|declare const|declare function|declare class) ([^[:space:]=(:]+).*/\2/')
            if test -n "$export_name"
                echo "  {\"name\": \"$export_name\", \"type\": \"declaration\", \"source\": \"$prefix\"},"
            end
        end
    end
end

# Process the main index.d.ts file
while read -l line
    # Skip empty lines and comments
    if test -z "$line"
        continue
    end
    if string match -q "//*" $line
        continue
    end
    
    # Handle export * from './path'
    if string match -q "export * from*" $line
        set module_path (echo $line | sed -E "s/export \* from ['\"]([^'\"]+)['\"];?/\1/")
        set module_name (basename $module_path)
        
        # Try to find the actual file
        set -l actual_file_path "node_modules/@tuliocunha23/liquidui/dist/$module_path.d.ts"
        if not test -f $actual_file_path
            set actual_file_path "node_modules/@tuliocunha23/liquidui/dist/$module_path/index.d.ts"
        end
        
        if test -f $actual_file_path
            # Extract exports from the referenced file
            extract_exports_from_file $actual_file_path $module_name >> $temp_file
            set components_found (math $components_found + 1)
        else
            # If file not found, add a placeholder entry
            echo "  {\"name\": \"$module_name\", \"type\": \"module\", \"source\": \"$module_path\", \"note\": \"file_not_found\"}," >> $temp_file
            set components_found (math $components_found + 1)
        end
    
    # Handle specific named exports like export { ThemeProvider } from './path'
    else if string match -q "export {*} from*" $line
        set export_names (echo $line | sed -E "s/export \{([^}]+)\} from ['\"]([^'\"]+)['\"];?/\1/")
        set module_path (echo $line | sed -E "s/export \{([^}]+)\} from ['\"]([^'\"]+)['\"];?/\2/")
        
        # Split export names by comma and process each
        echo $export_names | tr ',' '\n' | while read -l export_name
            set export_name (string trim $export_name)
            if test -n "$export_name"
                echo "  {\"name\": \"$export_name\", \"type\": \"named\", \"source\": \"$module_path\"}," >> $temp_file
                set components_found (math $components_found + 1)
            end
        end
    
    # Handle direct exports from types
    else if string match -q "export type {*" $line
        set export_names (echo $line | sed -E "s/export type \{([^}]+)\}.*/\1/")
        
        # Split export names by comma and process each
        echo $export_names | tr ',' '\n' | while read -l export_name
            set export_name (string trim $export_name)
            if test -n "$export_name"
                echo "  {\"name\": \"$export_name\", \"type\": \"type\", \"source\": \"types\"}," >> $temp_file
                set components_found (math $components_found + 1)
            end
        end
    end
    
end < $index_file

# Remove the last comma and close JSON array
if test $components_found -gt 0
    # Remove last comma
    sed -i '' '$s/,$//' $temp_file
end

echo ']' >> $temp_file

# Move temp file to final output
mv $temp_file $output_file

echo "Found $components_found exported symbols"
echo "Results saved to: $output_file"

# Also create a CSV version
set -l csv_file "library_components.csv"
echo "name,type,source,note" > $csv_file

# Parse JSON and convert to CSV
cat $output_file | jq -r '.[] | [.name, .type, .source, (.note // "")] | @csv' >> $csv_file

echo "CSV version saved to: $csv_file"

# Display summary
echo "\n=== SUMMARY ==="
echo "Total components found: $components_found"
echo "\nBy type:"
cat $output_file | jq -r 'group_by(.type) | .[] | "\(.[0].type): \(length)"'

echo "\nFirst 10 components:"
cat $output_file | jq -r '.[:10][] | "- \(.name) (\(.type))"'
