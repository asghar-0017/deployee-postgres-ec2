const {seoBasicPlaneController,seoStandardPlaneController,seoPremiumPlaneController,
    allSeoBasicPlanesData,allSeoStandardPlaneData,allSeoPremiumPlaneData

} = require('../controller/seoController');


const seoRoute = async(fastify) => {
    fastify.post('/seo-basic-plane', seoBasicPlaneController);
    fastify.post('/seo-standard-plane', seoStandardPlaneController);
    fastify.post('/seo-premium-plane', seoPremiumPlaneController);


    fastify.get('/all-seo-basic-planes-data',allSeoBasicPlanesData)
    fastify.get('/all-seo-standard-planes-data',allSeoStandardPlaneData)
    fastify.get('/all-seo-premium-planes-data',allSeoPremiumPlaneData)


};
module.exports = seoRoute;


