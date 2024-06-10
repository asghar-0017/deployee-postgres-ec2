const {basicPlains,standardPlains,premiumPlains} = require('../controller/PlainsController');


const basicPlainRoute = async(fastify) => {
    fastify.post('/basic-plain', basicPlains);
    fastify.post('/standard-plain', standardPlains);
    fastify.post('/premium-plain',premiumPlains)
};
module.exports = basicPlainRoute;
