import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { logger } from "hono/logger";
import { csrf } from "hono/csrf";
import { trimTrailingSlash } from "hono/trailing-slash";
import { timeout } from "hono/timeout";
import { HTTPException } from "hono/http-exception";
import { prometheus } from "@hono/prometheus";
import { restaurantRouter } from "./restaurants/restaurant.router";
import { stateRouter } from "./state/state.routers";
import { userRouter } from "./users/routers";
import { cityRouter } from "./city/city.router";
import { orderRouter } from "./orders/orders.router";
import { orderMenuItemRouter } from "./order-menu-item/order-menu.router";
import { orderStatusRouter } from "./order-status/order-status.router";
import { addressRouter } from "./address/address.router";
import { driverRouter } from "./driver/driver.router";
import { menuItemRouter } from "./menu-item/menu-router";
import { statusRouter } from "./status-catalog/status-routes"
import { commentRouter } from "./comments/comments-routers"
import { categoryRouter } from "./category/category.routers"
import { ownersRouter } from "./restaurant-owners/owners.routers";
import { authRouter } from "./Auth/Auth.router";
import { html, raw } from 'hono/html'


const app = new Hono().basePath("/api");
const customTimeoutException = () =>
  new HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
  });
const { printMetrics, registerMetrics } = prometheus();

// inbuilt middlewares
app.use(logger()); //logs request and response to the console
app.use(csrf()); //prevents CSRF attacks by checking request headers.
app.use(trimTrailingSlash()); //removes trailing slashes from the request URL
app.use("/", timeout(10000, customTimeoutException));
//3rd party middlewares
app.use("*", registerMetrics);

app.get("/timeout", async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 11000));
  return c.text("data after 5 seconds", 200);
});
app.get("/metrics", printMetrics);
// default route
app.get('/', (c) => {
  return c.html(
    html`
   <h3>Hi there </h3  ><br>
   <h1>Am JOHN BRADILL MUKHWANA</h1>
    <ul>
      <li><b>message:</b> Welcome to my Restaurant API, </li>
      <li><b>version:</b> 1.0.0,</li>
      <li><b>docs:</b> Please feel free to debug my API 📢😂😂,</li>
      </ul>
 </p>
    `)
})
app.get('/ok', (c) => {
  return c.text('The server is running📢😏😏😏!')
})
app.get('/timeout', async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 11000))
  return c.text("data after 5 seconds", 200)
})
app.get('/metrics', printMetrics)
app.notFound((c) => {
  return c.text('Route not found💀', 404)
})

// custom routes
app.route("/", restaurantRouter);
app.route("/", userRouter);
app.route("/", stateRouter);
app.route("/", cityRouter);
app.route("/", orderRouter);
app.route("/", orderMenuItemRouter);
app.route("/", orderStatusRouter);
app.route("/", addressRouter);
app.route("/", driverRouter);
app.route("/", menuItemRouter);
app.route("/", statusRouter);
app.route("/", commentRouter);
app.route("/", categoryRouter);
app.route("/", ownersRouter);
app.route("/Auth", authRouter);

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000,
});
console.log(`Server is running on port ${process.env.PORT}`);
// console.log(`Routes registered:`, app.routes);
