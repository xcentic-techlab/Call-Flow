import React, { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/useAuth";
import { FileUploadSection } from "./FileUploadSection";
import { CallButton } from "./CallButton";

interface BulkCallUploaderProps {
  businessType?: string;
}

export const BulkCallUploader = ({
  businessType = "",
}: BulkCallUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const API_BASE = import.meta.env.VITE_PROMPTS_API_BASE;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    toast.success(`File selected: ${selectedFile.name}`);
  };


const handleUpload = async () => {
  if (!file) return toast.error("Please select a file!");
  if (!businessType.trim()) return toast.error("Business type missing!");
  if (!token) return toast.error("Please login first!");

  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("business_type", businessType);

    const res = await fetch(`${API_BASE}/bulk-upload`, {
      method: "POST",
      body: formData,
    });

    const text = await res.text();
    let data: any;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Bulk service temporarily unavailable");
    }

    if (!res.ok) {
      throw new Error(data?.error || "Bulk upload failed");
    }

    toast.success(`Uploaded successfully. Queued: ${data.queued}`);
    setFile(null);

  } catch (err: any) {
    console.error("Bulk upload error:", err);
    toast.error(err.message || "Upload failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="mx-auto max-w-md w-full border border-gray-700 bg-gray-800 rounded-xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white text-center">
        Bulk Upload
      </h2>

      <FileUploadSection onFileUpload={handleFileUpload} />

      {file && (
        <p className="text-sm text-green-400 text-center">
          Selected: {file.name}
        </p>
      )}

      <CallButton
        onClick={handleUpload}
        disabled={!file || loading}
        loading={loading}
        token={token}
        count={0}
      />
    </div>
  );
};
