// src/server.js
const fastify = require('fastify')({ logger: true });
const dotenv = require('dotenv');
dotenv.config();
const dataSource = require('./infrastructure/psql');
const { logger } = require('../logger');

// Register routes and plugins
const contactRoute = require('./routes/contactRoutes');
const webPlaneRoute = require('./routes/webPlanesRoute');
const digitalMarketingRoute = require('./routes/digitalMarketingRoute');
const appPlaneRoute = require('./routes/appPlaneRoutes');
const seoRoute = require('./routes/seoRoute');
const logoPlaneRoute = require('./routes/logoPlaneRoutes');
const AdminAuthRoute = require('./routes/adminAuth');

fastify.register(require('@fastify/cors'), {
  origin: ['http://localhost:3000', 'https://softmarksolutions.netlify.app'],
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
fastify.register(webPlaneRoute);
fastify.register(digitalMarketingRoute);
fastify.register(appPlaneRoute);
fastify.register(seoRoute);
fastify.register(logoPlaneRoute);
fastify.register(AdminAuthRoute);

fastify.setErrorHandler((error, request, reply) => {
  request.log.error(error);
  reply.status(500).send({ error: 'Internal Server Error' });
});

const startServer = async () => {
  try {
    await dataSource.initialize();
    logger.info("Database connection has been established");

    const port = process.env.PORT || 4000;
    fastify.listen(port, (err, address) => {
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

module.exports = fastify;
