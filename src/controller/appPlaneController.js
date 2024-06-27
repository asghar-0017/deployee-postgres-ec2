const { appBasicPlaneService, appStandardPlaneService, appPremiumPlaneService,
  getAllBasicAppPlanesData,getAllStandardAppPlanesData ,getAllpremiumAppPlanesData,
  // deleteBasicAppPlanesDataByID,deleteStandardAppPlanesDataByID,deletepremiumAppPlanesDataByID,
  getBasicAppPlanesDataByID,getStandardAppPlanesDataByID,getpremiumAppPlanesDataByID
} = require('../service/appPlaneService');
const { logger } = require('../../logger');
const { getClientId } = require("../service/clientService");


const handlePlain = async (request, reply, serviceFunction) => {
  try {
    const data = request.body;
  
    if (request.files && Array.isArray(request.files)) {
      data.Link_to_Graphics = request.files.map(file => file.path);
    } else {
      data.Link_to_Graphics = [];
    }

    console.log('Received Data:', data);

    if (typeof data.functionalities === 'string') {
      data.functionalities = JSON.parse(data.functionalities);
    }

    if (!data) {
      console.error('Data is undefined');
      return reply.code(400).send({ error: 'Invalid input' });
    }
    data.clientId = await getClientId(data.email, data.name);
    const result = await serviceFunction(data);
    reply.code(201).send({ success: 'success', data: result });

  } catch (error) {
    console.error('Error occurred during form submission:', error);
    throw error
  }
};

const appBasicPlane = async (request, reply) => {
  await handlePlain(request, reply, appBasicPlaneService);
};

const appStandardPlane = async (request, reply) => {
  await handlePlain(request, reply, appStandardPlaneService);
};

const appPremiumPlane = async (request, reply) => {
  await handlePlain(request, reply, appPremiumPlaneService);
};




const getPlanesData = async (request, reply, serviceFunction) => {
  try {

    const result = await serviceFunction();
    console.log("Result",result)
    if(result){
    reply.code(201).send({
       success: 'success', data: result });
    }else{
      reply.send({
        message:`${serviceFunction} Data Not Found`
      })
    }
  } catch (error) {
    console.error('Error occurred in getDataPlanes Function', error);
    throw error
  }
};

const allAppBasicPlanesData = async (request, reply) => {
  await getPlanesData(request, reply, getAllBasicAppPlanesData);
};

const allAppStandardPlaneData = async (request, reply) => {
  await getPlanesData(request, reply, getAllStandardAppPlanesData);
};

const allAppPremiumPlaneData = async (request, reply) => {
  await getPlanesData(request, reply, getAllpremiumAppPlanesData);
};





// const deletePlanesDataById = async (request, reply, serviceFunction) => {
//   try {
//     const id=request.params.id
//     const result = await serviceFunction(id);
//     console.log("Result",result)
//     if(result){
//     reply.code(201).send({
//        success: 'success', data: result });
//     }else{
//       reply.send({
//         message:`${serviceFunction} Data Not Found`
//       })
//     }
//   } catch (error) {
//     console.error('Error occurred in getDataPlanes Function', error);
//     throw error
//   }
// };

// const deleteAppBasicPlanesData = async (request, reply) => {
//   await deletePlanesDataById(request, reply, deleteBasicAppPlanesDataByID);
// };

// const deleteAppStandardPlaneData = async (request, reply) => {
//   await deletePlanesDataById(request, reply, deleteStandardAppPlanesDataByID);
// };

// const deleteAppPremiumPlaneData = async (request, reply) => {
//   await deletePlanesDataById(request, reply, deletepremiumAppPlanesDataByID);
// };




const getPlanesDataById = async (request, reply, serviceFunction) => {
  try {
    const clientId=request.params.id
    const result = await serviceFunction(clientId);
    console.log("Result",result)
    if(result){
    reply.code(201).send({
       success: 'success', data: result });
    }else{
      reply.send({
        message:`${serviceFunction} Data Not Found`
      })
    }
  } catch (error) {
    console.error('Error occurred in getDataPlanes Function', error);
    throw error
  }
};

const getAppBasicPlanesDataById = async (request, reply) => {
  await getPlanesDataById(request, reply, getBasicAppPlanesDataByID);
};

const getAppStandardPlaneDataById = async (request, reply) => {
  await getPlanesDataById(request, reply, getStandardAppPlanesDataByID);
};

const getAppPremiumPlaneDataById = async (request, reply) => {
  await getPlanesDataById(request, reply, getpremiumAppPlanesDataByID);
};





module.exports = {
appBasicPlane,
  appStandardPlane,
  appPremiumPlane,

  allAppBasicPlanesData,
  allAppStandardPlaneData,
  allAppPremiumPlaneData,

  getAppBasicPlanesDataById,
  getAppStandardPlaneDataById,
  getAppPremiumPlaneDataById

  // deleteAppBasicPlanesData,
  // deleteAppStandardPlaneData,
  // deleteAppPremiumPlaneData


};
