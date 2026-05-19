// ========== CANVAS DE PARTÍCULAS ==========
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 80;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
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

// ========== CURSOR KARA CLAN (punto + anillo azules) ==========
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

function updateCursor(e) {
    if (cursor && cursorDot) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }
}

document.addEventListener('mousemove', updateCursor);

const interactive = document.querySelectorAll('a, button, .card, .plan, .module, .feature-card, .nav-list a, .glass-card, .chat-options button, .chat-toggle-btn, .btn-submit, .scroll-down, input, select, textarea');

interactive.forEach(el => {
    el.addEventListener('mouseenter', () => cursor?.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor?.classList.remove('hover'));
});

// ========== RIPPLE / GLARE AL HACER CLIC ==========
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple-effect');
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 450);
});

document.addEventListener('mouseleave', () => {
    if (cursor) cursor.style.opacity = '0';
    if (cursorDot) cursorDot.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    if (cursor) cursor.style.opacity = '1';
    if (cursorDot) cursorDot.style.opacity = '1';
});

// ========== GRÁFICO CON CHART.JS ==========
document.addEventListener('DOMContentLoaded', () => {
    const ctxChart = document.getElementById('horasChart')?.getContext('2d');
    if(ctxChart) {
        new Chart(ctxChart, {
            type: 'bar',
            data: {
                labels: ['Procesos Manuales', 'Consultoría DocuPro', 'Benchmark Sector'],
                datasets: [{
                    label: 'Horas / mes',
                    data: [95, 24, 60],
                    backgroundColor: ['#4a5b7a', '#00c3ff', '#2a3a5a'],
                    borderRadius: 8,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { labels: { color: '#eef2ff' } },
                    tooltip: { callbacks: { label: (ctx) => `${ctx.raw} horas mensuales` } }
                },
                scales: {
                    y: { grid: { color: '#1e2a4a' }, ticks: { color: '#ccc' } },
                    x: { ticks: { color: '#eef2ff' } }
                }
            }
        });
    }

    // ========== FORMULARIO ==========
    const form = document.getElementById('leadForm');
    const formMsg = document.getElementById('formMessage');
    
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            
            if(!nombre || !email) {
                formMsg.innerHTML = '❌ Completa nombre y email corporativo';
                formMsg.style.color = '#ff8888';
                return;
            }
            
            formMsg.innerHTML = '✅ ¡Gracias! Un asesor DocuPro te contactará en < 24h.';
            formMsg.style.color = '#88ffaa';
            form.reset();
            setTimeout(() => formMsg.innerHTML = '', 4000);
        });
    }

    // ========== CHAT ==========
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    const chatClose = document.getElementById('chatClose');
    const chatHeader = document.getElementById('chatHeader');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatBody = document.getElementById('chatBody');

    function addMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-message');
        msgDiv.classList.add(isUser ? 'user' : 'bot');
        if(!isUser) msgDiv.classList.add('bot');
        msgDiv.innerHTML = isUser ? `🧑 ${text}` : `🤖 ${text}`;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function botResponse(userMsg) {
        const lower = userMsg.toLowerCase();
        if(lower.includes('precio') || lower.includes('tarifa') || lower.includes('coste')) {
            addMessage('Nuestro plan Profesional son 149€/mes con facturación flexible. ¿Quieres que te envíe la propuesta personalizada?');
        } else if(lower.includes('excel') || lower.includes('automatización') || lower.includes('macro')) {
            addMessage('Somos especialistas en VBA, Power Query y Power Pivot. Podemos automatizar tu reporting completo. ¿Te interesa una demo?');
        } else if(lower.includes('asesor') || lower.includes('hablar')) {
            addMessage('📞 Puedes llamarnos al 900 123 456 o dejarnos tu email en el formulario y te llamamos en 30 minutos.');
        } else {
            addMessage('Gracias por tu consulta. Un asesor revisará tu caso. Mientras, ¿te interesan nuestros planes de maquetación Word?');
        }
    }

    function sendUserMessage() {
        const text = chatInput.value.trim();
        if(!text) return;
        addMessage(text, true);
        chatInput.value = '';
        setTimeout(() => botResponse(text), 600);
    }

    chatToggle?.addEventListener('click', () => {
        chatWidget.classList.toggle('open');
        chatToggle.style.display = 'none';
    });
    chatClose?.addEventListener('click', () => {
        chatWidget.classList.remove('open');
        chatToggle.style.display = 'flex';
    });
    chatHeader?.addEventListener('click', (e) => {
        if(e.target !== chatClose) {
            chatWidget.classList.remove('open');
            chatToggle.style.display = 'flex';
        }
    });
    chatSend?.addEventListener('click', sendUserMessage);
    chatInput?.addEventListener('keypress', (e) => { if(e.key === 'Enter') sendUserMessage(); });
    
    document.querySelectorAll('.chat-options button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const msg = btn.getAttribute('data-msg');
            if(msg) {
                addMessage(msg, true);
                setTimeout(() => botResponse(msg), 400);
            }
        });
    });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('.nav-list a, .scroll-down').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if(href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if(target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== REVEAL ANIMATIONS ==========
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .card, .glass-card, .feature-card').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
});
