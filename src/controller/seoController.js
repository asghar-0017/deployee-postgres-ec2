const { seoBasicPlaneService, seoStandardPlaneService, seoPremiumPlaneService,
    getAllBasicSeoPlanesData,getAllStandardSeoPlanesData,getAllpremiumSeoPlanesData,
    getSeoBasicPlanesDataByID,getSeoStandardPlanesDataByID,getSeopremiumPlanesDataByID,
    deleteBasicSeoPlanesDataByID,deleteStandardSeoPlanesDataByID,deletepremiumSeoPlanesDataByID,
    updateBasicSeoPlanesDataByID,updateStandardSeoPlanesDataByID,updatepremiumSeoPlanesDataByID

 } = require('../service/seoService');
const { logger } = require('../../logger');
const { getClientId,RandomId } = require("../service/clientService");


const handlePlain = async (request, reply, serviceFunction) => {
    try {
        const clientData = request.body;
        console.log("Received Data in Controller", clientData);

        if (!clientData) {
            console.log("Client Data Not Found");
            return reply.code(400).send({ error: "Client Data Not Found" });
        }

        clientData.clientId = await getClientId(clientData.email, clientData.name);
        clientData.id=RandomId()

        const result = await serviceFunction(clientData);
        if (result) {
            reply.send({
                code: 200,
                success: "success",
                data: result
            });
        } else {
            reply.code(500).send({ error: "Internal Server Error" });
        }
    } catch (error) {
        logger.error(error);
        reply.code(500).send({ error: "Internal Server Error" });
    }
};

const seoBasicPlaneController = async (request, reply) => {
    await handlePlain(request, reply, seoBasicPlaneService);
};

const seoStandardPlaneController = async (request, reply) => {
    await handlePlain(request, reply, seoStandardPlaneService);
};

const seoPremiumPlaneController = async (request, reply) => {
    await handlePlain(request, reply, seoPremiumPlaneService);
};




const getSeoPlanesData = async (request, reply, serviceFunction) => {
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
  
  const allSeoBasicPlanesData = async (request, reply) => {
    await getSeoPlanesData(request, reply, getAllBasicSeoPlanesData);
  };
  
  const allSeoStandardPlaneData = async (request, reply) => {
    await getSeoPlanesData(request, reply, getAllStandardSeoPlanesData);
  };
  
  const allSeoPremiumPlaneData = async (request, reply) => {
    await getSeoPlanesData(request, reply, getAllpremiumSeoPlanesData);
  };
  

  
const getPlanesDataById = async (request, reply, serviceFunction) => {
  try {
    const clientId=request.params.clientId
    console.log("Cliend Id ",clientId)
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

const SeoBasicPlanesDataById = async (request, reply) => {
  await getPlanesDataById(request, reply, getSeoBasicPlanesDataByID);
};

const SeoStandardPlaneDataById = async (request, reply) => {
  await getPlanesDataById(request, reply, getSeoStandardPlanesDataByID);
};

const SeoPremiumPlaneDataById = async (request, reply) => {
  await getPlanesDataById(request, reply, getSeopremiumPlanesDataByID);
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

const deleteSeoBasicPlanesData = async (request, reply) => {
  await deletePlanesDataById(request, reply, deleteBasicSeoPlanesDataByID);
};

const deleteSeoStandardPlaneData = async (request, reply) => {
  await deletePlanesDataById(request, reply, deleteStandardSeoPlanesDataByID);
};

const deleteSeoPremiumPlaneData = async (request, reply) => {
  await deletePlanesDataById(request, reply, deletepremiumSeoPlanesDataByID);
};


const updatePlanesDataById = async (request, reply, serviceFunction) => {
  try {
    const id=request.params.id
    const cliendId=request.params.clientId
    const data=request.body
    console.log("id",id)
    console.log("cliendId",cliendId)
    console.log("data",data)

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

const updateSeoBasicPlanesData = async (request, reply) => {
  await updatePlanesDataById(request, reply, updateBasicSeoPlanesDataByID);
};

const updateSeoStandardPlaneData = async (request, reply) => {
  await updatePlanesDataById(request, reply, updateStandardSeoPlanesDataByID);
};

const updateeoPremiumPlaneData = async (request, reply) => {
  await updatePlanesDataById(request, reply, updatepremiumSeoPlanesDataByID);
};


module.exports = {
   seoBasicPlaneController, seoStandardPlaneController, seoPremiumPlaneController,
    allSeoBasicPlanesData,allSeoStandardPlaneData,allSeoPremiumPlaneData,
    SeoBasicPlanesDataById,SeoStandardPlaneDataById,SeoPremiumPlaneDataById,
    deleteSeoBasicPlanesData,deleteSeoStandardPlaneData,deleteSeoPremiumPlaneData,
    updateSeoBasicPlanesData,updateSeoStandardPlaneData,updateeoPremiumPlaneData


 };
