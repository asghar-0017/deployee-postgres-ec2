const {
    getAllBasicSeoPlanesData,
    getAllStandardSeoPlanesData,
    getAllpremiumSeoPlanesData,
  } = require('../service/seoService');
  
  const {
    getAllBasicWebPlanesData,
    getAllStandardWebPlanesData,
    getAllpremiumWebPlanesData,
  } = require('../service/webPlainsService');

  const {
    getAllBasicAppPlanesData,
    getAllStandardAppPlanesData,
    getAllpremiumAppPlanesData
  }=require('../service/appPlaneService')

  const {
    getAllBasicLogoPlanesData,
    getAllStandardLogoPlanesData,
    getAllpremiumLogoPlanesData,
    getAllBusinessLogoPlanesData
}=require('../service/logoPlaneService')

const {
    digitalMarketingdataInService
}=require('../service/digitalMarketingService')
  
  const getAllPlanesData = async (req, reply) => {
    try {
      const seoData = {
        basic: await getAllBasicSeoPlanesData(),
        standard: await getAllStandardSeoPlanesData(),
        premium: await     getAllpremiumSeoPlanesData(),
      }
  
      const webData = {
        basic: await getAllBasicWebPlanesData(),
        standard: await getAllStandardWebPlanesData(),
        premium: await getAllpremiumWebPlanesData(),
      };

      const appData = {
        basic: await getAllBasicAppPlanesData(),
        standard: await getAllStandardAppPlanesData(),
        premium: await getAllpremiumAppPlanesData(),
      };
      const logo = {
        basic: await getAllBasicLogoPlanesData(),
        standard: await getAllStandardLogoPlanesData(),
        premium: await getAllpremiumLogoPlanesData(),
        business:await getAllBusinessLogoPlanesData(),
      };
      const digitalMarketingData = {
        OnePlane: await digitalMarketingdataInService(),
      };
      

  
      // Add other services as needed
  
      const allData = {
        seo: seoData,
        web: webData,
        app: appData,
        logo: logo,
        DigitalMarketing : digitalMarketingData
        // Add other categories similarly
      };
  
      reply.code(200).send({ success: true, data: allData });
    } catch (error) {
      console.error('Error fetching all planes data:', error);
      reply.code(500).send({ success: false, message: 'Failed to fetch all planes data' });
    }
  };


  //getByID
  const {
    getWebBasicPlanesDataByID,
    getWebStandardPlanesDataByID,
    getWebpremiumPlanesDataByID,
  } = require('../service/webPlainsService');
  
  const {
    getBasicAppPlanesDataByID,
    getStandardAppPlanesDataByID,
    getpremiumAppPlanesDataByID,
  } = require('../service/appPlaneService');
  
  const {
    getSeoBasicPlanesDataByID,
    getSeoStandardPlanesDataByID,
    getSeopremiumPlanesDataByID,
  } = require('../service/seoService');
  
  const {
    digitalMarketingDataInServiceByID,
  } = require('../service/digitalMarketingService');
  
  const {
    getLogoBasicPlanesDataByID,
    getLogoStandardPlanesDataByID,
    getLogopremiumPlanesDataByID,
    getLogoBusinessPlanesDataByID,
  } = require('../service/logoPlaneService');
  
  const getAllPlanesDataByID = async (req, reply) => {
    const clientId = req.params.id;
    try {
      const [
        webBasicData,
        webStandardData,
        webPremiumData,
        appBasicData,
        appStandardData,
        appPremiumData,
        seoBasicData,
        seoStandardData,
        seoPremiumData,
        digitalMarketingData,
        logoBasicData,
        logoStandardData,
        logoPremiumData,
        logoBusinessData,
      ] = await Promise.all([
        getWebBasicPlanesDataByID(clientId),
        getWebStandardPlanesDataByID(clientId),
        getWebpremiumPlanesDataByID(clientId),
        getBasicAppPlanesDataByID(clientId),
        getStandardAppPlanesDataByID(clientId),
        getpremiumAppPlanesDataByID(clientId),
        getSeoBasicPlanesDataByID(clientId),
        getSeoStandardPlanesDataByID(clientId),
        getSeopremiumPlanesDataByID(clientId),
        digitalMarketingDataInServiceByID(clientId),
        getLogoBasicPlanesDataByID(clientId),
        getLogoStandardPlanesDataByID(clientId),
        getLogopremiumPlanesDataByID(clientId),
        getLogoBusinessPlanesDataByID(clientId),
      ]);
  
      const allData = {
        webBasic: webBasicData?.data,
        webStandard: webStandardData?.data,
        webPremium: webPremiumData?.data,
        appBasic: appBasicData?.data,
        appStandard: appStandardData?.data,
        appPremium: appPremiumData?.data,
        seoBasic: seoBasicData?.data,
        seoStandard: seoStandardData?.data,
        seoPremium: seoPremiumData?.data,
        digitalMarketing: digitalMarketingData?.data,
        logoBasic: logoBasicData?.data,
        logoStandard: logoStandardData?.data,
        logoPremium: logoPremiumData?.data,
        logoBusiness: logoBusinessData?.data,
      };
  
      // Log allData object before filtering
      console.log('All Data before filtering:', allData);
  
      // Filter out empty arrays, null, or undefined values
      const filteredData = Object.fromEntries(
        Object.entries(allData).filter(([key, value]) => Array.isArray(value) ? value.length > 0 : value !== null && value !== undefined)
      );
  
      // Log filtered data to debug
      console.log('All Data to be sent:', filteredData);
  
      reply.code(200).send({ success: true, data: filteredData });
    } catch (error) {
      console.error('Error fetching all planes data by client ID:', error);
      reply.code(500).send({ success: false, message: 'Failed to fetch all planes data by client ID' });
    }
  };
  
 
  
  module.exports = {
    getAllPlanesData,
    getAllPlanesDataByID,

  };
  