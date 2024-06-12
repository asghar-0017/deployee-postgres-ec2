const {ValidateBasicPlains,ValidateStandardPlains,ValidatePremiumPlains } = require('../scheema/PlainsSchema');
  const {webBasicPlaneService,webStandardPlaneService,webPremiumPlaneService} = require('../service/PlainsService');
  const { logger } = require('../../logger');
const { err } = require('pino-std-serializers');
  
  const handlePlain = async (request, reply, validateFunction, serviceFunction) => {
    try {
      const data = request.body;
      if (request.files) {
        data.Link_to_Graphics = request.files.map(file => file.path);
      }
  
      logger.info('Received Data:', data);

      if (typeof data.functionalities === 'string') {
        data.functionalities = JSON.parse(data.functionalities);
      }
  
      if (!data) {
        logger.error('Data is undefined');
        return reply.code(400).send({ error: 'Invalid input' });
      }
  
      const { error } = validateFunction.validate(data);
      if (error) {
        return reply.code(400).send({ error: error.details[0].message });
      }
  
      const result = await serviceFunction(data);
      reply.code(200).send({ success: 'success', data: result });
  
    } catch (error) {
      logger.error('Error occurred during form submission:', error);
      throw error
    }
  };
  
  const webBasicPlane = async (request, reply) => {
    await handlePlain(request, reply, ValidateBasicPlains, webBasicPlaneService);
  };
  
  const webStandardPlane = async (request, reply) => {
    await handlePlain(request, reply, ValidateStandardPlains, webStandardPlaneService);
  };
  
  const webPremiumPlane = async (request, reply) => {
    await handlePlain(request, reply, ValidatePremiumPlains, webPremiumPlaneService);
  };
  
  module.exports = {
    webBasicPlane,
    webStandardPlane,
    webPremiumPlane,
  };
  