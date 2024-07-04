const dataSource = require("../infrastructure/psql");
const { logger } = require("../../logger");

const webBasicPlaneRepository = dataSource.getRepository("web_basic_plan");
const webStandardPlaneRepository = dataSource.getRepository("Web_standard_plan");
const webPremiumPlaneRepository = dataSource.getRepository("Web-premium_plan");

const saveData = async (repository, data, repoName) => {
  try {
    const email=data.email
    const checkEmail=await repository.find({where:{email}})
    if(checkEmail){
      
    }
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

const webBasicPlanRepo = (data) => saveData(webBasicPlaneRepository, data, "webBasicPlanRepo");
const webStandardPlanRepo = (data) => saveData(webStandardPlaneRepository, data, "webStandardPlanRepo");
const webPremiumPlanRepo = (data) => saveData(webPremiumPlaneRepository, data, "webPremiumPlanRepo");


const getWebPlanesRepo = async (repository, repoName) => {
  try {
    const getData = repository.find();
    logger.info(`src > repository > getWebPlanesRepo > ${repoName}`, getData);
    return getData;
  } catch (error) {
    logger.error(`Error Getting data in ${repoName}`, error);
    throw error;
  }
};

const getBasicWebPlaneDataInRepo = () => getWebPlanesRepo(webBasicPlaneRepository, "getWebBasicPlaneDataInRepo");
const getStandardWebPlaneDataInRepo = () => getWebPlanesRepo(webStandardPlaneRepository, "getWebStandardPlaneDataInRepo");
const getPremiumWebPlaneDataInRepo = () => getWebPlanesRepo(webPremiumPlaneRepository, "getWebPremiumPlaneDataInRepo");



const getWebPlanesRepoByID = async (repository, repoName, clientId) => {
  try {
    const getData = await repository.find({ where: { clientId } });
    logger.info(`src > repository > getWebPlanesRepoByID > ${repoName}`, getData);

    if (getData.length > 0) {
      return getData;
    } else {
      return `Data not found with clientId ${clientId}`;
    }
  } catch (error) {
    logger.error(`Error getting data in ${repoName}`, error);
    throw error;
  }
};


const getBasicWebPlaneDataByIDInRepo = (clientId) => getWebPlanesRepoByID(webBasicPlaneRepository, "getBasicPlaneDataInRepo",clientId);
const getStandardWebPlaneDataByIDInRepo = (clientId) => getWebPlanesRepoByID(webStandardPlaneRepository, "getStandardPlaneDataInRepo",clientId);
const getPremiumWebPlaneDataInByIDRepo = (clientId) => getWebPlanesRepoByID(webPremiumPlaneRepository, "getPremiumPlaneDataInRepo",clientId);


const DeleteAppPlanesRepoByID = async (repository, repoName, id, clientId) => {
  try {
    const getData = await repository.findOne({ where: { id, clientId } });
    logger.info(`src > repository > DeleteAppPlanesRepoByID > ${repoName}`, getData);

    if (getData) {
      const delRec = await repository.delete({ id, clientId });
      logger.info(`Record deleted successfully in ${repoName}`, delRec);
      return `Data Deleted Successfully With ${id}, clientId ${clientId}` 
    } else {
      return { success: false, message: `Data not found with id ${id} and clientId ${clientId}` };
    }
  } catch (error) {
    logger.error(`Error deleting data in ${repoName}`, error);
    throw error;
  }
};

const deleteBasicWebPlaneDataInRepoByID = (id, clientId) => DeleteAppPlanesRepoByID(webBasicPlaneRepository, "deleteBasicWebPlaneDataInRepoByID", id, clientId);
const deleteStandardWebPlaneDataInRepoByID = (id, clientId) => DeleteAppPlanesRepoByID(webStandardPlaneRepository, "DeleteWebStandardPlaneDataInRepoByID", id, clientId);
const deletePremiumWebPlaneDataInRepoById = (id, clientId) => DeleteAppPlanesRepoByID(webPremiumPlaneRepository, "DeleteWebPremiumPlaneDataInRepoByID", id, clientId);


const UpdateAppPlanesRepoByID = async (repository, repoName, id, clientId,data) => {
  try {
    const getData = await repository.findOne({ where: { id, clientId } });
    logger.info(`src > repository > UpdateAppPlanesRepoByID > ${repoName}`, getData);

    if (getData) {
      await repository.update({ id, clientId  },data);
      logger.info(`Record Update successfully in ${repoName}`);

      const updatedData=await repository.findOne({where:{id,clientId}})

      return { success: true, message: `Record Updated successfully`, data: updatedData };
    } else {
      return { success: false, message: `Data not found with id ${id} and clientId ${clientId}` };
    }
  } catch (error) {
    logger.error(`Error Updating data in ${repoName}`, error);
    throw error;
  }
};

const updateBasicWebPlaneDataInRepoByID = (id, clientId,data) => UpdateAppPlanesRepoByID(webBasicPlaneRepository, "updateBasicWebPlaneDataInRepoByID", id, clientId,data);
const updateStandardWebPlaneDataInRepoByID = (id, clientId,data) => UpdateAppPlanesRepoByID(webStandardPlaneRepository, "updateWebStandardPlaneDataInRepoByID", id, clientId,data);
const updatePremiumWebPlaneDataInRepoById = (id, clientId,data) => UpdateAppPlanesRepoByID(webPremiumPlaneRepository, "updateWebPremiumPlaneDataInRepoByID", id, clientId,data);



module.exports = {
    webBasicPlanRepo,webStandardPlanRepo,webPremiumPlanRepo,
    getBasicWebPlaneDataInRepo,getStandardWebPlaneDataInRepo,getPremiumWebPlaneDataInRepo,
    getBasicWebPlaneDataByIDInRepo,getStandardWebPlaneDataByIDInRepo,getPremiumWebPlaneDataInByIDRepo,
    deleteBasicWebPlaneDataInRepoByID,deleteStandardWebPlaneDataInRepoByID,deletePremiumWebPlaneDataInRepoById,
    updateBasicWebPlaneDataInRepoByID,updateStandardWebPlaneDataInRepoByID,updatePremiumWebPlaneDataInRepoById

};
