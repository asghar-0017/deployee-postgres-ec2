const dotenv = require('dotenv');
dotenv.config();

const fastify = require('./src/App');
const dataSource = require('./src/infrastructure/psql');
const { logger } = require('./logger');

const startServer = async () => {
  try {
    await dataSource.initialize();
    logger.info("Database connection has been established");

    fastify.listen(process.env.PORT || 4000, '0.0.0.0', (err, address) => {
      if (err) {
        logger.error(err.message);
        process.exit(1);
      }
      logger.info(`Server is listening on ${address}`);
    });

  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

startServer();
