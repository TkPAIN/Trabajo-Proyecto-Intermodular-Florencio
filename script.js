// PARTÍCULAS
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas(){canvas.width=innerWidth;canvas.height=innerHeight}
function createParticles(){particles=[];for(let i=0;i<80;i++)particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,radius:Math.random()*2+1,alpha:Math.random()*0.5+0.2,speedX:(Math.random()-0.5)*0.3,speedY:(Math.random()-0.5)*0.2})}
function drawParticles(){ctx.clearRect(0,0,canvas.width,canvas.height);for(let p of particles){ctx.beginPath();ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);ctx.fillStyle=`rgba(0,195,255,${p.alpha})`;ctx.fill();p.x+=p.speedX;p.y+=p.speedY;if(p.x<0)p.x=canvas.width;if(p.x>canvas.width)p.x=0;if(p.y<0)p.y=canvas.height;if(p.y>canvas.height)p.y=0}requestAnimationFrame(drawParticles)}
resizeCanvas();createParticles();drawParticles();window.addEventListener('resize',()=>{resizeCanvas();createParticles()});

// CURSOR
const cursor=document.querySelector('.cursor'),cursorDot=document.querySelector('.cursor-dot');
document.addEventListener('mousemove',(e)=>{cursor.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;cursorDot.style.transform=`translate(${e.clientX}px,${e.clientY}px)`});
document.querySelectorAll('a,button,.card,.plan,.module,.feature-card,.nav-list a,.glass-card,.chat-options button,.chat-toggle-btn,.glow-btn,.scroll-down,input,select,textarea').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('hover'));el.addEventListener('mouseleave',()=>cursor.classList.remove('hover'))});
document.addEventListener('click',(e)=>{const ripple=document.createElement('div');ripple.classList.add('ripple-effect');ripple.style.left=e.clientX+'px';ripple.style.top=e.clientY+'px';document.body.appendChild(ripple);setTimeout(()=>ripple.remove(),450)});

// TEMAS Y MODOS
const themeToggle=document.getElementById('themeToggle');
themeToggle.addEventListener('click',()=>{document.body.classList.toggle('light');themeToggle.innerHTML=document.body.classList.contains('light')?'<i class="fas fa-moon"></i>':'<i class="fas fa-sun"></i>'});

// Modo presentación
const presentationBtn=document.getElementById('presentationBtn');
presentationBtn.addEventListener('click',()=>{document.body.classList.toggle('presentation-mode');presentationBtn.innerHTML=document.body.classList.contains('presentation-mode')?'<i class="fas fa-window-restore"></i>':'<i class="fas fa-presentation"></i>'});

// Pantalla completa
const fullscreenBtn=document.getElementById('fullscreenBtn');
fullscreenBtn.addEventListener('click',()=>{if(!document.fullscreenElement){document.documentElement.requestFullscreen();fullscreenBtn.innerHTML='<i class="fas fa-compress"></i>'}else{document.exitFullscreen();fullscreenBtn.innerHTML='<i class="fas fa-expand"></i>'}});

// Emergencia
const emergencyBtn=document.getElementById('emergencyBtn');
let emergencyActive=false;
emergencyBtn.addEventListener('click',()=>{emergencyActive=!emergencyActive;if(emergencyActive){document.body.style.opacity='0.3';emergencyBtn.style.background='red';alert('🔒 Modo emergencia activado - Contenido sensible oculto')}else{document.body.style.opacity='1';emergencyBtn.style.background='#00c3ff'}});
document.addEventListener('keydown',(e)=>{if(e.key==='Escape'){emergencyActive=!emergencyActive;if(emergencyActive){document.body.style.opacity='0.3';emergencyBtn.style.background='red'}else{document.body.style.opacity='1';emergencyBtn.style.background='#00c3ff'}};if(e.key==='p'||e.key==='P')presentationBtn.click();if(e.key==='f'||e.key==='F')fullscreenBtn.click();if(e.key==='t'||e.key==='T')themeToggle.click()});

