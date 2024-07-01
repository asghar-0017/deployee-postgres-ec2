const { digitalMarketingService, digitalMarketingdataInService, deleteDigitalMarketingByIdInService, updateDigitalInService, digitalMarketingDataInServiceByID } = require('../service/digitalMarketingService');
const { logger } = require('../../logger');
const { getClientId } = require("../service/clientService");

const digitalMarketing = async (request, reply) => {
  try {
    logger.info("src > controller > digitalMarketingController > digitalMarketing");
    const clientData = request.body;

    if (!clientData) {
      logger.error("ClientData is undefined");
      return reply.code(400).send({ error: "Invalid input" });
    }
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
    const { id, clientId } = request.params;
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
    const clientData = request.body;
    const data = await updateDigitalInService(id, clientData);
    if (data) {
      reply.send({ data: data });
    } else {
      reply.code(404).send({ message: `Client data Not Found With ID ${id}` });
    }
  } catch (error) {
    logger.error("Error occurred while updating digital marketing data:", error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
};

const getDigitalMarketingById = async (request, reply) => {
  try {
    const clientId = request.params.clientId;
    console.log("Client id inController",clientId)
    const digitalMarketingData = await digitalMarketingDataInServiceByID(clientId);
    if (digitalMarketingData) {
      reply.code(200).send({ status: "success", data: digitalMarketingData });
    } else {
      reply.code(404).send({ message: `Client Data not Found With ID ${clientId}` });
    }
  } catch (error) {
    logger.error("Error occurred while fetching digital marketing data by client ID:", error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { digitalMarketing, allDigitalMarketingData, delDigitalMarketingById, updateDigitalMarketingById, getDigitalMarketingById };
