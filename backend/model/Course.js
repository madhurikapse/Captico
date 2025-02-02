import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
