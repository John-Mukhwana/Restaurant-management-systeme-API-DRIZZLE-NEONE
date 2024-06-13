"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriverService = exports.updateDriverService = exports.createDriverService = exports.getDriverService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const getDriverService = async (id) => {
    return await db_1.default.query.driver.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.driver.id, id)
    });
};
exports.getDriverService = getDriverService;
const createDriverService = async (driverData) => {
    await db_1.default.insert(schema_1.driver).values(driverData);
    return "Driver created successfully";
};
exports.createDriverService = createDriverService;
const updateDriverService = async (id, driverData) => {
    await db_1.default.update(schema_1.driver).set(driverData).where((0, drizzle_orm_1.eq)(schema_1.driver.id, id));
    return "Driver updated successfully";
};
exports.updateDriverService = updateDriverService;
const deleteDriverService = async (id) => {
    await db_1.default.delete(schema_1.driver).where((0, drizzle_orm_1.eq)(schema_1.driver.id, id));
    return "Driver deleted successfully";
};
exports.deleteDriverService = deleteDriverService;
