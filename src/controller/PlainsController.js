// src/controller/PlainsController.js
const {
    ValidateBasicPlains,
    ValidateStandardPlains,
    ValidatePremiumPlains
  } = require('../scheema/PlainsSchema');
  const {
    basicPlainsService,
    standardPlainsService,
    premiumPlainsService
  } = require('../service/PlainsService');
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
  
  const basicPlains = async (request, reply) => {
    await handlePlain(request, reply, ValidateBasicPlains, basicPlainsService);
  };
  
  const standardPlains = async (request, reply) => {
    await handlePlain(request, reply, ValidateStandardPlains, standardPlainsService);
  };
  
  const premiumPlains = async (request, reply) => {
    await handlePlain(request, reply, ValidatePremiumPlains, premiumPlainsService);
  };
  
  module.exports = {
    basicPlains,
    standardPlains,
    premiumPlains,
  };
  