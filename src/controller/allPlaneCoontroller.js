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
  
  module.exports = {
    getAllPlanesData,
  };
  