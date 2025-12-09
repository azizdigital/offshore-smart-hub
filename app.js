// ========================================
// Offshore Smart Hub - Main Application
// ========================================

let currentReport = '';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Set active home button
    document.getElementById('nav-home').classList.add('active');
    
    // Set current datetime for incident report
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(now - offset)).toISOString().slice(0, 16);
    if (document.getElementById('incidentDateTime')) {
        document.getElementById('incidentDateTime').value = localISOTime;
    }
    
    // Setup custom input event listeners
    setupCustomInputs();
});

// ========================================
// Navigation Functions
// ========================================

function showView(view) {
    // Hide all views
    document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
    
    // Show selected view
    document.getElementById('view-' + view).classList.remove('hidden');
    
    // Update nav buttons
    document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
    document.getElementById('nav-' + view).classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function openLink(url) {
    window.open(url, '_blank');
}

// ========================================
// Calculator Functions
// ========================================

function convertVolume() {
    const value = parseFloat(document.getElementById('volumeInput').value);
    const type = document.getElementById('volumeType').value;
    const factor = parseFloat(document.getElementById('shrinkageFactor').value);
    
    if (!value || !factor) {
        alert('Please fill all fields');
        return;
    }
    
    let result;
    if (type === 'kld_kbd') {
        result = value / factor;
        document.getElementById('volumeResult').innerHTML = `<strong>Result:</strong> ${result.toFixed(3)} KBD`;
    } else {
        result = value * factor;
        document.getElementById('volumeResult').innerHTML = `<strong>Result:</strong> ${result.toFixed(3)} KLD`;
    }
    document.getElementById('volumeResult').style.display = 'block';
}

function convertUniversal() {
    const value = parseFloat(document.getElementById('universalValue').value);
    const from = document.getElementById('fromUnit').value;
    const to = document.getElementById('toUnit').value;
    
    if (!value) {
        alert('Please enter a value');
        return;
    }

    const conversions = {
        'kpa-psi': 0.145038,
        'kpa-bar': 0.01,
        'psi-kpa': 6.89476,
        'psi-bar': 0.0689476,
        'bar-kpa': 100,
        'bar-psi': 14.5038,
        'celsius-fahrenheit': (c) => (c * 9/5) + 32,
        'fahrenheit-celsius': (f) => (f - 32) * 5/9,
        'inches-cm': 2.54,
        'cm-inches': 0.393701,
        'feet-meters': 0.3048,
        'meters-feet': 3.28084
    };

    let result;
    const key = `${from}-${to}`;
    
    if (from === to) {
        result = value;
    } else if (typeof conversions[key] === 'function') {
        result = conversions[key](value);
    } else if (conversions[key]) {
        result = value * conversions[key];
    } else {
        alert('Conversion not supported');
        return;
    }

    document.getElementById('universalResult').innerHTML = `<strong>Result:</strong> ${result.toFixed(4)} ${to.toUpperCase()}`;
    document.getElementById('universalResult').style.display = 'block';
}

function convertGas() {
    const value = parseFloat(document.getElementById('gasInput').value);
    const type = document.getElementById('gasType').value;
    
    if (!value) {
        alert('Please enter a value');
        return;
    }
    
    let result;
    if (type === 'km3_mmscf') {
        result = value * 35.3147;
        document.getElementById('gasResult').innerHTML = `<strong>Result:</strong> ${result.toFixed(3)} mmscf/d`;
    } else {
        result = value / 35.3147;
        document.getElementById('gasResult').innerHTML = `<strong>Result:</strong> ${result.toFixed(3)} km³/d`;
    }
    document.getElementById('gasResult').style.display = 'block';
}

function calculateDropLeak() {
    const rate = parseFloat(document.getElementById('dropRate').value);
    const duration = parseFloat(document.getElementById('dropDuration').value);
    const size = parseFloat(document.getElementById('dropSize').value);
    
    if (!rate || !duration || !size) {
        alert('Please fill all fields');
        return;
    }
    
    const totalDrops = rate * duration;
    const totalML = totalDrops * size;
    const totalLiters = totalML / 1000;
    
    document.getElementById('dropLeakResult').innerHTML = `
        <strong>Leak Analysis:</strong><br>
        Total Drops: ${totalDrops.toFixed(0)}<br>
        Volume: ${totalML.toFixed(2)} ml (${totalLiters.toFixed(3)} L)<br>
        ${totalLiters > 1 ? '<span style="color:#dc2626">⚠️ Significant leak detected</span>' : '<span style="color:#059669">✓ Minor leak</span>'}
    `;
    document.getElementById('dropLeakResult').style.display = 'block';
}

function calculateGasLeak() {
    const diameter = parseFloat(document.getElementById('gasHoleDiameter').value) / 1000; // mm to m
    const pressure = parseFloat(document.getElementById('gasPressure').value) * 100000; // bar to Pa
    const duration = parseFloat(document.getElementById('gasDuration').value);
    const temp = parseFloat(document.getElementById('gasTemperature').value) + 273.15; // C to K
    
    if (!diameter || !pressure || !duration || !temp) {
        alert('Please fill all fields');
        return;
    }
    
    const area = Math.PI * Math.pow(diameter / 2, 2);
    const gasConstant = 8.314;
    const molecularWeight = 16.04;
    const velocity = Math.sqrt((2 * pressure) / (molecularWeight / gasConstant / temp));
    const flowRate = area * velocity * 3600; // m³/hr
    const totalVolume = flowRate * (duration / 60);
    
    document.getElementById('gasLeakResult').innerHTML = `
        <strong>Gas Leak Analysis:</strong><br>
        Flow Rate: ${flowRate.toFixed(3)} m³/hr<br>
        Total Volume: ${totalVolume.toFixed(3)} m³<br>
        Duration: ${duration} minutes<br>
        ${totalVolume > 1 ? '<span style="color:#dc2626">⚠️ Significant gas release</span>' : '<span style="color:#059669">✓ Minor release</span>'}
    `;
    document.getElementById('gasLeakResult').style.display = 'block';
}

function calculateOilLeak() {
    const diameter = parseFloat(document.getElementById('oilHoleDiameter').value) / 1000; // mm to m
    const pressure = parseFloat(document.getElementById('oilPressure').value) * 100000; // bar to Pa
    const duration = parseFloat(document.getElementById('oilDuration').value);
    const density = parseFloat(document.getElementById('oilDensity').value);
    
    if (!diameter || !pressure || !duration || !density) {
        alert('Please fill all fields');
        return;
    }
    
    const area = Math.PI * Math.pow(diameter / 2, 2);
    const velocity = Math.sqrt((2 * pressure) / density);
    const flowRate = area * velocity * 3600; // m³/hr
    const totalVolume = flowRate * (duration / 60);
    const totalLiters = totalVolume * 1000;
    
    document.getElementById('oilLeakResult').innerHTML = `
        <strong>Crude Oil Leak Analysis:</strong><br>
        Flow Rate: ${flowRate.toFixed(6)} m³/hr (${(flowRate * 1000).toFixed(3)} L/hr)<br>
        Total Volume: ${totalVolume.toFixed(6)} m³ (${totalLiters.toFixed(3)} L)<br>
        Duration: ${duration} minutes<br>
        ${totalLiters > 10 ? '<span style="color:#dc2626">⚠️ Report required - Above 10L threshold</span>' : '<span style="color:#059669">✓ Below reporting threshold</span>'}
    `;
    document.getElementById('oilLeakResult').style.display = 'block';
}

function calculateProductionLoss() {
    const hours = parseInt(document.getElementById('shutdownHours').value) || 0;
    const minutes = parseInt(document.getElementById('shutdownMinutes').value) || 0;
    const production = parseFloat(document.getElementById('normalProduction').value);
    
    if (!production) {
        alert('Please enter normal production rate');
        return;
    }
    
    const totalHours = hours + (minutes / 60);
    const lossKBD = (production / 24) * totalHours;
    const lossKLD = lossKBD * 0.881;
    
    document.getElementById('productionLossResult').innerHTML = `
        <strong>Production Loss:</strong><br>
        Shutdown Duration: ${hours}h ${minutes}m (${totalHours.toFixed(2)} hours)<br>
        Volume Loss: ${lossKBD.toFixed(2)} KBD / ${lossKLD.toFixed(2)} KLD<br>
        ${lossKBD > 100 ? '<span style="color:#dc2626">⚠️ Significant production impact</span>' : '<span style="color:#059669">✓ Minor impact</span>'}
    `;
    document.getElementById('productionLossResult').style.display = 'block';
}

function calculateChemical() {
    const rate = parseFloat(document.getElementById('injectionRate').value);
    const ppm = parseFloat(document.getElementById('chemPPM').value);
    const drumSel = document.getElementById('drumSize').value;
    const drumSize = drumSel === 'custom' ? parseFloat(document.getElementById('customDrumSize').value) : parseFloat(drumSel);
    
    if (!rate || !ppm || !drumSize) {
        alert('Please fill all fields');
        return;
    }
    
    const hoursPerDrum = drumSize / rate;
    const daysPerDrum = hoursPerDrum / 24;
    const drumsPerMonth = 30 / daysPerDrum;
    
    document.getElementById('chemicalResult').innerHTML = `
        <strong>Chemical Injection:</strong><br>
        Injection Rate: ${rate} L/hr<br>
        Drum Duration: ${hoursPerDrum.toFixed(1)} hours (${daysPerDrum.toFixed(1)} days)<br>
        Monthly Usage: ${drumsPerMonth.toFixed(1)} drums<br>
        Concentration: ${ppm} PPM
    `;
    document.getElementById('chemicalResult').style.display = 'block';
}

function calculateDropObject() {
    const weight = parseFloat(document.getElementById('objectWeight').value);
    const height = parseFloat(document.getElementById('dropHeight').value);
    const ppeSel = document.getElementById('ppeLevel').value;
    const ppeFactor = ppeSel === 'custom' ? parseFloat(document.getElementById('customPPEFactor').value) : parseFloat(ppeSel);
    
    if (!weight || !height || !ppeFactor) {
        alert('Please fill all fields');
        return;
    }
    
    const gravity = 9.81;
    const energy = weight * gravity * height;
    const adjustedEnergy = energy * ppeFactor;
    
    let severity = '';
    if (adjustedEnergy < 100) severity = 'Low Risk';
    else if (adjustedEnergy < 500) severity = 'Medium Risk';
    else if (adjustedEnergy < 1000) severity = 'High Risk';
    else severity = 'Critical Risk';
    
    document.getElementById('dropObjectResult').innerHTML = `
        <strong>Drop Impact Analysis:</strong><br>
        Potential Energy: ${energy.toFixed(2)} Joules<br>
        With PPE Protection: ${adjustedEnergy.toFixed(2)} Joules<br>
        Risk Level: <span style="color:${adjustedEnergy > 500 ? '#dc2626' : '#059669'}">${severity}</span><br>
        ${adjustedEnergy > 1000 ? '<span style="color:#dc2626">⚠️ Fatal injury potential</span>' : ''}
    `;
    document.getElementById('dropObjectResult').style.display = 'block';
}

function calculateCrane() {
    const load = parseFloat(document.getElementById('loadWeight').value);
    const boom = parseFloat(document.getElementById('boomLength').value);
    const craneSel = document.getElementById('craneType').value;
    const craneCapacity = craneSel === 'custom' ? parseFloat(document.getElementById('customCraneCapacity').value) : parseFloat(craneSel);
    
    if (!load || !boom || !craneCapacity) {
        alert('Please fill all fields');
        return;
    }
    
    const utilizationPercent = (load / craneCapacity) * 100;
    const safetyFactor = craneCapacity / load;
    
    let status = '';
    let color = '';
    if (utilizationPercent > 90) {
        status = 'Exceeds Safe Limit';
        color = '#dc2626';
    } else if (utilizationPercent > 75) {
        status = 'High Utilization - Caution';
        color = '#f59e0b';
    } else {
        status = 'Within Safe Limits';
        color = '#059669';
    }
    
    document.getElementById('craneResult').innerHTML = `
        <strong>Crane Lifting Analysis:</strong><br>
        Crane Capacity: ${craneCapacity}T<br>
        Load: ${load}T<br>
        Utilization: ${utilizationPercent.toFixed(1)}%<br>
        Safety Factor: ${safetyFactor.toFixed(2)}<br>
        Status: <span style="color:${color}">${status}</span>
    `;
    document.getElementById('craneResult').style.display = 'block';
}

function calculateFuel() {
    const turbineSel = document.getElementById('turbineType').value;
    const loadPercent = parseFloat(document.getElementById('turbineLoad').value);
    const hours = parseFloat(document.getElementById('operatingHours').value);
    
    const turbineRates = {
        'saturn20': 400,
        'centaur40': 1200,
        'centaur50': 1500,
        'taurus60': 1400,
        'custom': parseFloat(document.getElementById('customTurbineRate').value)
    };
    
    const baseRate = turbineRates[turbineSel];
    
    if (!baseRate || !loadPercent || !hours) {
        alert('Please fill all fields');
        return;
    }
    
    const adjustedRate = baseRate * (loadPercent / 100);
    const totalFuel = adjustedRate * hours;
    const totalBarrels = totalFuel / 159;
    
    document.getElementById('fuelResult').innerHTML = `
        <strong>Fuel Consumption:</strong><br>
        Base Rate: ${baseRate} L/hr @ 100% load<br>
        Adjusted Rate: ${adjustedRate.toFixed(1)} L/hr @ ${loadPercent}% load<br>
        Total for ${hours}hrs: ${totalFuel.toFixed(1)} L (${totalBarrels.toFixed(2)} barrels)<br>
        Daily Projection: ${(adjustedRate * 24).toFixed(1)} L/day
    `;
    document.getElementById('fuelResult').style.display = 'block';
}

function calculateWeather() {
    const wind = parseFloat(document.getElementById('windSpeed').value);
    const wave = parseFloat(document.getElementById('waveHeight').value);
    const opType = document.getElementById('operationType').value;
    
    if (!wind || !wave) {
        alert('Please fill all fields');
        return;
    }
    
    const limits = {
        'heli': { wind: 40, wave: 1.5 },
        'boat': { wind: 30, wave: 2.5 },
        'crane': { wind: 35, wave: 2.0 },
        'diving': { wind: 20, wave: 1.0 }
    };
    
    const limit = limits[opType];
    const windStatus = wind <= limit.wind ? '✓ Safe' : '⚠️ Exceeds limit';
    const waveStatus = wave <= limit.wave ? '✓ Safe' : '⚠️ Exceeds limit';
    const overall = (wind <= limit.wind && wave <= limit.wave) ? 'PROCEED' : 'STOP - Weather Delay';
    const color = overall.includes('PROCEED') ? '#059669' : '#dc2626';
    
    document.getElementById('weatherResult').innerHTML = `
        <strong>Weather Impact Assessment:</strong><br>
        Wind: ${wind} knots (Limit: ${limit.wind}) ${windStatus}<br>
        Wave: ${wave}m (Limit: ${limit.wave}m) ${waveStatus}<br>
        Operation: ${opType.toUpperCase()}<br>
        <strong style="color:${color}">${overall}</strong>
    `;
    document.getElementById('weatherResult').style.display = 'block';
}

// ========================================
// Custom Input Handlers
// ========================================

function setupCustomInputs() {
    // Drum size custom input
    const drumSize = document.getElementById('drumSize');
    if (drumSize) {
        drumSize.addEventListener('change', function() {
            document.getElementById('customDrumGroup').style.display = this.value === 'custom' ? 'block' : 'none';
        });
    }
    
    // PPE level custom input
    const ppeLevel = document.getElementById('ppeLevel');
    if (ppeLevel) {
        ppeLevel.addEventListener('change', function() {
            document.getElementById('customPPEGroup').style.display = this.value === 'custom' ? 'block' : 'none';
        });
    }
    
    // Crane type custom input
    const craneType = document.getElementById('craneType');
    if (craneType) {
        craneType.addEventListener('change', function() {
            document.getElementById('customCraneGroup').style.display = this.value === 'custom' ? 'block' : 'none';
        });
    }
    
    // Turbine type custom input
    const turbineType = document.getElementById('turbineType');
    if (turbineType) {
        turbineType.addEventListener('change', function() {
            document.getElementById('customTurbineGroup').style.display = this.value === 'custom' ? 'block' : 'none';
        });
    }
}

// ========================================
// Report Generation Functions
// ========================================

function generateReport() {
    const incidentType = document.getElementById('incidentType').value;
    const location = document.getElementById('reportLocation').value;
    const reporter = document.getElementById('reporterName').value;
    const dateTime = document.getElementById('incidentDateTime').value;
    const description = document.getElementById('incidentDescription').value;
    const actions = document.getElementById('immediateActions').value;
    const rootCause = document.getElementById('rootCause').value;

    if (!reporter || !description) {
        alert('Please fill in at least Reporter Name and Incident Description');
        return;
    }

    const reportDate = new Date().toLocaleString('en-GB');
    const incidentDate = dateTime ? new Date(dateTime).toLocaleString('en-GB') : 'Not specified';

    currentReport = `SAFETY INCIDENT REPORT
========================

REPORT INFORMATION
------------------
Report ID: SR-${Date.now()}
Generated: ${reportDate}
Platform: ${location}
Reporter: ${reporter}

INCIDENT DETAILS
----------------
Type: ${incidentType}
Date & Time: ${incidentDate}
Location: ${location}

DESCRIPTION
-----------
${description}

IMMEDIATE ACTIONS TAKEN
-----------------------
${actions || 'Not specified'}

ROOT CAUSE ANALYSIS
-------------------
${rootCause || 'Investigation ongoing'}

REPORT STATUS
-------------
Status: Preliminary Report
Classification: ${incidentType}

---
Generated by Offshore Smart Hub
Report must be reviewed and approved by OIM`;

    document.getElementById('generatedReport').textContent = currentReport;
    document.getElementById('reportOutput').classList.remove('hidden');
    document.getElementById('refineSection').classList.add('hidden');

    // Show notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Report Generated', {
            body: `${incidentType} report created successfully`,
            icon: './icons/icon-192.png'
        });
    }
}

