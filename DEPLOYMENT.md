# 📘 Deployment Guide - Offshore Smart Hub

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Setup](#local-setup)
3. [GitHub Pages Deployment](#github-pages-deployment)
4. [iOS Installation](#ios-installation)
5. [Android Installation](#android-installation)
6. [Updating the App](#updating-the-app)
7. [Troubleshooting](#troubleshooting)
8. [Advanced Configuration](#advanced-configuration)

---

## Prerequisites

✅ **Required:**
- GitHub account (free): https://github.com/signup
- Git installed: https://git-scm.com/downloads
- Text editor (VS Code recommended)
- Modern web browser

⚠️ **For iOS Installation:**
- iPhone or iPad
- Safari browser (required!)

⚠️ **For Android Installation:**
- Android device
- Chrome browser

---

## Local Setup

### 1. Download/Clone Repository

**Option A: Download ZIP**
```bash
# Extract ZIP to your computer
cd path/to/offshore-smart-hub
```

**Option B: Clone Repository**
```bash
git clone https://github.com/YOUR_USERNAME/offshore-smart-hub.git
cd offshore-smart-hub
```

### 2. Test Locally

1. Open `index.html` in your browser
2. Test navigation between sections
3. Try one calculator
4. Verify handwriting toggle appears

**Local testing works without internet after first load!**

---

## GitHub Pages Deployment

### Step-by-Step Process

#### 1. Initialize Git (if needed)

```bash
cd offshore-smart-hub
git init
```

#### 2. Add All Files

```bash
git add .
```

**Verify files added:**
```bash
git status
```

You should see:
- index.html
- styles.css
- app.js
- handwriting.js
- pwa.js
- sw.js
- manifest.json
- icons/ directory

#### 3. Commit Files

```bash
git commit -m "Initial commit: Offshore Smart Hub PWA v1.0"
```

#### 4. Create GitHub Repository

**On GitHub website:**

1. Click "+" → "New repository"
2. **Repository name:** `offshore-smart-hub`
3. **Visibility:** Public (required for free Pages)
4. ❌ **Do NOT** initialize with README
5. Click "Create repository"

#### 5. Link and Push

```bash
# Link to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/offshore-smart-hub.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**If prompted for credentials:**
- Use GitHub username
- Use Personal Access Token (not password!)
- Generate token: Settings → Developer Settings → Personal Access Tokens

#### 6. Enable GitHub Pages

**On repository page:**

1. Click **"Settings"** tab
2. Click **"Pages"** in left sidebar
3. Under **"Source":**
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **"Save"**
5. Wait 2-3 minutes

**Your site will be live at:**
```
https://YOUR_USERNAME.github.io/offshore-smart-hub/
```

#### 7. Verify Deployment

```bash
# Visit your URL
# Check browser console (F12) for errors
# Test PWA installation prompt
```

---

## iOS Installation

### Prerequisites
- Site must be on HTTPS (GitHub Pages is HTTPS)
- Must use Safari browser

### Installation Steps

1. **Open in Safari**
   - Go to your GitHub Pages URL
   - Use Safari browser (Chrome won't work!)

2. **Share Menu**
   - Tap Share button (□ with arrow)
   - Bottom center of screen

3. **Add to Home Screen**
   - Scroll down
   - Tap "Add to Home Screen"
   - May need to scroll in Share menu

4. **Customize Name (Optional)**
   - Default: "Offshore Hub"
   - Edit if desired
   - Tap "Add"

5. **Launch App**
   - Find icon on home screen
   - Tap to launch in full screen
   - No Safari UI visible

### iOS Verification
- ✅ App opens in standalone mode
- ✅ No browser address bar
- ✅ Splash screen appears
- ✅ Offline mode works (airplane mode)

---

## Android Installation

### Prerequisites
- Site must be on HTTPS
- Chrome or Edge browser

### Installation Steps

1. **Open in Chrome**
   - Visit GitHub Pages URL
   - Use Chrome browser

2. **Install Prompt**
   - Banner appears automatically
   - Or tap menu (⋮) → "Install app"

3. **Confirm Installation**
   - Tap "Install" button
   - App added to home screen

4. **Launch App**
   - Find "Offshore Hub" icon
   - Tap to launch
   - Runs as standalone app

### Android Verification
- ✅ Appears in app drawer
- ✅ Can be uninstalled like normal app
- ✅ Offline works
- ✅ Push notifications (if enabled)

---

## Updating the App

### Make Changes Locally

1. Edit files in your local folder
2. Test changes in browser
3. Verify everything works

### Push Updates

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Update: Added new feature XYZ"

# Push to GitHub
git push origin main
```

### Propagation
- GitHub Pages updates in 2-3 minutes
- Users see updates on next app load
- Force refresh: Close and reopen app

### Version Control Best Practices

```bash
# Check current status
git status

# View commit history
git log --oneline

# Create feature branch
git checkout -b new-feature

# Merge feature back
git checkout main
git merge new-feature
```

---

## Troubleshooting

### GitHub Pages Issues

**Problem: Site not showing**

```bash
# Check if Pages is enabled
# Repository → Settings → Pages → Should show URL

# Verify files pushed
git log

# Check GitHub Pages build status
# Repository → Actions tab
```

**Problem: 404 Error**

- Verify repository is Public
- Check GitHub Pages source is set to `main` branch
- Wait full 5 minutes after enabling
- Try incognito mode

**Problem: Changes not updating**

```bash
# Force users to refresh
# Increment version in manifest.json
# Update CACHE_NAME in sw.js

# Example:
# Change: offshore-smart-hub-v1
# To: offshore-smart-hub-v2
```

### iOS Installation Issues

**Problem: "Add to Home Screen" not showing**

- Must use Safari browser
- Must be on HTTPS site
- Try force-quit Safari and reopen
- Check if already installed

**Problem: App not opening full screen**

- Verify manifest.json has `"display": "standalone"`
- Check apple-mobile-web-app-capable meta tag
- Reinstall the app

**Problem: Handwriting not working**

- Verify SignaturePad library loads
- Check browser console for errors
- Test in regular Safari first
- Try different pen sizes

### Android Installation Issues

**Problem: No install prompt**

- Clear Chrome cache
- Visit in incognito mode
- Check manifest.json is accessible
- Verify HTTPS

**Problem: App crashes**

- Check browser console
- Verify all files loaded
- Test in Chrome desktop first
- Clear app data and reinstall

### Calculator Issues

**Problem: Calculations not working**

```javascript
// Check browser console (F12)
// Look for JavaScript errors
// Verify app.js loaded correctly
```

**Problem: Custom inputs not showing**

```javascript
// Check event listeners in app.js
// Verify select elements have correct IDs
// Test in desktop browser first
```

### Offline Issues

**Problem: Offline mode not working**

```bash
# Check service worker registered
# Browser console → Application → Service Workers

# Verify sw.js is accessible
# Visit: https://YOUR_SITE/sw.js

# Check cache storage
# Browser console → Application → Cache Storage
```

**Problem: Updates not showing**

```javascript
// Users may need to:
// 1. Close app completely
// 2. Wait 5 minutes
// 3. Reopen app

// Or force update service worker:
// In sw.js, increment CACHE_NAME
```

---

## Advanced Configuration

### Custom Domain

**Add custom domain to GitHub Pages:**

1. Buy domain (e.g., offshore-hub.com)
2. Repository → Settings → Pages
3. Add custom domain
4. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153 (GitHub IP)
   
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```

### PWA Customization

**Modify manifest.json:**

```json
{
  "name": "Your Custom Name",
  "short_name": "Custom",
  "theme_color": "#YOUR_COLOR",
  "background_color": "#YOUR_BG"
}
```

**Update service worker cache:**

```javascript
// In sw.js
const CACHE_NAME = 'your-app-v2'; // Increment version

// Add more files to cache
const urlsToCache = [
  './',
  './index.html',
  // Add more files
];
```

### Analytics Integration

**Add Google Analytics (optional):**

```html
<!-- In index.html <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Push Notifications Setup

```javascript
// Request permission
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    // Subscribe to push notifications
    // Requires backend service
  }
});
```

---

## Security Considerations

### HTTPS Only
- GitHub Pages is HTTPS by default
- Required for PWA features
- Required for geolocation, camera, etc.

### Content Security Policy

```html
<!-- Add to index.html <head> -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; 
               style-src 'self' 'unsafe-inline';">
```

### LocalStorage Security
- Handwriting stored locally
- Sensitive data should be encrypted
- Clear on logout/uninstall

---

## Performance Optimization

### Reduce Bundle Size

```bash
# Minify CSS
# Use online tools or:
npm install -g clean-css-cli
cleancss -o styles.min.css styles.css

# Minify JavaScript
npm install -g terser
terser app.js -c -m -o app.min.js
```

### Image Optimization

```bash
# Compress icons
# Use online tools:
# - TinyPNG
# - Squoosh
# Target: < 50KB per icon
```

### Lazy Loading

```javascript
// Load heavy resources on demand
// Example: SignaturePad only when needed
```

---

## Monitoring & Maintenance

### Check Service Worker

```javascript
// Browser console
navigator.serviceWorker.getRegistrations().then(registrations => {
  console.log('Registrations:', registrations);
});
```

### Clear All Cache

```javascript
// For testing
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});
```

### View App Storage

```
Browser Dev Tools:
F12 → Application tab
- Service Workers
- Cache Storage
- Local Storage
- Session Storage
```

---

## Support Resources

### Official Documentation
- PWA: https://web.dev/progressive-web-apps/
- Service Workers: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- Web App Manifest: https://developer.mozilla.org/en-US/docs/Web/Manifest
- GitHub Pages: https://docs.github.com/en/pages

### Testing Tools
- Lighthouse: Chrome DevTools → Lighthouse
- PWA Builder: https://www.pwabuilder.com/
- Manifest Validator: https://manifest-validator.appspot.com/

### Community
- GitHub Issues: Report bugs
- Stack Overflow: Technical questions
- MDN Web Docs: Reference documentation

---

## Checklist Before Going Live

- [ ] Test all 12 calculators
- [ ] Verify handwriting works (iPad)
- [ ] Test MOB/DEMOB links
- [ ] Generate sample safety report
- [ ] Test offline mode (airplane mode)
- [ ] Install on iOS device
- [ ] Install on Android device
- [ ] Check service worker registered
- [ ] Verify all icons load
- [ ] Test AI refinement feature
- [ ] Check responsive design (mobile/tablet)
- [ ] Review browser console for errors

---

**Your offshore operations hub is ready to deploy! 🚀**

For questions or issues, refer to [README.md](README.md) or open a GitHub issue.
