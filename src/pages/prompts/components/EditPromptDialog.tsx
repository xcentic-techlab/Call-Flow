import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";

interface EditPromptDialogProps {
  open: boolean;
  business: string;
  prompt: string;
  onClose: () => void;
  onSave: (prompt: string) => Promise<void>;
}

export function EditPromptDialog({
  open,
  business,
  prompt,
  onClose,
  onSave,
}: EditPromptDialogProps) {
  const [edited, setEdited] = useState(prompt);

  useEffect(() => {
    setEdited(prompt);
  }, [prompt]);

  const handleSave = async () => {
    if (!edited.trim()) return;
    await onSave(edited);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-gray-200 via-gray-300 to-gray-100 border border-gray-400/60 shadow-xl shadow-gray-400/30 backdrop-blur-md rounded-2xl text-gray-900">
        <DialogHeader className="flex flex-col items-center space-y-3 pb-2">
          <DialogTitle className="text-2xl font-bold text-center">
            <span className="text-gray-700">Edit Prompt —</span>{" "}
            <span className="text-gray-800 capitalize">
              {business.replace(/_/g, " ")}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Textarea
            rows={6}
            value={edited}
            onChange={(e) => setEdited(e.target.value)}
            placeholder="Edit your business prompt..."
            className="w-full resize-none rounded-xl border border-gray-400 bg-gray-100/70 text-gray-800 placeholder-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-gray-400/50 transition-all"
          />
        </div>
        <DialogFooter className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border border-gray-400 bg-white/80 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-all rounded-lg"
          >
            Cancel
          </Button>
        <Button
  onClick={handleSave}
  className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700
            text-white font-medium rounded-lg
              shadow-md shadow-gray-500/40
              transition-all duration-300
              hover:scale-[1.03] hover:shadow-lg
            hover:from-gray-500 hover:via-gray-600 hover:to-gray-700
              active:scale-95"
>
  Save Changes
</Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
