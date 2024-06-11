// src/routes/PlainsRoute.js
const { basicPlains, standardPlains, premiumPlains } = require('../controller/PlainsController');
const upload = require('../utils/uploadConfig');

const basicPlainRoute = async (fastify) => {
  fastify.post('/basic-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, basicPlains);
  fastify.post('/standard-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, standardPlains);
  fastify.post('/premium-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, premiumPlains);
};

module.exports = basicPlainRoute;
