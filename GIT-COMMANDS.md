# 🔧 Git Commands Quick Reference

Essential Git commands for deploying and updating your Offshore Smart Hub PWA.

## 🚀 Initial Deployment

```bash
# 1. Navigate to your PWA folder
cd /path/to/offshore-smart-hub-pwa

# 2. Initialize Git
git init

# 3. Configure Git (first time only)
git config --global user.name "Aziz Mohamad"
git config --global user.email "your.email@example.com"

# 4. Add all files
git add .

# 5. Commit
git commit -m "Initial commit: Offshore Smart Hub PWA v1.0"

# 6. Add GitHub remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/offshore-smart-hub.git

# 7. Push to GitHub
git branch -M main
git push -u origin main
```

## 🔄 Updating Your App

```bash
# 1. Make changes to files (index.html, app.js, etc.)

# 2. Check what changed
git status

# 3. See detailed changes
git diff

# 4. Add changed files
git add .

# 5. Commit with descriptive message
git commit -m "Fixed oil leak calculator - added 10L threshold"

# 6. Push to GitHub
git push

# Done! Changes live in 1-2 minutes
```

## 📋 Common Commands

### Check Status
```bash
git status                  # See changed files
git log --oneline          # See commit history
git remote -v              # See remote repository
```

### Undo Changes
```bash
git checkout -- filename   # Undo changes to a file
git reset HEAD filename    # Unstage a file
git reset --hard HEAD      # Undo all uncommitted changes (CAREFUL!)
```

### View Changes
```bash
git diff                   # See uncommitted changes
git diff --staged          # See staged changes
git show                   # Show last commit
```

### Branches
```bash
git branch                 # List branches
git branch backup-dec2024  # Create new branch
git checkout backup-dec2024 # Switch to branch
git checkout main          # Switch back to main
```

### Tags
```bash
git tag                    # List tags
git tag -a v1.0.0 -m "Version 1.0.0"  # Create tag
git push origin v1.0.0     # Push tag to GitHub
```

## 🆘 Troubleshooting Commands

### Fix Remote URL
```bash
# Change from SSH to HTTPS
git remote set-url origin https://github.com/YOUR-USERNAME/offshore-smart-hub.git

# Verify
git remote -v
```

### Pull Latest Changes
```bash
# If someone else made changes
git pull origin main
```

### Force Push (USE CAREFULLY!)
```bash
# Only if you know what you're doing
git push --force
```

### Reset to Last Commit
```bash
# Undo all uncommitted changes
git reset --hard HEAD

# Go back to previous commit
git reset --hard HEAD~1
```

## 📱 Workflow Examples

### Example 1: Fix a Calculator Bug
```bash
# 1. Fix the bug in app.js
# 2. Test locally
# 3. Update service worker version in sw.js

git add .
git commit -m "Fix: Calculator #6 now checks 10L threshold"
git push

# Done! Update live in 1-2 minutes
```

### Example 2: Update Multiple Files
```bash
# 1. Update styles.css for new color
# 2. Update index.html for new layout
# 3. Update app.js for new feature

git add .
git commit -m "Update: New blue theme and improved layout"
git push
```

### Example 3: Create Backup Before Big Change
```bash
# Create backup branch
git checkout -b backup-before-major-update
git push origin backup-before-major-update

# Go back to main
git checkout main

# Make your changes
# ... edit files ...

git add .
git commit -m "Major update: Added new calculator"
git push
```

## 🔐 Authentication

### Personal Access Token (Recommended)

If GitHub asks for password:

1. Don't use your GitHub password!
2. Create Personal Access Token:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scopes: `repo` (full control)
   - Copy token (save it somewhere safe!)
3. Use token as password when pushing

### Save Credentials (Optional)
```bash
# Cache credentials for 1 hour
git config --global credential.helper 'cache --timeout=3600'

# Or store permanently (less secure)
git config --global credential.helper store
```

## 📊 Useful Aliases

Add these to make commands shorter:

```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.last 'log -1 HEAD'

# Now you can use:
git st        # instead of git status
git co main   # instead of git checkout main
git br        # instead of git branch
```

## 🎯 Pre-Push Checklist

Before `git push`, always:

- [ ] Test changes locally
- [ ] Update service worker version if needed
- [ ] Check `git status` - no unexpected files
- [ ] Write clear commit message
- [ ] Pull latest changes if working with team

## 💡 Tips

1. **Commit Often**: Small commits are easier to track
2. **Clear Messages**: "Fix calculator" < "Fix oil leak 10L threshold in calculator #6"
3. **Test First**: Always test locally before pushing
4. **Backup**: Create backup branches before major changes
5. **Pull Before Push**: If working with team, always pull first

---

**Need more help?**
- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com/

🏢 **Offshore Smart Hub** - PETRONAS Offshore Operations
