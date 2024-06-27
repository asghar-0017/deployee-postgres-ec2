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


// allPlaneController.js

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

// const {
//   getSeoBasicPlanesDataByID,
//   getSeoStandardPlanesDataByID,
//   getSeopremiumPlanesDataByID,
// } = require('../service/seoService');

// const {
//   getDigitalMarketingById

// } = require('../service/digitalMarketingService');

// const {
//   getLogoBasicPlanesDataByID,
//   getLogoStandardPlanesDataByID,
//   getLogopremiumPlanesDataByID,
//   // getLogoBusinessPlanesDataByID
// }=require('../service/logoPlaneService')

const getAllPlanesDataByID = async (req, reply) => {
  const clientId = req.params.id;
  try {
    const webBasicData = await getWebBasicPlanesDataByID(clientId);
    const webStandardData = await getWebStandardPlanesDataByID(clientId);
    const webPremiumData = await getWebpremiumPlanesDataByID(clientId);

    const appBasicData = await getBasicAppPlanesDataByID(clientId);
    const appStandardData = await getStandardAppPlanesDataByID(clientId);
    const appPremiumData = await getpremiumAppPlanesDataByID(clientId);

    // const seoBasicData = await getSeoBasicPlanesDataByID(clientId);
    // const seoStandardData = await getSeoStandardPlanesDataByID(clientId);
    // const seoPremiumData = await getSeopremiumPlanesDataByID(clientId);

    // const digitalMarketingBasicData = await getDigitalMarketingById(clientId);

    // const logoBasicData= await getLogoBasicPlanesDataByID(clientId)
    // const logoStandardData= await getLogoStandardPlanesDataByID(clientId)
    // const logoPremiumData= await getLogopremiumPlanesDataByID(clientId)
    // // const logoBusinessData= await getLogoBusinessPlanesDataByID(clientId)


    const allData = [
      webBasicData.data,
      webStandardData.data,
      webPremiumData.data,
      appBasicData.data,
      appStandardData.data,
      appPremiumData.data,
      // seoBasicData.data,
      // seoStandardData.data,
      // seoPremiumData.data,
      // digitalMarketingBasicData.data,
      // logoBasicData.data,
      // logoStandardData.data,
      // logoPremiumData.data,
      // logoBusinessData.data



 
    ].filter(data => data !== null); // Filter out null values

    reply.code(200).send({ success: true, data: allData });
  } catch (error) {
    console.error('Error fetching all planes data by client ID:', error);
    reply.code(500).send({ success: false, message: 'Failed to fetch all planes data by client ID' });
  }
};



  
  module.exports = {
    getAllPlanesData,
    getAllPlanesDataByID,

  };
  