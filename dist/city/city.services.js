"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCityService = exports.updateCityService = exports.createCityService = exports.getCityService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const getCityService = async (id) => {
    return await db_1.default.query.city.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.city.id, id)
    });
};
exports.getCityService = getCityService;
const createCityService = async (cityData) => {
    await db_1.default.insert(schema_1.city).values(cityData);
    return "City created successfully";
};
exports.createCityService = createCityService;
const updateCityService = async (id, cityData) => {
    await db_1.default.update(schema_1.city).set(cityData).where((0, drizzle_orm_1.eq)(schema_1.city.id, id));
    return "City updated successfully";
};
exports.updateCityService = updateCityService;
const deleteCityService = async (id) => {
    await db_1.default.delete(schema_1.city).where((0, drizzle_orm_1.eq)(schema_1.city.id, id));
    return "City deleted successfully";
};
exports.deleteCityService = deleteCityService;
