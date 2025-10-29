import { Upload } from "lucide-react";

interface FileUploadSectionProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadSection = ({ onFileUpload }: FileUploadSectionProps) => {
  return (
    <div className="space-y-3">
      <label
        htmlFor="file"
        className="block text-sm sm:text-base font-medium text-muted-foreground"
      >
        Upload Excel File
      </label>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
          id="file"
          type="file"
          accept=".xlsx, .xls"
          onChange={onFileUpload}
          className="text-sm bg-background/50 border border-white/[0.08] rounded-lg px-3 py-2 w-full cursor-pointer focus:ring-2 focus:ring-primary/30 focus:border-primary/40 outline-none"
        />
        <Upload className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
      </div>
    </div>
  );
};
