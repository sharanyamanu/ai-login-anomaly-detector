import { motion } from "framer-motion";

export interface LogEntry {
  id: number;
  login_hour: number;
  failed_attempts: number;
  files_accessed: number;
  anomaly: boolean;
  risk_score: number;
  risk_level: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  explanation: string;
}

const badgeStyles: Record<string, string> = {
  CRITICAL: "bg-cyber-red/20 text-cyber-red border-cyber-red/30",
  HIGH: "bg-cyber-red/10 text-cyber-red border-cyber-red/20",
  MEDIUM: "bg-cyber-orange/15 text-cyber-orange border-cyber-orange/30",
  LOW: "bg-cyber-green/15 text-cyber-green border-cyber-green/30",
};

export function ThreatTable({ data }: { data: LogEntry[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="rounded-lg border border-border bg-card overflow-hidden"
    >
      <div className="p-6 pb-4">
        <h2 className="text-lg font-semibold text-foreground">Threat Log Analysis</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              {["Login Hour", "Failed Attempts", "Files Accessed", "Anomaly", "Risk Score", "Risk Level", "Explanation"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-border transition-colors hover:bg-secondary/20 ${
                  row.anomaly ? "bg-cyber-red/[0.03]" : ""
                }`}
              >
                <td className="px-4 py-3 font-mono text-foreground">{row.login_hour}:00</td>
                <td className="px-4 py-3 font-mono text-foreground">{row.failed_attempts}</td>
                <td className="px-4 py-3 font-mono text-foreground">{row.files_accessed}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block w-2 h-2 rounded-full ${row.anomaly ? "bg-cyber-red animate-pulse" : "bg-cyber-green"}`} />
                </td>
                <td className="px-4 py-3 font-mono text-foreground">{row.risk_score}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyles[row.risk_level]}`}>
                    {row.risk_level}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">{row.explanation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
