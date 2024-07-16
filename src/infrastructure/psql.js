const { DataSource } = require("typeorm");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const { PinoLogger } = require('../../logger');

const dataSource = new DataSource({
  type: "postgres",
  host: 'softmark-prod.cxso044omijf.us-east-1.rds.amazonaws.com',
  port: process.env.DB_PORT || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "SoftMark#2024$",
  database: process.env.POSTGRES_DB || "postgres",
  synchronize: true,
  logging: true,
  logger: new PinoLogger(),
  entities: [path.join(__dirname, "../entities/**/*.js")],
});

module.exports = dataSource;
