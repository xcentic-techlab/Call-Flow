import React from "react";
import { Button } from "@/components/ui/button";
import { PhoneCall, LogIn, Loader2 } from "lucide-react";

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
      className={`
        w-full h-11 font-semibold text-gray-900 rounded-lg
        bg-gray-200
        flex items-center justify-center gap-2
        transition-all duration-300
        hover:scale-[1.03] hover:shadow-md
        hover:bg-gray-200 hover:text-gray-900
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin h-5 w-5 text-gray-900" />
          <span>Calling...</span>
        </>
      ) : !token ? (
        <>
          <LogIn className="h-5 w-5" />
          <span>Login to Start</span>
        </>
      ) : (
        <>
          <PhoneCall className="h-5 w-5" />
          <span>{count ? `Start Calls (${count})` : "Start Calls"}</span>
        </>
      )}
    </Button>
  );
};
