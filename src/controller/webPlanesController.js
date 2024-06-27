const { webBasicPlaneService, webStandardPlaneService, webPremiumPlaneService,
  getAllBasicWebPlanesData,getAllStandardWebPlanesData,getAllpremiumWebPlanesData,
  getWebBasicPlanesDataByID,getWebStandardPlanesDataByID,getWebpremiumPlanesDataByID

 } = require('../service/webPlainsService');
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
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};


const webBasicPlane = async (request, reply) => {
  await handlePlain(request, reply, webBasicPlaneService);
};

const webStandardPlane = async (request, reply) => {
  await handlePlain(request, reply, webStandardPlaneService);
};

const webPremiumPlane = async (request, reply) => {
  await handlePlain(request, reply, webPremiumPlaneService);
};






const getWebPlanesData = async (request, reply, serviceFunction) => {
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
    console.error('Error occurred in getLogoPlanesData Function', error);
    throw error
  }
};

const allWebBasicPlanesData = async (request, reply) => {
  await getWebPlanesData(request, reply, getAllBasicWebPlanesData);
};

const allWebStandardPlaneData = async (request, reply) => {
  await getWebPlanesData(request, reply, getAllStandardWebPlanesData);
};

const allWebPremiumPlaneData = async (request, reply) => {
  await getWebPlanesData(request, reply, getAllpremiumWebPlanesData);
};



const getWebPlanesDataById = async (request, reply, serviceFunction) => {
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

const WebBasicPlanesDataById = async (request, reply) => {
  await getWebPlanesDataById(request, reply, getWebBasicPlanesDataByID);
};

const WebStandardPlaneDataById = async (request, reply) => {
  await getWebPlanesDataById(request, reply, getWebStandardPlanesDataByID);
};

const WebPremiumPlaneDataById = async (request, reply) => {
  await getWebPlanesDataById(request, reply, getWebpremiumPlanesDataByID);
};



module.exports = {
  webBasicPlane,webStandardPlane,webPremiumPlane,
  allWebBasicPlanesData,allWebStandardPlaneData,allWebPremiumPlaneData,
  WebBasicPlanesDataById,WebStandardPlaneDataById,WebPremiumPlaneDataById


};
