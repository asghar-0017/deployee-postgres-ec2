const {digitalMarketing,allDigitalMarketingData,delDigitalMarketingById} = require('../controller/digitalMarketingController');


const digitalMarketingRoute = async(fastify) => {
    fastify.post('/digital-marketing', digitalMarketing);
    fastify.get('/all-digital-marketing-data',allDigitalMarketingData)
    fastify.delete('/digital-marketing/:id',delDigitalMarketingById)

};
module.exports = digitalMarketingRoute;
