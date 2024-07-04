const { digitalMarketingService, digitalMarketingdataInService, deleteDigitalMarketingByIdInService, updateDigitalInService, digitalMarketingDataInServiceByID } = require('../service/digitalMarketingService');
const { logger } = require('../../logger');
const { getClientId,RandomId } = require("../service/clientService");
const { err } = require('pino-std-serializers');

const digitalMarketing = async (request, reply) => {
  try {
    logger.info("src > controller > digitalMarketingController > digitalMarketing");
    const clientData = request.body;

    if (!clientData) {
      logger.error("ClientData is undefined");
      return reply.code(400).send({ error: "Invalid input" });
    }
    clientData.id = RandomId(); // Generate a unique ID
    clientData.clientId = await getClientId(clientData.email, clientData.name);

    const data = await digitalMarketingService(clientData);
    reply.code(200).send({ success: "success", data: data });
  } catch (error) {
    logger.error("Error occurred during Digital-Marketing form submission:", error);
    throw error
  }
};

const allDigitalMarketingData = async (request, reply) => {
  try {
    const data = await digitalMarketingdataInService();
    if (data) {
      reply.code(200).send({ success: "success", data: data });
    } else {
      reply.code(404).send({ message: "Digital Marketing Data Not Found" });
    }
  } catch (error) {
    logger.error("Error occurred while fetching all digital marketing data:", error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
};

const delDigitalMarketingById = async (request, reply) => {
  try {
    const id=request.params.id
    const clientId = request.params.clientId
    console.log("Id ",id ,"clientId",clientId)
    const result = await deleteDigitalMarketingByIdInService(id, clientId);
    if (result) {
      reply.code(200).send({ status: "success", message: result });
    } else {
      reply.code(404).send({ message: `Client Data not Found With ID ${clientId}` });
    }
  } catch (error) {
    logger.error("Error occurred while deleting digital marketing data:", error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
};
const updateDigitalMarketingById = async (request, reply) => {
  try {
    const id = request.params.id;
    const clientId = request.params.clientId;
    const clientData = request.body;

    console.log("Id", id);
    console.log("clientId", clientId);

    const data = await updateDigitalInService(id, clientId, clientData);

    if (data === "Data Not Found") {
      reply.code(404).send({ message: `Client data Not Found With ID ${id}` });
    } else {
      reply.send({ data: data });
    }
  } catch (error) {
    logger.error("Error occurred while updating digital marketing data:", error);
    throw error;
  }
};


const getDigitalMarketingById = async (request, reply) => {
  try {
    const cliendId = request.params.clientId;  
     console.log("Client id inController",cliendId)
    const digitalMarketingData = await digitalMarketingDataInServiceByID(cliendId);
    if (digitalMarketingData) {
      reply.code(200).send({ status: "success", data: digitalMarketingData });
    } else {
      reply.code(404).send({ message: `Client Data not Found With ID ${cliendId}` });
    }
  } catch (error) {
    logger.error("Error occurred while fetching digital marketing data by client ID:", error);
throw error
  }
};

module.exports = { digitalMarketing, allDigitalMarketingData, delDigitalMarketingById, updateDigitalMarketingById, getDigitalMarketingById };
