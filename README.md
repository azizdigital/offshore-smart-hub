# 🏢 Offshore Smart Hub PWA

Complete offshore operations companion for PETRONAS installations - optimized for iPhone, iPad, and Android devices.

## 📱 Features

### MOB/DEMOB System
- **Health Declaration Form** - Complete health screening before mobilization
- **MyPET Check-In** - KTSB entrance registration (ep-ktsb-e-1)
- **MyPET Check-Out** - KTSB exit registration (ep-ktsb-e-2)

### 12 Engineering Calculators
1. **Volume Conversion** - KLD ↔ KBD with shrinkage factor
2. **Universal Unit Converter** - Pressure, temperature, length conversions
3. **Gas Flow Conversion** - km³/d ↔ mmscf/d
4. **Crude Oil Leak (Drop Rate)** - Calculate leak rate from drops per minute
5. **Natural Gas Leak** - Pin hole leak calculations
6. **Crude Oil Leak (Pin Hole)** - With LOPC tier classification
7. **Production Volume Loss** - Calculate production loss from downtime
8. **Chemical Injection Rate** - Drum requirements calculation
9. **Drop Object Calculator** - Impact energy with PPE factors
10. **Crane Lifting Calculator** - Safe load calculations for platform cranes
11. **Fuel Consumption** - Turbine fuel requirements
12. **Weather Impact** - Operation limits for wind and waves

### Safety Report Generator
- 5 report types: LOPC, Emergency/Fire Alarm, Medical Case, Near Miss, Incident/Accident
- 3 platforms: Irong Barat A, B, C
- WhatsApp-ready format with proper formatting
- AI refinement option (650 words max)
- One-click copy to clipboard
- **Handwriting support with Apple Pencil**:
  - Toggle between Type/Write modes
  - Color picker (Black, Blue, Red, Green)
  - Pen size options (Fine, Medium, Thick)
  - Undo, Clear, and Save functions
  - Pressure sensitivity support
  - Saves as base64 images in localStorage

## 🚀 Installation

### For iPhone/iPad:
1. Open Safari and navigate to the app URL
2. Tap the Share button (box with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" in the top right corner
5. App icon will appear on your home screen

### For Android:
1. Open Chrome and navigate to the app URL
2. Tap the three dots menu
3. Tap "Add to Home Screen"
4. Tap "Add"
5. App icon will appear on your home screen

## 💻 Platform Coverage

- **Irong Barat A (IbA)** - 40T & 9T cranes
- **Irong Barat B (IbB)** - 13T crane
- **Irong Barat C (IbC)** - 13T crane

## 🔧 Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Responsive design with minimalist blue theme
- **Vanilla JavaScript** - No dependencies, lightweight
- **PWA** - Service Worker for offline functionality
- **Mobile-First** - Optimized for touch devices

## 📊 Calculator Details

### LOPC Classification (Oil Leak Pin Hole)
- **Tier 1 Major**: ≥2000 kg
- **Tier 2 Reportable**: ≥200 kg
- **Minor Reportable**: ≥100 kg
- **Reportable (≥10L)**: ≥10 liters
- **Below Threshold**: <100 kg AND <10L

### Drop Object Risk Levels
- **Low Risk**: <50 J
- **Medium Risk**: 50-200 J
- **High Risk**: 200-500 J
- **Fatal Risk**: ≥500 J

### Weather Limits
- **Helicopter Ops**: 35 knots wind, 3m waves
- **Boat Transfer**: 25 knots wind, 2.5m waves
- **Crane Operations**: 20 knots wind, 2m waves
- **Diving Operations**: 15 knots wind, 1.5m waves

## 📝 Report Template

Reports are generated in WhatsApp format with:
- Bold headers using asterisks (*)
- Structured sections (Title, Date, Platform, Description, Action, Way Forward)
- Auto-formatted date (DD/MM/YYYY)
- Auto-signature with platform code

## 🔒 Offline Functionality

The PWA includes a service worker that caches:
- All HTML, CSS, and JavaScript files
- App icons and manifest
- Works completely offline after first load

## 👨‍💼 Developed For

**PETRONAS Offshore Operations**  
Offshore Installation Manager Tool

## 📄 License

Developed for internal PETRONAS use.

## 🤝 Support

For issues or feature requests, contact the development team.

---

**Version:** 1.0.0  
**Last Updated:** December 2024  
**Developer:** Aziz Mohamad - OIM
