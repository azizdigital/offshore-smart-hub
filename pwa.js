// ========================================
// PWA Installation & Features
// ========================================

let deferredPrompt;

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Handle Install Prompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install prompt
    const installPrompt = document.getElementById('installPrompt');
    if (installPrompt) {
        installPrompt.classList.remove('hidden');
    }
});

// Install Button Click
document.getElementById('installButton')?.addEventListener('click', async () => {
    if (!deferredPrompt) {
        alert('Installation not available. Please use browser menu to install.');
        return;
    }
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
        console.log('PWA installed');
    }
    
    deferredPrompt = null;
    dismissInstall();
});

// Dismiss Install Prompt
document.getElementById('dismissButton')?.addEventListener('click', () => {
    dismissInstall();
});

function dismissInstall() {
    const installPrompt = document.getElementById('installPrompt');
    if (installPrompt) {
        installPrompt.classList.add('hidden');
        localStorage.setItem('installDismissed', 'true');
    }
}

// Check if already dismissed
if (localStorage.getItem('installDismissed') === 'true') {
    const installPrompt = document.getElementById('installPrompt');
    if (installPrompt) {
        installPrompt.classList.add('hidden');
    }
}

// Handle successful installation
window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    dismissInstall();
    
    // Show success notification
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Offshore Smart Hub Installed', {
            body: 'App installed successfully! Access from your home screen.',
            icon: './icons/icon-192.png'
        });
    }
});

// Request notification permission
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted');
            }
        });
    }
}

// Call on page load
window.addEventListener('load', () => {
    // Request notification permission after 5 seconds
    setTimeout(requestNotificationPermission, 5000);
});

// Online/Offline Status
window.addEventListener('online', () => {
    console.log('Back online');
    showOnlineStatus(true);
});

window.addEventListener('offline', () => {
    console.log('Gone offline');
    showOnlineStatus(false);
});

function showOnlineStatus(isOnline) {
    // Could add visual indicator here
    if (!isOnline) {
        const message = document.createElement('div');
        message.style.cssText = 'position:fixed;top:60px;left:50%;transform:translateX(-50%);background:#ef4444;color:white;padding:12px 24px;border-radius:6px;z-index:1000;box-shadow:0 4px 12px rgba(0,0,0,0.2)';
        message.textContent = '📵 Offline Mode - Some features may be limited';
        document.body.appendChild(message);
        
        setTimeout(() => {
            document.body.removeChild(message);
        }, 3000);
    }
}

// Handle iOS standalone mode
if (window.navigator.standalone) {
    // App is running in standalone mode (iOS)
    console.log('Running in standalone mode');
}

// Check if running as PWA
function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone || 
           document.referrer.includes('android-app://');
}

if (isPWA()) {
    console.log('Running as PWA');
    // Hide install prompt if already installed
    dismissInstall();
}
