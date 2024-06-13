const { appBasicPlane, appStandardPlane, appPremiumPlane } = require('../controller/appPlaneController');
const upload = require('../utils/uploadConfig');

const appPlaneRoute = async (fastify) => {
  fastify.post('/app-basic-plane', { preHandler: upload.array('Link_to_Graphics', 10) },  appBasicPlane);
  fastify.post('/app-standard-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, appStandardPlane);
  fastify.post('/app-premium-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, appPremiumPlane);
};

module.exports = appPlaneRoute;
