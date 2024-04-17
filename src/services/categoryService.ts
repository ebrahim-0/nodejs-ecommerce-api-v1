import { NextFunction, Request, Response } from "express";
import { Category } from "../models/categoryModel";
import asyncHandler from "express-async-handler";
import lodash from "lodash";
import ApiError from "../utils/apiError";

// @desc   Get a List of all categories
// @route  GET /api/v1/categories
// @access Public
export const getAllCategories = asyncHandler(
  async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;

    const categories = await Category.find({}).skip(skip).limit(limit);
    res
      .status(200)
      .json({ results: categories.length, page, data: categories });
  }
);

// @desc   Create a new category
// @route  POST /api/v1/categories
// @access Private/Admin
export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const category = await Category.create({
      name,
      slug: lodash.kebabCase(name),
    });
    res.status(201).json({ message: "Category Created", data: category });
  }
);

// @desc   Get a category by id
// @route  GET /api/v1/categories/:id
// @access Public
export const getCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return next(new ApiError(`No Category for this id ${id}`, 404));
    }

    res.status(200).json({ data: category });
  }
);

// @desc   Update a category
// @route  PUT /api/v1/categories/:id
// @access Private/Admin

export const updateCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: lodash.kebabCase(name) },
      { new: true, runValidators: true }
    );

    if (!category) {
      return next(new ApiError(`No Category for this id ${id}`, 404));
    }
    res.status(200).json({ message: "Category Updated", data: category });
  }
);

// @desc   Delete a category by id
// @route  DELETE /api/v1/categories/:id
// @access Private/Admin
export const deleteCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return next(new ApiError(`No Category for this id ${id}`, 404));
    }
    res.status(204).json({ message: "Category Deleted" });
  }
);
