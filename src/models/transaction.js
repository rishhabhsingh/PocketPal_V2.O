import mongoose, { Schema } from "mongoose";
const transactionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const transactionModel =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema); // First One checks if model already exist and prevent it from being made again again in every reload

export default transactionModel;
