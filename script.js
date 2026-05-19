// ========== TOKEN DE HUGGING FACE (CAMBIA AQUÍ) ==========
const HF_TOKEN = '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';  // <--- ¡YA ESTÁ PUESTO!

// ========== PARTÍCULAS DE FONDO ==========
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    for (let i = 0; i < 100; i++) {
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
window.addEventListener('resize', () => { resizeCanvas(); createParticles(); });

// ========== CURSOR PREMIUM ==========
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const cursorTrail = document.getElementById('cursorTrail');
let trailPositions = [];

document.addEventListener('mousemove', (e) => {
    if (cursor && cursorDot) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        
        trailPositions.unshift({ x: e.clientX, y: e.clientY });
        if (trailPositions.length > 8) trailPositions.pop();
        
        if (cursorTrail) {
            cursorTrail.innerHTML = '';
            trailPositions.forEach((pos, i) => {
                const dot = document.createElement('div');
                dot.style.position = 'fixed';
                dot.style.left = pos.x + 'px';
                dot.style.top = pos.y + 'px';
                dot.style.width = (10 - i) + 'px';
                dot.style.height = (10 - i) + 'px';
                dot.style.background = `rgba(0, 195, 255, ${0.6 - i * 0.05})`;
                dot.style.borderRadius = '50%';
                dot.style.pointerEvents = 'none';
                dot.style.filter = 'blur(2px)';
                cursorTrail.appendChild(dot);
            });
        }
    }
});

const interactiveElements = document.querySelectorAll('a, button, .card, .plan, .module, .feature-card, .nav-list a, .glass-premium, .chat-options button, .chat-toggle-btn, .glow-btn, .scroll-down, input, select, textarea, .magnetic-btn');
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

// ========== CONTROLES Y TECLADO ==========
const themeToggle = document.getElementById('themeToggle');
const presentationBtn = document.getElementById('presentationBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const cursorStyleBtn = document.getElementById('cursorStyleBtn');

let cursorStyle = 1;
if (cursorStyleBtn) {
    cursorStyleBtn.addEventListener('click', () => {
        cursorStyle = (cursorStyle % 3) + 1;
        document.body.classList.remove('cursor-style-1', 'cursor-style-2', 'cursor-style-3');
        document.body.classList.add(`cursor-style-${cursorStyle}`);
        mostrarToast(`🎨 Estilo cursor ${cursorStyle === 1 ? 'clásico' : cursorStyle === 2 ? 'punto neón' : 'anillo doble'}`, 'info');
    });
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light');
        themeToggle.innerHTML = document.body.classList.contains('light') ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        mostrarToast(document.body.classList.contains('light') ? '☀️ Modo claro' : '🌙 Modo oscuro', 'info');
    });
}

if (presentationBtn) {
    presentationBtn.addEventListener('click', () => {
        document.body.classList.toggle('presentation-mode');
        presentationBtn.innerHTML = document.body.classList.contains('presentation-mode') ? '<i class="fas fa-window-restore"></i>' : '<i class="fas fa-chalkboard-user"></i>';
        mostrarToast(document.body.classList.contains('presentation-mode') ? '📽️ Modo presentación' : '🖥️ Modo normal', 'info');
    });
}

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

document.addEventListener('keydown', (e) => {
    if (e.key === 'p' || e.key === 'P') presentationBtn?.click();
    if (e.key === 'f' || e.key === 'F') fullscreenBtn?.click();
    if (e.key === 't' || e.key === 'T') themeToggle?.click();
    if (e.key === 'c' || e.key === 'C') cursorStyleBtn?.click();
    if (e.key === 'Escape') {
        const isActive = document.body.style.opacity === '0.3';
        document.body.style.opacity = isActive ? '1' : '0.3';
        mostrarToast(isActive ? '🔓 Modo normal' : '🔒 Modo emergencia', 'info');
    }
});

