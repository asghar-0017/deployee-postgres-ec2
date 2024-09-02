const fastify = require('fastify')({ logger: true });
const dotenv = require('dotenv');
dotenv.config();
const dataSource = require('./infrastructure/psql');
const path = require('path');
const fastifyStatic = require('@fastify/static');
const fastifyMultipart = require('@fastify/multipart');
const { logger } = require('../logger');

const contactRoute = require('./routes/contactRoutes');
const webPlanRoute = require('./routes/webPlanRoute');
const digitalMarketingRoute = require('./routes/digitalMarketingRoute');
const appPlaneRoute = require('./routes/appPlaneRoutes');
const seoRoute = require('./routes/seoRoute');
const logoPlaneRoute = require('./routes/logoPlaneRoutes');
const allPlanesRoutes = require('./routes/allPlanesRoutes');
const AdminAuthRoute = require('./routes/adminAuth');
// const paymentRoute = require('./routes/paymentRoute');
// const wiseRoute=require('./routes/wiseRoute')

fastify.register(require('@fastify/cors'), {
  // origin: ['http://localhost:3000', 'https://www.softmarksolutions.com', 'http://localhost:5173', 'http://localhost:5174'],
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dewkvhlje',
  api_key: '835292952964664',
  api_secret: 'ZrkM_rttEvHWGc2lpjyAQVINSgw'
  
});

fastify.register(fastifyMultipart, {
  limits: {
    fieldNameSize: 100,
    fieldSize: 1000000,
    fields: 10,
    fileSize: 1000000,
    files: 10,
    headerPairs: 2000,
  },
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../uploads'),
  prefix: '/uploads/', // This will serve files under http://yourhost/uploads/
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
fastify.register(webPlanRoute);
fastify.register(digitalMarketingRoute);
fastify.register(appPlaneRoute);
fastify.register(seoRoute);
fastify.register(logoPlaneRoute);
fastify.register(AdminAuthRoute);
fastify.register(allPlanesRoutes);
// fastify.register(paymentRoute);
// fastify.register(wiseRoute);

const startServer = async () => {
  try {
    await dataSource.initialize();
    logger.info("Database connection has been established");

    const PORT = process.env.PORT || 4000;
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    logger.info(`Server is listening on ${PORT}`);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};


module.exports=startServer