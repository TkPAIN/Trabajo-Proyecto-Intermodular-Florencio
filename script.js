// Smooth scroll para navegación
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

// Demo alert
document.getElementById('demoBtn')?.addEventListener('click', () => {
    alert("📩 Solicita tu demo en contacto@docupro.es\nUn asesor élite te contactará en 24h.");
});

// Efecto de aparición leve en scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.style.opacity = "1";
    });
}, { threshold: 0.1 });
document.querySelectorAll('.section').forEach(s => {
    s.style.opacity = "0";
    s.style.transition = "opacity 0.6s ease-out";
    observer.observe(s);
});
// ========== GRÁFICO CON CHART.JS ==========
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('horasChart')?.getContext('2d');
    if(ctx) {
        new Chart(ctx, {
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

    // ========== FORMULARIO DE CONTACTO FUNCIONAL ==========
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
            
            // Simulación envío (aquí iría fetch a backend)
            formMsg.innerHTML = '✅ ¡Gracias! Un asesor DocuPro te contactará en < 24h.';
            formMsg.style.color = '#88ffaa';
            form.reset();
            setTimeout(() => formMsg.innerHTML = '', 4000);
        });
    }

    // ========== CHAT INTERACTIVO SIMULADO ==========
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
        // regenerar opciones rápidas
        const optsDiv = document.getElementById('chatOptions');
        if(optsDiv) optsDiv.style.display = 'flex';
    }

    function sendUserMessage() {
        const text = chatInput.value.trim();
        if(!text) return;
        addMessage(text, true);
        chatInput.value = '';
        setTimeout(() => botResponse(text), 600);
    }

    // Eventos chat
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
    
    // Respuesta desde botones rápidos
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

// ========== ANIMACIONES AL SCROLL ==========
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.style.opacity = "1";
    });
}, { threshold: 0.1 });
document.querySelectorAll('.section').forEach(s => {
    s.style.opacity = "0";
    s.style.transition = "opacity 0.6s ease-out";
    observer.observe(s);
});
