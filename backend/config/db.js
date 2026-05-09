import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv';

dotenv.config();

const database_Url = process.env.DATABASE_URL;

const sql = neon(database_Url);





export default sql;