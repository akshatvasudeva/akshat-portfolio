#!/usr/bin/env bash
# deploy.sh
# One-script helper to:
# 1) Build the project
# 2) Initialize git (if needed), commit
# 3) Create a GitHub repo using the `gh` CLI (if available) and push
# 4) Show next steps for Netlify/Vercel deployment
#
# Usage: ./deploy.sh [github-repo-name]
# If gh CLI is not available, the script will prompt for a git remote URL.

set -e

REPO_NAME="${1:-akshat-portfolio}"
BUILD_CMD="npm run build"

echo "1) Installing dependencies (if node_modules missing)..."
if [ ! -d "node_modules" ]; then
  if command -v npm >/dev/null 2>&1; then
    npm install
  else
    echo "npm not found. Please install Node.js and npm, then re-run this script."
    exit 1
  fi
fi

echo "2) Building the project with: $BUILD_CMD"
$BUILD_CMD

echo "3) Git initialization & commit"
if [ ! -d ".git" ]; then
  git init
  git add .
  git commit -m "Initial commit — Akshat Portfolio"
else
  echo "Existing git repo found. Staging & committing changes."
  git add .
  git commit -m "Update portfolio build $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit."
fi

# Try to create & push using gh CLI
if command -v gh >/dev/null 2>&1; then
  echo "4) Found GitHub CLI (gh). Creating repo: $REPO_NAME"
  # The following creates a public repo, sets remote, and pushes main branch.
  gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
  echo "Repository created and pushed to GitHub via gh CLI."
else
  echo "4) gh CLI not found. Please create an empty repo on GitHub (https://github.com/new) and paste the remote URL."
  read -p "Enter the Git remote URL (HTTPS), e.g. https://github.com/you/$REPO_NAME.git: " REMOTE_URL
  git remote add origin "$REMOTE_URL"
  git branch -M main
  git push -u origin main
fi

echo ""
echo "==== NEXT STEPS ===="
echo "A) Netlify (recommended quick deploy):"
echo "   1. Go to https://app.netlify.com/start and choose 'Import from Git' -> GitHub"
echo "   2. Select the repo you just pushed."
echo "   3. Build command: npm run build"
echo "   4. Publish directory: dist"
echo ""
echo "B) Quick drag-and-drop (no Git):"
echo "   - After running 'npm run build', drag the 'dist' folder contents into Netlify's drag-and-drop deploy panel."
echo ""
echo "C) Vercel:"
echo "   - Go to https://vercel.com/new, import the GitHub repo, choose Vite, Build: npm run build, Output: dist"
echo ""
echo "If you want, install Netlify CLI (npm i -g netlify-cli) and run 'netlify deploy --prod' to deploy from command line."
echo ""
echo "Done. Your code is pushed to GitHub and ready for Netlify/Vercel deployment."
