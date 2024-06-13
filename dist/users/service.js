"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUserService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const getUserService = async (id) => {
    return await db_1.default.query.users.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.users.id, id)
    });
};
exports.getUserService = getUserService;
const createUserService = async (user) => {
    await db_1.default.insert(schema_1.users).values(user);
    return "User created successfully";
};
exports.createUserService = createUserService;
const updateUserService = async (id, user) => {
    await db_1.default.update(schema_1.users).set(user).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
    return "User updated successfully";
};
exports.updateUserService = updateUserService;
const deleteUserService = async (id) => {
    await db_1.default.delete(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
    return "User deleted successfully";
};
exports.deleteUserService = deleteUserService;
