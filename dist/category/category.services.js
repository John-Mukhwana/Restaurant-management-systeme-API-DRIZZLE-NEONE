"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryService = exports.updateCategoryService = exports.createCategoryService = exports.getCategoryService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const getCategoryService = async (id) => {
    return await db_1.default.query.category.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.category.id, id)
    });
};
exports.getCategoryService = getCategoryService;
const createCategoryService = async (categoryData) => {
    await db_1.default.insert(schema_1.category).values(categoryData);
    return "Category created successfully";
};
exports.createCategoryService = createCategoryService;
const updateCategoryService = async (id, categoryData) => {
    await db_1.default.update(schema_1.category).set(categoryData).where((0, drizzle_orm_1.eq)(schema_1.category.id, id));
    return "Category updated successfully";
};
exports.updateCategoryService = updateCategoryService;
const deleteCategoryService = async (id) => {
    await db_1.default.delete(schema_1.category).where((0, drizzle_orm_1.eq)(schema_1.category.id, id));
    return "Category deleted successfully";
};
exports.deleteCategoryService = deleteCategoryService;
