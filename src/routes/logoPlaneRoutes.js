const { logoBasicPlane, logoStandardPlane, logoPremiumPlane, logoBusinessPlane,
  allLogoBasicPlanesData,allLogoStandardPlaneData,allLogoPremiumPlaneData,allLogoBusinessPlaneData,
  allLogoBasicPlanesDataByID,allLogoStandardPlaneDataByID,allLogoPremiumPlaneDataById,allLogoBusinessPlaneDataById,
  deleteLogoBasicPlanesData,deleteLogoStandardPlaneData,deleteLogoPremiumPlaneData,deleteLogoBusinessPlaneData,
  updateLogoBasicPlanesData,updateLogoStandardPlaneData,updateLogoPremiumPlaneData,updateLogoBusinessPlaneData


 } = require('../controller/logoPlaneController');
const upload = require('../utils/uploadConfig');

const logoPlaneRoute = async (fastify) => {
  fastify.post('/logo-basic-plane',  { preHandler: upload.array('Link_to_Graphics', 10) }, logoBasicPlane);
  fastify.post('/logo-standard-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, logoStandardPlane);
  fastify.post('/logo-premium-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, logoPremiumPlane);
  fastify.post('/logo-business-plane',  { preHandler: upload.array('Link_to_Graphics', 10) }, logoBusinessPlane);

  
  fastify.get('/all-logo-basic-planes-data',allLogoBasicPlanesData)
  fastify.get('/all-logo-standard-planes-data',allLogoStandardPlaneData)
  fastify.get('/all-logo-premium-planes-data',allLogoPremiumPlaneData)
  fastify.get('/all-logo-business-planes-data',allLogoBusinessPlaneData)

    
  fastify.get('/all-logo-basic-planes-data/:clientId',allLogoBasicPlanesDataByID)
  fastify.get('/all-logo-standard-planes-data/:clientId',allLogoStandardPlaneDataByID)
  fastify.get('/all-logo-premium-planes-data/:clientId',allLogoPremiumPlaneDataById)
  fastify.get('/all-logo-business-planes-data/:clientId',allLogoBusinessPlaneDataById)

  fastify.delete('/all-logo-basic-planes-data/:id/:clientId',deleteLogoBasicPlanesData)
  fastify.delete('/all-logo-standard-planes-data/:id/:clientId',deleteLogoStandardPlaneData)
  fastify.delete('/all-logo-premium-planes-data/:id/:clientId',deleteLogoPremiumPlaneData)
  fastify.delete('/all-logo-business-planes-data/:id/:clientId',deleteLogoBusinessPlaneData)

  fastify.put('/all-logo-basic-planes-data/:id/:clientId',  { preHandler: upload.array('Link_to_Graphics', 10) }, updateLogoBasicPlanesData);
  fastify.put('/all-logo-standard-planes-data/:id/:clientId',  { preHandler: upload.array('Link_to_Graphics', 10) }, updateLogoStandardPlaneData);
  fastify.put('/all-logo-premium-planes-data/:id/:clientId', { preHandler: upload.array('Link_to_Graphics', 10) }, updateLogoPremiumPlaneData);
  fastify.put('/all-logo-business-planes-data/:id/:clientId', { preHandler: upload.array('Link_to_Graphics', 10) }, updateLogoBusinessPlaneData);
  


};

module.exports = logoPlaneRoute;
