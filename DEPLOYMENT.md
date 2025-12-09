# 📦 Deployment Guide - Offshore Smart Hub PWA

Complete deployment guide for GitHub Pages with troubleshooting and advanced configuration.

## 📑 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [GitHub Pages Deployment](#github-pages-deployment)
4. [PWA Installation](#pwa-installation)
5. [Updating Your App](#updating-your-app)
6. [Troubleshooting](#troubleshooting)
7. [Advanced Configuration](#advanced-configuration)

---

## Prerequisites

### Required Software
- **Git** (version 2.0 or higher)
  - Download: https://git-scm.com/
  - Verify: `git --version`

- **GitHub Account**
  - Sign up: https://github.com/join

### Optional but Recommended
- **Text Editor** (VS Code, Notepad++, etc.)
- **Modern Browser** (Chrome, Safari, Firefox)

---

## Initial Setup

### 1. Prepare Your Files

Your PWA folder should contain:
```
offshore-smart-hub-pwa/
├── index.html          ✅
├── styles.css          ✅
├── app.js              ✅
├── manifest.json       ✅
├── sw.js               ✅
├── icons/
│   ├── icon-192.png    ✅
│   └── icon-512.png    ✅
├── README.md           ✅
├── QUICKSTART.md       ✅
└── DEPLOYMENT.md       ✅
```

### 2. Verify File Paths

All paths in the files use **relative paths** with `./`:
- ✅ `./index.html`
- ✅ `./styles.css`
- ✅ `./icons/icon-192.png`

**This is critical for GitHub Pages subdirectory deployment!**

---

## GitHub Pages Deployment

### Method 1: Command Line (Recommended)

#### Step 1: Initialize Git Repository

```bash
# Navigate to your PWA folder
cd /path/to/offshore-smart-hub-pwa

# Initialize git
git init

# Check status
git status
```

#### Step 2: Configure Git (First Time Only)

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"

# Verify
git config --list
```

#### Step 3: Stage and Commit Files

```bash
# Add all files
git add .

# Verify files are staged
git status

# Commit with message
git commit -m "Initial commit: Offshore Smart Hub PWA v1.0"
```

#### Step 4: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `offshore-smart-hub`
3. Description: "Offshore Smart Hub PWA for PETRONAS Operations"
4. **Public** or **Private** (your choice)
5. **DO NOT** initialize with README
6. Click "Create repository"

#### Step 5: Push to GitHub

```bash
# Add remote (replace YOUR-USERNAME and offshore-smart-hub)
git remote add origin https://github.com/YOUR-USERNAME/offshore-smart-hub.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**If prompted for credentials:**
- Username: Your GitHub username
- Password: Use a [Personal Access Token](https://github.com/settings/tokens), not your password

#### Step 6: Enable GitHub Pages

1. Go to `https://github.com/YOUR-USERNAME/offshore-smart-hub`
2. Click **Settings** tab
3. Scroll down to **Pages** in left sidebar
4. Under **Source**:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 1-3 minutes for deployment

#### Step 7: Verify Deployment

Your app will be available at:
```
https://YOUR-USERNAME.github.io/offshore-smart-hub/
```

**First-time deployment may take 2-5 minutes.**

---

### Method 2: GitHub Desktop (GUI)

1. **Download GitHub Desktop**: https://desktop.github.com/
2. **Clone Repository**: File → Add Local Repository
3. **Select Folder**: Choose your `offshore-smart-hub-pwa` folder
4. **Commit Changes**: Enter message → Commit to main
5. **Publish**: Click "Publish repository"
6. **Enable Pages**: Go to Settings on GitHub.com

---

## PWA Installation

### iPhone/iPad (iOS 13+)

1. **Open in Safari** (must be Safari, not Chrome!)
   ```
   https://YOUR-USERNAME.github.io/offshore-smart-hub/
   ```

2. **Tap Share Button** (box with arrow pointing up)

3. **Scroll down** → Tap "Add to Home Screen"

4. **Customize Name** (optional)
   - Default: "Offshore Smart Hub"
   - Can change to "OSH" for shorter name

5. **Tap "Add"** in top right

6. **Icon appears** on home screen!

**Features on iOS:**
- ✅ Fullscreen mode (no browser UI)
- ✅ App icon on home screen
- ✅ Offline functionality
- ✅ Splash screen on launch
- ❌ No Apple Pencil in PWA (use Safari for handwriting)

### Android (Chrome)

1. **Open in Chrome**
   ```
   https://YOUR-USERNAME.github.io/offshore-smart-hub/
   ```

2. **Tap 3-dot menu** (top right)

3. **Tap "Add to Home Screen"**

4. **Tap "Add"** on dialog

5. **Icon appears** on home screen!

**Features on Android:**
- ✅ Fullscreen mode
- ✅ App icon
- ✅ Offline functionality
- ✅ Install prompt banner

### Desktop (Chrome/Edge)

1. **Open in Chrome/Edge**

2. **Look for install icon** in address bar (⊕ or computer icon)

3. **Click icon** → "Install"

4. **App opens in window**

---

## Updating Your App

### Making Changes

1. **Edit files locally** (index.html, styles.css, app.js, etc.)

2. **Test changes locally**
   - Open index.html in browser
   - Test all features

3. **Update service worker cache version** (important!)
   ```javascript
   // In sw.js, change:
   const CACHE_NAME = 'offshore-smart-hub-v1';
   // to:
   const CACHE_NAME = 'offshore-smart-hub-v2';
   ```

### Deploying Updates

```bash
# Navigate to your folder
cd /path/to/offshore-smart-hub-pwa

# Check what changed
git status

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Fixed calculator #6 - added 10L threshold check"

# Push to GitHub
git push

# Changes live in 1-2 minutes!
```

### Force Update on User Devices

Users' devices will auto-update when:
1. They close and reopen the app
2. Service worker detects new version
3. Cache expires (24 hours default)

**Force immediate update:**
- Change service worker version number
- Users must close and reopen app

---

## Troubleshooting

### Git Issues

#### "git: command not found"
**Solution:**
```bash
# Install Git
# Windows: Download from https://git-scm.com/
# Mac: Install Xcode Command Line Tools
xcode-select --install
# Linux: 
sudo apt-get install git
```

#### "fatal: not a git repository"
**Solution:**
```bash
# Make sure you're in the right folder
pwd
# Initialize git
git init
```

#### "Permission denied (publickey)"
**Solution:**
```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/YOUR-USERNAME/offshore-smart-hub.git

# Or create SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"
# Then add to GitHub: Settings → SSH Keys
```

#### "Updates were rejected"
**Solution:**
```bash
# Pull first, then push
git pull origin main --rebase
git push
```

### GitHub Pages Issues

#### "404 Page Not Found"
**Possible causes:**
1. GitHub Pages not enabled yet
2. Wrong URL (check Settings → Pages for correct URL)
3. Deployment in progress (wait 2-3 minutes)

**Solution:**
```bash
# Check repository settings
# Verify GitHub Pages is enabled
# Wait 3-5 minutes
# Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
```

#### "Blank page loads"
**Solution:**
```bash
# Check browser console (F12)
# Look for file path errors
# Verify all paths use ./ (relative)
# Example: ./styles.css not /styles.css
```

#### "CSS not loading"
**Solution:**
1. Check manifest.json paths
2. Check index.html link tags
3. Clear browser cache (Ctrl+Shift+Delete)

### PWA Issues

#### "Can't install on iPhone"
**Solution:**
- ✅ Must use Safari browser (not Chrome/Firefox)
- ✅ Must be HTTPS (GitHub Pages uses HTTPS)
- ✅ Must have manifest.json
- ✅ Wait for page to fully load before attempting install

#### "Offline mode not working"
**Solution:**
```javascript
// Check sw.js is registered
// Open browser console (F12)
// Look for: "Service Worker registered successfully"

// If not registered, check:
// 1. File named sw.js (not sw.js.txt)
// 2. File in root directory
// 3. HTTPS connection (required for service workers)
```

#### "App doesn't update with new changes"
**Solution:**
```javascript
// 1. Update cache version in sw.js
const CACHE_NAME = 'offshore-smart-hub-v2'; // increment

// 2. Users must close and reopen app

// 3. Or unregister service worker in browser console:
navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
        registration.unregister();
    }
});
```

---

## Advanced Configuration

### Custom Domain

Instead of `username.github.io/repo-name`, use your own domain:

1. **Buy domain** (e.g., `offshore-smart-hub.com`)

2. **Add CNAME file** to repository:
   ```bash
   echo "offshore-smart-hub.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

3. **Configure DNS** with your domain provider:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   ```

4. **Enable HTTPS** in GitHub Pages settings

### Subdirectory Deployment

If deploying to a subdirectory (e.g., `/apps/offshore-smart-hub/`):

**Already configured!** All paths use `./` which works in any directory.

### Performance Optimization

#### 1. Enable Gzip Compression
GitHub Pages automatically gzips files.

#### 2. Optimize Icons
```bash
# Use image optimization tools
# Current icons are already optimized (< 25KB total)
```

#### 3. Cache Strategy
```javascript
// In sw.js, adjust cache strategy:
// Current: Cache First (fastest)
// Alternative: Network First (always fresh)
```

### Analytics Integration

Add Google Analytics to track usage:

```html
<!-- Add to index.html before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA-XXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA-XXXXXX');
</script>
```

---

## Security Best Practices

### 1. HTTPS Only
✅ GitHub Pages automatically uses HTTPS

### 2. Content Security Policy
Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self' https://osis.petronas.com https://qrscan.up.petronas.com; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'">
```

### 3. No Sensitive Data
- ✅ No passwords or API keys in code
- ✅ Links to external PETRONAS systems use HTTPS

---

## Backup & Version Control

### Regular Backups

```bash
# Create backup branch
git checkout -b backup-dec2024
git push origin backup-dec2024

# Return to main
git checkout main
```

### Tagging Releases

```bash
# Tag current version
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# List all tags
git tag
```

---

## Support & Resources

### GitHub Pages Documentation
- https://docs.github.com/en/pages

### PWA Documentation
- https://web.dev/progressive-web-apps/

### Git Documentation
- https://git-scm.com/doc

### Testing Tools
- Lighthouse (Chrome DevTools)
- PWA Builder (https://www.pwabuilder.com/)

---

## Checklist: Pre-Deployment

- [ ] All files present (HTML, CSS, JS, manifest, icons)
- [ ] All paths use relative format (`./`)
- [ ] Service worker cache version set
- [ ] Tested locally in browser
- [ ] Git initialized and committed
- [ ] GitHub repository created
- [ ] README updated with correct URLs

## Checklist: Post-Deployment

- [ ] GitHub Pages enabled
- [ ] App loads at correct URL
- [ ] All 4 tabs work correctly
- [ ] All 12 calculators function
- [ ] MOB/DEMOB links open
- [ ] Report generator works
- [ ] Can install as PWA on mobile
- [ ] Offline mode works
- [ ] Tested on multiple devices

---

**Questions or issues?** Refer to the troubleshooting section or contact your development team.

🏢 **Offshore Smart Hub** - PETRONAS Offshore Operations  
**Version:** 1.0.0  
**Last Updated:** December 2024
