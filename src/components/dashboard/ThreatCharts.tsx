import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ThreatChartsProps {
  barData: { name: string; value: number }[];
  pieData: { name: string; value: number }[];
}

const PIE_COLORS = ["hsl(0, 72%, 55%)", "hsl(142, 71%, 45%)"];

export function ThreatCharts({ barData, pieData }: ThreatChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="lg:col-span-2 rounded-lg border border-border bg-card p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Threat Breakdown</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
            <XAxis dataKey="name" tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
            <YAxis tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 44%, 8%)",
                border: "1px solid hsl(222, 30%, 16%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 92%)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
              }}
            />
            <Bar dataKey="value" fill="hsl(199, 89%, 48%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="rounded-lg border border-border bg-card p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Threat vs Normal</h2>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 44%, 8%)",
                border: "1px solid hsl(222, 30%, 16%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 92%)",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-2">
          {pieData.map((entry, i) => (
            <div key={entry.name} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[i] }} />
              {entry.name}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
