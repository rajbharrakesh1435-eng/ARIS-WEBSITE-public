// Particle System (Holographic Effect)
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
            this.init();
        }
    }

    draw() {
        ctx.fillStyle = `rgba(0, 242, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Connecting lines (subtle)
        particles.forEach(p => {
            const dx = this.x - p.x;
            const dy = this.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                ctx.strokeStyle = `rgba(0, 242, 255, ${0.1 * (1 - distance / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
            }
        });
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

initParticles();
animate();

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background shift on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.padding = '1rem 0';
        nav.style.background = 'rgba(2, 6, 23, 0.95)';
    } else {
        nav.style.padding = '1.5rem 0';
        nav.style.background = 'rgba(2, 6, 23, 0.8)';
    }
});
// Features Dashboard Category Switching
// Dashboard Ribbon Logic
const ribbonItems = document.querySelectorAll('.ribbon-item');
const categoryPanels = document.querySelectorAll('.category-panel');
const terminalLog = document.getElementById('terminalLog');

// Category Switching via Ribbon
ribbonItems.forEach(item => {
    item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');
        ribbonItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        categoryPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === `category-${category}`) panel.classList.add('active');
        });

        // Update HUD
        addLogLine(`MODULE_INIT: ${category.toUpperCase()}`);
    });
});

// Terminal Simulation (Singular Line for Ribbon HUD)
const logEntries = [
    "NEURAL_TRAILS_SYNCING...",
    "HANDSHAKE_ESTABLISHED [IPV6]",
    "ANALYZING_SYSTEM_PACKETS...",
    "HEARTBEAT_STABLE: 60BPM",
    "DECRYPTING_IO_STREAM...",
    "UPDATING_CORE_SCHEMATICS...",
    "GATHERING_ENVIRONMENTAL_INTEL..."
];

function addLogLine(text) {
    if (terminalLog) {
        terminalLog.innerHTML = `> ${text}`;
        terminalLog.style.opacity = '1';
        setTimeout(() => { terminalLog.style.opacity = '0.6'; }, 200);
    }
}

setInterval(() => {
    const entry = logEntries[Math.floor(Math.random() * logEntries.length)];
    addLogLine(entry);
}, 4000);
