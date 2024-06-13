"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const hono_1 = require("hono");
const controller_1 = require("./controller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
exports.userRouter = new hono_1.Hono();
//get a single user    api/users/1
exports.userRouter.get("/users/:id", controller_1.getUser);
// create a user 
exports.userRouter.post("/users", (0, zod_validator_1.zValidator)('json', validator_1.userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), controller_1.createUser);
//update a user
exports.userRouter.put("/users/:id", controller_1.updateUser);
// delete user
exports.userRouter.delete("/users/:id", controller_1.deleteUser);
