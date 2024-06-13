const digitalMarketingService = require('../service/digitalMarketingService');
const { logger } = require('../../logger');
const { ValidateDigitalMarketing } = require('../scheema/digitalMarketingSchema');

const digitalMarketing = async (request, reply) => {
    try {
        logger.info("src > controller > digitalMarketingController > digitalMarketing");
        const clientData = request.body;
        console.log("Client in Controller", clientData);

        if (!clientData) {
            logger.error("ClientData is undefined");
            return reply.code(400).send({ error: "Invalid input" });
        }

        const { error } = ValidateDigitalMarketing.validate(clientData);
        console.log("Validate Error ", error);
        if (error) {
            return reply.code(400).send({ error: error.details[0].message });
        }

        const data = await digitalMarketingService(clientData);
        reply.code(200).send({ success: "success", data: data });

    } catch (error) {
        logger.error("Error occurred during Digital-Marketing form submission:", error);
        throw error
    }
};

module.exports = digitalMarketing;
