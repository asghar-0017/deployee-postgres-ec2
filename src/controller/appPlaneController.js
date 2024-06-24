const { appBasicPlaneService, appStandardPlaneService, appPremiumPlaneService } = require('../service/appPlaneService');
const { logger } = require('../../logger');

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

    const result = await serviceFunction(data);
    reply.code(201).send({ success: 'success', data: result });

  } catch (error) {
    console.error('Error occurred during form submission:', error);
    throw error
  }
};

const appBasicPlane = async (request, reply) => {
  await handlePlain(request, reply, appBasicPlaneService);
};

const appStandardPlane = async (request, reply) => {
  await handlePlain(request, reply, appStandardPlaneService);
};

const appPremiumPlane = async (request, reply) => {
  await handlePlain(request, reply, appPremiumPlaneService);
};

module.exports = {
appBasicPlane,
  appStandardPlane,
  appPremiumPlane,
};
