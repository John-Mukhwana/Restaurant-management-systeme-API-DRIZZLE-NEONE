"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderStatusService = exports.updateOrderStatusService = exports.createOrderStatusService = exports.getOrderStatusService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const getOrderStatusService = async (id) => {
    return await db_1.default.query.order_status.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.order_status.id, id)
    });
};
exports.getOrderStatusService = getOrderStatusService;
const createOrderStatusService = async (orderStatus) => {
    await db_1.default.insert(schema_1.order_status).values(orderStatus);
    return "OrderStatus created successfully";
};
exports.createOrderStatusService = createOrderStatusService;
const updateOrderStatusService = async (id, orderStatus) => {
    await db_1.default.update(schema_1.order_status).set(orderStatus).where((0, drizzle_orm_1.eq)(schema_1.order_status.id, id));
    return "OrderStatus updated successfully";
};
exports.updateOrderStatusService = updateOrderStatusService;
const deleteOrderStatusService = async (id) => {
    await db_1.default.delete(schema_1.order_status).where((0, drizzle_orm_1.eq)(schema_1.order_status.id, id));
    return "OrderStatus deleted successfully";
};
exports.deleteOrderStatusService = deleteOrderStatusService;
