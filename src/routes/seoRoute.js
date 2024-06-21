const {seoBasicPlaneController,seoStandardPlaneController,seoPremiumPlaneController} = require('../controller/seoController');


const seoRoute = async(fastify) => {
    fastify.post('/seo-basic-plane', seoBasicPlaneController);
    fastify.post('/seo-standard-plane', seoStandardPlaneController);
    fastify.post('/seo-premium-plane', seoPremiumPlaneController);
};
module.exports = seoRoute;


