const API_URL = 'https://api.openai.com/v1/chat/completions';

export async function askPhysicsAssistant(userMessage, labTitle = 'General Physics') {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const systemPrompt = `You are a physics teacher. Explain simply for high school students. Topic: ${labTitle}`;

  if (!apiKey) {
    return `Mock жауап (${labTitle}): ${userMessage} сұрағына қысқаша түсіндірме. Формуланы қолданып, қадаммен шешім жаса.`;
const SYSTEM_PROMPT = 'You are a physics teacher. Explain simply for high school students.';

export async function askPhysicsAssistant(userMessage) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    return `Mock жауап: "${userMessage}" сұрағына сәйкес, Ом заңы бойынша V = I * R. Кернеу ток пен кедергіге тәуелді.`;
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage }
      ],
      temperature: 0.4
    })
  });

  if (!response.ok) {
    throw new Error('AI сервисі уақытша қолжетімсіз');
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content || 'Жауап алынбады';
}
