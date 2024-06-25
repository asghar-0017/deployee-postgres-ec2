const {digitalMarketing,allDigitalMarketingData,delDigitalMarketingById,updateDigitalMarketingById} = require('../controller/digitalMarketingController');


const digitalMarketingRoute = async(fastify) => {
    fastify.post('/digital-marketing', digitalMarketing);
    fastify.get('/all-digital-marketing-data',allDigitalMarketingData)
    fastify.delete('/digital-marketing/:id',delDigitalMarketingById)
    fastify.put('/digital-marketing/:id',updateDigitalMarketingById)


};
module.exports = digitalMarketingRoute;
