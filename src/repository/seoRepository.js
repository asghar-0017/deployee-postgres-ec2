const dataSource = require("../infrastructure/psql");
const { logger } = require("../../logger");

const seoBasicPlaneRepository = dataSource.getRepository("seo-basic-plan");
const seoStandardPlaneRepository = dataSource.getRepository("seo-standard-plan");
const seoPremiumPlaneRepository = dataSource.getRepository("seo-premium-plan");

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


const getSeoPlanesRepo = async (repository, repoName) => {
  try {
    const getData = repository.find();
    logger.info(`src > repository > getWebPlanesRepo > ${repoName}`, getData);
    return getData;
  } catch (error) {
    logger.error(`Error Getting data in ${repoName}`, error);
    throw error;
  }
};

const getBasicSeoPlaneDataInRepo = () => getSeoPlanesRepo(seoBasicPlaneRepository, "getSeoBasicPlaneDataInRepo");
const getStandardSeoPlaneDataInRepo = () => getSeoPlanesRepo(seoStandardPlaneRepository, "getSeoStandardPlaneDataInRepo");
const getPremiumSeoPlaneDataInRepo = () => getSeoPlanesRepo(seoPremiumPlaneRepository, "getSeoPremiumPlaneDataInRepo");


const getSeoPlanesRepoByID = async (repository, repoName,clientId) => {
  try {
    const getData = await repository.find({where:{clientId}});
    logger.info(`src > repository > getPlanesRepoByID > ${repoName}`, getData);
    return getData;
  } catch (error) {
    logger.error(`Error Getting data in ${repoName}`, error);
    throw error;
  }
};

const getBasicSeoPlaneDataByIDInRepo = (clientId) => getSeoPlanesRepoByID(seoBasicPlaneRepository, "getBasicPlaneDataInRepo",clientId);
const getStandardSeoPlaneDataByIDInRepo = (clientId) => getSeoPlanesRepoByID(seoStandardPlaneRepository, "getStandardPlaneDataInRepo",clientId);
const getPremiumSeoPlaneDataInByIDRepo = (clientId) => getSeoPlanesRepoByID(seoPremiumPlaneRepository, "getPremiumPlaneDataInRepo",clientId);




const DeleteAppPlanesRepoByID = async (repository, repoName, id, clientId) => {
  try {
    const getData = await repository.findOne({ where: { id, clientId } });
    logger.info(`src > repository > DeleteAppPlanesRepoByID > ${repoName}`, getData);

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

const deleteBasicSeoPlaneDataInRepoByID = (id, clientId) => DeleteAppPlanesRepoByID(seoBasicPlaneRepository, "deleteBasicSeoPlaneDataInRepoByID", id, clientId);
const deleteStandardSeoPlaneDataInRepoByID = (id, clientId) => DeleteAppPlanesRepoByID(seoStandardPlaneRepository, "DeleteSeoStandardPlaneDataInRepoByID", id, clientId);
const deletePremiumSeoPlaneDataInRepoById = (id, clientId) => DeleteAppPlanesRepoByID(seoPremiumPlaneRepository, "DeleteSeoPremiumPlaneDataInRepoByID", id, clientId);



const updateAppPlanesRepoByID = async (repository, repoName, id, clientId,data) => {
  try {
    const getData = await repository.findOne({ where: { id, clientId } });
    logger.info(`src > repository > updateAppPlanesRepoByID > ${repoName}`, getData);

    if (getData) {
      await repository.update({ id, clientId  },data);
      logger.info(`Record Updated successfully in ${repoName}`);
      const updatedData=await repository.findOne({where:{id,clientId}})
      return { success: true, message: `Record Updating successfully`, data: updatedData };
    } else {
      return { success: false, message: `Data not found with id ${id} and clientId ${clientId}` };
    }
  } catch (error) {
    logger.error(`Error Updating data in ${repoName}`, error);
    throw error;
  }
};

const updateBasicSeoPlaneDataInRepoByID = (id, clientId,data) => updateAppPlanesRepoByID(seoBasicPlaneRepository, "updateBasicSeoPlaneDataInRepoByID", id, clientId,data);
const updateStandardSeoPlaneDataInRepoByID = (id, clientId,data) => updateAppPlanesRepoByID(seoStandardPlaneRepository, "updateSeoStandardPlaneDataInRepoByID", id, clientId,data);
const updatePremiumSeoPlaneDataInRepoById = (id, clientId,data) => updateAppPlanesRepoByID(seoPremiumPlaneRepository, "updateSeoPremiumPlaneDataInRepoByID", id, clientId,data);




module.exports = {
    seoBasicPlaneRepo,seoStandardPlaneRepo,seoPremiumPlaneRepo,
    getBasicSeoPlaneDataInRepo,getStandardSeoPlaneDataInRepo,getPremiumSeoPlaneDataInRepo,
    getBasicSeoPlaneDataByIDInRepo,getStandardSeoPlaneDataByIDInRepo,getPremiumSeoPlaneDataInByIDRepo,
    deleteBasicSeoPlaneDataInRepoByID,deleteStandardSeoPlaneDataInRepoByID,deletePremiumSeoPlaneDataInRepoById,
    updateBasicSeoPlaneDataInRepoByID,updateStandardSeoPlaneDataInRepoByID,updatePremiumSeoPlaneDataInRepoById



};
