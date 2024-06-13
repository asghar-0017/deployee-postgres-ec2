const seoController = require('../controller/seoController');


const seoRoute = async(fastify) => {
    fastify.post('/seo', seoController);
};
module.exports = seoRoute;
