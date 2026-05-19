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
