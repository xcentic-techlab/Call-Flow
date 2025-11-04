import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { DashboardHeader } from "@/components/DashboardHeader";
import { usePrompts } from "./hooks/usePrompts";
import { PromptsGrid } from "./components/PromptsGrid";
import { EditPromptDialog } from "./components/EditPromptDialog";
import { Footer } from "../../pages/footer";

export default function PromptsPage() {
  const navigate = useNavigate();
  const { prompts, loading, updatePrompt } = usePrompts();
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [open, setOpen] = useState(false);

  const handleEdit = (business: string) => {
    setSelectedBusiness(business);
    setOpen(true);
  };

  const handleMakeCall = (business: string) => {
    navigate("/call", {
      state: { business_type: business, prompt: prompts[business], mode: "single" },
    });
  };

  if (loading)
    return (
     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br bg-gray-900">
      <Spinner size="lg" />
    </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-900 text-white flex flex-col">
      <DashboardHeader />

      <main className="flex-1 container mx-auto px-4 md:px-8 py-10 ">
       <div className="mb-10 mt-10">
            <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="hover:bg-gray-800/60 hover:scale-105 transition-all flex items-center gap-2 text-zinc-300 hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
            </Button>
        </div>
        <div className="text-center mb-12 space-y-3">
          <div className="flex justify-center">
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-md text-center">
            <span className="bg-gradient-to-r text-white bg-clip-text text-transparent">
                Business
            </span>{" "}
            <span className="text-white">Prompts</span>
        </h1>

          <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
            Select calling prompts for different business categories.
          </p>
        </div>
        <PromptsGrid prompts={prompts} onEdit={handleEdit} onCall={handleMakeCall} />

      </main>

      <Footer />
      <EditPromptDialog
        open={open}
        business={selectedBusiness}
        prompt={prompts[selectedBusiness] || ""}
        onClose={() => setOpen(false)}
        onSave={(prompt) => updatePrompt(selectedBusiness, prompt)}
      />
    </div>
  );
}
