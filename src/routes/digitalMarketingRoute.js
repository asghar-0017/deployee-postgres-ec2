const digitalMarketing = require('../controller/digitalMarketingController');


const digitalMarketingRoute = async(fastify) => {
    fastify.post('/digital-marketing', digitalMarketing);
};
module.exports = digitalMarketingRoute;
