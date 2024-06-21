const dataSource = require("../infrastructure/psql");
const { logger } = require("../../logger");

const webBasicPlaneRepository = dataSource.getRepository("web_basic_plane");
const webStandardPlaneRepository = dataSource.getRepository("Web_standard_plane");
const webPremiumPlaneRepository = dataSource.getRepository("Web-premium_plane");

const saveData = async (repository, data, repoName) => {
  try {
    const createdData = repository.create(data);
    logger.info(`src > repository > webPlaneRepository > ${repoName}`, createdData);
    const result = await repository.save(createdData);
    logger.info(`Save ${repoName} Data`, result);
    return result;
  } catch (error) {
    logger.error(`Error saving data in ${repoName}`, error);
    throw error;
  }
};

const webBasicPlaneRepo = (data) => saveData(webBasicPlaneRepository, data, "webBasicPlaneRepo");
const webStandardPlaneRepo = (data) => saveData(webStandardPlaneRepository, data, "webStandardPlaneRepo");
const webPremiumPlaneRepo = (data) => saveData(webPremiumPlaneRepository, data, "webPremiumPlaneRepo");

module.exports = {
    webBasicPlaneRepo,
    webStandardPlaneRepo,
    webPremiumPlaneRepo,
};
