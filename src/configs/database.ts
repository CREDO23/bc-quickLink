import * as dotenv from 'dotenv';

dotenv.config()

const { DB_HOST, DB_NAME, DB_USER, DB_USER_PASSWORD } = process.env;

export const db_connection_string = `postgresql://${DB_USER}:${DB_USER_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`;
