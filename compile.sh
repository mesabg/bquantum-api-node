echo "Compilation process started...";

# Define variables
base=./node_modules/.bin

# Running commands
rm -rf dist
$base/babel src -d dist
cp -r src/public dist/public
cp -r src/views dist/views

echo "Compilation process ended...";