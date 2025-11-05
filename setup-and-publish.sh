#!/bin/bash
# Script to create GitHub repo and publish npm package

set -e

echo "🚀 Setting up GitHub repository and npm publishing..."

# Check if GitHub CLI is available
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI found"
    
    # Check if authenticated
    if gh auth status &> /dev/null; then
        echo "✅ GitHub CLI authenticated"
        echo "📦 Creating GitHub repository..."
        gh repo create contentarize --public --description "Headless CMS editing tools for React applications" --source=. --remote=origin --push
        echo "✅ GitHub repository created and code pushed!"
    else
        echo "❌ GitHub CLI not authenticated. Please run: gh auth login"
        exit 1
    fi
else
    echo "⚠️  GitHub CLI not found. Please create the repository manually:"
    echo ""
    echo "1. Go to https://github.com/new"
    echo "2. Repository name: contentarize"
    echo "3. Description: Headless CMS editing tools for React applications"
    echo "4. Set to Public"
    echo "5. DO NOT initialize with README, .gitignore, or license"
    echo "6. Click 'Create repository'"
    echo ""
    echo "Then run: git push -u origin main"
    exit 1
fi

echo ""
echo "📦 Publishing to npm..."
npm publish --access public

echo ""
echo "✅ Done! Your package is now available at:"
echo "   GitHub: https://github.com/mfissehaye/contentarize"
echo "   npm: https://www.npmjs.com/package/@mfissehaye/contentarize"

