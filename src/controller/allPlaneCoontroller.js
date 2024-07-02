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
    const clientId = req.params.clientId;
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
        Web_Basic: webBasicData,
        Web_Standard: webStandardData,
        Web_Premium: webPremiumData,
        App_Basic: appBasicData?.data,
        App_Standard: appStandardData?.data,
        App_Premium: appPremiumData?.data,
        Seo_Basic: seoBasicData?.data,
        Seo_Standard: seoStandardData?.data,
        Seo_Premium: seoPremiumData?.data,
        Digital_Marketing: digitalMarketingData,
        Logo_Basic: logoBasicData?.data,
        Logo_Standard: logoStandardData?.data,
        Logo_Premium: logoPremiumData?.data,
        Logo_Business: logoBusinessData?.data,
      };

      console.log("Web Basic data",webBasicData);
      console.log("Web Standard data",webStandardData);
      console.log("Web Premium data",webPremiumData);
      console.log("Digital Data",digitalMarketingData);

      console.log("Web Basic data",allData.Web_Basic);
      console.log("Web Standard data",allData.Web_Standard);
      console.log("Web Premium data",allData.Web_Premium);
      console.log("Digital Data",allData.Digital_Marketing);
  
  
      // Filter out empty arrays, null, or undefined values
      const filteredData = Object.fromEntries(
        Object.entries(allData).filter(([key, value]) => Array.isArray(value) ? value.length > 0 : value !== null && value !== undefined)
      );
  
  
      reply.code(200).send({ success: true, data: filteredData });
    } catch (error) {
      console.error('Error fetching all planes data by client ID:', error);
      reply.code(500).send({ success: false, message: 'Failed to fetch all planes data by client ID' });
    }
  };
  
    const {
      deleteBasicWebPlanesDataByID,
      deleteStandardWebPlanesDataByID,
      deletepremiumWebPlanesDataByID
  
    }=require('../service/webPlainsService')
  
    const {
      deleteBasicAppPlanesDataByID,
      deleteStandardAppPlanesDataByID,
      deletepremiumAppPlanesDataByID
  
    }=require('../service/appPlaneService');

  const{
    deleteBasicLogoPlanesDataByID,
    deleteStandardLogoPlanesDataByID,
    deletepremiumLogoPlanesDataByID,
    deleteBusinessLogoPlanesDataByID
  } = require('../service/logoPlaneService');

  
  const {
    deleteBasicSeoPlanesDataByID,
    deleteStandardSeoPlanesDataByID,
    deletepremiumSeoPlanesDataByID
  }=require('../service/seoService')

  const {
    deleteDigitalMarketingByIdInService
  }=require('../service/digitalMarketingService')

  const deleteAllPlansDataByID = async (req, reply) => {
    const clientId = req.params.clientId;
    const id = req.params.id;
    try {
      const [
        webBasicData,
        webStandardData,
        webPremiumData,

        appBasicData,
        appStandardData,
        appPremiumData,

        logoBasicData,
        logoStandardData,
        logoPremiumData,
        logoBusinessData,

        seoBasicData,
        seoStandardData,
        seoPremiumData,

        digitalData



      ] = await Promise.all([
        deleteBasicWebPlanesDataByID(id, clientId),
        deleteStandardWebPlanesDataByID(id, clientId),
        deletepremiumWebPlanesDataByID(id, clientId),

        deleteBasicAppPlanesDataByID(id, clientId),
        deleteStandardAppPlanesDataByID(id, clientId),
        deletepremiumAppPlanesDataByID(id, clientId),

        deleteBasicLogoPlanesDataByID(id, clientId),
        deleteStandardLogoPlanesDataByID(id, clientId),
        deletepremiumLogoPlanesDataByID(id, clientId),
        deleteBusinessLogoPlanesDataByID(id, clientId),

        deleteBasicSeoPlanesDataByID(id, clientId),
        deleteStandardSeoPlanesDataByID(id, clientId),
        deletepremiumSeoPlanesDataByID(id, clientId),

        deleteDigitalMarketingByIdInService(id, clientId),
      ]);
  
      const allData = {
        Web_Basic_Plan: webBasicData?.data,
        Web_Standard_Plan: webStandardData?.data,
        Web_Premium_Plan: webPremiumData?.data,

        App_Basic_Plan: appBasicData?.data,
        App_Standard_Plan: appStandardData?.data,
        App_Premium_Plan: appPremiumData?.data,

        Logo_Basic_Plan: logoBasicData?.data,
        Logo_Standard_Plan: logoStandardData?.data,
        Logo_Premium_Plan: logoPremiumData?.data,
        Logo_Business_Plan: logoBusinessData?.data,
        
        Seo_Standard_Plan: seoBasicData?.data,
        Seo_Premium_Plan: seoStandardData?.data,
        Seo_Business_Plan: seoPremiumData?.data,

        Digitial_Marketing_Plan: digitalData?.data,

    
      };
  
      console.log('All Data before filtering:', allData);
  
      const filteredData = Object.fromEntries(
        Object.entries(allData).filter(([key, value]) => Array.isArray(value) ? value.length > 0 : value !== null && value !== undefined)
      );
  
      console.log('All Data to be sent:', filteredData);
  
      reply.code(200).send({ success: true, data: filteredData });
    } catch (error) {
      console.error('Error deleting all plans data by client ID:', error);
      reply.code(500).send({ success: false, message: 'Failed to delete all plans data by client ID' });
    }
  };

  //update Data 

  
  const {
    updateBasicWebPlanesDataByID,
    updateStandardWebPlanesDataByID,
    updatepremiumWebPlanesDataByID

  }=require('../service/webPlainsService')

  const {
    updateBasicAppPlanesDataByID,
    updateStandardAppPlanesDataByID,
    updatepremiumAppPlanesDataByID

  }=require('../service/appPlaneService');

