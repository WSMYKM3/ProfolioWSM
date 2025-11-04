# GitHub Pages Deployment Guide

This guide will help you deploy your Next.js portfolio website to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Node.js 18+ installed

## Method 1: Automated Deployment with GitHub Actions (Recommended)

This method automatically builds and deploys your site whenever you push to the main branch.

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right, then select "New repository"
3. Name your repository (e.g., `portfolio-wsm`)
4. Choose Public or Private
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 2: Initialize Git and Push Code

Open your terminal in the project directory and run:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: Next.js portfolio"

# Add your GitHub repository as remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The site will automatically deploy after the first workflow run completes

### Step 4: Configure Repository Name (Important!)

GitHub Pages URLs follow this pattern:
- `https://YOUR_USERNAME.github.io/REPO_NAME/`

If your repository name is different from what you want in the URL, you may need to update `next.config.js`:

```javascript
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/REPO_NAME',  // Add this line if repo name is not 'portfolio-wsm'
  images: {
    unoptimized: true,
  },
}
```

If your repository name is `portfolio-wsm` or you want to use a custom domain, you can skip this step.

### Step 5: Wait for Deployment

- GitHub Actions will automatically build and deploy your site
- Check the **Actions** tab in your repository to see the deployment progress
- Once complete, your site will be available at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

## Method 2: Manual Deployment

If you prefer to deploy manually:

### Step 1: Build the Site

```bash
npm run build
```

This creates an `out/` directory with static files.

### Step 2: Push to GitHub

1. Create a GitHub repository (same as Method 1, Step 1)
2. Initialize and push your code (same as Method 1, Step 2)

### Step 3: Deploy out/ Directory

Option A: Using gh-pages branch
```bash
# Install gh-pages if needed
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d out"

# Deploy
npm run deploy
```

Option B: Manual upload
1. Build: `npm run build`
2. Copy contents of `out/` directory
3. Create a new branch called `gh-pages`
4. Upload files to the root of `gh-pages` branch
5. Enable GitHub Pages to use `gh-pages` branch

## Updating Your Site

### With GitHub Actions (Method 1):
Simply push changes to the main branch:
```bash
git add .
git commit -m "Update portfolio"
git push
```

GitHub Actions will automatically rebuild and redeploy.

### With Manual Deployment:
```bash
npm run build
# Then follow your chosen manual deployment method
```

## Troubleshooting

### Site shows 404 or blank page
- Check that `basePath` in `next.config.js` matches your repository name
- Ensure GitHub Pages is enabled and using the correct source
- Wait a few minutes for GitHub to propagate changes

### Images not loading
- Make sure images are in the `public/` directory
- Use relative paths: `/images/photo.jpg` not `./images/photo.jpg`
- For external images, ensure they allow embedding

### Styles not working
- Check browser console for errors
- Ensure `basePath` is set correctly if using a subdirectory

## Custom Domain (Optional)

1. Add a `CNAME` file to `public/` directory with your domain:
   ```
   yourdomain.com
   ```
2. Configure DNS settings with your domain provider
3. Update `next.config.js` to remove `basePath` if using root domain

## Need Help?

- Check GitHub Actions logs in the **Actions** tab
- Review Next.js static export docs: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- GitHub Pages docs: https://docs.github.com/en/pages

