const { DataSource } = require("typeorm");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const { PinoLogger } = require('../../logger');

const dataSource = new DataSource({
  type: "postgres",
  host: '54.234.43.187',
  port: process.env.DB_PORT || 5433,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "postgres",
  synchronize: true,
  logging: true,
  logger: new PinoLogger(),
  entities: [path.join(__dirname, "../entities/**/*.js")],
});

module.exports = dataSource;