function clearReport() {
    if (confirm('Clear all report fields?')) {
        document.getElementById('reporterName').value = '';
        document.getElementById('incidentDateTime').value = '';
        document.getElementById('incidentDescription').value = '';
        document.getElementById('immediateActions').value = '';
        document.getElementById('rootCause').value = '';
        document.getElementById('reportOutput').classList.add('hidden');
    }
}

function downloadReport() {
    if (!currentReport) return;
    
    const blob = new Blob([currentReport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Safety_Report_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✓ Report downloaded successfully!');
}

function copyReport() {
    if (!currentReport) return;
    
    navigator.clipboard.writeText(currentReport).then(() => {
        alert('✓ Report copied to clipboard!');
    }).catch(err => {
        alert('Failed to copy report');
    });
}

function showRefinePrompt() {
    const prompt = `Please refine safety report so that it sounds professional, human, and written in the voice of an experienced Offshore Installation Manager (OIM). The tone must show full control of the operation, clear communication, and be suitable for sharing with my boss or senior stakeholders. Make it concise, assertive, and structured. Avoid robotic or overly formal tone – just confident and natural. Maintain the format as I want to send it via WhatsApp.`;
    
    document.getElementById('aiPrompt').textContent = prompt;
    document.getElementById('refineSection').classList.remove('hidden');
    
    // Scroll to refine section
    document.getElementById('refineSection').scrollIntoView({ behavior: 'smooth' });
}

function copyPromptAndReport() {
    const prompt = document.getElementById('aiPrompt').textContent;
    const fullText = `${prompt}\n\n---\n\n${currentReport}`;
    
    navigator.clipboard.writeText(fullText).then(() => {
        alert('✓ Prompt and report copied! Paste into your AI assistant (ChatGPT, Claude, etc.)');
    }).catch(err => {
        alert('Failed to copy');
    });
}

// Request notification permission on load
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}
