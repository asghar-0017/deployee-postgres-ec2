const contactUsService = require('../service/contactService');
const { logger } = require('../../logger');
const { ValidateContact } = require('../scheema/contactUsSchema');

const getDataFromUser = async (request, reply) => {
    try {
        logger.info("src > controller > contactController > getDataFromUser");
        const clientData = request.body;
        console.log("Client in Controller", clientData);

        if (!clientData) {
            logger.error("ClientData is undefined");
            return reply.code(400).send({ error: "Invalid input" });
        }

        const { error } = ValidateContact.validate(clientData);
        console.log("Validate Error ", error);
        if (error) {
            return reply.code(400).send({ error: error.details[0].message });
        }

        const data = await contactUsService(clientData);
        reply.code(200).send({ success: "success", data: data });

    } catch (error) {
        logger.error("Error occurred during contact form submission:", error);
        reply.code(500).send({ error: "Internal Server Error" });
    }
};

module.exports = getDataFromUser;
