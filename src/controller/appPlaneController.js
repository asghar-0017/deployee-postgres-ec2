const { appBasicPlaneService, appStandardPlaneService, appPremiumPlaneService,
  getAllBasicAppPlanesData,getAllStandardAppPlanesData ,getAllpremiumAppPlanesData,
  deleteBasicAppPlanesDataByID,deleteStandardAppPlanesDataByID,deletepremiumAppPlanesDataByID,
  getBasicAppPlanesDataByID,getStandardAppPlanesDataByID,getpremiumAppPlanesDataByID,
  updateBasicAppPlanesDataByID,updateStandardAppPlanesDataByID,updatepremiumAppPlanesDataByID
} = require('../service/appPlaneService');
const { logger } = require('../../logger');
const { getClientId,RandomId } = require("../service/clientService");
const cloudinary = require('cloudinary').v2;


const handlePlain = async (request, reply, serviceFunction) => {
  try {
    const data = request.body;
     
    if (request.file) {
      const result = await cloudinary.uploader.upload(request.file.path);
      data.Link_to_Graphics = result.secure_url;
    } else if (request.files) {
      const uploadPromises = request.files.map(file =>
        cloudinary.uploader.upload(file.path)
      );
      const results = await Promise.all(uploadPromises);
      data.Link_to_Graphics = results.map(result => result.secure_url);
    }


    console.log('Received Data:', data);

    if (typeof data.functionalities === 'string') {
      data.functionalities = JSON.parse(data.functionalities);
    }

    if (!data) {
      console.error('Data is undefined');
      return reply.code(400).send({ error: 'Invalid input' });

    }
    data.id=RandomId()
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





const deletePlanesDataById = async (request, reply, serviceFunction) => {
  try {
    const id=request.params.id
    const cliendId=request.params.clientId
    const result = await serviceFunction(id,cliendId);
    console.log("Result",result)
    if(result){
    reply.code(201).send({
      data: result
     });
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

const deleteAppBasicPlanesData = async (request, reply) => {
  await deletePlanesDataById(request, reply, deleteBasicAppPlanesDataByID);
};

const deleteAppStandardPlaneData = async (request, reply) => {
  await deletePlanesDataById(request, reply, deleteStandardAppPlanesDataByID);
};

const deleteAppPremiumPlaneData = async (request, reply) => {
  await deletePlanesDataById(request, reply, deletepremiumAppPlanesDataByID);
};




const getPlanesDataById = async (request, reply, serviceFunction) => {
  try {
    const clientId=request.params.clientId
    const result = await serviceFunction(clientId);
    console.log("Result",result)
    if(result){
    reply.code(201).send({
       success: 'success', data: result });
    }else{
      reply.send({
        message:`client data Not Found With Id ${clientId}`
      })
    }
  } catch (error) {
    console.error('Error occurred in getDataPlanes Function', error);
    throw error
  }
};

const   getAppBasicPlanesDataById = async (request, reply) => {
  await getPlanesDataById(request, reply, getBasicAppPlanesDataByID);
};

const getAppStandardPlaneDataById = async (request, reply) => {
  await getPlanesDataById(request, reply, getStandardAppPlanesDataByID);
};

const getAppPremiumPlaneDataById = async (request, reply) => {
  await getPlanesDataById(request, reply, getpremiumAppPlanesDataByID);
};



const updatePlanesDataById = async (request, reply, serviceFunction) => {
  try {
    const id=request.params.id
    const cliendId=request.params.clientId
    const data=request.body
    const result = await serviceFunction(id,cliendId,data);
    console.log("Result",result)
    if(result){
    reply.code(201).send({
      data: result
     });
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

const updateAppBasicPlanesData = async (request, reply) => {
  await updatePlanesDataById(request, reply, updateBasicAppPlanesDataByID);
};

const updateAppStandardPlaneData = async (request, reply) => {
  await updatePlanesDataById(request, reply, updateStandardAppPlanesDataByID);
};

const updateAppPremiumPlaneData = async (request, reply) => {
  await updatePlanesDataById(request, reply, updatepremiumAppPlanesDataByID);
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
  getAppPremiumPlaneDataById,

  deleteAppBasicPlanesData,
  deleteAppStandardPlaneData,
  deleteAppPremiumPlaneData,

  updateAppBasicPlanesData,
  updateAppStandardPlaneData,
  updateAppPremiumPlaneData


};
