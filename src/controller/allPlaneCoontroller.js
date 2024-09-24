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
  getAllpremiumAppPlanesData,
} = require('../service/appPlaneService');

const {
  getAllBasicLogoPlanesData,
  getAllStandardLogoPlanesData,
  getAllpremiumLogoPlanesData,
  getAllBusinessLogoPlanesData,
} = require('../service/logoPlaneService');

const {
  digitalMarketingdataInService,
} = require('../service/digitalMarketingService');



const dataSource = require('../infrastructure/psql'); 
const WebBasic = require('../entities/webBasicPlan'); 
const WebStandard = require('../entities/webStandardPlan'); 
const WebPremium = require('../entities/webPremiumPlan'); 

const AppBasic = require('../entities/appBasicPlan');
const AppStandard = require('../entities/appStandardPlan'); 
const AppPremium = require('../entities/appPremiumPlan');

const LogoBasic = require('../entities/logoBasicPlan'); 
const LogoStandard = require('../entities/logoStandardPlan');
const LogoPremium = require('../entities/logoPremiumPlan'); 
const LogoBusiness = require('../entities/logoBusinessPlan');

const SEOBasic = require('../entities/seoBasicPlan'); 
const SEOStandard = require('../entities/seoStandardPlan'); 
const SEOPremium = require('../entities/seoPremiumPlan'); 

const DigitalMarketing = require('../entities/digitalMerketing')





