const { digitalMarketing, allDigitalMarketingData, delDigitalMarketingById, updateDigitalMarketingById, getDigitalMarketingById } = require('../controller/digitalMarketingController');

const digitalMarketingRoute = async (fastify) => {
  fastify.post('/digital-marketing', digitalMarketing);
  fastify.get('/all-digital-marketing-data', allDigitalMarketingData);
  fastify.get('/all-digital-marketing-data/:clientId', getDigitalMarketingById);
  fastify.delete('/digital-marketing/:id/:clientId', delDigitalMarketingById);
  fastify.put('/digital-marketing/:id', updateDigitalMarketingById);
};

module.exports = digitalMarketingRoute;
