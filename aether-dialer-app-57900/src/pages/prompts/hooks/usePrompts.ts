import { useEffect, useState } from "react";
import { toast } from "sonner";

export function usePrompts() {
  const [prompts, setPrompts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_PROMPTS_API_BASE?.replace(/\/$/, "");
// console.log("Fetching prompts from:", import.meta.env.VITE_PROMPTS_API_BASE);

  const fetchPrompts = async () => {
    try {
      const res = await fetch(`${API_BASE}/prompts`);
      const data = await res.json();
      console.log("API RAW RESPONSE:", res);
      setPrompts(data);
    } catch (error) {
      console.error("Error fetching prompts:", error);
      toast.error("Failed to load prompts");
    } finally {
      setLoading(false);
    }
  };

  const updatePrompt = async (business: string, prompt: string) => {
    try {
      const res = await fetch(`${API_BASE}/prompts/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business_type: business, prompt }),
      });

      if (!res.ok) throw new Error("Failed to update prompt");

      await fetchPrompts();
      toast.success("Prompt updated successfully!");
    } catch (error) {
      console.error("Error updating prompt:", error);
      toast.error("Error updating prompt");
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  return { prompts, loading, updatePrompt };
}
