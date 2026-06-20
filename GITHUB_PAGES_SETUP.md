# GitHub Pages Deployment Guide for Rishi Films

Deploy your portfolio website **for free** on GitHub Pages in 10 simple steps.

---

## 📋 Prerequisites

- Your repository: `rishiram-ramachandran/rishi-flims`
- Node.js 18+ and npm installed locally
- Git installed and configured

---

## 🔧 Step-by-Step Setup

### **STEP 1: Update `astro.config.mjs` for GitHub Pages**

Your site needs to know its public URL on GitHub Pages.

1. Open `astro.config.mjs` in your editor
2. Update it to:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  // GitHub Pages will serve from: https://username.github.io/repo-name/
  // So we need to set the site URL and base path
  site: 'https://rishiram-ramachandran.github.io',
  base: '/rishi-flims',
  output: 'static',
});
```

**Why?** This tells Astro to:
- Generate absolute paths for all assets
- Prefix URLs with `/rishi-flims/` (your repository name)

---

### **STEP 2: Create GitHub Actions Workflow File**

This file will automatically build and deploy your site every time you push code.

1. Create the directory structure:
   ```
   .github/workflows/
   ```

2. Create a new file: `.github/workflows/deploy.yml`

3. Paste this content:

```yaml
name: Deploy to GitHub Pages

on:
  # Trigger on every push to the portfolio-website branch
  push:
    branches: [portfolio-website, main]
  
  # Allow manual deployment from Actions tab
  workflow_dispatch:

# Allow only one deployment at a time
concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Upload build artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

### **STEP 3: Commit the Updated Config**

1. Save the files you modified/created
2. Commit and push:

```bash
git add astro.config.mjs .github/workflows/deploy.yml
git commit -m "Configure GitHub Pages deployment with Astro"
git push origin portfolio-website
```

---

### **STEP 4: Enable GitHub Pages in Repository Settings**

1. Go to: **https://github.com/rishiram-ramachandran/rishi-flims/settings/pages**

2. Under **"Build and deployment"** section:
   - **Source:** Select `GitHub Actions` from the dropdown
   - (Leave other options as-is; GitHub Actions will handle the build)

3. Click **Save**

**Note:** If you see a dropdown option for "Deploy from a branch," make sure you select "GitHub Actions" instead.

---

### **STEP 5: Verify the Workflow Triggered**

1. Go to: **https://github.com/rishiram-ramachandran/rishi-flims/actions**

2. You should see a workflow run called **"Deploy to GitHub Pages"**

3. Click on it to view real-time build logs

4. Wait for the workflow to complete (usually 1-3 minutes)
   - ✅ Green checkmark = Success
   - ❌ Red X = Failed (check logs for errors)

---

### **STEP 6: Verify Deployment**

Once the workflow completes successfully:

1. Go back to: **https://github.com/rishiram-ramachandran/rishi-flims/settings/pages**

2. At the top, you should see:
   ```
   Your site is live at https://rishiram-ramachandran.github.io/rishi-flims/
   ```

3. Click the link to view your live site! 🎉

**Your portfolio is now publicly accessible!**

---

## 🔄 How to Update Your Site

After the initial setup, just push code changes and they'll deploy automatically:

```bash
# Make changes to your portfolio
# (e.g., add videos, update bio, change colors)

# Commit and push
git add .
git commit -m "Update portfolio with new videos"
git push origin portfolio-website
```

The GitHub Actions workflow will automatically:
1. Build your site
2. Deploy to GitHub Pages
3. Your changes go live in 2-3 minutes

---

## ⚙️ Troubleshooting

### **Workflow failed to build**

1. Go to **Actions** tab → click the failed workflow
2. Click the **"build"** job
3. Scroll through the logs to find the error
4. Common issues:
   - **Missing dependencies:** Run `npm install` locally and commit `package-lock.json`
   - **Node version mismatch:** Ensure `node-version: '18'` in `deploy.yml`

### **Site is live but styles/images look broken**

This usually means the `base: '/rishi-flims'` path isn't set correctly in `astro.config.mjs`.

**Fix:**
```javascript
export default defineConfig({
  site: 'https://rishiram-ramachandran.github.io',
  base: '/rishi-flims',  // ← Make sure this is set
  output: 'static',
});
```

Then push again.

### **Can't find deployment URL**

1. Go to: **https://github.com/rishiram-ramachandran/rishi-flims/settings/pages**
2. Scroll to **"Custom domain"** section (optional — only needed for custom domains)
3. The auto-generated URL is: `https://rishiram-ramachandran.github.io/rishi-flims/`

---

## 🌐 Optional: Use a Custom Domain

If you own a domain (like `rishifilms.com`), you can use it instead of the GitHub Pages URL.

### **To add a custom domain:**

1. Go to: **https://github.com/rishiram-ramachandran/rishi-flims/settings/pages**

2. Under **"Custom domain"**, enter your domain: `rishifilms.com`

3. Click **Save**

4. Go to your domain registrar (GoDaddy, Namecheap, etc.) and update DNS:
   - Add an `A` record pointing to GitHub's IP: `185.199.108.153`
   - Or add a `CNAME` record pointing to: `rishiram-ramachandran.github.io`

5. GitHub will verify the domain (usually 5-10 minutes)

6. Once verified, HTTPS will be automatic ✅

**Reference:** [GitHub Pages Custom Domain Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

## 📊 Verify Everything Works

### **Checklist:**
- ✅ Updated `astro.config.mjs` with site URL and base path
- ✅ Created `.github/workflows/deploy.yml`
- ✅ Pushed changes to `portfolio-website` branch
- ✅ Enabled GitHub Pages in repository settings
- ✅ Workflow completed successfully (green checkmark in Actions)
- ✅ Site is live at `https://rishiram-ramachandran.github.io/rishi-flims/`

---

## 🚀 Summary

**Your portfolio is now:**
- ✅ Hosted for **FREE** on GitHub Pages
- ✅ Auto-deploys on every push
- ✅ Fully HTTPS secured
- ✅ Lightning-fast (CDN-backed)
- ✅ No monthly hosting bills

Every time you update your portfolio (add videos, change copy, update photos), just push to `portfolio-website` and it goes live automatically!

---

## 📞 Need Help?

- **Build errors?** Check the Actions tab for detailed logs
- **Styles broken?** Verify `base: '/rishi-flims'` is set in `astro.config.mjs`
- **Site not updating?** Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- **GitHub Pages docs:** https://docs.github.com/en/pages
- **Astro deployment docs:** https://docs.astro.build/en/guides/deploy/

---

**Happy hosting! 🎬✨**
