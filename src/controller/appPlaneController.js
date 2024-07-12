const { 
  appBasicPlaneService, 
  appStandardPlaneService, 
  appPremiumPlaneService,
  getAllBasicAppPlanesData, 
  getAllStandardAppPlanesData, 
  getAllpremiumAppPlanesData,
  deleteBasicAppPlanesDataByID, 
  deleteStandardAppPlanesDataByID, 
  deletepremiumAppPlanesDataByID,
  getBasicAppPlanesDataByID, 
  getStandardAppPlanesDataByID, 
  getpremiumAppPlanesDataByID,
  updateBasicAppPlanesDataByID, 
  updateStandardAppPlanesDataByID, 
  updatepremiumAppPlanesDataByID
} = require('../service/appPlaneService');

const { logger } = require('../../logger');
const { getClientId, RandomId } = require("../service/clientService");
const cloudinary = require('cloudinary').v2;
const { publishToQueue } = require('../service/RabbitMQService'); // Ensure correct import
const { 
  ValidateAppBasicPlan, 
  ValidateAppStandardPlan, 
  ValidateAppPremiumPlan 
} = require('../scheema/appPlaneSchema');

const handlePlain = async (request, reply, schema, serviceFunction, FunctionName) => {
  try {
    const data = request.body;

    const { error } = schema.validate(data);
    console.log("Validate Error ", error);
    if (error) {
      return reply.code(400).send({ error: error.details[0].message });
    }

    if (request.files && request.files.length > 0) {
      const uploadPromises = request.files.map(file =>
        cloudinary.uploader.upload(file.path)
      );
      const results = await Promise.all(uploadPromises);
      data.Link_to_Graphics = results.map(result => result.secure_url);
    } else {
      data.Link_to_Graphics = []; // No files provided
    }

    console.log('Received Data:', data);

    if (typeof data.functionalities === 'string') {
      data.functionalities = JSON.parse(data.functionalities);
    }

    if (!data) {
      console.error('Data is undefined');
      return reply.code(400).send({ error: 'Invalid input' });
    }

    data.id = RandomId();
    data.clientId = await getClientId(data.email, data.name);

    const result = await serviceFunction(data);
    // await publishToQueue(queueName, data);

    reply.code(201).send({ success: 'success', data: result });
  } catch (error) {
    console.error('Error occurred during form submission:', error);
    throw error;
  }
};

const appBasicPlane = async (request, reply) => {
  // const QueueName = 'App-basic-plan-queue'; // Define the queue name for basic plan
  await handlePlain(request, reply, ValidateAppBasicPlan, appBasicPlaneService, 'App-Basic-Plan');
};

const appStandardPlane = async (request, reply) => {
  // const QueueName = 'App-standard-plan-queue'; // Define the queue name for standard plan
  await handlePlain(request, reply, ValidateAppStandardPlan, appStandardPlaneService, 'App-Standard-Plan');
};

const appPremiumPlane = async (request, reply) => {
  // const QueueName = 'App-premium-plan-queue'; // Define the queue name for premium plan
  await handlePlain(request, reply, ValidateAppPremiumPlan, appPremiumPlaneService, 'App-Premium-Plan');
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

    
    if (request.files && request.files.length > 0) {
      const uploadPromises = request.files.map(file =>
        cloudinary.uploader.upload(file.path)
      );
      const results = await Promise.all(uploadPromises);
      data.Link_to_Graphics = results.map(result => result.secure_url);
    } else {
      data.Link_to_Graphics = []; // No files provided
    }

    if (!data) {
      return reply.code(400).send({ error: 'Invalid input' });
    }
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
