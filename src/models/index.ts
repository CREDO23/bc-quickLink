import { Sequelize } from 'sequelize';
import * as pg from 'pg';
import { db_connection_string } from '../configs/database';

export const sequelize = new Sequelize(db_connection_string, {
  dialectModule: pg,
  dialect: 'postgres',
  logging: false,
});

// Load all models && associations before creating a connection to the database
import './associtions';

export const connect_db = async (): Promise<void> => {
  await sequelize.authenticate();

  await sequelize.sync({ alter: true });

  console.log('db connection established');
};
