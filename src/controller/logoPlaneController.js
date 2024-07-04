const { logoBasicPlaneService, logoStandardPlaneService, logoPremiumPlaneService, logoBusinessPlaneService,
  getAllBasicLogoPlanesData,getAllStandardLogoPlanesData,getAllpremiumLogoPlanesData,getAllBusinessLogoPlanesData,
  getLogoBasicPlanesDataByID,getLogoStandardPlanesDataByID,getLogopremiumPlanesDataByID,getLogoBusinessPlanesDataByID,
  deleteBasicLogoPlanesDataByID,deleteStandardLogoPlanesDataByID,deletepremiumLogoPlanesDataByID,deleteBusinessLogoPlanesDataByID,
  updateBasicLogoPlanesDataByID,updateStandardLogoPlanesDataByID,updatepremiumLogoPlanesDataByID,updateBusinessLogoPlanesDataByID

 } = require('../service/logoPlaneService');
const { logger } = require('../../logger');
const { getClientId,RandomId } = require("../service/clientService");
const cloudinary = require('cloudinary').v2;
const {ValidateLogoBasicPlan,ValidateLogoStandardPlan,ValidateLogoPremiumPlan,ValidateLogoBusinessPlan}=require('../scheema/logoPlaneSchema')


const handlePlain = async (request, reply,schema, serviceFunction) => {
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

    if (!data) {
      console.error('Data is undefined');
      return reply.code(400).send({ error: 'Invalid input' });
    }
   
    data.clientId = await getClientId(data.email, data.name);
    data.id=RandomId()

    const result = await serviceFunction(data);
    reply.code(201).send({ success: 'success', data: result });

  } catch (error) {
    console.error('Error occurred during form submission:', error);
    throw error;
  }
};

const logoBasicPlane = async (request, reply) => {
  await handlePlain(request, reply,ValidateLogoBasicPlan , logoBasicPlaneService);
};

const logoStandardPlane = async (request, reply) => {
  await handlePlain(request, reply, ValidateLogoStandardPlan,logoStandardPlaneService);
};

const logoPremiumPlane = async (request, reply) => {
  await handlePlain(request, reply,ValidateLogoPremiumPlan, logoPremiumPlaneService);
};

const logoBusinessPlane = async (request, reply) => {
  await handlePlain(request, reply,ValidateLogoBusinessPlan, logoBusinessPlaneService);
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
    const clientId=request.params.clientId
    console.log("Client Id",clientId)
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




const deletePlanesDataById = async (request, reply, serviceFunction) => {
  try {
    const id=request.params.id
    const cliendId=request.params.clientId
    console.log("ClientID",cliendId)
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

const deleteLogoBasicPlanesData = async (request, reply) => {
  await deletePlanesDataById(request, reply, deleteBasicLogoPlanesDataByID);
};

const deleteLogoStandardPlaneData = async (request, reply) => {
  await deletePlanesDataById(request, reply, deleteStandardLogoPlanesDataByID);
};

const deleteLogoPremiumPlaneData = async (request, reply) => {
  await deletePlanesDataById(request, reply, deletepremiumLogoPlanesDataByID);
};
const deleteLogoBusinessPlaneData = async (request, reply) => {
  await deletePlanesDataById(request, reply, deleteBusinessLogoPlanesDataByID);
};



const updatePlanesDataById = async (request, reply, serviceFunction) => {
  try {
    const id = request.params.id;
    const clientId = request.params.clientId; // Corrected typo here
    const data = request.body;

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

    const result = await serviceFunction(id, clientId, data);
    console.log("Result", result);

    if (result) {
      reply.code(201).send({ data: result });
    } else {
      reply.send({ message: `${serviceFunction} Data Not Found` });
    }
  } catch (error) {
    console.error('Error occurred in updatePlanesDataById Function', error);
    throw error;
  }
};

const updateLogoBasicPlanesData = async (request, reply) => {
  await updatePlanesDataById(request, reply, updateBasicLogoPlanesDataByID);
};

const updateLogoStandardPlaneData = async (request, reply) => {
  await updatePlanesDataById(request, reply, updateStandardLogoPlanesDataByID);
};

const updateLogoPremiumPlaneData = async (request, reply) => {
  await updatePlanesDataById(request, reply, updatepremiumLogoPlanesDataByID);
};

const updateLogoBusinessPlaneData = async (request, reply) => {
  await updatePlanesDataById(request, reply, updateBusinessLogoPlanesDataByID);
};






module.exports = {
  logoBasicPlane,logoStandardPlane,logoPremiumPlane,logoBusinessPlane,

  allLogoBasicPlanesData,allLogoStandardPlaneData,allLogoPremiumPlaneData,allLogoBusinessPlaneData,

  allLogoBasicPlanesDataByID,allLogoStandardPlaneDataByID,allLogoPremiumPlaneDataById,allLogoBusinessPlaneDataById,

  deleteLogoBasicPlanesData,deleteLogoStandardPlaneData,deleteLogoPremiumPlaneData,deleteLogoBusinessPlaneData,
  updateLogoBasicPlanesData,updateLogoStandardPlaneData,updateLogoPremiumPlaneData,updateLogoBusinessPlaneData

};
