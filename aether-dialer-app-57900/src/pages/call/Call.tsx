import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import CallForm from "./CallForm";
import { BulkCallUploader } from "@/components/bulk-calls/BulkCallUploader/BulkCallUploader";
import { useEffect, useState } from "react";
import ModeToggle from "./ModeToggle";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "../Footer";

const Call = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { mode = "single", business_type = "", prompt = "" } = location.state || {};

  const [selectedMode, setSelectedMode] = useState<"single" | "bulk">(mode);
  const [prefill, setPrefill] = useState({ business_type, prompt });

  useEffect(() => {
    if (location.state) {
      setSelectedMode(mode);
      setPrefill({ business_type, prompt });
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gradient-to-b bg-gray-900 text-white flex flex-col">
      <DashboardHeader />

      <main className="flex-1 container mx-auto px-4 md:px-6 py-16">
        <div className="mb-10">
          <Button
            variant="ghost"
            onClick={() => navigate("/prompts")}
            className="hover:bg-gray-800/60 hover:scale-105 transition-all flex items-center gap-2 text-zinc-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Prompts
          </Button>
        </div>

        <div className="flex justify-center">
          <Card
            className="mb-10 w-full max-w-2xl rounded-2xl border bg-gray-800 hover:border-gray-600 transition-all"
          >
            <CardContent className="p-6 space-y-3 text-left">
              <h2 className="text-xl font-semibold text-gray-300">
                Business Type:{" "}
                <span className="text-white">{prefill.business_type}</span>
              </h2>
              <p className="text-sm text-zinc-400 whitespace-pre-line leading-relaxed">
                <strong className="text-gray-300">Prompt:</strong>{" "}
                {prefill.prompt || "No prompt available for this business."}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mb-10">
          <ModeToggle selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className={`transition-all duration-500 transform ${
              selectedMode === "single"
                ? "opacity-100 scale-100"
                : "opacity-40 scale-95 pointer-events-none"
            }`}
          >
            <CallForm businessType={prefill.business_type} prefill={prefill} />
          </div>

          <div
            className={`transition-all duration-500 transform ${
              selectedMode === "bulk"
                ? "opacity-100 scale-100"
                : "opacity-40 scale-95 pointer-events-none"
            }`}
          >
            <BulkCallUploader businessType={prefill.business_type} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Call;
