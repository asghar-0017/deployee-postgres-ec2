const dataSource = require("../infrastructure/psql");
const { logger } = require("../../logger");
const contactRepository = dataSource.getRepository("contactUs");

const contactUsRepo = async (ClientData) => {
    try {
        const data = contactRepository.create(ClientData);
        logger.info("src > repository > contactRepository > contactUsRepo", data);
        const result = await contactRepository.save(data);
        logger.info("Save contactRepository Data", result);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = contactUsRepo;
