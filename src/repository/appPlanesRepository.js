const dataSource = require("../infrastructure/psql");
const { logger } = require("../../logger");
const appBasicPlainRepository = dataSource.getRepository("app_basic_plane");
const appStandardPlainRepository = dataSource.getRepository("app_standard_plane");
const appPremiumPlainRepository = dataSource.getRepository("app_premium_plane");

const appBasicPlaneRepo = async (appBasicPlane) => {
    try {
        const data = appBasicPlainRepository.create(appBasicPlane);
        logger.info("src > repository > appPlainRepository > appBasicPlaneRepo", data);
        const result = await appBasicPlainRepository.save(data);
        logger.info("Save appBasicPlainRepository Data", result);
        return result;
    } catch (error) {
        throw error;
    }
};

const appStandardPlaneRepo=async(appStandardPlane)=>{
    try {
        const data = appStandardPlainRepository.create(appStandardPlane);
        logger.info("src > repository > appPlainRepository > appStandardPlaneRepo", data);
        const result = await appStandardPlainRepository.save(data);
        logger.info("Save appStandardPlaneRepo Data", result);
        return result;
    } catch (error) {
        throw error;
    }

}

const apppremiumPlaneRepo=async(appPremiumPlane)=>{
    try {
        const data = appPremiumPlainRepository.create(appPremiumPlane);
        console.log("App Premium Plane Data in Repo",data)
        logger.info("src > repository > appPlainRepository > apppremiumPlaneRepo", data);
        const result = await appPremiumPlainRepository.save(data);
        logger.info("Save apppremiumPlaneRepo Data", result);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {appBasicPlaneRepo,appStandardPlaneRepo,apppremiumPlaneRepo}
