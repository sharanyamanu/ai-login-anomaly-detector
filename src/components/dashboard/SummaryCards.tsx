import { motion } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle, Activity } from "lucide-react";

interface SummaryCardsProps {
  totalLogs: number;
  suspicious: number;
  normal: number;
}

const cards = [
  { key: "total", label: "Total Logs", icon: Activity, glowClass: "glow-primary", borderClass: "border-cyber-neon/20", iconColor: "text-cyber-neon" },
  { key: "suspicious", label: "Suspicious Activity", icon: AlertTriangle, glowClass: "glow-red", borderClass: "border-cyber-red/20", iconColor: "text-cyber-red" },
  { key: "normal", label: "Normal Activity", icon: CheckCircle, glowClass: "glow-green", borderClass: "border-cyber-green/20", iconColor: "text-cyber-green" },
  { key: "threat", label: "Threat Percentage", icon: Shield, glowClass: "glow-orange", borderClass: "border-cyber-orange/20", iconColor: "text-cyber-orange" },
];

export function SummaryCards({ totalLogs, suspicious, normal }: SummaryCardsProps) {
  const threatPct = totalLogs > 0 ? ((suspicious / totalLogs) * 100).toFixed(1) : "0.0";
  const values: Record<string, string> = {
    total: totalLogs.toLocaleString(),
    suspicious: suspicious.toLocaleString(),
    normal: normal.toLocaleString(),
    threat: `${threatPct}%`,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className={`relative rounded-lg border ${card.borderClass} bg-card p-5 ${card.glowClass} hover:scale-[1.02] transition-transform`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground font-medium">{card.label}</span>
            <card.icon className={`h-5 w-5 ${card.iconColor}`} />
          </div>
          <p className="text-3xl font-bold font-mono tracking-tight text-foreground">
            {values[card.key]}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
