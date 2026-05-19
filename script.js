// ========== CHAT CON IA REAL (HUGGING FACE - 100% GRATIS) ==========
const chatWidget = document.getElementById('chatWidget');
const chatToggle = document.getElementById('chatToggle');
const chatClose = document.querySelector('.chat-close');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatBody = document.querySelector('.chat-body');

// ⚠️ IMPORTANTE: CAMBIA ESTO POR TU TOKEN DE HUGGING FACE ⚠️
const HF_TOKEN = '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'; // <--- PON AQUÍ TU TOKEN

// Modelo a usar (puedes cambiar por google/flan-t5-base o HuggingFaceH4/zephyr-7b-beta)
const MODELO = 'microsoft/DialoGPT-medium';

// Historial de conversación para mantener contexto
let conversationHistory = [];

// Contexto del sistema (le dice a la IA quién es DocuPro)
const SYSTEM_PROMPT = `Eres DocuPro, un asistente experto en productividad ofimática, automatización con Excel, maquetación Word, gestión documental y archivo. Eres profesional, cercano y respondes en español. Tu personalidad: eficiente, amable, resolutivo.

Información de DocuPro que debes conocer:
- Plan Básico: 49€ pago único (Word hasta 10pág, Excel estático, auditoría remota)
- Plan Profesional: 149€/mes (Word sin límite, Excel VBA, soporte prioritario)
- Plan Empresa: consultar (BI Avanzado, presencial, mantenimiento)
- Servicios: Automatización Excel con macros VBA, Power Query, Power Pivot
- Maquetación Word con plantillas inteligentes, estilos jerárquicos
- Gestión de archivo con sistema ISO, nomenclatura snake_case, recuperación en 120s
- Contacto: email contacto@docupro.es, teléfono +34 900 123 456
- Satisfacción: 98%, más de 250 proyectos completados

Responde de forma útil, concisa y profesional. Si no sabes algo, ofrece contactar con un asesor.`;

