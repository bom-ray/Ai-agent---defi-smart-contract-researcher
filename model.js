const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "qwen2.5-coder:7b";
const OLLAMA_EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL ?? "nomic-embed-text";

async function ollama(path, payload) {
  const response = await fetch(`${OLLAMA_URL}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Ollama ${path} failed (${response.status}): ${body}`);
  }

  return response.json();
}

export async function askModel(messages, tools) {
  return ollama("/api/chat", {
    model: OLLAMA_MODEL,
    messages,
    tools,
    stream: false,
    think: true,
    options: { temperature: 0.1 }
  });
}

export async function embedTexts(input) {
  const texts = Array.isArray(input) ? input : [input];
  const result = await ollama("/api/embed", {
    model: OLLAMA_EMBED_MODEL,
    input: texts
  });
  return result.embeddings;
}

export async function modelInfo() {
  return ollama("/api/show", { name: OLLAMA_MODEL });
}
