import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  limit: { 
    type: Number, 
    required: true 
  },
  month: { 
    type: Number, // 1–12
    required: true 
  },
  year: { 
    type: Number, // e.g. 2025
    required: true 
  }
}, { timestamps: true });

export default mongoose.model("Budget", budgetSchema);
