const dataSource = require("../infrastructure/psql");
const { logger } = require("../../logger");
const searchEngineOptimizationRepository = dataSource.getRepository("search_engine_optimization");

const searchEngineOptimazationRepo = async (ClientData) => {
    try {
        const data = searchEngineOptimizationRepository.create(ClientData);
        console.log("Data in repo",data)
        logger.info("src > repository > seoRepository > searchEngineOptimazationRepo", data);
        const result = await searchEngineOptimizationRepository.save(data);
        logger.info("Save searchEngineOptimazationRepo Data", result);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = searchEngineOptimazationRepo;
