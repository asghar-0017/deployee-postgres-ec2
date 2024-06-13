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

module.exports = digitalMarketingRepo;
