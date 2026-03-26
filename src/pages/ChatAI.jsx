import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { askPhysicsAssistant } from '../api/openai';
import { getLabById, labs } from '../data/labs';

function ChatAI() {
  const [searchParams] = useSearchParams();
  const initialLabId = searchParams.get('lab') || labs[0].id;

  const [selectedLabId, setSelectedLabId] = useState(initialLabId);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Сәлем! Физика тақырыбы бойынша сұрақ қойыңыз.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedLab = useMemo(() => getLabById(selectedLabId), [selectedLabId]);

  const send = async () => {
    if (!input.trim() || loading || !selectedLab) return;

    const userText = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const answer = await askPhysicsAssistant(userText, selectedLab.title);
      setMessages((prev) => [...prev, { role: 'assistant', text: answer }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Сервиске қосылу сәтсіз болды.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2>AI Көмекші</h2>
      <label className="lab-select-label">
        Тақырып:
        <select value={selectedLabId} onChange={(event) => setSelectedLabId(event.target.value)}>
          {labs.map((lab) => (
            <option key={lab.id} value={lab.id}>
              {lab.title}
            </option>
          ))}
        </select>
      </label>

      <div className="chat-list">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`bubble ${message.role}`}>
            {message.text}
          </div>
        ))}
      </div>

      <div className="chat-controls">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && send()}
          placeholder="Сұрағыңызды жазыңыз..."
        />
        <button className="btn" onClick={send} disabled={loading}>
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </section>
  );
}

export default ChatAI;
