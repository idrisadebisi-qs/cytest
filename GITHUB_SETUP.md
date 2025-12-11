# Pushing to GitHub

## Step 1: Create a new repository on GitHub

1. Go to https://github.com/new
2. Name your repository (e.g., `flask-cypress-app`)
3. Make it public or private
4. **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Push your local repository to GitHub

Run these commands in your terminal:

```bash
# Add GitHub remote (replace YOUR_USERNAME and YOUR_REPO with your values)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

## Step 3: Verify GitHub Actions

1. Go to your repository on GitHub
2. Click on the "Actions" tab
3. You should see the CI/CD workflow running automatically
4. The workflow will:
   - Build Docker images
   - Start the application
   - Run all Cypress tests
   - Upload test artifacts (screenshots/videos)

## Alternative: Using SSH

If you prefer SSH:

```bash
# Add GitHub remote with SSH
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

## Troubleshooting

If you've already added a remote, update it:

```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

## Enable GitHub Actions (if needed)

If Actions don't run automatically:

1. Go to your repository's "Actions" tab
2. Click "I understand my workflows, go ahead and enable them"
3. Push a new commit or manually trigger the workflow
