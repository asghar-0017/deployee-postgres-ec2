const dataSource = require("../infrastructure/psql");
const { logger } = require("../../logger");
const basicPlainRepository = dataSource.getRepository("basic_plane");
const standardPlainRepository = dataSource.getRepository("standard_plane");
const premiumPlainRepository = dataSource.getRepository("premium_plane");



const basicPlainRepo = async (basicPlain) => {
    try {
        const data = basicPlainRepository.create(basicPlain);
        logger.info("src > repository > PlainRepository > basicPlainRepo", data);
        const result = await basicPlainRepository.save(data);
        logger.info("Save basicPlainRepository Data", result);
        return result;
    } catch (error) {
        throw error;
    }
};

const standardPlainRepo=async(standardPlain)=>{
    try {
        const data = standardPlainRepository.create(standardPlain);
        logger.info("src > repository > PlainRepository > standardPlainRepo", data);
        const result = await standardPlainRepository.save(data);
        logger.info("Save standardPlainRepository Data", result);
        return result;
    } catch (error) {
        throw error;
    }

}

const premiumPlainRepo=async(premiumPlain)=>{
    try {
        const data = premiumPlainRepository.create(premiumPlain);
        logger.info("src > repository > PlainRepository > premiumPlainRepo", data);
        const result = await premiumPlainRepository.save(data);
        logger.info("Save premiumPlainRepository Data", result);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {basicPlainRepo,standardPlainRepo,premiumPlainRepo}