const getAllPlanesData = async (req, reply) => {
  try {
    const seoData = {
      basic: await getAllBasicSeoPlanesData(),
      standard: await getAllStandardSeoPlanesData(),
      premium: await getAllpremiumSeoPlanesData(),
    };

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

    const logoData = {
      basic: await getAllBasicLogoPlanesData(),
      standard: await getAllStandardLogoPlanesData(),
      premium: await getAllpremiumLogoPlanesData(),
      business: await getAllBusinessLogoPlanesData(),
    };
    const digitalMarketingData = {
      onePlane: await digitalMarketingdataInService(),
    };
    const ensureArray = (data) => Array.isArray(data) ? data : data.data ? data.data : [];

    const allDataArrays = [
      ...ensureArray(seoData.basic),
      ...ensureArray(seoData.standard),
      ...ensureArray(seoData.premium),
      ...ensureArray(webData.basic),
      ...ensureArray(webData.standard),
      ...ensureArray(webData.premium),
      ...ensureArray(appData.basic),
      ...ensureArray(appData.standard),
      ...ensureArray(appData.premium),
      ...ensureArray(logoData.basic),
      ...ensureArray(logoData.standard),
      ...ensureArray(logoData.premium),
      ...ensureArray(logoData.business),
      ...ensureArray(digitalMarketingData.onePlane)
    ];

    const counts = allDataArrays.reduce((acc, plane) => {
      acc.total++;
      if (plane.status === 'Pending') acc.pending++;
      if (plane.status === 'Complete') acc.complete++;
      if (plane.status === 'Progress') acc.progress++;
      if (plane.status === 'Cancel') acc.cancel++;
      return acc;
    }, { pending: 0, complete: 0, progress: 0, cancel: 0, total: 0 });

    const allData = {
      seo: seoData,
      web: webData,
      app: appData,
      logo: logoData,
      DigitalMarketing: digitalMarketingData,
      counts: {
        pending: counts.pending,
        complete: counts.complete,
        progress: counts.progress,
        cancel: counts.cancel,
        total: counts.total
      },
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
    
      const filteredData = Object.fromEntries(
        Object.entries(allData)
          .map(([key, value]) => {
            if (value && value.data) {
              return [
                key,
                value.data.filter(item => item.clientId === clientId)
              ];
            } else if (Array.isArray(value)) {
              return [
                key,
                value.filter(item => item.clientId === clientId)
              ];
            } else {
              return [
                key,
                value && value.clientId === clientId ? [value] : []
              ];
            }
          })
          .filter(([key, value]) => value.length > 0)
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
  
      const filteredData = Object.fromEntries(
        Object.entries(allData)
          .map(([key, value]) => {
            if (value && value.data) {
              return [
                key,
                value.data.filter(item => item.clientId === clientId)
              ];
            } else if (Array.isArray(value)) {
              return [
                key,
                value.filter(item => item.clientId === clientId)
              ];
            } else {
              return [
                key,
                value && value.clientId === clientId ? [value] : []
              ];
            }
          })
          .filter(([key, value]) => value.length > 0)
      );
  
    reply.code(200).send({ success: true, data: filteredData });
    } catch (error) {
      console.error('Error deleting all plans data by client ID:', error);
      reply.code(500).send({ success: false, message: 'Failed to delete all plans data by client ID' });
    }
  };


  
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

  if(clientData.plan=="SEO Basic plan" || clientData.plan=="SEO Standard plan" || clientData.plan=="SEO Premium plan" || clientData.plan=="Digital Marketing"){
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
        Seo_Basic_Plan: seoBasicData?.data,
        Seo_Standard_Plan: seoStandardData?.data,
        Seo_Premium_Plan: seoPremiumData?.data,
        Digital_Marketing_Plan: digitalData?.data
      };
    
      const filteredData = Object.fromEntries(
        Object.entries(allData)
          .map(([key, value]) => {
            if (value && value.data) {
              return [
                key,
                value.data.filter(item => item.clientId === clientId)
              ];
            } else if (Array.isArray(value)) {
              return [
                key,
                value.filter(item => item.clientId === clientId)
              ];
            } else {
              return [
                key,
                value && value.clientId === clientId ? [value] : []
              ];
            }
          })
          .filter(([key, value]) => value.length > 0)
      );
  
  
      reply.code(200).send({ success: true, data: filteredData });
    } catch (error) {
      console.error('Error updating all plans data by client ID:', error);
      reply.code(500).send({ success: false, message: 'Failed to update all plans data by client ID' });
    }
  }else{

  if (req.files && req.files.length > 0) {
    try {
      const uploadPromises = req.files.map(file => cloudinary.uploader.upload(file.path));
      const results = await Promise.all(uploadPromises);
      clientData.Link_to_Graphics = results.map(result => result.secure_url);
    } catch (uploadError) {
      console.error('Error uploading files:', uploadError);
      return reply.code(500).send({ success: false, message: 'File upload failed' });
    }
  } else {
    clientData.Link_to_Graphics = clientData.Link_to_Graphics || [];
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
      Seo_Basic_Plan: seoBasicData?.data,
      Seo_Standard_Plan: seoStandardData?.data,
      Seo_Premium_Plan: seoPremiumData?.data,
      Digital_Marketing_Plan: digitalData?.data
    };

    const filteredData = Object.fromEntries(
      Object.entries(allData)
        .map(([key, value]) => {
          if (value && value.data) {
            return [
              key,
              value.data.filter(item => item.clientId === clientId)
            ];
          } else if (Array.isArray(value)) {
            return [
              key,
              value.filter(item => item.clientId === clientId)
            ];
          } else {
            return [
              key,
              value && value.clientId === clientId ? [value] : []
            ];
          }
        })
        .filter(([key, value]) => value.length > 0)
    );

    reply.code(200).send({ success: true, data: filteredData });
  } catch (error) {
    console.error('Error updating all plans data by client ID:', error);
    reply.code(500).send({ success: false, message: 'Failed to update all plans data by client ID' });
  }
};
}

const deleteAllPlanesData = async (req, reply) => {
  try {
    await Promise.all([
      dataSource.getRepository(WebBasic).clear(),
      dataSource.getRepository(WebStandard).clear(),
      dataSource.getRepository(WebPremium).clear(),
      
      dataSource.getRepository(AppBasic).clear(),
      dataSource.getRepository(AppStandard).clear(),
      dataSource.getRepository(AppPremium).clear(),
      
      dataSource.getRepository(LogoBasic).clear(),
      dataSource.getRepository(LogoStandard).clear(),
      dataSource.getRepository(LogoPremium).clear(),
      dataSource.getRepository(LogoBusiness).clear(),
      
      dataSource.getRepository(SEOBasic).clear(),
      dataSource.getRepository(SEOStandard).clear(),
      dataSource.getRepository(SEOPremium).clear(),
      
      dataSource.getRepository(DigitalMarketing).clear(),
    ]);

    reply.code(200).send({ success: true, message: 'All plan data deleted successfully' });
  } catch (error) {
    console.error('Error deleting all plans data:', error);
    reply.code(500).send({ success: false, message: 'Failed to delete all plans data' });
  }
}
  
  module.exports = {
    getAllPlanesData,
    getAllPlanesDataByID,
    deleteAllPlansDataByID,
    updateAllPlansDataByID,
    deleteAllPlanesData

  };
  