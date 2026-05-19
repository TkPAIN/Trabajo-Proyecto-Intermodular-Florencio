// Partículas
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas(){canvas.width=innerWidth;canvas.height=innerHeight}
function createParticles(){particles=[];for(let i=0;i<80;i++)particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,radius:Math.random()*2+1,alpha:Math.random()*0.5+0.2,speedX:(Math.random()-0.5)*0.3,speedY:(Math.random()-0.5)*0.2})}
function drawParticles(){ctx.clearRect(0,0,canvas.width,canvas.height);for(let p of particles){ctx.beginPath();ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);ctx.fillStyle=`rgba(0,195,255,${p.alpha})`;ctx.fill();p.x+=p.speedX;p.y+=p.speedY;if(p.x<0)p.x=canvas.width;if(p.x>canvas.width)p.x=0;if(p.y<0)p.y=canvas.height;if(p.y>canvas.height)p.y=0}requestAnimationFrame(drawParticles)}
resizeCanvas();createParticles();drawParticles();window.addEventListener('resize',()=>{resizeCanvas();createParticles()});

// Cursor
const cursor=document.querySelector('.cursor'),cursorDot=document.querySelector('.cursor-dot');
document.addEventListener('mousemove',(e)=>{cursor.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;cursorDot.style.transform=`translate(${e.clientX}px,${e.clientY}px)`});
document.querySelectorAll('a,button,.card,.plan,.module,.feature-card,.nav-list a,.glass-card,.chat-options button,.chat-toggle-btn,.glow-btn,.scroll-down,input,select,textarea').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('hover'));el.addEventListener('mouseleave',()=>cursor.classList.remove('hover'))});
document.addEventListener('click',(e)=>{const ripple=document.createElement('div');ripple.classList.add('ripple-effect');ripple.style.left=e.clientX+'px';ripple.style.top=e.clientY+'px';document.body.appendChild(ripple);setTimeout(()=>ripple.remove(),450)});

// Tema claro/oscuro
const themeToggle=document.getElementById('themeToggle');
themeToggle.addEventListener('click',()=>{document.body.classList.toggle('light');themeToggle.innerHTML=document.body.classList.contains('light')?'<i class="fas fa-moon"></i>':'<i class="fas fa-sun"></i>'});

// Efecto escritura
const texts=["Automatizamos procesos","Optimizamos recursos","Lideramos el sector"];
let idx=0,charIdx=0,typingEl=document.getElementById('heroTyping');
function typeWriter(){if(charIdx<texts[idx].length){typingEl.innerHTML+=texts[idx].charAt(charIdx);charIdx++;setTimeout(typeWriter,100)}else{setTimeout(()=>{typingEl.innerHTML="";charIdx=0;idx=(idx+1)%texts.length;typeWriter()},2000)}}typeWriter();

// Contadores animados
const counters=document.querySelectorAll('.counter');
const animateCounters=()=>{counters.forEach(c=>{const target=+c.dataset.target;let current=0;const increment=target/50;const update=()=>{current+=increment;if(current<target){c.innerText=Math.floor(current);setTimeout(update,30)}else c.innerText=target};update()})};
const observer=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){animateCounters();observer.unobserve(e.target)}})},{threshold:0.5});
document.querySelectorAll('.counters-grid').forEach(el=>observer.observe(el));

// Calculadora ahorro
const slider=document.getElementById('horasSlider'),horasVal=document.getElementById('horasValue'),ahorroNum=document.getElementById('ahorroNumero'),ahorroPorc=document.getElementById('ahorroPorcentaje');
function updateAhorro(){let val=+slider.value;horasVal.innerText=val;let ahorro=Math.round(val*0.85);ahorroNum.innerText=ahorro;ahorroPorc.innerText=85;}
slider.addEventListener('input',updateAhorro);updateAhorro();
document.getElementById('calcularBtn').addEventListener('click',()=>alert(`💰 Ahorro estimado: ${ahorroNum.innerText} horas/mes. ¿Hablamos?`));

// Gráfico
new Chart(document.getElementById('horasChart'),{type:'bar',data:{labels:['Manual','DocuPro','Benchmark'],datasets:[{label:'Horas/mes',data:[95,24,60],backgroundColor:['#4a5b7a','#00c3ff','#2a3a5a'],borderRadius:8}]},options:{responsive:true,maintainAspectRatio:true,plugins:{legend:{labels:{color:'#eef2ff'}}}}});

// Formulario
document.getElementById('leadForm').addEventListener('submit',(e)=>{e.preventDefault();const nombre=document.getElementById('nombre').value.trim(),email=document.getElementById('email').value.trim();if(!nombre||!email){document.getElementById('formMessage').innerHTML='❌ Completa nombre y email';return}document.getElementById('formMessage').innerHTML='✅ ¡Gracias! Te contactamos en <24h.';e.target.reset();setTimeout(()=>document.getElementById('formMessage').innerHTML='',3000)});

// PDF descargable
document.getElementById('descargarPDF').addEventListener('click',()=>{const link=document.createElement('a');link.href='data:application/pdf;base64,JVBERi0...';link.download='caso_exito_docupro.pdf';link.click();alert('📄 Demo descargada (modo simulación)');});

// Chat
const chatWidget=document.getElementById('chatWidget'),chatToggle=document.getElementById('chatToggle'),chatClose=document.querySelector('.chat-close'),chatInput=document.getElementById('chatInput'),chatSend=document.getElementById('chatSend'),chatBody=document.querySelector('.chat-body');
function addMsg(t,u=false){const d=document.createElement('div');d.classList.add('chat-message',u?'user':'bot');d.innerHTML=u?`🧑 ${t}`:`🤖 ${t}`;chatBody.appendChild(d);chatBody.scrollTop=chatBody.scrollHeight}
function botResp(m){const l=m.toLowerCase();if(l.includes('precio'))addMsg('Plan Profesional: 149€/mes. ¿Te interesa?');else if(l.includes('excel'))addMsg('Automatizamos reporting completo con VBA. ¿Demo?');else addMsg('Un asesor te contactará pronto. ¿Más dudas?')}
chatToggle?.addEventListener('click',()=>{chatWidget.classList.toggle('open');chatToggle.style.display='none'});
chatClose?.addEventListener('click',()=>{chatWidget.classList.remove('open');chatToggle.style.display='flex'});
chatSend?.addEventListener('click',()=>{const t=chatInput.value.trim();if(t){addMsg(t,true);chatInput.value='';setTimeout(()=>botResp(t),600)}});
document.querySelectorAll('.chat-options button').forEach(b=>{b.addEventListener('click',()=>{const m=b.getAttribute('data-msg');addMsg(m,true);setTimeout(()=>botResp(m),400)})});

// Smooth scroll
document.querySelectorAll('.nav-list a, .scroll-down').forEach(a=>{a.addEventListener('click',function(e){const h=this.getAttribute('href');if(h&&h.startsWith('#')){e.preventDefault();document.querySelector(h)?.scrollIntoView({behavior:'smooth'})}})});
