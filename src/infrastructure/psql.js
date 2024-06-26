const { DataSource } = require("typeorm");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const { PinoLogger, logger } = require('../../logger');

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
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
