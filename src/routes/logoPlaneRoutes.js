const { logoBasicPlane, logoStandardPlane, logoPremiumPlane, logoBusinessPlane,
  allLogoBasicPlanesData,allLogoStandardPlaneData,allLogoPremiumPlaneData,allLogoBusinessPlaneData,
  allLogoBasicPlanesDataByID,allLogoStandardPlaneDataByID,allLogoPremiumPlaneDataById,allLogoBusinessPlaneDataById,
  deleteLogoBasicPlanesData,deleteLogoStandardPlaneData,deleteLogoPremiumPlaneData,deleteLogoBusinessPlaneData,
  updateLogoBasicPlanesData,updateLogoStandardPlaneData,updateLogoPremiumPlaneData,updateLogoBusinessPlaneData


 } = require('../controller/logoPlaneController');
const upload = require('../utils/uploadConfig');

const logoPlaneRoute = async (fastify) => {
  fastify.post('/logo-basic-plane', { preHandler: upload.single('Link_to_Graphics') }, logoBasicPlane);
  fastify.post('/logo-standard-plane',{ preHandler: upload.single('Link_to_Graphics') }, logoStandardPlane);
  fastify.post('/logo-premium-plane', { preHandler: upload.single('Link_to_Graphics') }, logoPremiumPlane);
  fastify.post('/logo-business-plane', { preHandler: upload.single('Link_to_Graphics') }, logoBusinessPlane);

  
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

  fastify.put('/all-logo-basic-planes-data/:id/:clientId', { preHandler: upload.single('Link_to_Graphics') }, updateLogoBasicPlanesData);
  fastify.put('/all-logo-standard-planes-data/:id/:clientId', { preHandler: upload.single('Link_to_Graphics') }, updateLogoStandardPlaneData);
  fastify.put('/all-logo-premium-planes-data/:id/:clientId', { preHandler: upload.single('Link_to_Graphics') }, updateLogoPremiumPlaneData);
  fastify.put('/all-logo-business-planes-data/:id/:clientId', { preHandler: upload.single('Link_to_Graphics') }, updateLogoBusinessPlaneData);
  


};

module.exports = logoPlaneRoute;