// EFECTO ESCRITURA
const texts=["Automatizamos procesos","Optimizamos recursos","Lideramos el sector"];
let idx=0,charIdx=0,typingEl=document.getElementById('heroTyping');
function typeWriter(){if(charIdx<texts[idx].length){typingEl.innerHTML+=texts[idx].charAt(charIdx);charIdx++;setTimeout(typeWriter,100)}else{setTimeout(()=>{typingEl.innerHTML="";charIdx=0;idx=(idx+1)%texts.length;typeWriter()},2000)}}typeWriter();

// CONTADORES ANIMADOS
const counters=document.querySelectorAll('.counter');
const animateCounters=()=>{counters.forEach(c=>{const target=+c.dataset.target;let current=0;const increment=target/50;const update=()=>{current+=increment;if(current<target){c.innerText=Math.floor(current);setTimeout(update,30)}else c.innerText=target};update()})};
const observer=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){animateCounters();observer.unobserve(e.target)}})},{threshold:0.5});
document.querySelectorAll('.counters-grid').forEach(el=>observer.observe(el));

// CALCULADORA
const slider=document.getElementById('horasSlider'),horasVal=document.getElementById('horasValue'),ahorroNum=document.getElementById('ahorroNumero'),ahorroPorc=document.getElementById('ahorroPorcentaje');
function updateAhorro(){let val=+slider.value;horasVal.innerText=val;let ahorro=Math.round(val*0.85);ahorroNum.innerText=ahorro;ahorroPorc.innerText=85;}
slider.addEventListener('input',updateAhorro);updateAhorro();
document.getElementById('calcularBtn').addEventListener('click',()=>alert(`💰 Ahorro estimado: ${ahorroNum.innerText} horas/mes. ¿Hablamos?`));

// GRÁFICO
new Chart(document.getElementById('horasChart'),{type:'bar',data:{labels:['Manual','DocuPro','Benchmark'],datasets:[{label:'Horas/mes',data:[95,24,60],backgroundColor:['#4a5b7a','#00c3ff','#2a3a5a'],borderRadius:8}]},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{labels:{color:'#eef2ff'}}}}});

// FORMULARIO
document.getElementById('leadForm').addEventListener('submit',(e)=>{e.preventDefault();const nombre=document.getElementById('nombre').value.trim(),email=document.getElementById('email').value.trim();if(!nombre||!email){document.getElementById('formMessage').innerHTML='❌ Completa nombre y email';return}document.getElementById('formMessage').innerHTML='✅ ¡Gracias! Te contactamos en <24h.';e.target.reset();setTimeout(()=>document.getElementById('formMessage').innerHTML='',3000);canvasConfetti({particleCount:100,spread:70,origin:{y:0.6}})});

// PDF
document.getElementById('descargarPDF').addEventListener('click',()=>{alert('📄 Caso de éxito: "Cómo ahorramos 120h/mes con DocuPro" (demo)');canvasConfetti({particleCount:50,spread:60})});

// CONFETI AL CONTRATAR
document.querySelectorAll('.contratar-btn').forEach(btn=>{btn.addEventListener('click',()=>{canvasConfetti({particleCount:200,spread:100,origin:{y:0.6}});alert(`🎉 ¡Gracias por tu interés en el plan ${btn.dataset.plan}! Un asesor te contactará.`)})});

