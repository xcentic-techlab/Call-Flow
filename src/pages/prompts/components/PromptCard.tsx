import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PromptCardProps {
  business: string;
  prompt: string;
  onEdit: (business: string) => void;
  onCall: (business: string) => void;
}

export function PromptCard({ business, prompt, onEdit, onCall }: PromptCardProps) {
  return (
    <Card className="bg-card border border-border/40 transition-all duration-300">
      <CardContent
        className="p-6 bg-gray-800 border border-gray-800 rounded-2xl 
                   shadow-md hover:border-gray-500/50 hover:shadow-gray-500/10 
                   transition-all duration-300 h-64 flex flex-col justify-between"
      >
        <div className="space-y-3 flex-1 overflow-hidden">
          <h2 className="text-xl font-semibold capitalize text-gray-100 text-center">
            {business.replace(/_/g, " ")}
          </h2>

          <div className="overflow-y-auto max-h-24 pr-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap text-left">
              {prompt}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
        <Button
          variant="outline"
          size="default"
          onClick={() => onEdit(business)}
          className="px-5 py-2 text-sm font-medium border-gray-500 text-gray-200 
                    bg-gray-800 hover:bg-gray-200 hover:text-gray-900 hover:border-gray-400 
                    transition-all rounded-lg shadow-sm"
        >
          Edit Prompt
        </Button>


          <Button
            size="default"
            onClick={() => onCall(business)}
            className="px-5 py-2 text-sm font-medium bg-gray-200 text-gray-900 rounded-lg shadow-sm 
                      transition-transform duration-300 hover:bg-gray-200 hover:text-gray-900"
          >
            Make a Call
          </Button>


        </div>
      </CardContent>
    </Card>
  );
}
