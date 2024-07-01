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



const getPlanesRepo = async (repository, repoName) => {
  try {
    const getData = repository.find();
    logger.info(`src > repository > getPlanesRepo > ${repoName}`, getData);
    return getData;
  } catch (error) {
    logger.error(`Error Getting data in ${repoName}`, error);
    throw error;
  }
};

const getBasicPlaneDataInRepo = () => getPlanesRepo(appBasicPlaneRepository, "getBasicPlaneDataInRepo");
const getStandardPlaneDataInRepo = () => getPlanesRepo(appStandardPlaneRepository, "getStandardPlaneDataInRepo");
const getPremiumPlaneDataInRepo = () => getPlanesRepo(appPremiumPlaneRepository, "getPremiumPlaneDataInRepo");


const getPlanesRepoByID = async (repository, repoName,clientId) => {
  try {
    const getData = await repository.find({where:{clientId}});
    logger.info(`src > repository > getPlanesRepoByID > ${repoName}`, getData);
    return getData;
  } catch (error) {
    logger.error(`Error Getting data in ${repoName}`, error);
    throw error;
  }
};

const getBasicPlaneDataByIDInRepo = (clientId) => getPlanesRepoByID(appBasicPlaneRepository, "getBasicPlaneDataInRepo",clientId);
const getStandardPlaneDataByIDInRepo = (clientId) => getPlanesRepoByID(appStandardPlaneRepository, "getStandardPlaneDataInRepo",clientId);
const getPremiumPlaneDataInByIDRepo = (clientId) => getPlanesRepoByID(appPremiumPlaneRepository, "getPremiumPlaneDataInRepo",clientId);


const DeleteAppPlanesRepoByID = async (repository, repoName, id, clientId) => {
  try {
    const getData = await repository.findOne({ where: { id, clientId } });
    logger.info(`src > repository > getPlanesRepoByID > ${repoName}`, getData);

    if (getData) {
      const delRec = await repository.delete({ id, clientId });
      logger.info(`Record deleted successfully in ${repoName}`, delRec);
      return { success: true, message: `Record deleted successfully`, data: delRec };
    } else {
      return { success: false, message: `Data not found with id ${id} and clientId ${clientId}` };
    }
  } catch (error) {
    logger.error(`Error deleting data in ${repoName}`, error);
    throw error;
  }
};

const deleteBasicPlaneDataInRepoByID = (id, clientId) => DeleteAppPlanesRepoByID(appBasicPlaneRepository, "deleteBasicPlaneDataInRepoByID", id, clientId);
const deleteStandardPlaneDataInRepoByID = (id, clientId) => DeleteAppPlanesRepoByID(appStandardPlaneRepository, "DeleteStandardPlaneDataInRepoByID", id, clientId);
const deletePremiumPlaneDataInRepoById = (id, clientId) => DeleteAppPlanesRepoByID(appPremiumPlaneRepository, "DeletePremiumPlaneDataInRepoByID", id, clientId);

module.exports = {
    appBasicPlaneRepo,appStandardPlaneRepo, appPremiumPlaneRepo,
    
    getBasicPlaneDataInRepo,getStandardPlaneDataInRepo,getPremiumPlaneDataInRepo,

    getBasicPlaneDataByIDInRepo,getStandardPlaneDataByIDInRepo,getPremiumPlaneDataInByIDRepo,

    deleteBasicPlaneDataInRepoByID,deleteStandardPlaneDataInRepoByID,deletePremiumPlaneDataInRepoById,

};
