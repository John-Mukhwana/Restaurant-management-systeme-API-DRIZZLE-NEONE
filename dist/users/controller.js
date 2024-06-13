"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = void 0;
const service_1 = require("./service");
//search user
const getUser = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        console.log(id);
        if (isNaN(id))
            return c.text("Invalid ID", 400);
        const user = await (0, service_1.getUserService)(id);
        if (user === null) {
            return c.text("User not found", 404);
        }
        return c.json(user, 200);
    }
    catch (error) {
        console.error(error?.message);
    }
};
exports.getUser = getUser;
// create user
const createUser = async (c) => {
    try {
        const user = await c.req.json();
        const createdUser = await (0, service_1.createUserService)(user);
        if (!createdUser)
            return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createUser = createUser;
// updateUser
const updateUser = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        // search for the user
        const searchedUser = await (0, service_1.getUserService)(id);
        if (searchedUser == undefined)
            return c.text("User not found", 404);
        // get the data and update it
        const res = await (0, service_1.updateUserService)(id, user);
        // return a success message
        if (!res)
            return c.text("User not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateUser = updateUser;
//delete user
const deleteUser = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const user = await (0, service_1.getUserService)(id);
        if (user == undefined)
            return c.text("User not found", 404);
        //deleting the user
        const res = await (0, service_1.deleteUserService)(id);
        if (!res)
            return c.text("User not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteUser = deleteUser;
