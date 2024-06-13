"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderMenuItemService = exports.updateOrderMenuItemService = exports.createOrderMenuItemService = exports.getOrderMenuItemService = void 0;
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const drizzle_orm_1 = require("drizzle-orm");
const getOrderMenuItemService = async (id) => {
    return await db_1.default.query.order_menu_item.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.order_menu_item.id, id)
    });
};
exports.getOrderMenuItemService = getOrderMenuItemService;
const createOrderMenuItemService = async (orderMenuItem) => {
    await db_1.default.insert(schema_1.order_menu_item).values(orderMenuItem);
    return "OrderMenuItem created successfully";
};
exports.createOrderMenuItemService = createOrderMenuItemService;
const updateOrderMenuItemService = async (id, orderMenuItem) => {
    await db_1.default.update(schema_1.order_menu_item).set(orderMenuItem).where((0, drizzle_orm_1.eq)(schema_1.order_menu_item.id, id));
    return "OrderMenuItem updated successfully";
};
exports.updateOrderMenuItemService = updateOrderMenuItemService;
const deleteOrderMenuItemService = async (id) => {
    await db_1.default.delete(schema_1.order_menu_item).where((0, drizzle_orm_1.eq)(schema_1.order_menu_item.id, id));
    return "OrderMenuItem deleted successfully";
};
exports.deleteOrderMenuItemService = deleteOrderMenuItemService;
