const { logoBasicPlane, logoStandardPlane, logoPremiumPlane, logoBusinessPlane,
  allLogoBasicPlanesData,allLogoStandardPlaneData,allLogoPremiumPlaneData,allLogoBusinessPlaneData,
  allLogoBasicPlanesDataByID,allLogoStandardPlaneDataByID,allLogoPremiumPlaneDataById,allLogoBusinessPlaneDataById,
  deleteLogoBasicPlanesData,deleteLogoStandardPlaneData,deleteLogoPremiumPlaneData,deleteLogoBusinessPlaneData


 } = require('../controller/logoPlaneController');
const upload = require('../utils/uploadConfig');

const logoPlaneRoute = async (fastify) => {
  fastify.post('/logo-basic-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, logoBasicPlane);
  fastify.post('/logo-standard-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, logoStandardPlane);
  fastify.post('/logo-premium-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, logoPremiumPlane);
  fastify.post('/logo-business-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, logoBusinessPlane);

  
  fastify.get('/all-logo-basic-planes-data',allLogoBasicPlanesData)
  fastify.get('/all-logo-standard-planes-data',allLogoStandardPlaneData)
  fastify.get('/all-logo-premium-planes-data',allLogoPremiumPlaneData)
  fastify.get('/all-logo-business-planes-data',allLogoBusinessPlaneData)

    
  fastify.get('/all-logo-basic-planes-data/:id',allLogoBasicPlanesDataByID)
  fastify.get('/all-logo-standard-planes-data/:id',allLogoStandardPlaneDataByID)
  fastify.get('/all-logo-premium-planes-data/:id',allLogoPremiumPlaneDataById)
  fastify.get('/all-logo-business-planes-data/:id',allLogoBusinessPlaneDataById)

  fastify.delete('/all-logo-basic-planes-data/:id/:clientId',deleteLogoBasicPlanesData)
  fastify.delete('/all-logo-standard-planes-data/:id/:cliendId',deleteLogoStandardPlaneData)
  fastify.delete('/all-logo-premium-planes-data/:id/:cliendId',deleteLogoPremiumPlaneData)
  fastify.delete('/all-logo-business-planes-data/:id/:cliendId',deleteLogoBusinessPlaneData)


};

module.exports = logoPlaneRoute;
