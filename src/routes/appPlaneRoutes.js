const { appBasicPlane, appStandardPlane, appPremiumPlane,
  allAppBasicPlanesData ,allAppStandardPlaneData,allAppPremiumPlaneData,
  // deleteAppBasicPlanesData,deleteAppStandardPlaneDat,adeleteAppPremiumPlaneData
  getAppBasicPlanesDataById,getAppStandardPlaneDataById,getAppPremiumPlaneDataById
} = require('../controller/appPlaneController');
const upload = require('../utils/uploadConfig');

const appPlaneRoute = async (fastify) => {
  fastify.post('/app-basic-plane', { preHandler: upload.array('Link_to_Graphics', 10) },  appBasicPlane);
  fastify.post('/app-standard-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, appStandardPlane);
  fastify.post('/app-premium-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, appPremiumPlane);

  fastify.get('/all-app-basic-planes-data',allAppBasicPlanesData)
  fastify.get('/all-app-standard-planes-data',allAppStandardPlaneData)
  fastify.get('/all-app-premium-planes-data',allAppPremiumPlaneData)


  // fastify.delete('/app-basic-planes-data/:id',deleteAppBasicPlanesData)
  // fastify.delete('/app-standard-planes-data/:id',deleteAppStandardPlaneData)
  // fastify.delete('/app-premium-planes-data/:id',deleteAppPremiumPlaneData)

  fastify.get('/app-basic-planes-data/:id',getAppBasicPlanesDataById)
  fastify.get('/app-standard-planes-data/:id',getAppStandardPlaneDataById)
  fastify.get('/app-premium-planes-data/:id',getAppPremiumPlaneDataById)

  


};

module.exports = appPlaneRoute;
