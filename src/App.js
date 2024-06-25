// src/app.js
const fastify = require('fastify')({ logger: true });
const dotenv = require('dotenv');
dotenv.config();
const dataSource = require('./infrastructure/psql');
const { logger } = require('../logger');

const contactRoute = require('./routes/contactRoutes');
const webPlaneRoute = require('./routes/webPlanesRoute');
const digitalMarketingRoute=require('./routes/digitalMarketingRoute')
const appPlaneRoute=require('./routes/appPlaneRoutes')
const seoRoute=require('./routes/seoRoute')
const logoPlaneRoute=require('./routes/logoPlaneRoutes')

const AdminAuthRoute=require('./routes/adminAuth')

fastify.register(require('@fastify/cors'), {
  origin: ['http://localhost:3000', 'https://backend-softmark.vercel.app'], // Allow multiple origins
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
fastify.register(digitalMarketingRoute)
fastify.register(appPlaneRoute)
fastify.register(seoRoute)
fastify.register(logoPlaneRoute)
fastify.register(AdminAuthRoute);

const startServer = async () => {
  try {
    fastify.listen(process.env.PORT || 4000);

    await dataSource.initialize();
    logger.info("Database connection has been established");

    logger.info(`Server is listening on ${process.env.PORT || 4000}`);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }

};

module.exports = startServer;
