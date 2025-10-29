import { Button } from "@/components/ui/button";

interface CallButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
  token: string | null;
  count: number;
}

export const CallButton = ({
  onClick,
  disabled,
  loading,
  token,
  count,
}: CallButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 rounded-xl transition-all disabled:opacity-50"
    >
      {loading
        ? "Calling..."
        : !token
        ? "Please Login First"
        : `Start Calls (${count || 0})`}
    </Button>
  );
};
