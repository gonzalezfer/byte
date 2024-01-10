const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

// Variable para almacenar el historial del chat
let chatHistoryData = [];

// Cargar historial almacenado en el navegador al cargar la página
window.onload = function () {
  const storedChatHistory = localStorage.getItem('chatHistory');
  if (storedChatHistory) {
    chatHistoryData = JSON.parse(storedChatHistory);
    displayChatHistory();
  }
};

function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  if (userInput.trim() !== '') {
    addUserMessage(userInput);
    sendMessageToGPT(userInput);
  }
}

async function sendMessageToGPT(userInput) {
  document.getElementById('user-input').value = '';
  
  // Agregar el mensaje del usuario actual al historial
  const userMessage = { role: "user", content: userInput };
  chatHistoryData.push(userMessage);

  // Construir el objeto prompt con el historial completo
  const prompt = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      ...chatHistoryData  // Incluye todo el historial de la conversación
    ],
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(prompt),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      const botResponse = data.choices[0]?.message?.content;
      addBotMessage(botResponse);
      // Almacena la conversación en el historial
      const botMessage = { role: "assistant", content: botResponse };
      chatHistoryData.push(botMessage);
      // Guarda el historial en el almacenamiento local del navegador
      localStorage.setItem('chatHistory', JSON.stringify(chatHistoryData));
      // Hace scroll hacia abajo
      scrollToBottom();
    } else if (data.error) {
      console.error('Error de OpenAI:', data.error);
      addBotMessage('Lo siento, ha ocurrido un error al procesar tu solicitud.');
      // Hace scroll hacia abajo
      scrollToBottom();
    } else {
      console.error('Respuesta inesperada de OpenAI:', data);
      addBotMessage('Lo siento, ha ocurrido un error inesperado.');
      // Hace scroll hacia abajo
      scrollToBottom();
    }
  } catch (error) {
    console.error('Error al enviar solicitud a GPT:', error);
    addBotMessage('Lo siento, ha ocurrido un error al procesar tu solicitud.');
    // Hace scroll hacia abajo
    scrollToBottom();
  }
}

function addUserMessage(message) {
  const chatHistory = document.getElementById('chat-history');
  const userMessage = document.createElement('div');
  userMessage.className = 'user-message';

  // Si el mensaje contiene comillas triples, envolverlo en una etiqueta <pre>
  const isCodeBlock = message.includes('```');
  const content = isCodeBlock ? `<pre>${message}</pre>` : message;

  // Agregar el elemento de texto solo para el contenido del usuario
  const textNode = document.createElement('p');
  textNode.innerHTML = content;

  // Añadir la etiqueta <p>Tú:</p> antes del contenido
  const userTag = document.createElement('img');
  userTag.src = 'user.png';

  // Agregar el texto primero y luego la imagen
  userMessage.appendChild(textNode);
  userMessage.appendChild(userTag);

  chatHistory.appendChild(userMessage);
}

function addBotMessage(message) {
  const chatHistory = document.getElementById('chat-history');
  const botMessage = document.createElement('div');
  botMessage.className = 'bot-message';

  // Agregar el elemento de texto solo para el contenido del bot
  const textNode = document.createElement('p');
  textNode.textContent = message;
  botMessage.appendChild(textNode);

  // Añadir la etiqueta BOT antes del contenido
  const botTag = document.createElement('img');
  botTag.src = 'bot.jpg';
  botMessage.insertBefore(botTag, textNode);

  chatHistory.appendChild(botMessage);
}

function displayChatHistory () {
  const chatHistory = document.getElementById('chat-history');
  chatHistory.innerHTML = '';

  chatHistoryData.forEach(chatEntry => {
    if (chatEntry.role === "user") {
      addUserMessage(chatEntry.content);
    } else if (chatEntry.role === "assistant") {
      addBotMessage(chatEntry.content);
    }
  });

  // Hace scroll hacia abajo al cargar el historial
  scrollToBottom();
}

function scrollToBottom() {
  const chatHistory = document.getElementById('chat-history');
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function clearChatHistory() {
  // Limpiar el historial del contenedor
  const chatHistory = document.getElementById('chat-history');
  chatHistory.innerHTML = '';

  // Limpiar el historial almacenado en el navegador
  localStorage.removeItem('chatHistory');

  // Restablecer la variable de historial en memoria
  chatHistoryData = [];
}
