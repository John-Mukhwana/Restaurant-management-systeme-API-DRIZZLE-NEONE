"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatusCatalog = exports.updateServiceCatalog = exports.createServiceCatalog = exports.getServiceCatalog = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const getServiceCatalog = async (id) => {
    return await db_1.default.query.status_catalog.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.status_catalog.id, id)
    });
};
exports.getServiceCatalog = getServiceCatalog;
const createServiceCatalog = async (data) => {
    await db_1.default.insert(schema_1.status_catalog).values(data);
    return "Status created successfully";
};
exports.createServiceCatalog = createServiceCatalog;
const updateServiceCatalog = async (id, data) => {
    await db_1.default.update(schema_1.status_catalog).set(data).where((0, drizzle_orm_1.eq)(schema_1.status_catalog.id, id));
    return "Status updated successfully";
};
exports.updateServiceCatalog = updateServiceCatalog;
const deleteStatusCatalog = async (id) => {
    await db_1.default.delete(schema_1.status_catalog).where((0, drizzle_orm_1.eq)(schema_1.status_catalog.id, id));
    return "Status catalog successfully deleted";
};
exports.deleteStatusCatalog = deleteStatusCatalog;
