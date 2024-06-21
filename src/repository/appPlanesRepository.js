const dataSource = require("../infrastructure/psql");
const { logger } = require("../../logger");

const appBasicPlaneRepository = dataSource.getRepository("app_basic_plane");
const appStandardPlaneRepository = dataSource.getRepository("app_standard_plane");
const appPremiumPlaneRepository = dataSource.getRepository("app_premium_plane");

const saveData = async (repository, data, repoName) => {
  try {
    const createdData = repository.create(data);
    logger.info(`src > repository > appRepository > ${repoName}`, createdData);
    const result = await repository.save(createdData);
    logger.info(`Save ${repoName} Data`, result);
    return result;
  } catch (error) {
    logger.error(`Error saving data in ${repoName}`, error);
    throw error;
  }
};

const appBasicPlaneRepo = (data) => saveData(appBasicPlaneRepository, data, "appBasicPlaneRepo");
const appStandardPlaneRepo = (data) => saveData(appStandardPlaneRepository, data, "appStandardPlaneRepo");
const appPremiumPlaneRepo = (data) => saveData(appPremiumPlaneRepository, data, "appPremiumPlaneRepo");

module.exports = {
    appBasicPlaneRepo,
    appStandardPlaneRepo,
    appPremiumPlaneRepo,
};
