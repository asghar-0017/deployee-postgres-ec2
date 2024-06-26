const { DataSource } = require("typeorm");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const { PinoLogger, logger } = require('../../logger');

// Log environment variables to check if they are loaded correctly
const {
  DB_HOST,
  DB_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB
} = process.env;

console.log({
  DB_HOST,
  DB_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB
});

if (!DB_HOST || !DB_PORT || !POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_DB) {
  throw new Error('Missing one or more environment variables for PostgreSQL connection');
}

const dataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: true,
  logger: new PinoLogger(),
  entities: [path.join(__dirname, "../entities/**/*.js")],
});

dataSource.initialize().then(() => {
  logger.info("Database connection has been established");
}).catch((error) => {
  logger.error("Error during Data Source initialization:", error);
});

module.exports = dataSource;
