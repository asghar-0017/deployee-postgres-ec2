const fastify = require('fastify')({ logger: true });
const dataSource = require('./src/infrastructure/psql');

// const contactRoute = require('./src/routes/contactRoutes');



fastify.get('/', async (request, reply) => {
  reply.send({ hello: 'world' });
});

// fastify.register(contactRoute);


const start = async () => {
  try {
    await dataSource.initialize();
    // console.log("Database connection has been established");
    await fastify.listen(4000, '0.0.0.0');
    fastify.log.info(`Server is running at http://localhost:4000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
