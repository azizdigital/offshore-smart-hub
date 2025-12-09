# 🛡️ Offshore Smart Hub

**Complete Progressive Web App for Offshore Operations Management**

## 📱 Features

### 🎫 One-Tap Mobilization
Quick access to PETRONAS MOB/DEMOB systems:
- Health Declaration Form (Pre-MOB)
- MyPET Check-In (Mobilization)
- MyPET Check-Out (Demobilization)
- Step-by-step workflow guide

### 🧮 Engineering Calculators (12 Total)
1. **Volume Conversion** - KLD ↔ KBD with shrinkage factor
2. **Universal Unit Converter** - Pressure, Temperature, Length
3. **Gas Flow Conversion** - km³/d ↔ mmscf/d
4. **Crude Oil Leak (Drop Rate)** - Drop rate analysis
5. **Natural Gas Leak** - Pin hole gas leak calculation
6. **Crude Oil Leak (Pin Hole)** - With reporting threshold
7. **Production Volume Loss** - Shutdown impact calculation
8. **Chemical Injection Rate** - Drum usage projection
9. **Drop Object Calculator** - Impact energy with PPE
10. **Crane Lifting Calculator** - Utilization & safety factor
11. **Fuel Consumption** - Turbine consumption projection
12. **Weather Impact Assessment** - Wind & wave operation limits

### 📄 Safety Reports
- Professional incident report generation
- **AI Refinement Feature** - Copy prompt + report for AI polishing
- Multiple incident types supported
- Download as .txt file
- Copy to clipboard
- **Apple Pencil Support** for handwriting notes (iPad)

### ✨ PWA Features
- ✅ Install to home screen (iOS & Android)
- ✅ Offline capability
- ✅ Push notifications
- ✅ App shortcuts
- ✅ Standalone app experience
- ✅ Background sync

## 🎨 Apple Pencil Support

**Handwriting Mode for Safety Reports:**
- Toggle between Type/Write modes with ✍️ button
- Color picker: Black, Blue, Red, Green
- Pen size: Fine, Medium, Thick
- Undo, Clear, and Save functions
- Pressure sensitivity support
- Saves as base64 images in localStorage

**Usage:**
1. Tap ✍️ button on any textarea
2. Write with Apple Pencil or finger
3. Choose colors and pen sizes
4. Tap "💾 Save" to convert to image
5. Switches back to type mode automatically

## 📦 Installation

### iPhone/iPad:
1. Open `index.html` in **Safari** (must use Safari!)
2. Tap Share button (□↑)
3. Select "Add to Home Screen"
4. Tap "Add"
5. Launch from home screen

### Android:
1. Open `index.html` in Chrome
2. Tap "Install" banner or menu → "Install app"
3. Confirm installation
4. Launch from home screen

## 🚀 Deployment to GitHub Pages

See [QUICKSTART.md](QUICKSTART.md) for 3-step deployment  
See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed guide

## 📁 Project Structure

```
offshore-smart-hub/
├── index.html          # Main HTML structure
├── styles.css          # All styling + responsive design
├── app.js              # Calculators + report functions
├── handwriting.js      # Apple Pencil module
├── pwa.js              # PWA installation features
├── sw.js               # Service worker (offline)
├── manifest.json       # PWA configuration
├── icons/              # App icons (180, 192, 512px)
│   ├── icon-180.png.svg
│   ├── icon-192.png.svg
│   ├── icon-512.png.svg
│   └── generate-icons.html
├── README.md           # This file
├── QUICKSTART.md       # 3-step deployment
└── DEPLOYMENT.md       # Detailed deployment guide
```

## 🔧 Technical Stack

- **HTML5** - Semantic structure
- **CSS3** - Gradients, animations, responsive
- **Vanilla JavaScript** - No frameworks
- **SignaturePad** - Handwriting support
- **Service Worker** - Offline capability
- **Web App Manifest** - PWA features

## 💡 Usage Tips

### Calculators:
- All work offline after first load
- Results show instantly
- Color-coded results (green=safe, red=warning)
- Custom values supported

### Safety Reports:
- Fill all required fields
- Use AI refinement for professional tone
- Reports suitable for WhatsApp/Email
- Handwriting notes preserved as images

### MOB/DEMOB:
- Requires internet (external links)
- Complete health declaration 24hrs before MOB
- Save bookmarks for quick access

## 🌐 Browser Support

- ✅ Safari (iOS 11.3+)
- ✅ Chrome (Android 40+)
- ✅ Edge, Firefox, Samsung Internet
- ✅ Desktop browsers

## 📱 Offline Functionality

**Works Offline:**
- All 12 calculators
- Report generation
- Handwriting canvas
- Home navigation

**Requires Online:**
- MOB/DEMOB external links
- Initial PWA installation
- Service worker update

## 🔒 Privacy

- No data sent to external servers
- Reports stay on device
- Handwriting stored in localStorage
- No tracking or analytics
- MOB/DEMOB links go to PETRONAS systems only

## 🛠️ Development

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/offshore-smart-hub.git

# Open locally
cd offshore-smart-hub
# Open index.html in browser

# Deploy to GitHub Pages
git add .
git commit -m "Initial deployment"
git push origin main
# Enable Pages in repository settings
```

## 📄 License

MIT License - Free for personal and commercial use

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test on iOS/Android
5. Submit pull request

## 📞 Support

For issues or questions:
- Open GitHub issue
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for troubleshooting
- Review browser console for errors

## 🎯 Roadmap

- [ ] Export reports as PDF
- [ ] More calculator types
- [ ] Dark mode
- [ ] Multi-language support (BM/EN)
- [ ] Offline report sync
- [ ] Report templates

## ⚡ Performance

- **Load Time:** < 2 seconds
- **Offline:** Full functionality
- **Storage:** ~5MB cache
- **Bundle Size:** < 500KB

## 🏆 Credits

Developed for PETRONAS Offshore Operations  
**Version:** 1.0.0  
**Last Updated:** December 2024

---

**Made with ❤️ for Offshore Teams**
