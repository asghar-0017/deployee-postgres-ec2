const { webBasicPlan, webStandardPlan, webPremiumPlan,
  allWebBasicPlanesData,allWebStandardPlaneData,allWebPremiumPlaneData,
  WebBasicPlanesDataById,WebStandardPlaneDataById,WebPremiumPlaneDataById,
  deleteWebBasicPlanesData,deleteWebStandardPlaneData,deleteWebPremiumPlaneData,
  updateWebBasicPlanesData,updateWebStandardPlaneData,updateWebPremiumPlaneData
 } = require('../controller/webPlanController');
const upload = require('../utils/uploadConfig');

const webPlaneRoute = async (fastify) => {
  
  fastify.post('/web-basic-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, webBasicPlan  );
  fastify.post('/web-standard-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, webStandardPlan);
  fastify.post('/web-premium-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, webPremiumPlan);


  fastify.get('/all-web-basic-planes-data',allWebBasicPlanesData)
  fastify.get('/all-web-standard-planes-data',allWebStandardPlaneData)
  fastify.get('/all-web-premium-planes-data',allWebPremiumPlaneData)

  fastify.get('/all-web-basic-planes-data/:clientId',WebBasicPlanesDataById)
  fastify.get('/all-web-standard-planes-data/:clientId',WebStandardPlaneDataById)
  fastify.get('/all-web-premium-planes-data/:clientId',WebPremiumPlaneDataById)

  fastify.delete('/all-web-basic-planes-data/:id/:clientId',deleteWebBasicPlanesData)
  fastify.delete('/all-web-standard-planes-data/:id/:clientId',deleteWebStandardPlaneData)
  fastify.delete('/all-web-premium-planes-data/:id/:clientId',deleteWebPremiumPlaneData)

  fastify.put('/all-web-basic-planes-data/:id/:clientId',{ preHandler: upload.array('Link_to_Graphics', 10) },updateWebBasicPlanesData)
  fastify.put('/all-web-standard-planes-data/:id/:clientId',{ preHandler: upload.array('Link_to_Graphics', 10) },updateWebStandardPlaneData)
  fastify.put('/all-web-premium-planes-data/:id/:clientId',{ preHandler: upload.array('Link_to_Graphics', 10) },updateWebPremiumPlaneData)
};

module.exports = webPlaneRoute;
