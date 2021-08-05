import pg from 'pg';
import R from 'ramda';
import dotenv  from "dotenv";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({path: __dirname + '/.env'})

const password = process.env.POSTGRES_PASSWORD;
const username = process.env.POSTGRES_USER;
const cs = {
    user: username,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: password,
    port: process.env.POSTGRES_PORT,

  };

console.log('⚐ Username:', username);
console.log('⚐ Password:', password);

const client = new pg.Client(cs);

client.connection.on('message', function(msg) {
  console.log('⚐ message:', msg.name)
 })
 
 client.connection.on('connect', function() {
  console.log('⚐ connected')
 })
 
 client.connection.stream.on('connect', function() {
  console.log('⚐ stream connected')
 })

client.connect();

client.query('SELECT 1 + 4').then(res => {

    const result = R.head(R.values(R.head(res.rows)));
    console.log('⚐ Resulr:', result);
}).finally(() => client.end());