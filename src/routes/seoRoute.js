const {seoBasicPlaneController,seoStandardPlaneController,seoPremiumPlaneController,
    allSeoBasicPlanesData,allSeoStandardPlaneData,allSeoPremiumPlaneData,

    SeoBasicPlanesDataById,SeoStandardPlaneDataById,SeoPremiumPlaneDataById,
    deleteSeoBasicPlanesData,deleteSeoStandardPlaneData,deleteSeoPremiumPlaneData


} = require('../controller/seoController');


const seoRoute = async(fastify) => {
    fastify.post('/seo-basic-plane', seoBasicPlaneController);
    fastify.post('/seo-standard-plane', seoStandardPlaneController);
    fastify.post('/seo-premium-plane', seoPremiumPlaneController);


    fastify.get('/all-seo-basic-planes-data',allSeoBasicPlanesData)
    fastify.get('/all-seo-standard-planes-data',allSeoStandardPlaneData)
    fastify.get('/all-seo-premium-planes-data',allSeoPremiumPlaneData)

    fastify.get('/all-seo-basic-planes-data/:id',SeoBasicPlanesDataById)
    fastify.get('/all-seo-standard-planes-data/:id',SeoStandardPlaneDataById)
    fastify.get('/all-seo-premium-planes-data/:id',SeoPremiumPlaneDataById)

    fastify.delete('/all-seo-basic-planes-data/:id/:clientId',deleteSeoBasicPlanesData)
    fastify.delete('/all-seo-standard-planes-data/:id/:cliendId',deleteSeoStandardPlaneData)
    fastify.delete('/all-seo-premium-planes-data/:id/:cliendId',deleteSeoPremiumPlaneData)


};
module.exports = seoRoute;


