const fastify = require('fastify')({ logger: true });

fastify.get('/', async (request, reply) => {
  reply.send({ hello: 'world' });
});

const start = async () => {
  try {
    await fastify.listen(4000, '0.0.0.0');
    fastify.log.info(`Server is running at http://localhost:4000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
