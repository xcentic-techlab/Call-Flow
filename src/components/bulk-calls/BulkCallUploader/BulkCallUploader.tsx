import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useAuth } from "@/contexts/useAuth";
import { toast } from "sonner";
import { FileUploadSection } from "./FileUploadSection";
import { CallButton } from "./CallButton";

interface Prefill {
  business_type?: string;
  prompt?: string;
}

interface BulkCallUploaderProps {
  prefill?: Prefill;
  businessType?: string;
}

export const BulkCallUploader = ({
  prefill = {},
  businessType = "",
}: BulkCallUploaderProps) => {
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  // const API_BASE = import.meta.env.VITE_PROMPTS_API_BASE;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("File selected:", file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (!result || typeof result === "string") return;

      const data = new Uint8Array(result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });

      console.log("Excel raw data:", rows);

      const numbers = rows
        .flat()
        .map((v) => String(v).trim())
        .filter((v) => /^\d{10,15}$/.test(v));

      console.log("Valid numbers extracted:", numbers);

      if (!numbers.length) return toast.error("No valid numbers found!");

      setPhoneNumbers(numbers);
      toast.success(`Loaded ${numbers.length} phone numbers`);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleStartCalling = async () => {
    console.log("handleStartCalling triggered");
    if (!phoneNumbers.length) return toast.error("Please upload a file first!");
    if (!businessType.trim()) return toast.error("Enter a business type!");
    if (!token) return toast.error("Please login first!");

    setLoading(true);
    try {
      const payload = {
        business_type: businessType,
        phoneNumbers: phoneNumbers.map((num) =>
          num.startsWith("+") ? num : `+91${num}`
        ),
      };

      console.log("Payload being sent:", payload);

      // ✅ Using env variable here instead of hardcoded localhost
      const res = await fetch("http://89.116.121.214:8000/call/bulkCall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", res.status);
      const data = await res.json();
      console.log("🧩 Response data:", data);

      if (res.ok) {
        toast.success(`Bulk call triggered for ${phoneNumbers.length} numbers`);
        setPhoneNumbers([]);
      } else {
        toast.error(data.error || "Failed to trigger bulk call");
      }
    } catch (err: any) {
      console.error("Error while starting calls:", err);
      toast.error("Something went wrong while starting the calls.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md w-full border border-gray-700 bg-gray-800 rounded-xl p-6 space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold drop-shadow-md">
          <span className="bg-gradient-to-r text-white bg-clip-text text-transparent">
            Bulk
          </span>{" "}
          <span className="text-white">Call Uploader</span>
        </h2>

        <p className="text-sm text-gray-400 pt-2 text-center">
          Upload an Excel file containing phone numbers and trigger calls in one go.
        </p>
      </div>

      <FileUploadSection onFileUpload={handleFileUpload} />

      {phoneNumbers.length > 0 && (
        <div className="text-sm text-green-400">
          {phoneNumbers.length} numbers ready to call
        </div>
      )}

      <CallButton
        onClick={handleStartCalling}
        disabled={!phoneNumbers.length || loading || !token}
        loading={loading}
        token={token}
        count={phoneNumbers.length}
      />
    </div>
  );
};
