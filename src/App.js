// src/app.js
const fastify = require('fastify')({ logger: true });
const dotenv = require('dotenv');
dotenv.config();
const dataSource = require('./infrastructure/psql');
const { logger } = require('../logger');
const contactRoute = require('./routes/contactRoutes');
const basicPlainRoute = require('./routes/PlainsRoute');

fastify.register(require('@fastify/cors'), {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
});

fastify.register(require('fastify-multipart'), {
  limits: {
    fieldNameSize: 100,
    fieldSize: 1000000,
    fields: 10,
    fileSize: 1000000,
    files: 10,
    headerPairs: 2000,
  },
});

fastify.get('/', async (req, res) => {
  const result = {
    code: 200,
    status: 'OK',
    message: 'Fastify server is running',
  };
  res.send(result);
});

fastify.register(contactRoute);
fastify.register(basicPlainRoute);

const startServer = async () => {
  try {
    await dataSource.initialize();
    logger.info('Database connection has been established');

    fastify.listen(process.env.PORT || 4000, (err, address) => {
      if (err) {
        logger.error(err);
        process.exit(1);
      }
      logger.info(`Server is listening on ${address}`);
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

module.exports = startServer;
