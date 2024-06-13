import { Hono } from "hono";
import { getService, createService, updateService, deleteService } from "./status-controller";
import { zValidator } from "@hono/zod-validator";
import { status_catalogSchema } from "../validator";

export const statusRouter = new Hono();

// Get a single state by ID: api/states/1
statusRouter.get("/status_catalog/:id", getService);

// Create a state
statusRouter.post(
  "/status_catalog",
  zValidator("json", status_catalogSchema, (result, c) => {
    if (!result.success) {
      return c.json(result.error, 400);
    }
  }),
  createService
);

// Update a state by ID
statusRouter.put("/status_catalog/:id", updateService);

// Delete a state by ID
statusRouter.delete("/status_catalog/:id", deleteService);
