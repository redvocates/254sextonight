import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  location: String,
  reportType: { type: String, enum: ["escort", "event", "masseuse"] },
  issueType: { type: String, enum: ["scam", "impersonation", "fraud", "assault", "harassment", "misleading-info"] },
  description: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
