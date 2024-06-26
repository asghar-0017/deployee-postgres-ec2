const allRoutesData= require('../controller/allPlaneCoontroller');

const allPlanesRoutes = async (fastify) => {
    fastify.get('/all-planes-data', allRoutesData.getAllPlanesData);

}
module.exports = allPlanesRoutes
