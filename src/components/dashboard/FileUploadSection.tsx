import { motion } from "framer-motion";
import { Upload, Zap } from "lucide-react";
import { useCallback, useState } from "react";

interface FileUploadSectionProps {
  onAnalyze: (file: File) => void;
  isAnalyzing: boolean;
}

export function FileUploadSection({ onAnalyze, isAnalyzing }: FileUploadSectionProps) {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 🔥 HANDLE DROP
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    }
  }, []);

  // 🔥 HANDLE CLICK UPLOAD
  const handleFileSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.json,.log,.txt";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setFileName(file.name);
        setSelectedFile(file);
      }
    };

    input.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Upload Log File
      </h2>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={handleFileSelect}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-secondary/30"
        }`}
      >
        <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />

        {fileName ? (
          <p className="text-sm text-foreground font-mono">{fileName}</p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Drag & drop your log file here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              .csv, .json, .log, .txt
            </p>
          </>
        )}
      </div>

      {/* 🔥 BUTTON FIXED */}
      <button
        onClick={() => {
          if (!selectedFile) {
            alert("Please upload a file first");
            return;
          }
          onAnalyze(selectedFile); // ✅ correct usage
        }}
        disabled={isAnalyzing}
        className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground glow-primary hover:brightness-110 transition-all disabled:opacity-50"
      >
        <Zap className="h-4 w-4" />
        {isAnalyzing ? "Analyzing..." : "Analyze Logs"}
      </button>
    </motion.div>
  );
}