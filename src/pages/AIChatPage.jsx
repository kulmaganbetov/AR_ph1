import { useState } from 'react';
import { askPhysicsAssistant } from '../api/openai';

function AIChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Сәлем! Физика сұрағыңызды қойыңыз.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const answer = await askPhysicsAssistant(userText);
      setMessages((prev) => [...prev, { role: 'assistant', text: answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Кешіріңіз, қате шықты. Кейінірек қайталап көріңіз.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2>AI көмекші</h2>
      <div className="chat-list">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`bubble ${message.role}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-controls">
        <input
          type="text"
          value={input}
          placeholder="Мысалы: Ток күшін қалай есептеймін?"
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? 'Жіберілуде...' : 'Send'}
        </button>
      </div>
    </section>
  );
}

export default AIChatPage;
