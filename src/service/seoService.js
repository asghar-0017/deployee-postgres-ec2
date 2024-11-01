const nodemailer = require('nodemailer');
const {
    seoBasicPlaneRepo,seoStandardPlaneRepo,seoPremiumPlaneRepo,

    getBasicSeoPlaneDataInRepo,getStandardSeoPlaneDataInRepo,getPremiumSeoPlaneDataInRepo,

    getBasicSeoPlaneDataByIDInRepo,getStandardSeoPlaneDataByIDInRepo,getPremiumSeoPlaneDataInByIDRepo,

    deleteBasicSeoPlaneDataInRepoByID,deleteStandardSeoPlaneDataInRepoByID,deletePremiumSeoPlaneDataInRepoById,
    updateBasicSeoPlaneDataInRepoByID,updateStandardSeoPlaneDataInRepoByID,updatePremiumSeoPlaneDataInRepoById
} = require('../repository/seoRepository');
const { logger } = require('../../logger');
const dotenv = require("dotenv");
dotenv.config();

const createTransporter = () => nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    },
});

const sendEmail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        logger.error('Error sending email', error);
        throw error;
    }
};

const sendEmails = async (plan, planData) => {
    const transporter = createTransporter();

    const adminMailOptions = {
      from: `Softmark Solutions <${process.env.EMAIL}>`, 
      to: process.env.EMAIL,
        subject: `New ${plan} Form Submission from ${planData.name} clientID ${planData.clientId}`,
        text: `
            Name: ${planData.name}
            Email: ${planData.email}
            Company: ${planData.company}
            Website of the client: ${planData.Website_of_the_client}
            Platform of the website: ${planData.Platform_of_the_website}
            Competitor website reference: ${planData.competitor_website_reference}
            Current SEO Efforts: ${planData.current_SEO_Efforts}
            Access and permissions: ${planData.access_and_permissions}
            Description: ${planData.description}
        `,
    };

    const clientMailOptions = {
      from: `Softmark Solutions <${process.env.EMAIL}>`, 
      to: planData.email,
        subject: `Thanks ${planData.name}`,
        html: `Thank you for your submission. <b> Your Order Id Number: ${planData.clientId} </b>. Our team will contact you soon.`,
    };

    await sendEmail(transporter, adminMailOptions);
    await sendEmail(transporter, clientMailOptions);
};

const processService = async (planeName, planData, repoFunction) => {
    try {
        logger.info(`seo > service > seoService > ${planeName}Service`);
        const createdAt = new Date();
    let deliveryDate;

    if (planeName === 'SEO Basic Plan') {
      deliveryDate = new Date(createdAt);
      deliveryDate.setDate(createdAt.getDate() + 4);
    } else if (planeName === 'SEO Standard Plan') {
      deliveryDate = new Date(createdAt);
      deliveryDate.setDate(createdAt.getDate() + 8);
    } else if (planeName === 'SEO Premium Plan') {
      deliveryDate = new Date(createdAt);
      deliveryDate.setDate(createdAt.getDate() + 12);
    }

    planData.delivery_date = deliveryDate;
    planData.created_at = createdAt;
        const data = await repoFunction(planData);
        await sendEmails(planeName, planData);
        return {
            success: true,
            message: "Message sent successfully",
            data: data
        };
    } catch (error) {
        logger.error(`Error processing ${planeName} service`, error);
        throw error;
    }
};

const seoBasicPlaneService = async (planData) => {
    return await processService('SEO Basic Plan', planData, seoBasicPlaneRepo);
};

const seoStandardPlaneService = async (planData) => {
    return await processService('SEO Standard Plan', planData, seoStandardPlaneRepo);
};

const seoPremiumPlaneService = async (planData) => {
    return await processService('SEO Premium Plan', planData, seoPremiumPlaneRepo);
};




