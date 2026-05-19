// ========== PARTÍCULAS ==========
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.2,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.2
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 195, 255, ${p.alpha})`;
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
    }
    requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();
window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

// ========== CURSOR ==========
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
    if (cursor && cursorDot) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
});

const interactiveElements = document.querySelectorAll('a, button, .card, .plan, .module, .feature-card, .nav-list a, .glass-card, .chat-options button, .chat-toggle-btn, .glow-btn, .scroll-down, input, select, textarea');
interactiveElements.forEach(el => {
    if (el) {
        el.addEventListener('mouseenter', () => cursor?.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor?.classList.remove('hover'));
    }
});

document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple-effect');
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 450);
});

// ========== CONTROLES ==========
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light');
        themeToggle.innerHTML = document.body.classList.contains('light') ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });
}

const presentationBtn = document.getElementById('presentationBtn');
if (presentationBtn) {
    presentationBtn.addEventListener('click', () => {
        document.body.classList.toggle('presentation-mode');
        presentationBtn.innerHTML = document.body.classList.contains('presentation-mode') ? '<i class="fas fa-window-restore"></i>' : '<i class="fas fa-chalkboard-user"></i>';
    });
}

const fullscreenBtn = document.getElementById('fullscreenBtn');
if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            document.exitFullscreen();
            fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });
}

// Emergencia
const emergencyBtn = document.getElementById('emergencyBtn');
let emergencyActive = false;
if (emergencyBtn) {
    emergencyBtn.addEventListener('click', () => {
        emergencyActive = !emergencyActive;
        if (emergencyActive) {
            document.body.style.opacity = '0.3';
            emergencyBtn.style.background = 'red';
            alert('🔒 Modo emergencia activado - Contenido sensible oculto');
        } else {
            document.body.style.opacity = '1';
            emergencyBtn.style.background = '#00c3ff';
        }
    });
}

// Teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        emergencyActive = !emergencyActive;
        if (emergencyActive) {
            document.body.style.opacity = '0.3';
            if (emergencyBtn) emergencyBtn.style.background = 'red';
        } else {
            document.body.style.opacity = '1';
            if (emergencyBtn) emergencyBtn.style.background = '#00c3ff';
        }
    }
    if (e.key === 'p' || e.key === 'P') presentationBtn?.click();
    if (e.key === 'f' || e.key === 'F') fullscreenBtn?.click();
    if (e.key === 't' || e.key === 'T') themeToggle?.click();
});

// ========== EFECTO ESCRITURA ==========
const texts = ["Automatizamos procesos", "Optimizamos recursos", "Lideramos el sector"];
let idx = 0, charIdx = 0;
const typingEl = document.getElementById('heroTyping');
function typeWriter() {
    if (typingEl) {
        if (charIdx < texts[idx].length) {
            typingEl.innerHTML += texts[idx].charAt(charIdx);
            charIdx++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                typingEl.innerHTML = "";
                charIdx = 0;
                idx = (idx + 1) % texts.length;
                typeWriter();
            }, 2000);
        }
    }
}
typeWriter();

// ========== CONTADORES ANIMADOS ==========
const counters = document.querySelectorAll('.counter');
const animateCounters = () => {
    counters.forEach(c => {
        const target = +c.dataset.target;
        let current = 0;
        const increment = target / 50;
        const update = () => {
            current += increment;
            if (current < target) {
                c.innerText = Math.floor(current);
                setTimeout(update, 30);
            } else {
                c.innerText = target;
            }
        };
        update();
    });
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            animateCounters();
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.counters-grid').forEach(el => observer.observe(el));

// ========== CALCULADORA ==========
const slider = document.getElementById('horasSlider');
const horasVal = document.getElementById('horasValue');
const ahorroNum = document.getElementById('ahorroNumero');
const ahorroPorc = document.getElementById('ahorroPorcentaje');
function updateAhorro() {
    if (slider && horasVal && ahorroNum && ahorroPorc) {
        let val = +slider.value;
        horasVal.innerText = val;
        let ahorro = Math.round(val * 0.85);
        ahorroNum.innerText = ahorro;
        ahorroPorc.innerText = 85;
    }
}
if (slider) {
    slider.addEventListener('input', updateAhorro);
    updateAhorro();
}
const calcularBtn = document.getElementById('calcularBtn');
if (calcularBtn) {
    calcularBtn.addEventListener('click', () => alert(`💰 Ahorro estimado: ${ahorroNum?.innerText} horas/mes. ¿Hablamos?`));
}

// ========== GRÁFICO ==========
const chartCanvas = document.getElementById('horasChart');
if (chartCanvas) {
    new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels: ['Manual', 'DocuPro', 'Benchmark'],
            datasets: [{
                label: 'Horas/mes',
                data: [95, 24, 60],
                backgroundColor: ['#4a5b7a', '#00c3ff', '#2a3a5a'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { labels: { color: '#eef2ff' } }
            }
        }
    });
}

// ========== FORMULARIO ==========
const leadForm = document.getElementById('leadForm');
const formMessage = document.getElementById('formMessage');
if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        if (!nombre || !email) {
            if (formMessage) formMessage.innerHTML = '❌ Completa nombre y email';
            return;
        }
        if (formMessage) {
            formMessage.innerHTML = '✅ ¡Gracias! Te contactamos en <24h.';
        }
        leadForm.reset();
        setTimeout(() => {
            if (formMessage) formMessage.innerHTML = '';
        }, 3000);
        // Confeti al enviar formulario
        if (typeof canvasConfetti === 'function') {
            canvasConfetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
    });
}

// PDF
const pdfBtn = document.getElementById('descargarPDF');
if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
        alert('📄 Caso de éxito: "Cómo ahorramos 120h/mes con DocuPro" (demo)');
        if (typeof canvasConfetti === 'function') {
            canvasConfetti({ particleCount: 50, spread: 60 });
        }
    });
}

// ========== CONFETI AL CONTRATAR (¡AHORA SÍ FUNCIONA!) ==========
const contratarBtns = document.querySelectorAll('.contratar-btn');
contratarBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const plan = btn.getAttribute('data-plan') || 'seleccionado';
        // Confeti masivo
        if (typeof canvasConfetti === 'function') {
            canvasConfetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
            canvasConfetti({ particleCount: 100, spread: 70, origin: { y: 0.7, x: 0.3 }, startVelocity: 15 });
            canvasConfetti({ particleCount: 100, spread: 70, origin: { y: 0.7, x: 0.7 }, startVelocity: 15 });
        }
        alert(`🎉 ¡Gracias por tu interés en el plan ${plan}! Un asesor te contactará.`);
    });
});

// ========== CHAT ==========
const chatWidget = document.getElementById('chatWidget');
const chatToggle = document.getElementById('chatToggle');
const chatClose = document.querySelector('.chat-close');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatBody = document.querySelector('.chat-body');

function addMsg(t, isUser = false) {
    if (!chatBody) return;
    const d = document.createElement('div');
    d.classList.add('chat-message', isUser ? 'user' : 'bot');
    d.innerHTML = isUser ? `🧑 ${t}` : `🤖 ${t}`;
    chatBody.appendChild(d);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function botResp(m) {
    const lower = m.toLowerCase();
    if (lower.includes('precio') || lower.includes('precios')) {
        addMsg('💰 Plan Profesional: 149€/mes con facturación flexible. ¿Te interesa?');
    } else if (lower.includes('excel') || lower.includes('automatización')) {
        addMsg('📊 Automatizamos reporting completo con VBA y Power Query. ¿Te interesa una demo?');
    } else if (lower.includes('asesor') || lower.includes('hablar')) {
        addMsg('🎧 Puedes llamarnos al 900 123 456 o dejarnos tu email en el formulario.');
    } else {
        addMsg('Gracias por tu consulta. Un asesor revisará tu caso. ¿Más dudas?');
    }
}

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        if (chatWidget) {
            chatWidget.classList.toggle('open');
            chatToggle.style.display = 'none';
        }
    });
}
if (chatClose && chatWidget && chatToggle) {
    chatClose.addEventListener('click', () => {
        chatWidget.classList.remove('open');
        chatToggle.style.display = 'flex';
    });
}
if (chatSend && chatInput) {
    chatSend.addEventListener('click', () => {
        const t = chatInput.value.trim();
        if (t) {
            addMsg(t, true);
            chatInput.value = '';
            setTimeout(() => botResp(t), 600);
        }
    });
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') chatSend.click();
    });
}
const chatOptionBtns = document.querySelectorAll('.chat-options button');
chatOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const msg = btn.innerText.replace(/[💰📊🎧]/g, '').trim();
        addMsg(msg, true);
        setTimeout(() => botResp(msg), 400);
    });
});

// ========== RANKING PAÍSES ==========
const paises = ["🇪🇸 España: 1,245", "🇲🇽 México: 489", "🇦🇷 Argentina: 245", "🇨🇴 Colombia: 178", "🇨🇱 Chile: 98"];
const countryRanking = document.getElementById('countryRanking');
if (countryRanking) {
    countryRanking.innerHTML = paises.map(p => `<span class="country-badge">${p}</span>`).join('');
}

// ========== TEMPORIZADOR ==========
let segundos = 0;
setInterval(() => {
    segundos++;
    const timerSpan = document.getElementById('timerSeconds');
    if (timerSpan) timerSpan.innerText = segundos;
}, 1000);

// ========== CONTADOR GLOBAL (simulación + API real opcional) ==========
let visitCount = 0;
async function loadVisitorCount() {
    const counterElement = document.getElementById('visitorCounter');
    if (!counterElement) return;
    try {
        // Intenta con la API real de Cloudflare (descomenta si tienes worker)
        // const response = await fetch('https://tu-worker.workers.dev/api/counter');
        // const data = await response.json();
        // visitCount = data.visits;
        // counterElement.innerHTML = `<i class="fas fa-globe"></i> ${visitCount.toLocaleString()} visitas globales`;
        
        // Simulación mientras configuras Cloudflare
        let visits = localStorage.getItem('visits');
        if (!visits) visits = Math.floor(Math.random() * 10000) + 1000;
        visits = parseInt(visits) + 1;
        localStorage.setItem('visits', visits);
        counterElement.innerHTML = `<i class="fas fa-globe"></i> ${visits.toLocaleString()} visitas globales (demo)`;
    } catch (error) {
        console.error('Error al cargar contador:', error);
        counterElement.innerHTML = `<i class="fas fa-globe"></i> 🌍 Contador activo próximamente`;
    }
}
loadVisitorCount();

// ========== MODO NAVIDAD OCULTO ==========
let docuproCount = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === 'd') {
        docuproCount++;
        if (docuproCount >= 3) {
            if (typeof canvasConfetti === 'function') {
                canvasConfetti({ particleCount: 300, spread: 120, origin: { y: 0.5 } });
            }
            document.body.style.background = 'linear-gradient(135deg, #0a5f2a, #0a1428)';
            setTimeout(() => {
                document.body.style.background = '';
            }, 5000);
            docuproCount = 0;
        }
    }
});

// ========== VÍDEO DEMO ==========
const demoVideo = document.getElementById('demoVideo');
if (demoVideo) {
    demoVideo.addEventListener('click', () => {
        alert('🎬 Demo: Automatización de reporting en Excel - Ahorro del 85% de tiempo');
        if (typeof canvasConfetti === 'function') {
            canvasConfetti({ particleCount: 100, spread: 70 });
        }
    });
}

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('.nav-list a, .scroll-down').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== FEEDBACK SIMULADO ==========
document.querySelectorAll('.like-btn, .dislike-btn')?.forEach(btn => {
    btn.addEventListener('click', () => {
        if (typeof canvasConfetti === 'function') {
            canvasConfetti({ particleCount: 30, spread: 45 });
        }
    });
});
