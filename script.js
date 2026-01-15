// DOM elements
const cpuEl = document.getElementById('cpu-usage');
const ramEl = document.getElementById('ram-usage');
const netEl = document.getElementById('network-speed');

const cpuBar = document.querySelector('.progress-bar.cpu');
const ramBar = document.querySelector('.progress-bar.ram');
const netBar = document.querySelector('.progress-bar.network');

// Chart setup
const ctx = document.getElementById('cpuChart').getContext('2d');

const cpuChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'CPU Usage (%)',
            data: [],
            borderColor: '#00f0ff',
            backgroundColor: 'rgba(0, 240, 255, 0.15)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { grid: { display: false } },
            y: { 
                min: 0,
                max: 100,
                grid: { color: '#222' }
            }
        }
    }
});

// Fake data generator
function generateStats() {
    const cpu = Math.floor(Math.random() * 60) + 20;   // 20–80%
    const ram = Math.floor(Math.random() * 50) + 30;   // 30–80%
    const net = Math.floor(Math.random() * 900) + 100; // 100–1000 KB/s

    // Update text
    cpuEl.textContent = cpu + '%';
    ramEl.textContent = ram + '%';
    netEl.textContent = net + ' KB/s';

    // Update chart
    if (cpuChart.data.labels.length > 15) {
        cpuChart.data.labels.shift();
        cpuChart.data.datasets[0].data.shift();
    }
    cpuChart.data.labels.push('');
    cpuChart.data.datasets[0].data.push(cpu);
    cpuChart.update();

    // Update animated bars
    cpuBar.style.width = cpu + '%';
    ramBar.style.width = ram + '%';
    netBar.style.width = Math.min(net / 10, 100) + '%'; // scale 0–100%
}

// Update every second
setInterval(generateStats, 1000);
generateStats();
