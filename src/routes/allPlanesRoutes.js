const {getAllPlanesData,getAllPlanesDataByID,deleteAllPlansDataByID,updateAllPlansDataByID}= require('../controller/allPlaneCoontroller');

const allPlanesRoutes = async (fastify) => {
    fastify.get('/all-planes-data', getAllPlanesData);
    fastify.get('/all-planes-data/:clientId', getAllPlanesDataByID);
    fastify.delete('/all-planes-data/:id/:clientId', deleteAllPlansDataByID);
    fastify.put('/all-planes-data/:id/:clientId', updateAllPlansDataByID);

}
module.exports = allPlanesRoutes
