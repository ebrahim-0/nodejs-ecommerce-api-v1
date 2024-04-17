import mongoose from "mongoose";

// 1- Create schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name is required"],
      unique: [true, "Category Name must be unique"],
      minLength: [3, "Category Name must be at least 3 characters"],
      maxLength: [32, "Category Name must be at most 32 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },

    image: String,
  },
  {
    timestamps: true,
  }
);

// 2- Model schema
export const Category = mongoose.model("Category", categorySchema);
