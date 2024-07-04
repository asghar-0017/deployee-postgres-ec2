const { appBasicPlane, appStandardPlane, appPremiumPlane,
  allAppBasicPlanesData ,allAppStandardPlaneData,allAppPremiumPlaneData,
  deleteAppBasicPlanesData,deleteAppStandardPlaneData,deleteAppPremiumPlaneData,
  getAppBasicPlanesDataById,getAppStandardPlaneDataById,getAppPremiumPlaneDataById,
  updateAppBasicPlanesData,updateAppStandardPlaneData,updateAppPremiumPlaneData
} = require('../controller/appPlaneController');
const upload = require('../utils/uploadConfig');

const appPlaneRoute = async (fastify) => {
  fastify.post('/app-basic-plane', { preHandler: upload.array('Link_to_Graphics', 10) },  appBasicPlane);
  fastify.post('/app-standard-plane',{ preHandler: upload.array('Link_to_Graphics', 10) }, appStandardPlane);
  fastify.post('/app-premium-plane',{ preHandler: upload.array('Link_to_Graphics', 10) }, appPremiumPlane);

  fastify.get('/all-app-basic-planes-data',allAppBasicPlanesData)
  fastify.get('/all-app-standard-planes-data',allAppStandardPlaneData)
  fastify.get('/all-app-premium-planes-data',allAppPremiumPlaneData)


  fastify.delete('/app-basic-planes-data/:id/:clientId',deleteAppBasicPlanesData)
  fastify.delete('/app-standard-planes-data/:id/:clientId',deleteAppStandardPlaneData)
  fastify.delete('/app-premium-planes-data/:id/:clientId',deleteAppPremiumPlaneData)

  fastify.get('/app-basic-planes-data/:clientId',getAppBasicPlanesDataById)
  fastify.get('/app-standard-planes-data/:clientId',getAppStandardPlaneDataById)
  fastify.get('/app-premium-planes-data/:clientId',getAppPremiumPlaneDataById)

  fastify.put('/app-basic-planes-data/:id/:clientId', { preHandler: upload.array('Link_to_Graphics', 10) },updateAppBasicPlanesData)
  fastify.put('/app-standard-planes-data/:id/:clientId', { preHandler: upload.array('Link_to_Graphics', 10) },updateAppStandardPlaneData)
  fastify.put('/app-premium-planes-data/:id/:clientId', { preHandler: upload.array('Link_to_Graphics', 10) },updateAppPremiumPlaneData)
  


};

module.exports = appPlaneRoute;
