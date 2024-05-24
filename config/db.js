import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg; 

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;

const config = {
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
    allowExitOnIdle: true,

}

const pool = new Pool(config);

export default pool;