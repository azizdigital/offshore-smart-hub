# ⚡ Quick Start - 3 Steps to Deploy

## 🎯 Deploy to GitHub Pages in 3 Simple Steps

### Step 1: Create GitHub Repository

```bash
# Open Command Prompt or Terminal
cd path/to/offshore-smart-hub

# Initialize Git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Offshore Smart Hub PWA"
```

**On GitHub:**
1. Go to https://github.com/new
2. Repository name: `offshore-smart-hub`
3. Make it **Public** (required for GitHub Pages)
4. Click "Create repository"

### Step 2: Push to GitHub

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/offshore-smart-hub.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

**On GitHub:**
1. Go to your repository
2. Click "Settings"
3. Scroll to "Pages" (left sidebar)
4. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click "Save"

**Done! 🎉**

Your app will be live at:
```
https://YOUR_USERNAME.github.io/offshore-smart-hub/
```

⏱️ Wait 2-3 minutes for deployment

---

## 📱 Install on Device

### iPhone/iPad:
1. Open the URL in Safari
2. Tap Share → "Add to Home Screen"
3. Tap "Add"
4. Launch app from home screen

### Android:
1. Open the URL in Chrome
2. Tap "Install" banner
3. Confirm installation
4. Launch from home screen

---

## 🔄 Update Your App

```bash
# Make changes to files
# Then:

git add .
git commit -m "Update: describe your changes"
git push origin main

# Wait 2-3 minutes - changes will be live
```

---

## ⚠️ Common Issues

**"Failed to push"**
```bash
# If first time push fails:
git pull origin main --allow-unrelated-histories
git push origin main
```

**"Pages not showing"**
- Check repository is Public
- Wait 2-3 minutes after enabling Pages
- Try hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)

**"Can't install on iPhone"**
- Must use Safari browser (not Chrome)
- Check you're on HTTPS site
- Try closing and reopening Safari

---

## 🎓 Next Steps

1. Test all 12 calculators
2. Try handwriting feature (iPad + Apple Pencil)
3. Generate a sample safety report
4. Test MOB/DEMOB links
5. Try offline mode (airplane mode)

---

## 📚 More Help

- Detailed guide: [DEPLOYMENT.md](DEPLOYMENT.md)
- Full documentation: [README.md](README.md)
- GitHub Pages docs: https://docs.github.com/en/pages

---

**That's it! Your offshore operations hub is now live! 🚀**
