// ========================================
// Handwriting Module with Apple Pencil Support
// Uses SignaturePad library
// ========================================

const handwritingState = {};

function toggleHandwriting(fieldId) {
    const textarea = document.getElementById(fieldId);
    const canvasContainer = document.getElementById(`canvas-${fieldId}`);
    
    if (!textarea || !canvasContainer) return;
    
    // Toggle visibility
    const isHidden = canvasContainer.classList.contains('hidden');
    
    if (isHidden) {
        // Show canvas
        canvasContainer.classList.remove('hidden');
        textarea.style.display = 'none';
        
        // Initialize canvas if not already done
        if (!handwritingState[fieldId]) {
            initializeCanvas(fieldId);
        }
    } else {
        // Hide canvas and show textarea
        canvasContainer.classList.add('hidden');
        textarea.style.display = 'block';
    }
}

function initializeCanvas(fieldId) {
    const canvasContainer = document.getElementById(`canvas-${fieldId}`);
    
    // Create canvas controls
    const controls = document.createElement('div');
    controls.className = 'canvas-controls';
    controls.innerHTML = `
        <button class="color-btn" data-color="#000000" style="background:#000000" title="Black"></button>
        <button class="color-btn" data-color="#0000FF" style="background:#0000FF" title="Blue"></button>
        <button class="color-btn" data-color="#FF0000" style="background:#FF0000" title="Red"></button>
        <button class="color-btn" data-color="#00FF00" style="background:#00FF00" title="Green"></button>
        <span style="width:12px"></span>
        <button class="size-btn" data-size="1" title="Fine">Fine</button>
        <button class="size-btn active" data-size="2" title="Medium">Medium</button>
        <button class="size-btn" data-size="3" title="Thick">Thick</button>
        <span style="flex:1"></span>
        <button class="btn btn-secondary" onclick="undoHandwriting('${fieldId}')">↶ Undo</button>
        <button class="btn btn-warning" onclick="clearHandwriting('${fieldId}')">✕ Clear</button>
        <button class="btn btn-success" onclick="saveHandwriting('${fieldId}')">💾 Save</button>
        <button class="btn btn-info" onclick="toggleHandwriting('${fieldId}')">⌨️ Type</button>
    `;
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.id = `canvas-element-${fieldId}`;
    canvas.width = canvasContainer.offsetWidth || 600;
    canvas.height = 300;
    
    // Add to container
    canvasContainer.appendChild(controls);
    canvasContainer.appendChild(canvas);
    
    // Initialize SignaturePad
    const signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgb(255, 255, 255)',
        penColor: '#000000',
        minWidth: 1,
        maxWidth: 2,
        throttle: 0, // No throttle for better Apple Pencil support
        minDistance: 0, // Capture all points for pressure sensitivity
        velocityFilterWeight: 0.7
    });
    
    // Store state
    handwritingState[fieldId] = {
        pad: signaturePad,
        canvas: canvas,
        color: '#000000',
        size: 2,
        history: []
    };
    
    // Save initial state
    saveState(fieldId);
    
    // Setup event listeners
    setupCanvasControls(fieldId);
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        resizeCanvas(fieldId);
    });
    
    // Mark first color button as active
    controls.querySelector('.color-btn[data-color="#000000"]').classList.add('active');
}

function setupCanvasControls(fieldId) {
    const state = handwritingState[fieldId];
    const canvasContainer = document.getElementById(`canvas-${fieldId}`);
    
    // Color buttons
    canvasContainer.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const color = this.dataset.color;
            state.color = color;
            state.pad.penColor = color;
            
            // Update active state
            canvasContainer.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Size buttons
    canvasContainer.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const size = parseInt(this.dataset.size);
            state.size = size;
            
            // Set pen width based on size
            if (size === 1) {
                state.pad.minWidth = 0.5;
                state.pad.maxWidth = 1;
            } else if (size === 2) {
                state.pad.minWidth = 1;
                state.pad.maxWidth = 2;
            } else {
                state.pad.minWidth = 2;
                state.pad.maxWidth = 4;
            }
            
            // Update active state
            canvasContainer.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Save state after each stroke
    state.pad.addEventListener('endStroke', () => {
        saveState(fieldId);
    });
}

function saveState(fieldId) {
    const state = handwritingState[fieldId];
    if (!state) return;
    
    const data = state.pad.toData();
    state.history.push(JSON.parse(JSON.stringify(data)));
    
    // Limit history to 20 states
    if (state.history.length > 20) {
        state.history.shift();
    }
}

function undoHandwriting(fieldId) {
    const state = handwritingState[fieldId];
    if (!state) return;
    
    if (state.history.length > 1) {
        state.history.pop(); // Remove current state
        const previousState = state.history[state.history.length - 1];
        state.pad.fromData(previousState);
    } else {
        clearHandwriting(fieldId);
    }
}

function clearHandwriting(fieldId) {
    const state = handwritingState[fieldId];
    if (!state) return;
    
    if (confirm('Clear all handwriting?')) {
        state.pad.clear();
        state.history = [];
        saveState(fieldId);
    }
}

function saveHandwriting(fieldId) {
    const state = handwritingState[fieldId];
    const textarea = document.getElementById(fieldId);
    
    if (!state || !textarea) return;
    
    if (state.pad.isEmpty()) {
        alert('Please write something first');
        return;
    }
    
    // Convert to base64 image
    const dataURL = state.canvas.toDataURL('image/png');
    
    // Store in localStorage
    const storageKey = `handwriting_${fieldId}_${Date.now()}`;
    try {
        localStorage.setItem(storageKey, dataURL);
        
        // Add reference to textarea
        const currentText = textarea.value;
        const imageRef = `\n\n[Handwritten Note: ${storageKey}]\n`;
        textarea.value = currentText + imageRef;
        
        alert('✓ Handwriting saved! Switching to type mode.');
        
        // Switch back to textarea
        toggleHandwriting(fieldId);
    } catch (e) {
        alert('Failed to save handwriting. Storage may be full.');
        console.error(e);
    }
}

function resizeCanvas(fieldId) {
    const state = handwritingState[fieldId];
    if (!state) return;
    
    const canvasContainer = document.getElementById(`canvas-${fieldId}`);
    const data = state.pad.toData();
    
    // Resize canvas
    state.canvas.width = canvasContainer.offsetWidth;
    
    // Restore data
    state.pad.fromData(data);
}

// Export base64 images for report generation
function getHandwritingImages() {
    const images = {};
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('handwriting_')) {
            images[key] = localStorage.getItem(key);
        }
    });
    return images;
}

// Clear old handwriting data (cleanup)
function cleanupOldHandwriting(daysOld = 7) {
    const now = Date.now();
    const maxAge = daysOld * 24 * 60 * 60 * 1000;
    
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('handwriting_')) {
            const timestamp = parseInt(key.split('_').pop());
            if (now - timestamp > maxAge) {
                localStorage.removeItem(key);
            }
        }
    });
}

// Auto cleanup on load
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        cleanupOldHandwriting(7);
    });
}