// Función para llamar a la API de Hugging Face
async function callHuggingFace(userMessage) {
    // Construir el prompt con historial
    let prompt = SYSTEM_PROMPT + "\n\n";
    
    // Añadir últimos 5 mensajes para contexto
    const ultimosMensajes = conversationHistory.slice(-10);
    for (let msg of ultimosMensajes) {
        prompt += `${msg.role === 'user' ? 'Usuario' : 'Asistente'}: ${msg.content}\n`;
    }
    prompt += `Usuario: ${userMessage}\nAsistente:`;
    
    try {
        const response = await fetch(`https://api-inference.huggingface.co/models/${MODELO}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${HF_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_new_tokens: 200,
                    temperature: 0.7,
                    top_p: 0.9,
                    do_sample: true,
                    return_full_text: false
                }
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error Hugging Face:', errorData);
            
            // Si el modelo está cargándose, esperar y reintentar
            if (response.status === 503) {
                return "🔄 El modelo está despertando... Espera 10 segundos y vuelve a preguntar. (Los modelos gratuitos se duermen por inactividad)";
            }
            
            throw new Error(errorData.error || 'Error en la API');
        }
        
        const data = await response.json();
        let assistantMessage = data[0]?.generated_text || data.generated_text || "Lo siento, no pude generar una respuesta.";
        
        // Limpiar la respuesta (a veces viene con el prompt repetido)
        if (assistantMessage.includes('Asistente:')) {
            assistantMessage = assistantMessage.split('Asistente:').pop().trim();
        }
        if (assistantMessage.includes('Usuario:')) {
            assistantMessage = assistantMessage.split('Usuario:')[0].trim();
        }
        
        return assistantMessage || "¿Podrías reformular tu pregunta? Estoy aquí para ayudarte.";
        
    } catch (error) {
        console.error('Error:', error);
        return `⚠️ Lo siento, tuve un problema técnico. Por favor, intenta de nuevo o contacta con nosotros en contacto@docupro.es. Error: ${error.message}`;
    }
}

// Efecto máquina de escribir
async function typeWriterEffect(element, text, speed = 25) {
    element.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text.charAt(i);
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

// Añadir mensaje al chat
function addMessageToChat(text, isUser = false, animate = false) {
    if (!chatBody) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', isUser ? 'user' : 'bot');
    messageDiv.innerHTML = isUser ? `<i class="fas fa-user"></i> <span>${text}</span>` : `<i class="fas fa-robot"></i> <span class="bot-text"></span>`;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    
    if (!isUser && animate) {
        const botTextSpan = messageDiv.querySelector('.bot-text');
        typeWriterEffect(botTextSpan, text, 20);
    } else if (!isUser) {
        const botTextSpan = messageDiv.querySelector('.bot-text');
        botTextSpan.innerHTML = text;
    }
    
    return messageDiv;
}

// Mostrar "escribiendo..."
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('chat-message', 'bot', 'typing-indicator');
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<i class="fas fa-robot"></i> <span class="typing-dots">🧠 Pensando<span>.</span><span>.</span><span>.</span></span>';
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    return typingDiv;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

// Función principal para enviar mensaje
async function sendMessage(message, isQuickButton = false) {
    if (!message.trim()) return;
    
    // Añadir mensaje del usuario
    addMessageToChat(message, true, false);
    
    // Guardar en historial
    conversationHistory.push({ role: 'user', content: message });
    
    // Mostrar indicador de escritura
    const typingIndicator = showTypingIndicator();
    
    // Obtener respuesta de la IA
    const response = await callHuggingFace(message);
    
    // Eliminar indicador
    removeTypingIndicator();
    
    // Guardar respuesta en historial
    conversationHistory.push({ role: 'assistant', content: response });
    
    // Limitar historial a los últimos 20 mensajes
    if (conversationHistory.length > 20) {
        conversationHistory = conversationHistory.slice(-20);
    }
    
    // Añadir respuesta con animación
    addMessageToChat(response, false, true);
    
    // Confeti si es botón rápido
    if (isQuickButton && typeof confetti === 'function') {
        confetti({ particleCount: 50, spread: 45, origin: { y: 0.7 } });
    }
}

// Configurar eventos del chat
if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('open');
        chatToggle.style.display = 'none';
        
        // Mensaje de bienvenida si es primera vez
        if (conversationHistory.length === 0) {
            setTimeout(async () => {
                const welcomeMsg = "👋 ¡Hola! Soy DocuPro IA, tu asistente experto en productividad ofimática. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre nuestros servicios, precios, automatización con Excel, maquetación Word o gestión de archivo.";
                addMessageToChat(welcomeMsg, false, true);
                conversationHistory.push({ role: 'assistant', content: welcomeMsg });
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
        if (msg) {
            sendMessage(msg, false);
            chatInput.value = '';
        }
    });
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const msg = chatInput.value.trim();
            if (msg) {
                sendMessage(msg, false);
                chatInput.value = '';
            }
        }
    });
}

// Botones rápidos mejorados
const optionsContainer = document.querySelector('.chat-options');
if (optionsContainer) {
    optionsContainer.innerHTML = '';
    
    const buttons = [
        { icon: 'fa-euro-sign', text: '💰 Precios', prompt: '¿Cuáles son los precios y planes de DocuPro? Explícame las opciones.' },
        { icon: 'fa-table', text: '📊 Excel', prompt: '¿Cómo puede DocuPro ayudarme a automatizar mis procesos de Excel y reporting?' },
        { icon: 'fa-headset', text: '🎧 Asesor', prompt: 'Necesito hablar con un asesor humano. ¿Cómo puedo contactar con DocuPro?' },
        { icon: 'fa-file-word', text: '📄 Word', prompt: '¿Qué servicios de maquetación avanzada Word ofrece DocuPro?' },
        { icon: 'fa-folder-open', text: '🗂️ Archivo', prompt: '¿Cómo funciona el sistema de gestión de archivo y clasificación documental?' }
    ];
    
    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.innerHTML = `${btn.icon} ${btn.text}`;
        button.style.cssText = 'background:rgba(0,195,255,0.15); border:1px solid #00c3ff; border-radius:30px; padding:8px 16px; cursor:pointer; transition:0.2s; color:white; font-size:0.8rem; display:inline-flex; align-items:center; gap:6px;';
        button.onmouseenter = () => button.style.background = '#00c3ff';
        button.onmouseleave = () => button.style.background = 'rgba(0,195,255,0.15)';
        button.onclick = () => {
            addMessageToChat(btn.prompt, true, false);
            sendMessage(btn.prompt, true);
        };
        optionsContainer.appendChild(button);
    });
}

// Estado del modelo (feedback para el usuario)
console.log('%c🤖 DocuPro IA - Conectada a Hugging Face | Modelo: ' + MODELO, 'color: #00c3ff; font-size: 12px;');
