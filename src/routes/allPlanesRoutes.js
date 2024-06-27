const {getAllPlanesData,getAllPlanesDataByID}= require('../controller/allPlaneCoontroller');

const allPlanesRoutes = async (fastify) => {
    fastify.get('/all-planes-data', getAllPlanesData);
    fastify.get('/all-planes-data/:id', getAllPlanesDataByID);

}
module.exports = allPlanesRoutes
