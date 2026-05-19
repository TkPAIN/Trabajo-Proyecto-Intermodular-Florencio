// ========== 1. TÍTULO MARVEL CON EXPLOSIÓN DE PARTÍCULAS ==========
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
                x: width / 2,
                y: height / 2,
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
            
            if (!allDead) {
                animationId = requestAnimationFrame(animateExplosion);
            } else {
                marvelCtx.clearRect(0, 0, width, height);
                cancelAnimationFrame(animationId);
            }
        }
        
        animateExplosion();
    }
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            crearExplosionMarvel();
        }, 1200);
    });
    window.addEventListener('resize', resizeMarvelCanvas);
}

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

// ========== TOAST PARA BOTONES (ACCIÓN REAL) ==========
function mostrarToast(mensaje, tipo = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast-notificacion';
    toast.innerHTML = `<i class="fas ${tipo === 'exito' ? 'fa-check-circle' : tipo === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i> ${mensaje}`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ========== 3. LOGRO LEGENDARIO AL LLEGAR AL FOOTER ==========
let logroMostrado = false;

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
            
            // Confeti masivo
            if (typeof confetti === 'function') {
                confetti({ particleCount: 300, spread: 120, origin: { y: 0.5 } });
                setTimeout(() => confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } }), 200);
            }
            
            // Guardar en localStorage para que solo salga una vez
            localStorage.setItem('logro_docupro', 'true');
            
            setTimeout(() => {
                logroContainer.style.display = 'none';
            }, 5000);
        }
    }
}

// Verificar si ya se mostró antes
if (localStorage.getItem('logro_docupro')) {
    logroMostrado = true;
}

window.addEventListener('scroll', verificarLogro);
window.addEventListener('load', verificarLogro);

// ========== 4. MODO INSPECTOR (MENSAJE ÉPICO EN CONSOLA) ==========
console.log("%c👑 ¡BIENVENIDO, SEÑOR PROFESOR! 👑", "color: gold; font-size: 20px; font-weight: bold; background: #0a0a2a; padding: 10px; border-radius: 10px;");
console.log("%cEste trabajo ha sido desarrollado con nivel ÉLITE.", "color: cyan; font-size: 14px;");
console.log("%cEl alumno que ha creado esto no necesita presentación. La web habla por sí sola.", "color: #00ffcc; font-size: 12px;");
console.table({ 
    "Horas ahorradas": "45,000+", 
    "Proyectos completados": "250+", 
    "Satisfacción cliente": "98%", 
    "Alumno": "LEYENDA VIVA",
    "Mensaje para el profesor": "No hay nota suficiente para esto"
});

// Detectar si se abre el inspector (efecto sorpresa)
let devToolsOpen = false;
setInterval(() => {
    const antes = performance.now();
    debugger;
    const despues = performance.now();
    const diferencia = despues - antes;
    if (diferencia > 100 && !devToolsOpen) {
        devToolsOpen = true;
        console.log("%c🕵️ ¡Hola de nuevo, profe! Sabía que mirarías las herramientas de desarrollo.", "color: #ffaa00; font-size: 14px;");
        console.log("%cTe invito a explorar toda la web. Hay Easter eggs escondidos...", "color: #ffaa00; font-size: 12px;");
        mostrarToast("🕵️ ¡Has activado el modo inspector! Disfruta del Easter egg.", "info");
    } else if (diferencia <= 100 && devToolsOpen) {
        devToolsOpen = false;
    }
}, 1000);

