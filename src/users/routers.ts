import { Hono } from "hono";
import { getUser,createUser,updateUser,deleteUser } from "./controller"
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validator";
import { userRoleAuth,  adminRoleAuth ,} from "../Middleware/Auth.middleware";

export const userRouter = new Hono();

//get a single user    api/users/1
userRouter.get("/users/:id", userRoleAuth, getUser)

// create a user 
userRouter.post("/users", zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createUser);

// //update a user
// userRouter.put("/users/:id", updateUser)
// // delete user
// userRouter.delete("/users/:id", deleteUser)
//get all users      api/users
userRouter.get("/users", adminRoleAuth, getUser);
//get a single user    api/users/1
userRouter.get("/users/:id", userRoleAuth, getUser)
// create a user 
userRouter.post("/register", zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createUser)
//update a user
userRouter.put("/users/:id", updateUser)

userRouter.delete("/users/:id", deleteUser)

//https:domai.com/api/users?limit=10