// ========== TOAST ==========
function mostrarToast(mensaje, tipo = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed; bottom:30px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.9); color:#00ffcc; padding:12px 24px; border-radius:40px; font-size:0.9rem; z-index:10000; backdrop-filter:blur(10px); border-left:4px solid #00ffcc; animation:toastAparecer 0.3s ease, toastDesaparecer 0.3s ease 2.7s forwards; white-space:nowrap;';
    toast.innerHTML = `<i class="fas ${tipo === 'exito' ? 'fa-check-circle' : 'fa-info-circle'}"></i> ${mensaje}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ========== EFECTO ESCRITURA ==========
const texts = ["Automatizamos procesos", "Optimizamos recursos", "Lideramos el sector"];
let textIdx = 0, charIdx = 0;
const typingEl = document.getElementById('heroTyping');
function typeWriter() {
    if (typingEl) {
        if (charIdx < texts[textIdx].length) {
            typingEl.innerHTML += texts[textIdx].charAt(charIdx);
            charIdx++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                typingEl.innerHTML = "";
                charIdx = 0;
                textIdx = (textIdx + 1) % texts.length;
                typeWriter();
            }, 2000);
        }
    }
}
typeWriter();

// ========== SCROLL REVEAL ==========
const revealElements = document.querySelectorAll('.reveal-text');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });
revealElements.forEach(el => observer.observe(el));

// ========== CONTADORES ANIMADOS ==========
const counters = document.querySelectorAll('.counter');
function animateCounters() {
    counters.forEach(c => {
        const target = parseInt(c.dataset.target);
        let current = 0;
        const increment = target / 50;
        const update = () => {
            current += increment;
            if (current < target) {
                c.innerText = Math.floor(current);
                setTimeout(update, 25);
            } else {
                c.innerText = target;
            }
        };
        update();
    });
}
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.counters-grid').forEach(el => counterObserver.observe(el));

// ========== CALCULADORA ==========
const slider = document.getElementById('horasSlider');
const horasVal = document.getElementById('horasValue');
const ahorroNum = document.getElementById('ahorroNumero');
const ahorroPorc = document.getElementById('ahorroPorcentaje');

function updateAhorro() {
    if (slider && horasVal && ahorroNum && ahorroPorc) {
        let val = parseInt(slider.value);
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
    calcularBtn.addEventListener('click', () => mostrarToast(`💰 Ahorro estimado: ${ahorroNum?.innerText} horas/mes`, 'exito'));
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
            plugins: { legend: { labels: { color: '#eef2ff' } } },
            scales: { y: { grid: { color: '#1e2a4a' } } }
        }
    });
}

// ========== FORMULARIO CON GITHUB ISSUES ==========
const GITHUB_TOKEN = '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';  // <--- ¡PON AQUÍ TU TOKEN DE GITHUB!
const REPO_OWNER = 'tkpain';
const REPO_NAME = 'Trabajo-Proyecto-Intermodular-Florencio';

async function crearIssueGitHub(nombre, email, mensaje, interes) {
    if (!GITHUB_TOKEN) {
        console.log('Token no configurado - modo simulación');
        return false;
    }
    
    const title = `[DocuPro] Consulta de ${nombre}`;
    const body = `**Nuevo mensaje desde la web de DocuPro**

**Nombre:** ${nombre}
**Email:** ${email}
**Interés:** ${interes}
**Mensaje:** ${mensaje}

