import { PromptCard } from "./PromptCard";

interface PromptsGridProps {
  prompts: Record<string, string>;
  onEdit: (business: string) => void;
  onCall: (business: string) => void;
}

export function PromptsGrid({ prompts, onEdit, onCall }: PromptsGridProps) {
  const keys = Object.keys(prompts);

  if (keys.length === 0)
    return (
      <div className="flex justify-center items-center mt-16">
        <div className="bg-gray-400/10 border border-gray-700 rounded-2xl px-8 py-12 text-center shadow-md w-full max-w-md">
          <p className="text-gray-300 text-lg font-medium">
            No prompts available at the moment.
          </p>
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {keys.map((business) => (
        <PromptCard
          key={business}
          business={business}
          prompt={prompts[business]}
          onEdit={onEdit}
          onCall={onCall}
        />
      ))}
    </div>
  );
}
