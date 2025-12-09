# ⚡ Quick Start Guide - 3 Steps to Deploy

Get your Offshore Smart Hub PWA live on GitHub Pages in 3 simple steps!

## 📋 Prerequisites

- GitHub account
- Git installed on your computer (download from https://git-scm.com/)

---

## 🚀 3-Step Deployment

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `offshore-smart-hub` (or any name you prefer)
3. Set to **Public** or **Private** (both work with GitHub Pages)
4. ✅ **DO NOT** check "Add a README file"
5. Click "Create repository"

### Step 2: Push Your Code

Open Command Prompt (Windows) or Terminal (Mac/Linux) and run these commands:

```bash
# Navigate to the PWA folder
cd path/to/offshore-smart-hub-pwa

# Initialize git
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Offshore Smart Hub PWA"

# Add your GitHub repository (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Example:**
```bash
cd /Users/aziz/Documents/offshore-smart-hub-pwa
git init
git add .
git commit -m "Initial commit - Offshore Smart Hub PWA"
git remote add origin https://github.com/azizmohamad/offshore-smart-hub.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under "Source", select **main** branch
5. Click **Save**
6. Wait 1-2 minutes
7. Your app is live! 🎉

**Your URL will be:**
```
https://YOUR-USERNAME.github.io/REPO-NAME/
```

**Example:**
```
https://azizmohamad.github.io/offshore-smart-hub/
```

---

## 📱 Install on Your Device

### iPhone/iPad:
1. Open Safari and go to your GitHub Pages URL
2. Tap Share button → "Add to Home Screen"
3. Tap "Add" → App appears on home screen!

### Android:
1. Open Chrome and go to your GitHub Pages URL
2. Tap three dots → "Add to Home Screen"
3. Tap "Add" → App appears on home screen!

---

## 🔄 How to Update Your App

When you make changes:

```bash
# Navigate to your PWA folder
cd path/to/offshore-smart-hub-pwa

# Stage changes
git add .

# Commit changes
git commit -m "Updated calculators"

# Push to GitHub
git push
```

Changes will be live in 1-2 minutes!

---

## ✅ Verification Checklist

After deployment, check:
- [ ] App loads at your GitHub Pages URL
- [ ] All 4 tabs work (Home, MOB/DEMOB, Calculators, Reports)
- [ ] MOB/DEMOB links open correctly
- [ ] All 12 calculators work
- [ ] Report generator works
- [ ] Can install as PWA on phone
- [ ] Works offline after first load

---

## 🆘 Quick Troubleshooting

**Problem:** "git: command not found"
- **Solution:** Install Git from https://git-scm.com/

**Problem:** "Permission denied (publickey)"
- **Solution:** Use HTTPS URL, not SSH, or set up SSH keys

**Problem:** GitHub Pages shows 404
- **Solution:** Wait 2-3 minutes after enabling Pages, then hard refresh (Ctrl+Shift+R)

**Problem:** App doesn't work on phone
- **Solution:** Make sure you're using HTTPS URL (https://) not HTTP

---

## 💡 Pro Tips

1. **Bookmark the URL** on your phone for easy access
2. **Share the link** with your team via WhatsApp/email
3. **Update service worker version** in sw.js when making major changes
4. **Test on multiple devices** before sharing with team

---

## 🎯 What's Next?

See [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Detailed troubleshooting
- Custom domain setup
- Advanced PWA features
- Performance optimization

---

**Need help?** Contact your development team or refer to the full documentation.

🏢 **Offshore Smart Hub** - PETRONAS Offshore Operations
