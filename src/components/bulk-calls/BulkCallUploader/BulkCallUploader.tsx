import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useAuth } from "@/contexts/useAuth";
import { toast } from "sonner";
import { FileUploadSection } from "./FileUploadSection";
import { NumbersPreview } from "./NumbersPreview";
import { CallButton } from "./CallButton";

export const BulkCallUploader = () => {
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

      const numbers = rows
        .flat()
        .map((v) => String(v).trim())
        .filter((v) => /^\d{10,15}$/.test(v));

      setPhoneNumbers(numbers);
      toast.success(`Loaded ${numbers.length} phone numbers`);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleStartCalling = async () => {
    if (!phoneNumbers.length) return toast.error("Upload an Excel file first!");
    if (!token) return toast.error("Please login first!");

    setLoading(true);
    try {
      const payload = { phoneNumbers: phoneNumbers.map((num) => `+91${num}`) };
      console.log("📦 Sending payload:", payload);

      const res = await fetch("/api/call/bulkCall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("📥 Response received:", data);

      if (res.ok) {
        toast.success(`Bulk call triggered for ${phoneNumbers.length} numbers!`);
        setPhoneNumbers([]);
      } else {
        toast.error(`Failed: ${data.error || data.message}`);
      }
    } catch (err) {
      console.error("Error during bulk call (frontend):", err);
      toast.error("Something went wrong while making calls.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 border border-white/[0.08] rounded-2xl bg-background/40 shadow-sm max-w-md w-full mx-auto space-y-6 sm:space-y-8">
      <div className="text-xs text-muted-foreground bg-muted/20 p-2 rounded">
        Token Status: {token ? "Available" : "Missing"}
      </div>

      <FileUploadSection onFileUpload={handleFileUpload} />

      <NumbersPreview phoneNumbers={phoneNumbers} />

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
