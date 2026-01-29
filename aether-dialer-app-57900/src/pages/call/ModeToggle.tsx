import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ModeToggle({ selectedMode, setSelectedMode }) {
  return (
    <div className="flex justify-center mb-10">
      <div className="relative bg-gray-900 border border-zinc-700 p-1 rounded-xl flex items-center shadow-md backdrop-blur-sm">
        <motion.div
          layout
          className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-lg bg-gradient-to-r from-gray-500 to-gray-600"
          animate={{
            x: selectedMode === "bulk" ? "100%" : "0%",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
        <Button
          onClick={() => setSelectedMode("single")}
          variant="ghost"
          className={`relative z-10 w-28 rounded-lg font-medium transition-all duration-300
            ${
              selectedMode === "single"
                ? "text-gray-900 bg-gray-200"
                : "text-zinc-400 hover:text-white"
            }`}
        >
          Single Call
        </Button>
        <Button
          onClick={() => setSelectedMode("bulk")}
          variant="ghost"
          className={`relative z-10 w-28 rounded-lg font-medium transition-all duration-300
            ${
              selectedMode === "bulk"
                ? "text-gray-900 bg-gray-200"
                : "text-zinc-400 hover:text-white"
            }`}
        >
          Bulk Call
        </Button>
      </div>
    </div>
  );
}
