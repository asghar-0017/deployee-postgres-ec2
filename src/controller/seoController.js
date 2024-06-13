const SEOService = require('../service/seoService');
const { logger } = require('../../logger');
const { ValidateSEO } = require('../scheema/seoSchema'); // Make sure this path is correct

const seoController = async (request, reply) => {
    try {
        logger.info("src > controller > seoController > seoController");
        const clientData = request.body;
        console.log("Client in Controller", clientData);

        if (!clientData) {
            logger.error("ClientData is undefined");
            return reply.code(400).send({ error: "Invalid input" });
        }

        const { error } = ValidateSEO.validate(clientData);
        console.log("Validate Error ", error);
        if (error) {
            return reply.code(400).send({ error: error.details[0].message });
        }

        const data = await SEOService(clientData);
        reply.code(200).send({ success: "success", data: data });

    } catch (error) {
        logger.error("Error occurred during SEO Controller form submission:", error);
        throw error;
    }
};

module.exports = seoController;