const{
  updateBasicLogoPlanesDataByID,
  updateStandardLogoPlanesDataByID,
  updatepremiumLogoPlanesDataByID,
  updateBusinessLogoPlanesDataByID
} = require('../service/logoPlaneService');


const {
  updateBasicSeoPlanesDataByID,
  updateStandardSeoPlanesDataByID,
  updatepremiumSeoPlanesDataByID
}=require('../service/seoService')

const {
  upDateDigitalInService
}=require('../service/digitalMarketingService')

const updateAllPlansDataByID = async (req, reply) => {
  const clientId = req.params.clientId;
  const id = req.params.id;
  const clientData=req.body
  try {
    const [
      webBasicData,
      webStandardData,
      webPremiumData,

      appBasicData,
      appStandardData,
      appPremiumData,

      logoBasicData,
      logoStandardData,
      logoPremiumData,
      logoBusinessData,

      seoBasicData,
      seoStandardData,
      seoPremiumData,

      digitalData



    ] = await Promise.all([


      updateBasicWebPlanesDataByID(id, clientId,clientData),
      updateStandardWebPlanesDataByID(id, clientId,clientData),
      updatepremiumWebPlanesDataByID(id, clientId,clientData),

      updateBasicAppPlanesDataByID(id, clientId,clientData),
      updateStandardAppPlanesDataByID(id, clientId,clientData),
      updatepremiumAppPlanesDataByID(id, clientId,clientData),
      
      updateBasicLogoPlanesDataByID(id, clientId,clientData),
      updateStandardLogoPlanesDataByID(id, clientId,clientData),
      updatepremiumLogoPlanesDataByID(id, clientId,clientData),
      updateBusinessLogoPlanesDataByID(id, clientId,clientData),
      
      updateBasicSeoPlanesDataByID(id, clientId,clientData),
      updateStandardSeoPlanesDataByID(id, clientId,clientData),
      updatepremiumSeoPlanesDataByID(id, clientId,clientData),

      upDateDigitalInService(id, clientId,clientData),
    ]);

    const allData = {
      Web_Basic_Plan: webBasicData?.data,
      Web_Standard_Plan: webStandardData?.data,
      Web_Premium_Plan: webPremiumData?.data,

      App_Basic_Plan: appBasicData?.data,
      App_Standard_Plan: appStandardData?.data,
      App_Premium_Plan: appPremiumData?.data,

      Logo_Basic_Plan: logoBasicData?.data,
      Logo_Standard_Plan: logoStandardData?.data,
      Logo_Premium_Plan: logoPremiumData?.data,
      Logo_Business_Plan: logoBusinessData?.data,
      
      Seo_Standard_Plan: seoBasicData?.data,
      Seo_Premium_Plan: seoStandardData?.data,
      Seo_Business_Plan: seoPremiumData?.data,

      Digitial_Marketing_Plan: digitalData?.data,

  
    };

    console.log('All Data before filtering:', allData);

    const filteredData = Object.fromEntries(
      Object.entries(allData).filter(([key, value]) => Array.isArray(value) ? value.length > 0 : value !== null && value !== undefined)
    );

    console.log('All Data to be sent:', filteredData);

    reply.code(200).send({ success: true, data: filteredData });
  } catch (error) {
    console.error('Error Updating all plans data by client ID:', error);
    reply.code(500).send({ success: false, message: 'Failed to Update all plans data by client ID' });
  }
};



  
  module.exports = {
    getAllPlanesData,
    getAllPlanesDataByID,
    deleteAllPlansDataByID,
    updateAllPlansDataByID

  };
  