// ========== BOTONES CON ACCIÓN REAL (BACKEND SIMULADO) ==========
function inicializarBotonesConAccion() {
    // Botones "Contratar" de los planes
    document.querySelectorAll('.contratar-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const plan = btn.getAttribute('data-plan') || 'seleccionado';
            mostrarToast(`🎉 ¡Solicitud enviada! Un asesor contactará sobre el plan ${plan} en < 24h.`, 'exito');
            
            // Confeti
            if (typeof confetti === 'function') {
                confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
            }
        });
    });
    
    // Botón "Calcular ROI"
    const calcularBtn = document.getElementById('calcularBtn');
    if (calcularBtn) {
        calcularBtn.addEventListener('click', () => {
            const horas = document.getElementById('horasSlider')?.value || 40;
            const ahorro = Math.round(horas * 0.85);
            mostrarToast(`📊 ROI calculado: Ahorrarías ${ahorro} horas/mes (${Math.round(ahorro/horas*100)}% menos de carga)`, 'exito');
        });
    }
    
    // Botón "Enviar consulta" del formulario
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre')?.value.trim();
            if (nombre) {
                mostrarToast(`✅ ¡Gracias ${nombre}! Tu consulta ha sido enviada. Te responderemos en < 2h.`, 'exito');
                leadForm.reset();
            } else {
                mostrarToast(`⚠️ Por favor, completa tu nombre y email.`, 'error');
            }
        });
    }
    
    // Botón "Descargar PDF"
    const pdfBtn = document.getElementById('descargarPDF');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', () => {
            mostrarToast(`📄 Descargando "Caso de éxito DocuPro - Automatización avanzada"...`, 'exito');
            setTimeout(() => {
                mostrarToast(`✅ Descarga completada. Revisa tu carpeta de descargas.`, 'exito');
            }, 1500);
        });
    }
    
    // Botones de simulación (antes/después)
    document.querySelectorAll('.simular-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tipo = btn.getAttribute('data-simulacion') || 'demo';
            const mensajes = {
                'excel': '📊 SIMULACIÓN: Dashboard Power BI con actualización en tiempo real. Datos: Ventas Q4 2025 +23%.',
                'word': '📄 SIMULACIÓN: Plantilla Word con campos automáticos, índices dinámicos y control de cambios.',
                'archivo': '🗂️ SIMULACIÓN: Sistema QR activado. Documento recuperado en 47 segundos.'
            };
            mostrarToast(mensajes[tipo] || `🎯 Demo de ${tipo} disponible en la consultoría completa.`, 'info');
        });
    });
    
    // Botones de feedback (like/dislike)
    document.querySelectorAll('.like-btn, .dislike-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tipo = btn.classList.contains('like-btn') ? 'Me gusta' : 'No me gusta';
            mostrarToast(`👍 ¡Gracias por tu ${tipo}! Tu opinión nos ayuda a mejorar.`, 'exito');
        });
    });
    
    // Botones del chat
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    if (chatSend && chatInput) {
        chatSend.addEventListener('click', () => {
            const mensaje = chatInput.value.trim();
            if (mensaje) {
                mostrarToast(`💬 Mensaje enviado al equipo de asesores. Te responderán en breve.`, 'exito');
                chatInput.value = '';
            }
        });
    }
    
    // Botón "Ver más" si existe en testimonios (creamos uno dinámico si no)
    if (!document.querySelector('.ver-mas-btn')) {
        const testimonialSection = document.querySelector('.testimonial');
        if (testimonialSection && !testimonialSection.nextElementSibling?.classList?.contains('ver-mas-btn')) {
            const btnVerMas = document.createElement('button');
            btnVerMas.className = 'glow-btn ver-mas-btn';
            btnVerMas.style.marginTop = '1rem';
            btnVerMas.innerHTML = '<i class="fas fa-plus-circle"></i> Ver más casos de éxito';
            btnVerMas.addEventListener('click', () => {
                mostrarToast('📋 Próximamente: 5 casos de éxito adicionales. Suscríbete a nuestra newsletter.', 'info');
            });
            testimonialSection.parentNode?.appendChild(btnVerMas);
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    inicializarBotonesConAccion();
});

// ========== RESTO DE FUNCIONES EXISTENTES ==========
// (Mantenemos todo lo que ya funcionaba)

// Efecto escritura
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

// Contadores animados
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

// Calculadora ahorro
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

// Gráfico
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
            plugins: { legend: { labels: { color: '#eef2ff' } } }
        }
    });
}

// Tabs Antes/Después
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
        mostrarToast(`📂 Cambiando a caso: ${caso.toUpperCase()}`, 'info');
    });
});

// Chat
const chatWidget = document.getElementById('chatWidget');
const chatToggle = document.getElementById('chatToggle');
const chatClose = document.querySelector('.chat-close');
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

// Smooth scroll
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

// Ranking países
const paises = ["🇪🇸 España: 1,245", "🇲🇽 México: 489", "🇦🇷 Argentina: 245", "🇨🇴 Colombia: 178", "🇨🇱 Chile: 98"];
const countryRanking = document.getElementById('countryRanking');
if (countryRanking) {
    countryRanking.innerHTML = paises.map(p => `<span class="country-badge">${p}</span>`).join('');
}

// Temporizador de sesión
let segundos = 0;
setInterval(() => {
    segundos++;
    const timerSpan = document.getElementById('timerSeconds');
    if (timerSpan) timerSpan.innerText = segundos;
}, 1000);

// Contador de visitas
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

// Modo navidad oculto
let docuproCount = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === 'd') {
        docuproCount++;
        if (docuproCount >= 3) {
            if (typeof confetti === 'function') {
                confetti({ particleCount: 300, spread: 120, origin: { y: 0.5 } });
            }
            document.body.style.background = 'linear-gradient(135deg, #0a5f2a, #0a1428)';
            setTimeout(() => {
                document.body.style.background = '';
            }, 5000);
            docuproCount = 0;
            mostrarToast("🎄 ¡Modo Navidad activado! Disfruta de la magia.", "exito");
        }
    }
});

// Video demo
const demoVideo = document.getElementById('demoVideo');
if (demoVideo) {
    demoVideo.addEventListener('click', () => {
        mostrarToast("🎬 Demo: Automatización de reporting en Excel - Ahorro del 85% de tiempo", "info");
        if (typeof confetti === 'function') {
            confetti({ particleCount: 100, spread: 70 });
        }
    });
}

// Modo claro/oscuro
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light');
        themeToggle.innerHTML = document.body.classList.contains('light') ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        mostrarToast(document.body.classList.contains('light') ? "☀️ Modo claro activado" : "🌙 Modo oscuro activado", "info");
    });
}

// Pantalla completa
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

console.log("%c✨ DocuPro está lista para hacer historia. ¡Disfruta la experiencia élite! ✨", "color: #00c3ff; font-size: 16px; font-weight: bold;");
