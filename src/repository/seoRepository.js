const dataSource = require("../infrastructure/psql");
const { logger } = require("../../logger");

const seoBasicPlaneRepository = dataSource.getRepository("seo-basic-plane");
const seoStandardPlaneRepository = dataSource.getRepository("seo-standard-plane");
const seoPremiumPlaneRepository = dataSource.getRepository("seo-premium-plane");

const saveData = async (repository, data, repoName) => {
  try {
    const createdData = repository.create(data);
    logger.info(`src > repository > seoRepository > ${repoName}`, createdData);
    const result = await repository.save(createdData);
    logger.info(`Save ${repoName} Data`, result);
    return result;
  } catch (error) {
    logger.error(`Error saving data in ${repoName}`, error);
    throw error;
  }
};

const seoBasicPlaneRepo = (data) => saveData(seoBasicPlaneRepository, data, "SEOBasicPlaneRepo");
const seoStandardPlaneRepo = (data) => saveData(seoStandardPlaneRepository, data, "SEOStandardPlaneRepo");
const seoPremiumPlaneRepo = (data) => saveData(seoPremiumPlaneRepository, data, "SEOPremiumPlaneRepo");

module.exports = {
    seoBasicPlaneRepo,
    seoStandardPlaneRepo,
    seoPremiumPlaneRepo,
};
