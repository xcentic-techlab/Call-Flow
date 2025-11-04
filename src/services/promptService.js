import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const promptService = {
  getAllPrompts: async () => {
    try {
      const response = await axios.get(`${API_BASE}/prompts`);
      return response.data;
    } catch (error) {
      console.error("Error fetching prompts:", error);
      throw error.response?.data || { message: "Failed to fetch prompts" };
    }
  },
  getPromptByBusinessType: async (businessType) => {
    try {
      const response = await axios.get(`${API_BASE}/prompts/${businessType}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching prompt:", error);
      throw error.response?.data || { message: "Failed to fetch prompt" };
    }
  },
  updatePrompt: async (businessType, prompt) => {
    try {
      const response = await axios.post(`${API_BASE}/prompts/update`, {
        business_type: businessType,
        prompt,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating prompt:", error);
      throw error.response?.data || { message: "Failed to update prompt" };
    }
  },
};

export default promptService;