const getSeoPlaneprocessService = async (planName, repoFunction) => {
    try {
      logger.info(`src > Service > getAppPlaneprocessService > ${planName}Service`);
      const data = await repoFunction();
      return { success: true,  data };
    } catch (error) {
      logger.error(`Error in ${planName}Service`, error);
      throw error;
    }
  };
  
  const getAllBasicSeoPlanesData = () => getSeoPlaneprocessService('Get SEO Basic Plane Data', getBasicSeoPlaneDataInRepo);
  const getAllStandardSeoPlanesData = () => getSeoPlaneprocessService('Get SEO Standard Plane Data', getStandardSeoPlaneDataInRepo);
  const getAllpremiumSeoPlanesData = () => getSeoPlaneprocessService('Get SEO Premium Plane Data', getPremiumSeoPlaneDataInRepo);
  

  
 const getSEOPlaneprocessServiceByID = async (planName, clientId, repoFunction) => {
    try {
      logger.info(`src > Service > getSEOPlaneprocessServiceByID > ${planName}Service`);
      const data = await repoFunction(clientId);
      return data
    } catch (error) {
      logger.error(`Error in ${planName}Service`, error);
      throw error;
    }
  };
  
  const getSeoBasicPlanesDataByID = (clientId) => getSEOPlaneprocessServiceByID('Get SEO Basic Plane Data',clientId, getBasicSeoPlaneDataByIDInRepo);
  const getSeoStandardPlanesDataByID = (clientId) => getSEOPlaneprocessServiceByID('Get SEO Standard Plane Data',clientId, getStandardSeoPlaneDataByIDInRepo);
  const getSeopremiumPlanesDataByID = (clientId) => getSEOPlaneprocessServiceByID('Get SEO Premium Plane Data',clientId, getPremiumSeoPlaneDataInByIDRepo);



  const DeletePlaneprocessServiceByID = async (planName, id,cliendId, repoFunction) => {
    try {
      logger.info(`src > Service > DeletePlaneprocessServiceByID > ${planName}Service`);
      const data = await repoFunction(id,cliendId);
      return data
    } catch (error) {
      logger.error(`Error in ${planName}Service`, error);
      throw error;
    }
  };
  
  const deleteBasicSeoPlanesDataByID = (id,cliendId) => DeletePlaneprocessServiceByID('Delete Seo Basic Plane Data',id,cliendId, deleteBasicSeoPlaneDataInRepoByID);
  const deleteStandardSeoPlanesDataByID = (id,cliendId) => DeletePlaneprocessServiceByID('Delete Seo Standard Plane Data',id,cliendId, deleteStandardSeoPlaneDataInRepoByID);
  const deletepremiumSeoPlanesDataByID = (id,cliendId) => DeletePlaneprocessServiceByID('Delete Seo Premium Plane Data',id,cliendId, deletePremiumSeoPlaneDataInRepoById);
  

  
  const UpdatePlaneprocessServiceByID = async (planName, id,cliendId,data ,repoFunction) => {
    try {
      logger.info(`src > Service > UpdatePlaneprocessServiceByID > ${planName}Service`);
      
      const dataInService = await repoFunction(id,cliendId,data);
      return dataInService
    } catch (error) {
      logger.error(`Error in ${planName}Service`, error);
      throw error;
    }
  };
  
  const updateBasicSeoPlanesDataByID = (id,cliendId,data) => UpdatePlaneprocessServiceByID('Update Seo Basic Plane Data',id,cliendId,data, updateBasicSeoPlaneDataInRepoByID);
  const updateStandardSeoPlanesDataByID = (id,cliendId,data) => UpdatePlaneprocessServiceByID('Update Seo Standard Plane Data',id,cliendId,data, updateStandardSeoPlaneDataInRepoByID);
  const updatepremiumSeoPlanesDataByID = (id,cliendId,data) => UpdatePlaneprocessServiceByID('Update Seo Premium Plane Data',id,cliendId,data, updatePremiumSeoPlaneDataInRepoById);
  

module.exports = { seoBasicPlaneService, seoStandardPlaneService, seoPremiumPlaneService,
    getAllBasicSeoPlanesData,getAllStandardSeoPlanesData,getAllpremiumSeoPlanesData,
    getSeoBasicPlanesDataByID,getSeoStandardPlanesDataByID,getSeopremiumPlanesDataByID,
    deleteBasicSeoPlanesDataByID,deleteStandardSeoPlanesDataByID,deletepremiumSeoPlanesDataByID,
    updateBasicSeoPlanesDataByID,updateStandardSeoPlanesDataByID,updatepremiumSeoPlanesDataByID
 };
