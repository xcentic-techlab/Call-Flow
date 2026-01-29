import mongoose from "mongoose";

const bulkNumberSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    business_type: {
      type: String,
    },
    source: {
      type: String,
      default: "csv_upload",
    },
  },
  { timestamps: true }
);

export default mongoose.model("BulkNumber", bulkNumberSchema);
