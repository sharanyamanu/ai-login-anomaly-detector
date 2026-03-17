import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { FileUploadSection } from "@/components/dashboard/FileUploadSection";
import { ThreatCharts } from "@/components/dashboard/ThreatCharts";
import { ThreatTable } from "@/components/dashboard/ThreatTable";
import { AIExplanation } from "@/components/dashboard/AIExplanation";
import { toast } from "sonner";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);

  // 🔥 dynamic counts
  const suspicious = logs.filter((l) => l.anomaly === -1).length;
  const normal = logs.filter((l) => l.anomaly === 1).length;

  // 🔥 API CALL TO FLASK
  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true);
    toast.info("Analyzing log data...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setLogs(data); // ✅ real data from backend

      toast.success(`Analysis complete — ${data.length} logs processed`);
    } catch (err) {
      console.error(err);
      toast.error("Error analyzing logs");
    }

    setIsAnalyzing(false);
  };

  const handleDownload = () => {
    window.open("http://127.0.0.1:5000/download", "_blank");
  };

  // 🔥 dynamic chart data
  const barChartData = [
    {
      name: "Late Login",
      value: logs.filter((l) => l.late_login === 1).length,
    },
    {
      name: "Failed Attempts",
      value: logs.filter((l) => l.high_failed === 1).length,
    },
    {
      name: "File Access",
      value: logs.filter((l) => l.high_file_access === 1).length,
    },
  ];

  const pieChartData = [
    { name: "Suspicious", value: suspicious },
    { name: "Normal", value: normal },
  ];

  return (
    <div className="min-h-screen bg-background cyber-grid-bg relative">
      <div className="scan-line fixed inset-0 pointer-events-none z-0 h-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader onDownload={handleDownload} />

        <div className="space-y-6">
          <SummaryCards
            totalLogs={logs.length}
            suspicious={suspicious}
            normal={normal}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
              <FileUploadSection
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
              />
            </div>

            <div className="lg:col-span-2">
              <AIExplanation
                explanations={
                  logs.length > 0
                    ? logs
                        .filter((l) => l.anomaly === -1)
                        .slice(0, 5)
                        .map((l) => l.explanation || "Suspicious behavior detected")
                    : ["Upload logs to see AI insights"]
                }
              />
            </div>
          </div>

          <ThreatCharts barData={barChartData} pieData={pieChartData} />

          <ThreatTable data={logs} />
        </div>
      </div>
    </div>
  );
};

export default Index;