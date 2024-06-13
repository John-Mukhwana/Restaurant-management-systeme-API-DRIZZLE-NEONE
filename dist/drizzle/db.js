"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
require("dotenv/config");
const serverless_1 = require("@neondatabase/serverless");
const neon_http_1 = require("drizzle-orm/neon-http");
const schema = require("./schema");
exports.client = (0, serverless_1.neon)(process.env.Database_URL);
const db = (0, neon_http_1.drizzle)(exports.client, { schema, logger: true }); // create drizzle instance
exports.default = db; // export the drizzle instance
