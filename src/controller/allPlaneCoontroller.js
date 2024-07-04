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
      console.log(`Fetching data for client ID: ${clientId}`);
  
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
  
      console.log('Fetched data:', {
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
      });
  
      const allData = {
        Web_Basic: webBasicData,
        Web_Standard: webStandardData,
        Web_Premium: webPremiumData,
        App_Basic: appBasicData,
        App_Standard: appStandardData,
        App_Premium: appPremiumData,
        Seo_Basic: seoBasicData,
        Seo_Standard: seoStandardData,
        Seo_Premium: seoPremiumData,
        Digital_Marketing: digitalMarketingData,
        Logo_Basic: logoBasicData,
        Logo_Standard: logoStandardData,
        Logo_Premium: logoPremiumData,
        Logo_Business: logoBusinessData,
      };
  
      console.log('All data before filtering:', allData);
  
    
      const filteredData = Object.fromEntries(
        Object.entries(allData)
          .map(([key, value]) => {
            if (value && value.data) {
              // If it's an object with 'data' property (like SEO, Logo services)
              return [
                key,
                value.data.filter(item => item.clientId === clientId)
              ];
            } else if (Array.isArray(value)) {
              // If it's an array (like Digital Marketing)
              return [
                key,
                value.filter(item => item.clientId === clientId)
              ];
            } else {
              // If it's a single object (like Web and App services)
              return [
                key,
                value && value.clientId === clientId ? [value] : []
              ];
            }
          })
          .filter(([key, value]) => value.length > 0)
      );
  
  
    console.log('Filtered data:', filteredData);

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
  
      const filteredData = Object.fromEntries(
        Object.entries(allData)
          .map(([key, value]) => {
            if (value && value.data) {
              // If it's an object with 'data' property (like SEO, Logo services)
              return [
                key,
                value.data.filter(item => item.clientId === clientId)
              ];
            } else if (Array.isArray(value)) {
              // If it's an array (like Digital Marketing)
              return [
                key,
                value.filter(item => item.clientId === clientId)
              ];
            } else {
              // If it's a single object (like Web and App services)
              return [
                key,
                value && value.clientId === clientId ? [value] : []
              ];
            }
          })
          .filter(([key, value]) => value.length > 0)
      );
  
  
    console.log('Filtered data:', filteredData);

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
  updateDigitalInService
}=require('../service/digitalMarketingService')

const cloudinary=require('cloudinary')
const updateAllPlansDataByID = async (req, reply) => {
  const clientId = req.params.clientId;
  const id = req.params.id;
  const clientData = req.body;

  console.log("clietId",clientId);
  console.log("id",id);
  console.log("clientData",clientData);
  if (req.files && req.files.length > 0) {
    const uploadPromises = req.files.map(file =>
      cloudinary.uploader.upload(file.path)
    );
    const results = await Promise.all(uploadPromises);
    clientData.Link_to_Graphics = results.map(result => result.secure_url);
  } else {
    clientData.Link_to_Graphics = []; // No files provided
  }


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
      updateBasicWebPlanesDataByID(id, clientId, clientData),
      updateStandardWebPlanesDataByID(id, clientId, clientData),
      updatepremiumWebPlanesDataByID(id, clientId, clientData),

      updateBasicAppPlanesDataByID(id, clientId, clientData),
      updateStandardAppPlanesDataByID(id, clientId, clientData),
      updatepremiumAppPlanesDataByID(id, clientId, clientData),

      updateBasicLogoPlanesDataByID(id, clientId, clientData),
      updateStandardLogoPlanesDataByID(id, clientId, clientData),
      updatepremiumLogoPlanesDataByID(id, clientId, clientData),
      updateBusinessLogoPlanesDataByID(id, clientId, clientData),

      updateBasicSeoPlanesDataByID(id, clientId, clientData),
      updateStandardSeoPlanesDataByID(id, clientId, clientData),
      updatepremiumSeoPlanesDataByID(id, clientId, clientData),

      updateDigitalInService(id, clientId, clientData)
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

      Digital_Marketing_Plan: digitalData?.data
    };

    console.log('All Data before filtering:', allData);

    
    const filteredData = Object.fromEntries(
      Object.entries(allData)
        .map(([key, value]) => {
          if (value && value.data) {
            // If it's an object with 'data' property (like SEO, Logo services)
            return [
              key,
              value.data.filter(item => item.clientId === clientId)
            ];
          } else if (Array.isArray(value)) {
            // If it's an array (like Digital Marketing)
            return [
              key,
              value.filter(item => item.clientId === clientId)
            ];
          } else {
            // If it's a single object (like Web and App services)
            return [
              key,
              value && value.clientId === clientId ? [value] : []
            ];
          }
        })
        .filter(([key, value]) => value.length > 0)
    );


    console.log('Filtered data:', filteredData);

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
  