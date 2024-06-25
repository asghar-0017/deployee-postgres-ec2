const { logoBasicPlane, logoStandardPlane, logoPremiumPlane, logoBusinessPlane,
  allLogoBasicPlanesData,allLogoStandardPlaneData,allLogoPremiumPlaneData,allLogoBusinessPlaneData

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

};

module.exports = logoPlaneRoute;
