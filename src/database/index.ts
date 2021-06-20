import { Sequelize, DataTypes } from 'sequelize';

export const sequelize = new Sequelize(
  process.env['DB_SCHEMA'] || 'postgres',
  process.env['DB_USER'] || 'postgres',
  process.env['DB_PASSWORD'] || 'password',
  {
    host: process.env['DB_HOST'] || 'localhost',
    port: parseInt(process.env['DB_PORT'] || '5432', 10),
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env['DB_SSL'] === 'true',
    },
  }
);

export const Person = sequelize.define('Person', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
