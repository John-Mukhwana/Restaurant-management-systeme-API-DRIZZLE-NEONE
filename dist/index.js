"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
require("dotenv/config");
const logger_1 = require("hono/logger");
const csrf_1 = require("hono/csrf");
const trailing_slash_1 = require("hono/trailing-slash");
const timeout_1 = require("hono/timeout");
const http_exception_1 = require("hono/http-exception");
const prometheus_1 = require("@hono/prometheus");
const restaurant_router_1 = require("./restaurants/restaurant.router");
const state_routers_1 = require("./state/state.routers");
const routers_1 = require("./users/routers");
const city_router_1 = require("./city/city.router");
const orders_router_1 = require("./orders/orders.router");
const order_menu_router_1 = require("./order-menu-item/order-menu.router");
const order_status_router_1 = require("./order-status/order-status.router");
const address_router_1 = require("./address/address.router");
const driver_router_1 = require("./driver/driver.router");
const menu_router_1 = require("./menu-item/menu-router");
const status_routes_1 = require("./status-catalog/status-routes");
const comments_routers_1 = require("./comments/comments-routers");
const category_routers_1 = require("./category/category.routers");
const owners_routers_1 = require("./restaurant-owners/owners.routers");
const Auth_router_1 = require("./Auth/Auth.router");
const app = new hono_1.Hono().basePath("/api");
const customTimeoutException = () => new http_exception_1.HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
});
const { printMetrics, registerMetrics } = (0, prometheus_1.prometheus)();
// inbuilt middlewares
app.use((0, logger_1.logger)()); //logs request and response to the console
app.use((0, csrf_1.csrf)()); //prevents CSRF attacks by checking request headers.
app.use((0, trailing_slash_1.trimTrailingSlash)()); //removes trailing slashes from the request URL
app.use("/", (0, timeout_1.timeout)(10000, customTimeoutException));
//3rd party middlewares
app.use("*", registerMetrics);
app.get("/timeout", async (c) => {
    await new Promise((resolve) => setTimeout(resolve, 11000));
    return c.text("data after 5 seconds", 200);
});
app.get("/metrics", printMetrics);
// custom routes
app.route("/", restaurant_router_1.restaurantRouter);
app.route("/", routers_1.userRouter);
app.route("/", state_routers_1.stateRouter);
app.route("/", city_router_1.cityRouter);
app.route("/", orders_router_1.orderRouter);
app.route("/", order_menu_router_1.orderMenuItemRouter);
app.route("/", order_status_router_1.orderStatusRouter);
app.route("/", address_router_1.addressRouter);
app.route("/", driver_router_1.driverRouter);
app.route("/", menu_router_1.menuItemRouter);
app.route("/", status_routes_1.statusRouter);
app.route("/", comments_routers_1.commentRouter);
app.route("/", category_routers_1.categoryRouter);
app.route("/", owners_routers_1.ownersRouter);
app.route("/Auth", Auth_router_1.authRouter);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3000,
});
console.log(`Server is running on port ${process.env.PORT}`);
// console.log(`Routes registered:`, app.routes);
