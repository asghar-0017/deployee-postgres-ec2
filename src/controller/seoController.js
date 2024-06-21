const { seoBasicPlaneService, seoStandardPlaneService, seoPremiumPlaneService } = require('../service/seoService');
const { logger } = require('../../logger');

const handlePlain = async (request, reply, serviceFunction) => {
    try {
        const clientData = request.body;
        console.log("Received Data in Controller", clientData);

        if (!clientData) {
            console.log("Client Data Not Found");
            return reply.code(400).send({ error: "Client Data Not Found" });
        }


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

module.exports = { seoBasicPlaneController, seoStandardPlaneController, seoPremiumPlaneController };
