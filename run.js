import pg from 'pg';
import R from 'ramda';
import dotenv  from "dotenv";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({path: __dirname + '/.env'})

const cs = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_LOCAL_PORT,
  };

const client = new pg.Client(cs);
client.connect();

client.query('SELECT 1 + 4').then(res => {

    const result = R.head(R.values(R.head(res.rows)));

    console.log(result);
}).finally(() => client.end());