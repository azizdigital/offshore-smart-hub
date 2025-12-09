        function showView(viewId) {
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            
            document.getElementById(viewId).classList.add('active');
            event.target.classList.add('active');
        }
        
        // Toggle Functions
        function toggleCustomDrum() {
            const drumType = document.getElementById('drumSize').value;
            const customGroup = document.getElementById('customDrumGroup');
            customGroup.classList.toggle('hidden', drumType !== 'custom');
        }
        
        function toggleCustomPPE() {
            const ppeLevel = document.getElementById('ppeLevel').value;
            const customGroup = document.getElementById('customPPEGroup');
            customGroup.classList.toggle('hidden', ppeLevel !== 'custom');
        }
        
        function toggleCustomCrane() {
            const craneType = document.getElementById('craneType').value;
            const customGroup = document.getElementById('customCraneGroup');
            customGroup.classList.toggle('hidden', craneType !== 'custom');
        }
        
        function toggleCustomTurbine() {
            const turbineType = document.getElementById('turbineType').value;
            const customGroup = document.getElementById('customTurbineGroup');
            customGroup.classList.toggle('hidden', turbineType !== 'custom');
        }
        
        function toggleCustomWeather() {
            const operationType = document.getElementById('operationType').value;
            const customGroup = document.getElementById('customWeatherGroup');
            customGroup.classList.toggle('hidden', operationType !== 'custom');
        }
        
        // Calculator Functions - EXACT COPY from calculator_failplay.html
        
        function convertVolume() {
            const val = parseFloat(document.getElementById('volumeInput').value);
            const type = document.getElementById('volumeType').value;
            const shrinkage = parseFloat(document.getElementById('shrinkageFactor').value) || 0.881;
            if (isNaN(val)) {
                alert('Invalid value');
                return;
            }
            
            let resultWithout, resultWith;
            if (type === 'kld_kbd') {
                resultWithout = (val * 6.293 / 1000);
                resultWith = resultWithout * shrinkage;
                document.getElementById('volumeResult').innerHTML = '<strong>Results:</strong><br>Without Shrinkage: ' + resultWithout.toFixed(4) + ' KBD<br>With Shrinkage: ' + resultWith.toFixed(4) + ' KBD';
            } else {
                resultWithout = (val / (6.293 / 1000));
                resultWith = resultWithout / shrinkage;
                document.getElementById('volumeResult').innerHTML = '<strong>Results:</strong><br>Without Shrinkage: ' + resultWithout.toFixed(4) + ' KLD<br>With Shrinkage: ' + resultWith.toFixed(4) + ' KLD';
            }
            document.getElementById('volumeResult').classList.add('show');
        }

        function convertUniversal() {
            const val = parseFloat(document.getElementById('universalValue').value);
            const fromUnit = document.getElementById('fromUnit').value;
            const toUnit = document.getElementById('toUnit').value;
            if (isNaN(val)) {
                alert('Invalid value');
                return;
            }
            if (fromUnit === toUnit) {
                alert('Same units selected');
                return;
            }
            
            const conversions = {
                kpa: {psi: 0.145038, bar: 0.01},
                psi: {kpa: 6.89476, bar: 0.0689476},
                bar: {kpa: 100, psi: 14.5038},
                celsius: {fahrenheit: val => val * 9/5 + 32},
                fahrenheit: {celsius: val => (val - 32) * 5/9},
                inches: {cm: 2.54, feet: 0.0833333, meters: 0.0254},
                cm: {inches: 0.393701, feet: 0.0328084, meters: 0.01},
                feet: {inches: 12, cm: 30.48, meters: 0.3048},
                meters: {inches: 39.3701, cm: 100, feet: 3.28084}
            };
            
            const conv = conversions[fromUnit];
            if (!conv || !conv[toUnit]) {
                alert('Conversion not available');
                return;
            }
            
            const result = typeof conv[toUnit] === 'function' ? conv[toUnit](val) : val * conv[toUnit];
            const resultText = '<strong>Result:</strong><br>' + val + ' ' + fromUnit + ' = ' + result.toFixed(4) + ' ' + toUnit;
            document.getElementById('universalResult').innerHTML = resultText;
            document.getElementById('universalResult').classList.add('show');
        }

        function convertGas() {
            const val = parseFloat(document.getElementById('gasInput').value);
            const type = document.getElementById('gasType').value;
            if (isNaN(val)) {
                alert('Invalid value');
                return;
            }
            
            const result = type === 'km3_mmscf' ? val * 0.035373 : val / 0.035373;
            const unit = type === 'km3_mmscf' ? 'mmscf/d' : 'km³/d';
            const resultText = '<strong>Gas Conversion:</strong><br>' + val + ' = ' + result.toFixed(4) + ' ' + unit;
            document.getElementById('gasResult').innerHTML = resultText;
            document.getElementById('gasResult').classList.add('show');
        }

        function calculateDropLeak() {
            const dropRate = parseFloat(document.getElementById('dropRate').value);
            const duration = parseFloat(document.getElementById('dropDuration').value);
            const dropSize = parseFloat(document.getElementById('dropSize').value);
            
            if (isNaN(dropRate) || isNaN(duration)) {
                alert('Invalid values');
                return;
            }
            
            const totalDrops = dropRate * duration;
            const totalVolumeL = totalDrops * dropSize / 1000;
            const ratePerHour = dropRate * 60 * dropSize / 1000;
            
            const resultText = '<strong>Drop Leak Analysis:</strong><br>Rate: ' + ratePerHour.toFixed(3) + ' L/hr<br>Total Volume: ' + totalVolumeL.toFixed(3) + ' L<br>Total Drops: ' + totalDrops.toFixed(0);
            document.getElementById('dropLeakResult').innerHTML = resultText;
            document.getElementById('dropLeakResult').classList.add('show');
        }

        function calculateGasLeak() {
            const diameter = parseFloat(document.getElementById('gasHoleDiameter').value);
            const pressure = parseFloat(document.getElementById('gasPressure').value);
            const duration = parseFloat(document.getElementById('gasDuration').value);
            const temperature = parseFloat(document.getElementById('gasTemperature').value) || 35;
            
            if (isNaN(diameter) || isNaN(pressure) || isNaN(duration)) {
                alert('Invalid values');
                return;
            }
            
            const area = Math.PI * Math.pow(diameter / 2000, 2);
            const MW = 20; const R = 8.314; const Z = 0.9; const T = temperature + 273.15;
            const leakRate = 0.3 * area * pressure * 100000 * Math.sqrt(MW / (Z * R * T));
            const totalKg = leakRate * duration * 60;
            
            const resultText = '<strong>Gas Leak Analysis:</strong><br>Leak Rate: ' + leakRate.toFixed(4) + ' kg/s<br>Total Amount: ' + totalKg.toFixed(2) + ' kg<br>Duration: ' + duration + ' minutes';
            document.getElementById('gasLeakResult').innerHTML = resultText;
            document.getElementById('gasLeakResult').classList.add('show');
        }

        function calculateOilLeak() {
            const diameter = parseFloat(document.getElementById('oilHoleDiameter').value);
            const pressure = parseFloat(document.getElementById('oilPressure').value);
            const duration = parseFloat(document.getElementById('oilDuration').value);
            const density = parseFloat(document.getElementById('oilDensity').value) || 700;
            
            if (isNaN(diameter) || isNaN(pressure) || isNaN(duration)) {
                alert('Invalid values');
                return;
            }
            
            const radius = diameter / 2;
            const areaCm2 = Math.PI * Math.pow(radius / 10, 2);
            const deltaP = pressure - 1.01325;
            const leakRate = 0.044721 * 0.62 * areaCm2 * Math.sqrt(density * deltaP);
            const totalKg = leakRate * duration * 60;
            
            // CRITICAL FIX: Convert kg to liters and check BOTH thresholds
            const totalLiters = totalKg / density * 1000;
            
            const resultText = '<strong>Oil Leak Analysis:</strong><br>Leak Rate: ' + leakRate.toFixed(4) + ' kg/s<br>Total Amount: ' + totalKg.toFixed(2) + ' kg (' + totalLiters.toFixed(2) + ' L)<br>Duration: ' + duration + ' minutes';
            document.getElementById('oilLeakResult').innerHTML = resultText;
            document.getElementById('oilLeakResult').classList.add('show');
            
            let classification = 'Below Threshold', color = '#10b981';
            if (totalKg >= 2000) {
                classification = 'Tier 1 - Major'; 
                color = '#dc2626';
            } else if (totalKg >= 200) {
                classification = 'Tier 2 - Reportable'; 
                color = '#f59e0b';
            } else if (totalKg >= 100) {
                classification = 'Minor Reportable'; 
                color = '#3b82f6';
            } else if (totalLiters >= 10) {
                // CRITICAL: Check for ≥10L threshold even if kg is below 100
                classification = 'Reportable (≥10L)'; 
                color = '#3b82f6';
            }
            
            document.getElementById('thresholdResult').innerHTML = '<strong style="color:' + color + '">Classification:</strong> ' + classification;
            document.getElementById('thresholdResult').classList.add('show');
        }

        function calculateProductionLoss() {
            const hours = parseFloat(document.getElementById('shutdownHours').value) || 0;
            const minutes = parseFloat(document.getElementById('shutdownMinutes').value) || 0;
            const production = parseFloat(document.getElementById('normalProduction').value);
            
            if (isNaN(production)) {
                alert('Invalid production rate');
                return;
            }
            
            const totalHours = hours + minutes / 60;
            const lostBarrels = production * totalHours / 24;
            
            const resultText = '<strong>Production Loss:</strong><br>Duration: ' + hours + 'h ' + minutes + 'm<br>Volume Lost: ' + lostBarrels.toFixed(2) + ' barrels';
            document.getElementById('productionLossResult').innerHTML = resultText;
            document.getElementById('productionLossResult').classList.add('show');
        }

        function calculateChemical() {
            const rate = parseFloat(document.getElementById('injectionRate').value);
            const ppm = parseFloat(document.getElementById('chemPPM').value);
            const drumType = document.getElementById('drumSize').value;
            
            if (isNaN(rate) || isNaN(ppm)) {
                alert('Invalid values');
                return;
            }
            
            const drumSize = drumType === 'custom' ? parseFloat(document.getElementById('customDrumSize').value) : parseFloat(drumType);
            if (isNaN(drumSize)) {
                alert('Invalid drum size');
                return;
            }
            
            const dailyVolume = rate * 24;
            const weeklyVolume = dailyVolume * 7;
            const drumsNeeded = Math.ceil(weeklyVolume / drumSize);
            
            const resultText = '<strong>Chemical Injection:</strong><br>Daily: ' + dailyVolume.toFixed(1) + ' L/day<br>Weekly: ' + weeklyVolume.toFixed(1) + ' L/week<br>Drums Needed: ' + drumsNeeded + ' x ' + drumSize + 'L';
            document.getElementById('chemicalResult').innerHTML = resultText;
            document.getElementById('chemicalResult').classList.add('show');
        }

        function calculateDropObject() {
            const weight = parseFloat(document.getElementById('objectWeight').value);
            const height = parseFloat(document.getElementById('dropHeight').value);
            const ppeSelection = document.getElementById('ppeLevel').value;
            
            if (isNaN(weight) || isNaN(height)) {
                alert('Invalid values');
                return;
            }
            
            let ppe;
            if (ppeSelection === 'custom') {
                ppe = parseFloat(document.getElementById('customPPEFactor').value);
                if (isNaN(ppe)) {
                    alert('Enter custom PPE factor');
                    return;
                }
            } else {
                ppe = parseFloat(ppeSelection);
            }
            
            const energy = weight * 9.81 * height;
            const adjustedEnergy = energy * ppe;
            
            let riskLevel, color;
            if (adjustedEnergy < 50) {
                riskLevel = 'Low Risk'; 
                color = '#10b981';
            } else if (adjustedEnergy < 200) {
                riskLevel = 'Medium Risk'; 
                color = '#f59e0b';
            } else if (adjustedEnergy < 500) {
                riskLevel = 'High Risk'; 
                color = '#ef4444';
            } else {
                riskLevel = 'Fatal Risk'; 
                color = '#dc2626';
            }
            
            const resultText = '<strong>Drop Object:</strong><br>Impact Energy: ' + energy.toFixed(0) + ' J<br>With PPE: ' + adjustedEnergy.toFixed(0) + ' J<br><span style="color:' + color + '">Risk: ' + riskLevel + '</span>';
            document.getElementById('dropObjectResult').innerHTML = resultText;
            document.getElementById('dropObjectResult').classList.add('show');
        }

        function calculateCrane() {
            const load = parseFloat(document.getElementById('loadWeight').value);
            const boom = parseFloat(document.getElementById('boomLength').value);
            const craneType = document.getElementById('craneType').value;
            
            if (isNaN(load) || isNaN(boom)) {
                alert('Invalid values');
                return;
            }
            
            let capacity;
            if (craneType === 'custom') {
                capacity = parseFloat(document.getElementById('customCraneCapacity').value);
                if (isNaN(capacity)) {
                    alert('Invalid crane capacity');
                    return;
                }
            } else {
                capacity = parseFloat(craneType);
            }
            
            const capacityAtBoom = capacity * (20 / boom);
            const safeLoad = capacityAtBoom * 0.8;
            const status = load <= safeLoad ? '✅ SAFE' : '❌ UNSAFE';
            
            const resultText = '<strong>Crane Analysis:</strong><br>Capacity at ' + boom + 'm: ' + capacityAtBoom.toFixed(1) + 'T<br>Safe Load: ' + safeLoad.toFixed(1) + 'T<br>Status: ' + status;
            document.getElementById('craneResult').innerHTML = resultText;
            document.getElementById('craneResult').classList.add('show');
        }

        function calculateFuel() {
            const type = document.getElementById('turbineType').value;
            const load = parseFloat(document.getElementById('turbineLoad').value);
            const hours = parseFloat(document.getElementById('operatingHours').value);
            
            if (isNaN(load) || isNaN(hours)) {
                alert('Invalid values');
                return;
            }
            
            let baseRate;
            if (type === 'custom') {
                baseRate = parseFloat(document.getElementById('customTurbineRate').value);
                if (isNaN(baseRate)) {
                    alert('Enter fuel rate');
                    return;
                }
            } else {
                const baseConsumption = {
                    saturn20: 320, centaur40: 1100, centaur50: 1380, taurus60: 1320,
                    taurus70: 2100, mars90: 2700, mars100: 3300, titan130: 3700,
                    rb211: 2500, kongsberg: 2200
                };
                baseRate = baseConsumption[type];
            }
            
            const consumption = baseRate * load / 100 * hours / 24;
            
            const resultText = '<strong>Fuel Consumption:</strong><br>Base Rate: ' + baseRate + ' L/hr<br>Load: ' + load + '% for ' + hours + 'hrs<br>Required: ' + consumption.toFixed(1) + ' L/day';
            document.getElementById('fuelResult').innerHTML = resultText;
            document.getElementById('fuelResult').classList.add('show');
        }

        function calculateWeather() {
            const wind = parseFloat(document.getElementById('windSpeed').value);
            const wave = parseFloat(document.getElementById('waveHeight').value);
            const operation = document.getElementById('operationType').value;
            
            if (isNaN(wind) || isNaN(wave)) {
                alert('Invalid values');
                return;
            }
            
            let limit;
            if (operation === 'custom') {
                const customWind = parseFloat(document.getElementById('customWindLimit').value);
                const customWave = parseFloat(document.getElementById('customWaveLimit').value);
                if (isNaN(customWind) || isNaN(customWave)) {
                    alert('Enter limits');
                    return;
                }
                limit = {wind: customWind, wave: customWave};
            } else {
                const limits = {
                    heli: {wind: 35, wave: 3}, 
                    boat: {wind: 25, wave: 2.5}, 
                    crane: {wind: 20, wave: 2}, 
                    diving: {wind: 15, wave: 1.5}
                };
                limit = limits[operation];
            }
            
            const windStatus = wind <= limit.wind ? '✅ OK' : '❌ EXCEED';
            const waveStatus = wave <= limit.wave ? '✅ OK' : '❌ EXCEED';
            
            const resultText = '<strong>Weather Impact:</strong><br>Wind: ' + wind + ' kts (' + limit.wind + ') ' + windStatus + '<br>Wave: ' + wave + ' m (' + limit.wave + ') ' + waveStatus;
            document.getElementById('weatherResult').innerHTML = resultText;
            document.getElementById('weatherResult').classList.add('show');
        }
        
        // Report Generator
        function generateReport() {
            const reportType = document.getElementById('reportType').value;
            const platform = document.getElementById('reportPlatform').value;
            const module = document.getElementById('reportModule').value;
            const title = document.getElementById('reportTitle').value;
            const date = document.getElementById('reportDate').value;
            const time = document.getElementById('reportTime').value;
            const description = document.getElementById('reportDescription').value;
            const action = document.getElementById('reportAction').value;
            const forward = document.getElementById('reportForward').value;
            
            if (!title || !date || !time || !description || !action || !forward) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Format date to DD/MM/YYYY
            const dateObj = new Date(date);
            const formattedDate = String(dateObj.getDate()).padStart(2, '0') + '/' + 
                                  String(dateObj.getMonth() + 1).padStart(2, '0') + '/' + 
                                  dateObj.getFullYear();
            
            // Extract platform short code
            const platformCode = platform.match(/\(([^)]+)\)/)[1];
            
            // Generate WhatsApp format report
            const report = `*${reportType} Report*

Dear PMA IC,

*Title:* ${title}
*Date:* ${formattedDate} at ${time}
*Platform:* ${platform}
*Module/Area:* ${module}

*Description:*
${description}

*Action Taken:*
${action}

*Way Forward:*
${forward}

Regards,
Aziz Mohamad - OIM ${platformCode}`;
            
            document.getElementById('reportOutput').textContent = report;
            document.getElementById('reportOutput').classList.remove('hidden');
            document.getElementById('reportButtons').classList.remove('hidden');
        }
        
        function copyReport() {
            const reportText = document.getElementById('reportOutput').textContent;
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(reportText).then(() => {
                    alert('Report copied to clipboard!');
                }).catch(() => {
                    fallbackCopy(reportText);
                });
            } else {
                fallbackCopy(reportText);
            }
        }
        
        function copyReportWithPrompt() {
            const reportText = document.getElementById('reportOutput').textContent;
            
            const promptText = `Please refine this safety report to sound professional, human, and written by an experienced Offshore Installation Manager (OIM).

Requirements:
- Show full control of operations
- Clear, concise, assertive communication
- Suitable for senior stakeholders/boss
- Natural tone (NOT robotic or overly formal)
- Keep WhatsApp format (*bold* with asterisks)
- Maximum 650 words

Current report:

${reportText}`;
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(promptText).then(() => {
                    alert('Report + AI Prompt copied! Paste in Claude to refine.');
                }).catch(() => {
                    fallbackCopy(promptText);
                });
            } else {
                fallbackCopy(promptText);
            }
        }
        
        function fallbackCopy(text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                alert('Report copied to clipboard!');
            } catch (err) {
                alert('Failed to copy. Please copy manually.');
            }
            document.body.removeChild(textarea);
        }
        
        // PWA Installation
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
        });
        
        // Service Worker Registration
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                const swCode = `
                    const CACHE_NAME = 'offshore-smart-hub-v1';
                    const urlsToCache = ['/'];
                    
                    self.addEventListener('install', event => {
                        event.waitUntil(
                            caches.open(CACHE_NAME)
                                .then(cache => cache.addAll(urlsToCache))
                        );
                    });
                    
                    self.addEventListener('fetch', event => {
                        event.respondWith(
                            caches.match(event.request)
                                .then(response => response || fetch(event.request))
                        );
                    });
                `;
                
                const blob = new Blob([swCode], { type: 'application/javascript' });
                const swUrl = URL.createObjectURL(blob);
                
                navigator.serviceWorker.register(swUrl)
                    .then(() => console.log('Service Worker registered'))
                    .catch(err => console.log('Service Worker registration failed:', err));
            });
        }
