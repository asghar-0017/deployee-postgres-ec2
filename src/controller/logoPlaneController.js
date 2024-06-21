const { logoBasicPlaneService, logoStandardPlaneService, logoPremiumPlaneService, logoBusinessPlaneService } = require('../service/logoPlaneService');
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

    if (!data) {
      console.error('Data is undefined');
      return reply.code(400).send({ error: 'Invalid input' });
    }



    // const { error } = validateFunction.validate(data);
    // if (error) {
    //   return reply.code(400).send({ error: error.details[0].message });
    // }

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

module.exports = {
  logoBasicPlane,
  logoStandardPlane,
  logoPremiumPlane,
  logoBusinessPlane
};
