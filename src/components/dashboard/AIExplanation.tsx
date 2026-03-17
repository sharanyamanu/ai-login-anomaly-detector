import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

interface AIExplanationProps {
  explanations: string[];
}

export function AIExplanation({ explanations }: AIExplanationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="rounded-lg border border-primary/20 bg-card p-6 glow-primary"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">AI Threat Analysis</h2>
        <Sparkles className="h-4 w-4 text-primary animate-pulse" />
      </div>
      <div className="space-y-3">
        {explanations.map((exp, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">{exp}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
