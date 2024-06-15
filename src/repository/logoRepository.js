const dataSource = require("../infrastructure/psql");
const { logger } = require("../../logger");

const logoBasicPlaneRepository = dataSource.getRepository("logo_basic_plane");
const logoStandardPlaneRepository = dataSource.getRepository("logo_standard_plane");
const logoPremiumPlaneRepository = dataSource.getRepository("logo_premium_plane");
const logoBusinessPlaneRepository = dataSource.getRepository("logo_business_plane");

const saveData = async (repository, data, repoName) => {
  try {
    const createdData = repository.create(data);
    logger.info(`src > repository > logoRepository > ${repoName}`, createdData);
    const result = await repository.save(createdData);
    logger.info(`Save ${repoName} Data`, result);
    return result;
  } catch (error) {
    logger.error(`Error saving data in ${repoName}`, error);
    throw error;
  }
};

const logoBasicPlaneRepo = (data) => saveData(logoBasicPlaneRepository, data, "logoBasicPlaneRepo");
const logoStandardPlaneRepo = (data) => saveData(logoStandardPlaneRepository, data, "logoStandardPlaneRepo");
const logoPremiumPlaneRepo = (data) => saveData(logoPremiumPlaneRepository, data, "logoPremiumPlaneRepo");
const logoBusinessPlaneRepo = (data) => saveData(logoBusinessPlaneRepository, data, "logoBusinessPlaneRepo");

module.exports = {
  logoBasicPlaneRepo,
  logoStandardPlaneRepo,
  logoPremiumPlaneRepo,
  logoBusinessPlaneRepo
};
