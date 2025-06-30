#!/usr/bin/env fish

# Simple script to extract all exported symbols from @tuliocunha23/liquidui library
# Compatible with Fish shell

set -l index_file "node_modules/@tuliocunha23/liquidui/dist/index.d.ts"
set -l output_file "library_components.json"

# Check if the index file exists
if not test -f $index_file
    echo "Error: $index_file not found"
    exit 1
end

echo "Parsing LiquidUI library exports..."

# Create JSON structure
echo '[' > $output_file

set -l components_found 0

# Read the index file and extract exports
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
        set module_path (echo "$line" | string replace -r "export \\* from ['\"]([^'\"]+)['\"];?" '$1')
        set module_name (basename "$module_path")
        
        if test $components_found -gt 0
            echo "," >> $output_file
        end
        
        echo "  {" >> $output_file
        echo "    \"name\": \"$module_name\"," >> $output_file
        echo "    \"type\": \"module\"," >> $output_file
        echo "    \"source\": \"$module_path\"" >> $output_file
        echo -n "  }" >> $output_file
        
        set components_found (math $components_found + 1)
    
    # Handle export { name } from './path'
    else if string match -q "export {*} from*" $line
        set export_part (echo "$line" | string replace -r "export \\{([^}]+)\\} from.*" '$1')
        set module_path (echo "$line" | string replace -r "export \\{[^}]+\\} from ['\"]([^'\"]+)['\"];?" '$1')
        
        # Process each exported name
        for export_name in (echo "$export_part" | string split ',')
            set export_name (string trim "$export_name")
            
            if test $components_found -gt 0
                echo "," >> $output_file
            end
            
            echo "  {" >> $output_file
            echo "    \"name\": \"$export_name\"," >> $output_file
            echo "    \"type\": \"named\"," >> $output_file
            echo "    \"source\": \"$module_path\"" >> $output_file
            echo -n "  }" >> $output_file
            
            set components_found (math $components_found + 1)
        end
    
    # Handle export type { ... } from './types'
    else if string match -q "export type {*" $line
        set export_part (echo "$line" | string replace -r "export type \\{([^}]+)\\}.*" '$1')
        
        # Process each exported type
        for export_name in (echo "$export_part" | string split ',')
            set export_name (string trim "$export_name")
            
            if test $components_found -gt 0
                echo "," >> $output_file
            end
            
            echo "  {" >> $output_file
            echo "    \"name\": \"$export_name\"," >> $output_file
            echo "    \"type\": \"type\"," >> $output_file
            echo "    \"source\": \"types\"" >> $output_file
            echo -n "  }" >> $output_file
            
            set components_found (math $components_found + 1)
        end
    end
    
end < $index_file

echo "" >> $output_file
echo ']' >> $output_file

echo "Found $components_found exported symbols"
echo "Results saved to: $output_file"

# Also create a CSV version
set -l csv_file "library_components.csv"
echo "name,type,source" > $csv_file

# Convert JSON to CSV using jq
if command -v jq > /dev/null
    cat $output_file | jq -r '.[] | [.name, .type, .source] | @csv' >> $csv_file
    echo "CSV version saved to: $csv_file"
    
    # Display summary
    echo ""
    echo "=== SUMMARY ==="
    echo "Total components found: $components_found"
    echo ""
    echo "By type:"
    cat $output_file | jq -r 'group_by(.type) | .[] | "\(.[0].type): \(length)"'
    
    echo ""
    echo "All components:"
    cat $output_file | jq -r '.[] | "- \(.name) (\(.type)) from \(.source)"'
else
    echo "jq not found - skipping CSV conversion and summary"
    echo "Install jq to get CSV output and summary"
end