// CHAT
const chatWidget=document.getElementById('chatWidget'),chatToggle=document.getElementById('chatToggle'),chatClose=document.querySelector('.chat-close'),chatInput=document.getElementById('chatInput'),chatSend=document.getElementById('chatSend'),chatBody=document.querySelector('.chat-body');
function addMsg(t,u=false){const d=document.createElement('div');d.classList.add('chat-message',u?'user':'bot');d.innerHTML=u?`🧑 ${t}`:`🤖 ${t}`;chatBody.appendChild(d);chatBody.scrollTop=chatBody.scrollHeight}
function botResp(m){const l=m.toLowerCase();if(l.includes('precio'))addMsg('💰 Plan Profesional: 149€/mes. ¿Te interesa?');else if(l.includes('excel'))addMsg('📊 Automatizamos reporting completo con VBA. ¿Demo?');else addMsg('🎧 Un asesor te contactará pronto. ¿Más dudas?')}
chatToggle.addEventListener('click',()=>{chatWidget.classList.toggle('open');chatToggle.style.display='none'});
chatClose.addEventListener('click',()=>{chatWidget.classList.remove('open');chatToggle.style.display='flex'});
chatSend.addEventListener('click',()=>{const t=chatInput.value.trim();if(t){addMsg(t,true);chatInput.value='';setTimeout(()=>botResp(t),600)}});
document.querySelectorAll('.chat-options button').forEach(b=>{b.addEventListener('click',()=>{const m=b.innerText.replace(/[💰📊🎧]/g,'').trim();addMsg(m,true);setTimeout(()=>botResp(m),400)})});

// FEEDBACK
let feedbacks={vision:0,mision:0,valores:0};
document.querySelectorAll('.like-btn').forEach(btn=>{btn.addEventListener('click',()=>{const section=btn.dataset.section;feedbacks[section]=(feedbacks[section]||0)+1;document.getElementById(`feedback-${section}`).innerHTML=`👍 ${feedbacks[section]}`;canvasConfetti({particleCount:30,spread:45})})});
document.querySelectorAll('.dislike-btn').forEach(btn=>{btn.addEventListener('click',()=>{const section=btn.dataset.section;alert('Gracias por tu feedback. Lo tendremos en cuenta.')})});

// RANKING PAÍSES SIMULADO
const paises=["🇪🇸 España: 1,245","🇲🇽 México: 489","🇦🇷 Argentina: 245","🇨🇴 Colombia: 178","🇨🇱 Chile: 98"];
document.getElementById('countryRanking').innerHTML=paises.map(p=>`<span class="country-badge">${p}</span>`).join('');

// TEMPORIZADOR DE SESIÓN
let segundos=0;
setInterval(()=>{segundos++;document.getElementById('timerSeconds').innerText=segundos},1000);

// CONTADOR GLOBAL (simulación + integración Cloudflare)
let visitCount=0;
async function loadVisitorCount(){try{const response=await fetch('https://docupro-contador.marcos238gn.workers.dev/api/counter');const data=await response.json();visitCount=data.value;document.getElementById('visitorCounter').innerHTML=`<i class="fas fa-globe"></i> ${visitCount.toLocaleString()} visitas globales`;}catch{let visits=localStorage.getItem('visits')||Math.floor(Math.random()*10000)+1000;visits++;localStorage.setItem('visits',visits);document.getElementById('visitorCounter').innerHTML=`<i class="fas fa-globe"></i> ${visits.toLocaleString()} visitas (demo)`;}}
loadVisitorCount();

// MODO NAVIDAD OCULTO
let docuproCount=0;
document.addEventListener('keydown',(e)=>{if(e.key==='d'){docuproCount++;if(docuproCount>=3){canvasConfetti({particleCount:300,spread:120,origin:{y:0.5}});document.body.style.background='linear-gradient(135deg, #0a5f2a, #0a1428)';setTimeout(()=>{document.body.style.background=''},5000);docuproCount=0}}});

// VÍDEO DEMO INTERACTIVO
document.getElementById('demoVideo')?.addEventListener('click',()=>{alert('🎬 Demo: Automatización de reporting en Excel - Ahorro del 85% de tiempo');canvasConfetti({particleCount:100,spread:70})});

// SMOOTH SCROLL
document.querySelectorAll('.nav-list a, .scroll-down').forEach(a=>{a.addEventListener('click',function(e){const h=this.getAttribute('href');if(h&&h.startsWith('#')){e.preventDefault();document.querySelector(h)?.scrollIntoView({behavior:'smooth'})}})});
