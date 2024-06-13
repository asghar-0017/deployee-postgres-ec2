const { webBasicPlane, webStandardPlane, webPremiumPlane } = require('../controller/webPlanesController');
const upload = require('../utils/uploadConfig');

const webPlaneRoute = async (fastify) => {
  fastify.post('/web-basic-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, webBasicPlane);
  fastify.post('/web-standard-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, webStandardPlane);
  fastify.post('/web-premium-plane', { preHandler: upload.array('Link_to_Graphics', 10) }, webPremiumPlane);
};

module.exports = webPlaneRoute;
