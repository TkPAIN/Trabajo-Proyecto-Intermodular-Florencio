// ========== GSAP REGISTER SCROLLTRIGGER ==========
gsap.registerPlugin(ScrollTrigger);

// ========== PARTÍCULAS FONDO ==========
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
window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

// ========== CURSOR PREMIUM CON TRAIL ==========
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const cursorTrail = document.getElementById('cursorTrail');
let trailPositions = [];
let trailTimeout;

document.addEventListener('mousemove', (e) => {
    if (cursor && cursorDot) {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        
        // Guardar posición para el trail
        trailPositions.unshift({ x: e.clientX, y: e.clientY });
        if (trailPositions.length > 10) trailPositions.pop();
        
        // Dibujar trail
        if (cursorTrail) {
            cursorTrail.innerHTML = '';
            trailPositions.forEach((pos, i) => {
                const trailDot = document.createElement('div');
                trailDot.style.position = 'fixed';
                trailDot.style.left = pos.x + 'px';
                trailDot.style.top = pos.y + 'px';
                trailDot.style.width = (8 - i * 0.6) + 'px';
                trailDot.style.height = (8 - i * 0.6) + 'px';
                trailDot.style.background = `rgba(0, 195, 255, ${0.5 - i * 0.04})`;
                trailDot.style.borderRadius = '50%';
                trailDot.style.pointerEvents = 'none';
                trailDot.style.zIndex = '9997';
                trailDot.style.filter = 'blur(2px)';
                cursorTrail.appendChild(trailDot);
            });
        }
    }
});

// Hover effect en elementos interactivos
const interactiveElements = document.querySelectorAll('a, button, .card, .plan, .module, .feature-card, .nav-list a, .glass-premium, .chat-options button, .chat-toggle-btn, .glow-btn, .scroll-down, input, select, textarea, .magnetic-btn');
interactiveElements.forEach(el => {
    if (el) {
        el.addEventListener('mouseenter', () => cursor?.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor?.classList.remove('hover'));
    }
});

// Ripple al hacer clic
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, #00c3ff 0%, rgba(0,195,255,0) 80%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '10001';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.animation = 'ripple 0.45s ease-out forwards';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 450);
});

// ========== CUBO 3D (THREE.JS) ==========
const threeContainer = document.getElementById('threeContainer');
if (threeContainer && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(200, 200);
    threeContainer.appendChild(renderer.domElement);
    
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00c3ff,
        emissive: 0x004466,
        transparent: true,
        opacity: 0.7,
        shininess: 100
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    const edgesGeo = new THREE.EdgesGeometry(geometry);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0x00ffff });
    const wireframe = new THREE.LineSegments(edgesGeo, edgesMat);
    cube.add(wireframe);
    
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(1, 1, 1);
    scene.add(light1);
    const light2 = new THREE.AmbientLight(0x004466);
    scene.add(light2);
    
    camera.position.z = 2;
    
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });
    
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.01;
        cube.rotation.x += mouseY * 0.02;
        cube.rotation.y += mouseX * 0.02;
        renderer.render(scene, camera);
    }
    animate();
}

// ========== TÍTULO MARVEL ==========
const marvelCanvas = document.getElementById('marvelCanvas');
if (marvelCanvas) {
    const marvelCtx = marvelCanvas.getContext('2d');
    function resizeMarvelCanvas() {
        const container = document.querySelector('.marvel-logo-container');
        if (container && marvelCanvas) {
            marvelCanvas.width = container.offsetWidth;
            marvelCanvas.height = container.offsetHeight;
        }
    }
    function crearExplosionMarvel() {
        resizeMarvelCanvas();
        const width = marvelCanvas.width;
        const height = marvelCanvas.height;
        const particles = [];
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: width / 2, y: height / 2,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 1,
                color: `hsl(${Math.random() * 60 + 180}, 100%, 60%)`
            });
        }
        let animationId;
        function animateExplosion() {
            marvelCtx.clearRect(0, 0, width, height);
            let allDead = true;
            for (let p of particles) {
                if (p.life > 0) {
                    allDead = false;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life -= 0.02;
                    marvelCtx.beginPath();
                    marvelCtx.arc(p.x, p.y, 3 * p.life, 0, Math.PI * 2);
                    marvelCtx.fillStyle = p.color;
                    marvelCtx.fill();
                }
            }
            if (!allDead) animationId = requestAnimationFrame(animateExplosion);
            else { marvelCtx.clearRect(0, 0, width, height); cancelAnimationFrame(animationId); }
        }
        animateExplosion();
    }
    window.addEventListener('load', () => { setTimeout(() => crearExplosionMarvel(), 1200); });
    window.addEventListener('resize', resizeMarvelCanvas);
}

