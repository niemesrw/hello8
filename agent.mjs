// Scheduled Reporter Agent — powered by GitHub Models
const inputData = "No input URLs configured. Provide a general summary or status update for today.";

const response = await fetch('https://models.github.ai/inference/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'openai/gpt-4.1-mini',
    messages: [
      { role: 'system', content: "just say hello" },
      { role: 'user', content: inputData },
    ],
  }),
});

if (!response.ok) {
  console.error(`GitHub Models error: ${response.status} ${await response.text()}`);
  process.exit(1);
}

const data = await response.json();
const reply = data.choices?.[0]?.message?.content || 'No response';
console.log(reply);

import { writeFileSync, mkdirSync } from 'fs';
mkdirSync('reports', { recursive: true });
const filename = `reports/${new Date().toISOString().slice(0, 10)}.md`;
writeFileSync(filename, `# Report — ${new Date().toISOString()}\n\n${reply}\n`);
console.log(`Wrote ${filename}`);

// Heartbeat
async function sendHeartbeat() {
  const url = process.env.REGISTRY_URL;
  const token = process.env.HEARTBEAT_TOKEN;
  const name = process.env.AGENT_NAME;
  if (url && token && name) {
    try {
      const res = await fetch(`${url}/agents/${name}/heartbeat`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      console.log(`Heartbeat: ${res.status}`);
    } catch (e) {
      console.error('Heartbeat failed:', e.message);
    }
  }
}
await sendHeartbeat();
