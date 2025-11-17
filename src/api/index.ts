// const API_BASE = import.meta.env.VITE_PROMPTS_API_BASE?.replace(/\/$/, "");

export async function getPrompts(token: string) {
  const res = await fetch("/prompts-api/prompts", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch prompts");
  return await res.json();
}

export async function updatePrompt(payload: any, token: string) {
  const res = await fetch("/prompts-api/prompts", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update prompt");
  return await res.json();
}
