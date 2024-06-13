import "dotenv/config";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";



export const client = neon(process.env.Database_URL!)



 const db = drizzle(client, {schema, logger: true})// create drizzle instance
export default db;// export the drizzle instance