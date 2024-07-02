const dataSource = require("../infrastructure/psql");
const { logger } = require("../../logger");
const digitalMarketingRepository = dataSource.getRepository("digital_marketing");

const digitalMarketingRepo = async (ClientData) => {
  try {
    const data = digitalMarketingRepository.create(ClientData);
    logger.info("src > repository > digitalMarketingRepository > digitalMarketingRepo", data);
    const result = await digitalMarketingRepository.save(data);
    logger.info("Save contactRepository Data", result);
    return result;
  } catch (error) {
    throw error;
  }
};

const allDigitalMarketingDataInRepo = async () => {
  try {
    const data = await digitalMarketingRepository.find();
    return data
  } catch (error) {
    throw error;
  }
};

const findDigitalMarketingByIdRepo = async (clientId) => {
  try {
    const data = await digitalMarketingRepository.find({ where: { clientId } });
    if (data) {
      return data
    } else {
      return `Data not Found With Client Id ${clientId}`;
    }
  } catch (error) {
    throw error;
  }
};

const updateDigitalDataInRepo = async (id, clientId, clientData) => {
  try {
    const data = await digitalMarketingRepository.findOne({ where: { id, clientId } });

    if (!data) {
      return "Data Not Found"; // Consider using null or undefined instead
    } else {
      await digitalMarketingRepository.update({ id, clientId }, clientData);
      const updatedData = await digitalMarketingRepository.findOne({ where: { id, clientId } });
      return updatedData;
    }
  } catch (error) {
    throw error;
  }
};

const getDigitalMarketingByIdRepo = async (id,clientId) => {
  try {
    const data = await digitalMarketingRepository.findOne({ where: { id,clientId } });
    if(data){
        await digitalMarketingRepository.delete({ id,clientId })
    return data 
    }else{
        return `client not found With Client id ${clientId}`
    }
  } catch (error) {
    console.error(`Error occurred in getDigitalMarketingByIdRepo: ${error.message}`);
    throw error;
  }
};

module.exports = { digitalMarketingRepo, allDigitalMarketingDataInRepo, findDigitalMarketingByIdRepo, updateDigitalDataInRepo, getDigitalMarketingByIdRepo };
