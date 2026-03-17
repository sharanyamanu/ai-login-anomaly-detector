import { LogEntry } from "@/components/dashboard/ThreatTable";

export const mockLogs: LogEntry[] = [
  { id: 1, login_hour: 2, failed_attempts: 12, files_accessed: 47, anomaly: true, risk_score: 94, risk_level: "CRITICAL", explanation: "Unusual login at 2AM with 12 failed attempts and excessive file access" },
  { id: 2, login_hour: 3, failed_attempts: 8, files_accessed: 32, anomaly: true, risk_score: 87, risk_level: "CRITICAL", explanation: "Late-night login with repeated failed authentication and bulk data access" },
  { id: 3, login_hour: 1, failed_attempts: 5, files_accessed: 28, anomaly: true, risk_score: 76, risk_level: "HIGH", explanation: "Post-midnight access with multiple failed logins" },
  { id: 4, login_hour: 23, failed_attempts: 6, files_accessed: 15, anomaly: true, risk_score: 68, risk_level: "HIGH", explanation: "Late-night session with elevated failed attempts" },
  { id: 5, login_hour: 4, failed_attempts: 3, files_accessed: 22, anomaly: true, risk_score: 55, risk_level: "MEDIUM", explanation: "Unusual early morning access with moderate file activity" },
  { id: 6, login_hour: 22, failed_attempts: 4, files_accessed: 10, anomaly: true, risk_score: 45, risk_level: "MEDIUM", explanation: "Evening login outside business hours" },
  { id: 7, login_hour: 9, failed_attempts: 1, files_accessed: 5, anomaly: false, risk_score: 12, risk_level: "LOW", explanation: "Normal business hours login" },
  { id: 8, login_hour: 10, failed_attempts: 0, files_accessed: 8, anomaly: false, risk_score: 5, risk_level: "LOW", explanation: "Standard work activity" },
  { id: 9, login_hour: 14, failed_attempts: 0, files_accessed: 3, anomaly: false, risk_score: 3, risk_level: "LOW", explanation: "Normal afternoon session" },
  { id: 10, login_hour: 11, failed_attempts: 1, files_accessed: 6, anomaly: false, risk_score: 8, risk_level: "LOW", explanation: "Routine login with single retry" },
];

export const barChartData = [
  { name: "Late Logins", value: 24 },
  { name: "Failed Attempts", value: 39 },
  { name: "High File Access", value: 18 },
  { name: "Brute Force", value: 7 },
  { name: "Privilege Escalation", value: 4 },
];

export const pieChartData = [
  { name: "Threats", value: 6 },
  { name: "Normal", value: 4 },
];

export const aiExplanations = [
  "Multiple logins detected between 1AM–4AM from unfamiliar IP ranges, correlating with brute-force patterns seen in recent APT campaigns.",
  "User account #4721 exhibited 12 consecutive failed login attempts followed by a successful authentication — classic credential stuffing behavior.",
  "Anomalous file access spike detected: 47 files accessed in a single session, 340% above the user's baseline average.",
  "Risk scoring model flagged 6 out of 10 sessions as suspicious with an average risk score of 70.8, indicating a potential coordinated attack.",
];