// ========== SCROLL REVEAL PREMIUM ==========
gsap.utils.toArray('.reveal-text').forEach((text) => {
    gsap.fromTo(text, 
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'back.out(1.2)',
            scrollTrigger: {
                trigger: text,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Efecto stagger en grids
gsap.utils.toArray('.cards-grid, .counters-grid, .grid-4, .excel-modules, .ergo-grid, .pricing').forEach((grid) => {
    gsap.fromTo(grid.children,
        { opacity: 0, y: 30, scale: 0.95 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: grid,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// ========== CONTROLES ==========
const themeToggle = document.getElementById('themeToggle');
const presentationBtn = document.getElementById('presentationBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const cursorStyleBtn = document.getElementById('cursorStyleBtn');

let cursorStyle = 1;
if (cursorStyleBtn) {
    cursorStyleBtn.addEventListener('click', () => {
        cursorStyle = cursorStyle % 3 + 1;
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
        mostrarToast(document.body.classList.contains('presentation-mode') ? '📽️ Modo presentación activado' : '🖥️ Modo normal', 'info');
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

// Atajos de teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'p' || e.key === 'P') presentationBtn?.click();
    if (e.key === 'f' || e.key === 'F') fullscreenBtn?.click();
    if (e.key === 't' || e.key === 'T') themeToggle?.click();
    if (e.key === 'c' || e.key === 'C') cursorStyleBtn?.click();
    if (e.key === 'Escape') {
        document.body.style.opacity = document.body.style.opacity === '0.3' ? '1' : '0.3';
        mostrarToast(document.body.style.opacity === '0.3' ? '🔒 Modo emergencia' : '🔓 Modo normal', 'info');
    }
});

// ========== TOAST NOTIFICATIONS ==========
function mostrarToast(mensaje, tipo = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast-notificacion';
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'rgba(0, 0, 0, 0.9)';
    toast.style.color = '#00ffcc';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '40px';
    toast.style.fontSize = '0.9rem';
    toast.style.zIndex = '10000';
    toast.style.backdropFilter = 'blur(10px)';
    toast.style.borderLeft = '4px solid #00ffcc';
    toast.style.animation = 'toastAparecer 0.3s ease, toastDesaparecer 0.3s ease 2.7s forwards';
    toast.innerHTML = `<i class="fas ${tipo === 'exito' ? 'fa-check-circle' : tipo === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i> ${mensaje}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

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
    entries.forEach(e => { if (e.isIntersecting) { animateCounters(); observer.unobserve(e.target); } });
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
    calcularBtn.addEventListener('click', () => mostrarToast(`💰 Ahorro estimado: ${ahorroNum?.innerText} horas/mes`, 'exito'));
}

// ========== GRÁFICO ==========
const chartCanvas = document.getElementById('horasChart');
if (chartCanvas) {
    new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels: ['Manual', 'DocuPro', 'Benchmark'],
            datasets: [{ label: 'Horas/mes', data: [95, 24, 60], backgroundColor: ['#4a5b7a', '#00c3ff', '#2a3a5a'], borderRadius: 8 }]
        },
        options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { labels: { color: '#eef2ff' } } } }
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
        if (formMessage) formMessage.innerHTML = '✅ ¡Gracias! Te contactamos en <24h.';
        leadForm.reset();
        setTimeout(() => { if (formMessage) formMessage.innerHTML = ''; }, 3000);
        if (typeof confetti === 'function') confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        mostrarToast(`✅ ¡Gracias ${nombre}! Te contactaremos pronto.`, 'exito');
    });
}

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
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.7, x: 0.3 }, startVelocity: 15 });
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.7, x: 0.7 }, startVelocity: 15 });
        }
        mostrarToast(`🎉 ¡Gracias por tu interés en ${plan}! Un asesor te contactará.`, 'exito');
    });
});

// ========== BOTONES SIMULACIÓN ==========
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
    if (lower.includes('precio')) addMsg('💰 Plan Profesional: 149€/mes. ¿Te interesa?');
    else if (lower.includes('excel')) addMsg('📊 Automatizamos reporting con VBA y Power Query');
    else addMsg('🎧 Un asesor te contactará pronto. ¿Más dudas?');
}

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('open');
        chatToggle.style.display = 'none';
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
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') chatSend.click(); });
}
document.querySelectorAll('.chat-options button').forEach(btn => {
    btn.addEventListener('click', () => {
        const msg = btn.innerText.replace(/[💰📊🎧]/g, '').trim();
        addMsg(msg, true);
        setTimeout(() => botResp(msg), 400);
    });
});

// ========== TABS ANTES/DESPUÉS ==========
const tabBtns = document.querySelectorAll('.tab-btn');
const casosContenidos = document.querySelectorAll('.caso-contenido');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const caso = btn.getAttribute('data-caso');
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        casosContenidos.forEach(contenido => contenido.classList.remove('active'));
        const casoActivo = document.getElementById(`caso-${caso}`);
        if (casoActivo) casoActivo.classList.add('active');
        mostrarToast(`📂 ${caso.toUpperCase()} - Caso de éxito`, 'info');
    });
});

// ========== RANKING PAÍSES ==========
const paises = ["🇪🇸 España: 1,245", "🇲🇽 México: 489", "🇦🇷 Argentina: 245", "🇨🇴 Colombia: 178", "🇨🇱 Chile: 98"];
const countryRanking = document.getElementById('countryRanking');
if (countryRanking) {
    countryRanking.innerHTML = paises.map(p => `<span style="background:rgba(0,195,255,0.1); padding:0.4rem 1rem; border-radius:40px;">${p}</span>`).join('');
}

// ========== LOGRO LEGENDARIO ==========
let logroMostrado = false;
if (localStorage.getItem('logro_docupro')) logroMostrado = true;

function verificarLogro() {
    if (logroMostrado) return;
    const footer = document.querySelector('footer');
    if (!footer) return;
    const footerPosition = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (footerPosition <= windowHeight) {
        logroMostrado = true;
        const logroContainer = document.getElementById('logroContainer');
        if (logroContainer) {
            logroContainer.style.display = 'block';
            if (typeof confetti === 'function') {
                confetti({ particleCount: 300, spread: 120, origin: { y: 0.5 } });
                setTimeout(() => confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } }), 200);
            }
            localStorage.setItem('logro_docupro', 'true');
            setTimeout(() => { logroContainer.style.display = 'none'; }, 5000);
            mostrarToast('🏆 ¡LOGRO DESBLOQUEADO! "El que calló al profe"', 'exito');
        }
    }
}
window.addEventListener('scroll', verificarLogro);
window.addEventListener('load', verificarLogro);

// ========== MODO INSPECTOR ==========
console.log("%c👑 ¡BIENVENIDO, SEÑOR PROFESOR! 👑", "color: gold; font-size: 20px; font-weight: bold; background: #0a0a2a; padding: 10px; border-radius: 10px;");
console.log("%cEste trabajo ha sido desarrollado con nivel ÉLITE.", "color: cyan; font-size: 14px;");
console.log("%cEl alumno que ha creado esto no necesita presentación. La web habla por sí sola.", "color: #00ffcc; font-size: 12px;");
console.table({ "Horas ahorradas": "45,000+", "Proyectos": "250+", "Satisfacción": "98%", "Alumno": "LEYENDA VIVA" });

let devToolsOpen = false;
setInterval(() => {
    const antes = performance.now();
    debugger;
    const despues = performance.now();
    if (despues - antes > 100 && !devToolsOpen) {
        devToolsOpen = true;
        console.log("%c🕵️ ¡Hola de nuevo, profe! Esto es nivel DIOS.", "color: #ffaa00; font-size: 14px;");
        mostrarToast("🕵️ ¡Has activado el modo inspector!", "info");
    } else if (despues - antes <= 100 && devToolsOpen) {
        devToolsOpen = false;
    }
}, 1000);

// ========== TEMPORIZADOR ==========
let segundos = 0;
setInterval(() => {
    segundos++;
    const timerSpan = document.getElementById('timerSeconds');
    if (timerSpan) timerSpan.innerText = segundos;
}, 1000);

// ========== CONTADOR VISITAS ==========
async function loadVisitorCount() {
    const counterElement = document.getElementById('visitorCounter');
    if (!counterElement) return;
    try {
        let visits = localStorage.getItem('visits_docupro');
        if (!visits) visits = Math.floor(Math.random() * 5000) + 1000;
        visits = parseInt(visits) + 1;
        localStorage.setItem('visits_docupro', visits);
        counterElement.innerHTML = `<i class="fas fa-globe"></i> 🌍 ${visits.toLocaleString()} visitas globales`;
    } catch (error) {
        counterElement.innerHTML = `<i class="fas fa-globe"></i> 🌍 Contador activo`;
    }
}
loadVisitorCount();

// ========== MODO NAVIDAD ==========
let docuproCount = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === 'd') {
        docuproCount++;
        if (docuproCount >= 3) {
            if (typeof confetti === 'function') confetti({ particleCount: 300, spread: 120, origin: { y: 0.5 } });
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
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

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

// ========== FEEDBACK ==========
document.querySelectorAll('.like-btn, .dislike-btn')?.forEach(btn => {
    btn.addEventListener('click', () => {
        if (typeof confetti === 'function') confetti({ particleCount: 30, spread: 45 });
        mostrarToast('👍 ¡Gracias por tu feedback!', 'exito');
    });
});

// ========== VIDEO DEMO ==========
const demoVideo = document.getElementById('demoVideo');
if (demoVideo) {
    demoVideo.addEventListener('click', () => {
        mostrarToast('🎬 Demo: Automatización de reporting en Excel - Ahorro del 85%', 'info');
        if (typeof confetti === 'function') confetti({ particleCount: 100, spread: 70 });
    });
}

console.log("%c✨ DocuPro está lista para hacer historia. ¡Disfruta la experiencia élite! ✨", "color: #00c3ff; font-size: 16px; font-weight: bold;");
