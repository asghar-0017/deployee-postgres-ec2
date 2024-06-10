const fastify = require("fastify");
const dotenv = require("dotenv");
dotenv.config();
const dataSource = require("./infrastructure/psql");
const { logger } = require("../logger");

const contactRoute = require("./routes/contactRoutes");
const basicPlainRoute= require('./routes/PlainsRoute')

const StartServer = async () => {
  const app = fastify();

  // Enable CORS
  app.register(require('@fastify/cors'), {
    origin: 'http://localhost:3000', // Replace with your frontend origin
    methods: ['GET', 'POST'], // Specify allowed methods
    credentials: true, // Include cookies in CORS requests if needed
  });

  app.get("/", async (req, res) => {
    const result = {
      code: 200,
      status: "OK",
      message: "Fastify server is running ",
    };
    res.send(result);
  });
  app.register(contactRoute);
  app.register(basicPlainRoute);

  try {
    app.listen(process.env.PORT || 4000);

    await dataSource.initialize();
    logger.info("Database connection has been established");

    logger.info(`Server is listening on ${process.env.PORT || 4000}`);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

module.exports = StartServer;
