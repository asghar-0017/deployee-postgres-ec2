const { logoBasicPlaneService, logoStandardPlaneService, logoPremiumPlaneService, logoBusinessPlaneService,
  getAllBasicLogoPlanesData,getAllStandardLogoPlanesData,getAllpremiumLogoPlanesData,getAllBusinessLogoPlanesData,
  getLogoBasicPlanesDataByID,getLogoStandardPlanesDataByID,getLogopremiumPlanesDataByID,getLogoBusinessPlanesDataByID

 } = require('../service/logoPlaneService');
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

    if (!data) {
      console.error('Data is undefined');
      return reply.code(400).send({ error: 'Invalid input' });
    }



    // const { error } = validateFunction.validate(data);
    // if (error) {
    //   return reply.code(400).send({ error: error.details[0].message });
    // }       
    data.clientId = await getClientId(data.email, data.name);

    const result = await serviceFunction(data);
    reply.code(201).send({ success: 'success', data: result });

  } catch (error) {
    console.error('Error occurred during form submission:', error);
    throw error;
  }
};

const logoBasicPlane = async (request, reply) => {
  await handlePlain(request, reply,  logoBasicPlaneService);
};

const logoStandardPlane = async (request, reply) => {
  await handlePlain(request, reply, logoStandardPlaneService);
};

const logoPremiumPlane = async (request, reply) => {
  await handlePlain(request, reply, logoPremiumPlaneService);
};

const logoBusinessPlane = async (request, reply) => {
  await handlePlain(request, reply, logoBusinessPlaneService);
};




const getLogoPlanesData = async (request, reply, serviceFunction) => {
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

const allLogoBasicPlanesData = async (request, reply) => {
  await getLogoPlanesData(request, reply, getAllBasicLogoPlanesData);
};

const allLogoStandardPlaneData = async (request, reply) => {
  await getLogoPlanesData(request, reply, getAllStandardLogoPlanesData);
};

const allLogoPremiumPlaneData = async (request, reply) => {
  await getLogoPlanesData(request, reply, getAllpremiumLogoPlanesData);
};

const allLogoBusinessPlaneData = async (request, reply) => {
  await getLogoPlanesData(request, reply, getAllBusinessLogoPlanesData);
};





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

const allLogoBasicPlanesDataByID = async (request, reply) => {
  await getPlanesDataById(request, reply, getLogoBasicPlanesDataByID);
};

const allLogoStandardPlaneDataByID = async (request, reply) => {
  await getPlanesDataById(request, reply, getLogoStandardPlanesDataByID);
};

const allLogoPremiumPlaneDataById = async (request, reply) => {
  await getPlanesDataById(request, reply, getLogopremiumPlanesDataByID);
};
const allLogoBusinessPlaneDataById = async (request, reply) => {
  await getPlanesDataById(request, reply, getLogoBusinessPlanesDataByID);
};






module.exports = {
  logoBasicPlane,
  logoStandardPlane,
  logoPremiumPlane,
  logoBusinessPlane,

  allLogoBasicPlanesData,
  allLogoStandardPlaneData,
  allLogoPremiumPlaneData,
  allLogoBusinessPlaneData,

  allLogoBasicPlanesDataByID,
  allLogoStandardPlaneDataByID,
  allLogoPremiumPlaneDataById,
  allLogoBusinessPlaneDataById

};
