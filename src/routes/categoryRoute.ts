import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../services/categoryService";

const router = express.Router();

router.route("/").get(getAllCategories).post(createCategory);

router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

export default router;
