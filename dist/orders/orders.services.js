"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderService = exports.updateOrderService = exports.createOrderService = exports.getOrderService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const getOrderService = async (id) => {
    return await db_1.default.query.orders.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.orders.id, id)
    });
};
exports.getOrderService = getOrderService;
const createOrderService = async (orderData) => {
    await db_1.default.insert(schema_1.orders).values(orderData);
    return "Order created successfully";
};
exports.createOrderService = createOrderService;
const updateOrderService = async (id, orderData) => {
    await db_1.default.update(schema_1.orders).set(orderData).where((0, drizzle_orm_1.eq)(schema_1.orders.id, id));
    return "Order updated successfully";
};
exports.updateOrderService = updateOrderService;
const deleteOrderService = async (id) => {
    await db_1.default.delete(schema_1.orders).where((0, drizzle_orm_1.eq)(schema_1.orders.id, id));
    return "Order deleted successfully";
};
exports.deleteOrderService = deleteOrderService;
