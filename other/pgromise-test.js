import pgp from 'pg-promise'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv  from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({path: __dirname + '/../.env'});



const password = process.env.POSTGRES_PASSWORD;
const username = process.env.POSTGRES_USER;

const cn = {
    user: '1323',
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: password,
    port: process.env.POSTGRES_LOCAL_PORT,
  };

  console.log('process.env', cn);

// alternative:
// var cn = 'postgres://username:password@host:port/database';

const db = pgp(cn); // database instance;

// select and return a single user name from id:
db.one('SELECT name FROM users WHERE id = $1', [123])
    .then(user => {
        console.log(user.name); // print user name;
    })
    .catch(error => {
        console.log(error); // print the error;
    });