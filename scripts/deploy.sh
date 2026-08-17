#!/usr/bin/env bash
#
# Publish straight from this machine to the gh-pages branch.
# A fallback for when GitHub Actions can't fetch its own actions — this needs
# nothing but git and npm.
#
# One-time setup on GitHub:
#   Settings → Pages → Source → "Deploy from a branch" → gh-pages / (root)
#
set -euo pipefail

REPO_URL=$(git config --get remote.origin.url)
REPO_NAME=$(basename -s .git "$REPO_URL")

echo "→ building for /$REPO_NAME/"
npm run build -- --base="/$REPO_NAME/"

# Pages runs Jekyll by default, which skips files starting with an underscore
touch dist/.nojekyll

echo "→ pushing dist/ to gh-pages"
cd dist
rm -rf .git
git init -q
git add -A
git commit -qm "Deploy $(git -C .. rev-parse --short HEAD)"
git push -qf "$REPO_URL" HEAD:gh-pages
cd ..

echo "✓ published — https://$(basename $(dirname "$REPO_URL")).github.io/$REPO_NAME/"
