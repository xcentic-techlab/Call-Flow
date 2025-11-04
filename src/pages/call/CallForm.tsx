import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/Spinner";
import { Phone } from "lucide-react";

interface Prefill {
  business_type?: string;
  prompt?: string;
}

interface CallFormProps {
  prefill?: Prefill;
  businessType?: string;
}

export default function CallForm({ prefill = {}, businessType = "" }: CallFormProps) {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit triggered");

    if (!token) return toast.error("Please login first!");
    if (!businessType.trim()) return toast.error("Select a business type!");
    if (!phoneNumber.trim()) return toast.error("Enter a valid phone number!");

    setIsLoading(true);
    try {
      console.log("Sending call request...");
      const response = await fetch("http://localhost:8000/api/call/call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          business_type: businessType,
          phone_number: phoneNumber,
        }),
      });

      console.log("Response received", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) throw new Error(data.message || "Call failed");

      toast.success("Call initiated successfully!");
      setPhoneNumber("");
    } catch (err: any) {
      console.error("Error while making call:", err);
      toast.error(err.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full mx-auto bg-gradient-to-b bg-gray-800 border border-gray-500 rounded-2xl p-6 sm:p-8 shadow-lg shadow-gray-900/20 hover:shadow-gray-800/30 transition-all duration-300"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold drop-shadow-md">
          <span className="text-white-400">Start</span>{" "}
          <span className="text-white">a Call</span>
        </h2>

        <p className="text-sm text-gray-400 mt-2">
          Enter a phone number and initiate your business call instantly.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber" className="text-gray-300">
          Customer Phone Number
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400/70" />
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="pl-10 bg-zinc-800/70 border border-zinc-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-gray-500/40 focus:border-gray-500/40 transition-all"
            required
            disabled={isLoading}
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full mt-6 h-11 font-semibold text-gray-900 rounded-lg
                  bg-gray-200
                  flex items-center justify-center gap-2
                  transition-all duration-300
                  hover:scale-[1.03] hover:shadow-md
                  hover:bg-gray-200 hover:text-gray-900
                  active:scale-95
                  disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Spinner size="sm" className="mr-2" /> Calling...
          </>
        ) : (
          <>
            <Phone className="mr-2 h-5 w-5" /> Start Call
          </>
        )}
      </Button>
    </form>
  );
}
