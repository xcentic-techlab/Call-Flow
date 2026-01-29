import mongoose from "mongoose";

const singleNumberSchema = new mongoose.Schema(
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
      default: "single_call",
    },
  },
  { timestamps: true }
);

export default mongoose.model("SingleNumber", singleNumberSchema);
