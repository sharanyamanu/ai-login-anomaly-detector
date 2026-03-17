import { motion } from "framer-motion";
import { Download, Shield } from "lucide-react";

export function DashboardHeader({ onDownload }: { onDownload: () => void }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10 glow-primary">
          <Shield className="h-7 w-7 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            🚨 AI Threat Intelligence Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">Real-time security monitoring & analysis</p>
        </div>
      </div>
      <button
        onClick={onDownload}
        className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        <Download className="h-4 w-4" />
        Download Report
      </button>
    </motion.header>
  );
}