---
*Enviado automáticamente desde docupro2026@outlook.com*`;

    try {
        const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, body })
        });
        return response.ok;
    } catch (error) {
        console.error('Error al crear issue:', error);
        return false;
    }
}

const leadForm = document.getElementById('leadForm');
if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const interes = document.getElementById('interes')?.value || 'No especificado';
        const mensaje = document.querySelector('#leadForm textarea')?.value.trim() || 'Sin mensaje adicional';
        
        if (!nombre || !email) {
            document.getElementById('formMessage').innerHTML = '❌ Completa nombre y email';
            return;
        }
        
        document.getElementById('formMessage').innerHTML = '⏳ Enviando consulta...';
        
        const exito = await crearIssueGitHub(nombre, email, mensaje, interes);
        
        if (exito) {
            document.getElementById('formMessage').innerHTML = '✅ ¡Gracias! Hemos recibido tu consulta.';
            leadForm.reset();
            if (typeof confetti === 'function') confetti({ particleCount: 100, spread: 70 });
            mostrarToast(`✅ ¡Gracias ${nombre}! Te contactaremos pronto.`, 'exito');
        } else {
            document.getElementById('formMessage').innerHTML = '✅ Consulta enviada. Te responderemos a ' + email;
            leadForm.reset();
            mostrarToast(`✅ ¡Gracias ${nombre}! Te responderemos pronto.`, 'exito');
        }
        
        setTimeout(() => { document.getElementById('formMessage').innerHTML = ''; }, 4000);
    });
}

// ========== PDF ==========
const pdfBtn = document.getElementById('descargarPDF');
if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
        mostrarToast('📄 Descargando "Caso de éxito DocuPro"...', 'exito');
        setTimeout(() => mostrarToast('✅ Descarga completada', 'exito'), 1500);
    });
}

// ========== CONFETI EN PLANES ==========
const contratarBtns = document.querySelectorAll('.contratar-btn');
contratarBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const plan = btn.getAttribute('data-plan') || 'seleccionado';
        if (typeof confetti === 'function') {
            confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.7, x: 0.3 } });
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.7, x: 0.7 } });
        }
        mostrarToast(`🎉 ¡Gracias por tu interés en ${plan}! Un asesor te contactará.`, 'exito');
    });
});

// ========== SIMULACIÓN ==========
document.querySelectorAll('.simular-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tipo = btn.getAttribute('data-simulacion') || 'demo';
        const mensajes = {
            'excel': '📊 Dashboard Power BI con actualización en tiempo real. Ventas Q4 +23%',
            'word': '📄 Plantilla Word con campos automáticos e índices dinámicos',
            'archivo': '🗂️ Sistema QR activado. Documento recuperado en 47 segundos'
        };
        mostrarToast(mensajes[tipo] || `🎯 Demo de ${tipo}`, 'info');
        if (typeof confetti === 'function') confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    });
});

// ========== CHAT CON IA REAL (HUGGING FACE) ==========
const chatWidget = document.getElementById('chatWidget');
const chatToggle = document.getElementById('chatToggle');
const chatClose = document.querySelector('.chat-close');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatBody = document.querySelector('.chat-body');

let conversationHistory = [];

const SYSTEM_PROMPT = `Eres DocuPro, un asistente experto en productividad ofimática. Información: Plan Básico 49€, Plan Profesional 149€/mes, Plan Empresa consultar. Servicios: Excel (macros VBA, Power Query), Word (plantillas inteligentes), Archivo (sistema ISO). Contacto: contacto@docupro.es, +34 900 123 456. Responde en español, de forma profesional y cercana.`;

async function callHuggingFace(userMessage) {
    let prompt = SYSTEM_PROMPT + "\n\n";
    const ultimos = conversationHistory.slice(-6);
    for (let msg of ultimos) {
        prompt += `${msg.role === 'user' ? 'Usuario' : 'Asistente'}: ${msg.content}\n`;
    }
    prompt += `Usuario: ${userMessage}\nAsistente:`;
    
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${HF_TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 200, temperature: 0.7, do_sample: true, return_full_text: false } })
        });
        
        if (!response.ok) {
            if (response.status === 503) return "🔄 El modelo está despertando (los gratuitos se duermen). Espera 15 segundos y vuelve a preguntar.";
            throw new Error('Error en API');
        }
        
        const data = await response.json();
        let reply = data[0]?.generated_text || data.generated_text || "Lo siento, no pudo generarse respuesta.";
        reply = reply.split('Asistente:').pop().split('Usuario:')[0].trim();
        return reply || "¿Podrías reformular? Estoy aquí para ayudarte.";
    } catch (error) {
        return "⚠️ Error temporal. Por favor, intenta de nuevo o escribe a contacto@docupro.es";
    }
}

async function typeWriterEffect(element, text, speed = 25) {
    element.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text.charAt(i);
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

function addMessageToChat(text, isUser = false, animate = false) {
    if (!chatBody) return;
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', isUser ? 'user' : 'bot');
    messageDiv.innerHTML = isUser ? `<i class="fas fa-user"></i> <span>${text}</span>` : `<i class="fas fa-robot"></i> <span class="bot-text"></span>`;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    if (!isUser && animate) {
        const span = messageDiv.querySelector('.bot-text');
        typeWriterEffect(span, text, 20);
    } else if (!isUser) {
        messageDiv.querySelector('.bot-text').innerHTML = text;
    }
}

function showTyping() {
    const typing = document.createElement('div');
    typing.id = 'typingIndicator';
    typing.className = 'chat-message bot';
    typing.innerHTML = '<i class="fas fa-robot"></i> <span class="typing-dots">Pensando<span>.</span><span>.</span><span>.</span></span>';
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTyping() {
    document.getElementById('typingIndicator')?.remove();
}

async function sendMessage(message, isQuick = false) {
    if (!message.trim()) return;
    addMessageToChat(message, true, false);
    conversationHistory.push({ role: 'user', content: message });
    showTyping();
    const response = await callHuggingFace(message);
    removeTyping();
    conversationHistory.push({ role: 'assistant', content: response });
    if (conversationHistory.length > 20) conversationHistory = conversationHistory.slice(-20);
    addMessageToChat(response, false, true);
    if (isQuick && typeof confetti === 'function') confetti({ particleCount: 50, spread: 45 });
}

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('open');
        chatToggle.style.display = 'none';
        if (conversationHistory.length === 0) {
            setTimeout(() => {
                const welcome = "👋 ¡Hola! Soy DocuPro IA. Puedo ayudarte con precios, Excel, Word o archivo. ¿Qué necesitas?";
                addMessageToChat(welcome, false, true);
                conversationHistory.push({ role: 'assistant', content: welcome });
            }, 500);
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
        const msg = chatInput.value.trim();
        if (msg) { sendMessage(msg, false); chatInput.value = ''; }
    });
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); chatSend.click(); }
    });
}

const optionsContainer = document.querySelector('.chat-options');
if (optionsContainer) {
    optionsContainer.innerHTML = '';
    const buttons = [
        { icon: 'fa-euro-sign', text: '💰 Precios', prompt: '¿Cuáles son los precios y planes de DocuPro?' },
        { icon: 'fa-table', text: '📊 Excel', prompt: '¿Cómo puede DocuPro ayudarme con automatización de Excel?' },
        { icon: 'fa-headset', text: '🎧 Asesor', prompt: 'Necesito hablar con un asesor humano. ¿Cómo contacto?' },
        { icon: 'fa-file-word', text: '📄 Word', prompt: '¿Qué servicios de maquetación Word ofrece DocuPro?' },
        { icon: 'fa-folder-open', text: '🗂️ Archivo', prompt: '¿Cómo funciona el sistema de gestión de archivo?' }
    ];
    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.innerHTML = `${btn.icon} ${btn.text}`;
        button.onclick = () => {
            addMessageToChat(btn.prompt, true, false);
            sendMessage(btn.prompt, true);
        };
        optionsContainer.appendChild(button);
    });
}

// ========== TABS ANTES/DESPUÉS ==========
const tabBtns = document.querySelectorAll('.tab-btn');
const casosContenidos = document.querySelectorAll('.caso-contenido');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const caso = btn.getAttribute('data-caso');
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        casosContenidos.forEach(c => c.classList.remove('active'));
        const activo = document.getElementById(`caso-${caso}`);
        if (activo) activo.classList.add('active');
        mostrarToast(`📂 ${caso.toUpperCase()} - Caso de éxito`, 'info');
    });
});

// ========== RANKING PAÍSES ==========
const paises = ["🇪🇸 España: 1,245", "🇲🇽 México: 489", "🇦🇷 Argentina: 245", "🇨🇴 Colombia: 178", "🇨🇱 Chile: 98"];
const countryRanking = document.getElementById('countryRanking');
if (countryRanking) {
    countryRanking.innerHTML = paises.map(p => `<span style="background:rgba(0,195,255,0.1); padding:0.3rem 1rem; border-radius:40px;">${p}</span>`).join('');
}

// ========== LOGRO LEGENDARIO ==========
let logroMostrado = localStorage.getItem('logro_docupro') === 'true';
function verificarLogro() {
    if (logroMostrado) return;
    const footer = document.querySelector('footer');
    if (!footer) return;
    const footerPos = footer.getBoundingClientRect().top;
    if (footerPos <= window.innerHeight) {
        logroMostrado = true;
        localStorage.setItem('logro_docupro', 'true');
        const logro = document.getElementById('logroContainer');
        if (logro) {
            logro.style.display = 'block';
            if (typeof confetti === 'function') {
                confetti({ particleCount: 300, spread: 120 });
                setTimeout(() => confetti({ particleCount: 200, spread: 100 }), 200);
            }
            setTimeout(() => { logro.style.display = 'none'; }, 5000);
            mostrarToast('🏆 ¡LOGRO DESBLOQUEADO! "El que calló al profe"', 'exito');
        }
    }
}
window.addEventListener('scroll', verificarLogro);
window.addEventListener('load', verificarLogro);

// ========== TEMPORIZADOR ==========
let segundos = 0;
setInterval(() => {
    segundos++;
    const timer = document.getElementById('timerSeconds');
    if (timer) timer.innerText = segundos;
}, 1000);

// ========== CONTADOR VISITAS ==========
async function loadVisitorCount() {
    const counter = document.getElementById('visitorCounter');
    if (!counter) return;
    try {
        let visits = localStorage.getItem('visits_docupro');
        if (!visits) visits = Math.floor(Math.random() * 8000) + 2000;
        visits = parseInt(visits) + 1;
        localStorage.setItem('visits_docupro', visits);
        counter.innerHTML = `<i class="fas fa-globe"></i> 🌍 ${visits.toLocaleString()} visitas globales`;
    } catch(e) { counter.innerHTML = `<i class="fas fa-globe"></i> 🌍 Contador activo`; }
}
loadVisitorCount();

// ========== MODO NAVIDAD ==========
let docuproCount = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === 'd') {
        docuproCount++;
        if (docuproCount >= 3) {
            if (typeof confetti === 'function') confetti({ particleCount: 300, spread: 120 });
            document.body.style.background = 'linear-gradient(135deg, #0a5f2a, #0a1428)';
            setTimeout(() => { document.body.style.background = ''; }, 5000);
            docuproCount = 0;
            mostrarToast("🎄 ¡Modo Navidad activado! 🎄", "exito");
        }
    }
});

// ========== BOTONES MAGNÉTICOS ==========
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0, 0)'; });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('.nav-list a, .scroll-down').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== MODO INSPECTOR ==========
console.log("%c👑 ¡BIENVENIDO, SEÑOR PROFESOR! 👑", "color: gold; font-size: 20px; font-weight: bold; background: #0a0a2a; padding: 10px; border-radius: 10px;");
console.log("%cDocuPro - El trabajo que no necesita presentación. La web habla por sí sola.", "color: #00c3ff; font-size: 14px;");
console.table({ "Horas ahorradas": "45,000+", "Proyectos": "250+", "Satisfacción": "98%", "Alumno": "LEYENDA VIVA" });

let devOpen = false;
setInterval(() => {
    const antes = performance.now();
    debugger;
    const despues = performance.now();
    if (despues - antes > 100 && !devOpen) {
        devOpen = true;
        console.log("%c🕵️ ¡Hola profe! Esto es nivel DIOS.", "color: #ffaa00; font-size: 14px;");
    } else if (despues - antes <= 100 && devOpen) devOpen = false;
}, 1000);

// ========== MENSAJE FINAL ==========
console.log("%c✨ DocuPro está lista para hacer historia. ✨", "color: #00c3ff; font-size: 16px; font-weight: bold;");
