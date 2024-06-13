import { Context } from "hono";
import { getServiceCatalog, updateServiceCatalog, deleteStatusCatalog, createServiceCatalog} from "./status-services"

// Get status catalog  by ID
export const getService = async (c: Context) => {
    try {
      const id = parseInt(c.req.param("id"));
      if (isNaN(id)) return c.text("Invalid ID", 400);
  
      const status_catalog = await getServiceCatalog(id);
      if (!status_catalog) {
        return c.text("State not found", 404);
      }
      return c.json(status_catalog, 200);
    } catch (error: any) {
      console.error(error?.message);
      return c.json({ error: error?.message }, 500);
    }
  };
  
  // Create status catalog 
  export const createService = async (c: Context) => {
    try {
      const data = await c.req.json();
      const createdMsg = await createServiceCatalog(data);
  
      if (!createdMsg) return c.text("Status  not created", 500);
      return c.json({ msg: createdMsg }, 201);
    } catch (error: any) {
      console.error(error?.message);
      return c.json({ error: error?.message }, 500);
    }
  };
  
  // Update status catalog  by ID
  export const updateService = async (c: Context) => {
    try {
      const id = parseInt(c.req.param("id"));
      if (isNaN(id)) return c.text("Invalid ID", 400);
  
      const data = await c.req.json();
      const updatedMsg = await updateServiceCatalog (id, data);
  
      if (!updatedMsg) return c.text("Status catalog not updated", 404);
      return c.json({ msg: updatedMsg }, 200);
    } catch (error: any) {
      console.error(error?.message);
      return c.json({ error: error?.message }, 500);
    }
  };
  
  // Delete status catalog  by ID
  export const deleteService = async (c: Context) => {
    try {
      const id = parseInt(c.req.param("id"));
      if (isNaN(id)) return c.text("Invalid ID", 400);
  
      const deletedMsg = await deleteStatusCatalog(id);
  
      if (!deletedMsg) return c.text("State not deleted", 404);
      return c.json({ msg: deletedMsg }, 200);
    } catch (error: any) {
      console.error(error?.message);
      return c.json({ error: error?.message }, 500);
    }
  };
  