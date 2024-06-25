const { appBasicPlane, appStandardPlane, appPremiumPlane,
  allAppBasicPlanesData ,allAppStandardPlaneData,allAppPremiumPlaneData
} = require('../controller/appPlaneController');
const upload = require('../utils/uploadConfig');

const appPlaneRoute = async (fastify) => {
  fastify.post('/app-basic-plane', { preHandler: upload.array('Link_to_Graphics', 10) },  appBasicPlane);
  fastify.post('/app-standard-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, appStandardPlane);
  fastify.post('/app-premium-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, appPremiumPlane);

  fastify.get('/all-app-basic-planes-data',allAppBasicPlanesData)
  fastify.get('/all-app-standard-planes-data',allAppStandardPlaneData)
  fastify.get('/all-app-premium-planes-data',allAppPremiumPlaneData)
};

module.exports = appPlaneRoute;
