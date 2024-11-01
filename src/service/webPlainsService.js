const nodemailer = require('nodemailer');
const { webBasicPlanRepo, webStandardPlanRepo, webPremiumPlanRepo,
  getBasicWebPlaneDataInRepo,getStandardWebPlaneDataInRepo,getPremiumWebPlaneDataInRepo,
  getBasicWebPlaneDataByIDInRepo,getStandardWebPlaneDataByIDInRepo,getPremiumWebPlaneDataInByIDRepo,
  deleteBasicWebPlaneDataInRepoByID,deleteStandardWebPlaneDataInRepoByID,deletePremiumWebPlaneDataInRepoById,
  updateBasicWebPlaneDataInRepoByID,updateStandardWebPlaneDataInRepoByID,updatePremiumWebPlaneDataInRepoById

 } = require('../repository/webPlaneRepository');
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


  let adminMailOptions = {
    from: `Softmark Solutions <${process.env.SALES_EMAIL}>`, 
    to: process.env.SALES_EMAIL,
    subject: `New ${plan} Form Submission from ${planData.name} clientId ${planData.clientId}`,
    text: `
      Name: ${planData.name}
      Email: ${planData.email}
      Company: ${planData.company}
      Description: ${planData.description}
      Reference_sites: ${planData.reference_sites}
      Link_to_Graphics: ${planData.Link_to_Graphics}
      Animation: ${planData.animation}
      Domain: ${planData.domain}
      Functionalities: ${planData.functionalities}

      


      
    `,
  };

  let clientMailOptions = {
    from: `Softmark Solutions <${process.env.SALES_EMAIL}>`, 
    to: planData.email,
    subject: `Thanks ${planData.name}`,
    html: `Thank you for your submission. <b> Your Order Id Number: ${planData.clientId} </b>. Our team will contact you soon.`,
  };

    await sendEmail(transporter, adminMailOptions);
    await sendEmail(transporter, clientMailOptions);
};

const processService = async (planeName, planData, repoFunction) => {
  try {
      logger.info(`seo > service > webService > ${planeName}Service`);
      const createdAt = new Date();
      let deliveryDate;
  
      if (planeName === 'WEB Basic Plan') {
        deliveryDate = new Date(createdAt);
        deliveryDate.setDate(createdAt.getDate() + 4);
      } else if (planeName === 'WEB Standard Plan') {
        deliveryDate = new Date(createdAt);
        deliveryDate.setDate(createdAt.getDate() + 8);
      } else if (planeName === 'WEB Premium Plan') {
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

const webBasicPlanService = async (planData) => {
  return await processService('WEB Basic Plan', planData, webBasicPlanRepo);
};

const webStandardPlanService = async (planData) => {
  return await processService('WEB Standard Plan', planData, webStandardPlanRepo);
};

const webPremiumPlanService = async (planData) => {
  return await processService('WEB Premium Plan', planData, webPremiumPlanRepo);
};





const getWebPlaneprocessService = async (planName, repoFunction) => {
  try {
    logger.info(`src > Service > getAppPlaneprocessService > ${planName}Service`);
    const data = await repoFunction();
    return { success: true,  data };
  } catch (error) {
    logger.error(`Error in ${planName}Service`, error);
    throw error;
  }
};

const getAllBasicWebPlanesData = () => getWebPlaneprocessService('Get App Basic Plane Data', getBasicWebPlaneDataInRepo);
const getAllStandardWebPlanesData = () => getWebPlaneprocessService('Get App Standard Plane Data', getStandardWebPlaneDataInRepo);
const getAllpremiumWebPlanesData = () => getWebPlaneprocessService('Get App Premium Plane Data', getPremiumWebPlaneDataInRepo);



const getWebPlaneprocessServiceByID = async (planName, clientId, repoFunction) => {
  try {
    logger.info(`src > Service > getWebPlaneprocessServiceByID > ${planName}Service`);
    const data = await repoFunction(clientId);
    return data
  } catch (error) {
    logger.error(`Error in ${planName}Service`, error);
    throw error;
  }
};

const getWebBasicPlanesDataByID = (clientId) => getWebPlaneprocessServiceByID('Get Web Basic Plane Data',clientId, getBasicWebPlaneDataByIDInRepo);
const getWebStandardPlanesDataByID = (clientId) => getWebPlaneprocessServiceByID('Get Web Standard Plane Data',clientId, getStandardWebPlaneDataByIDInRepo);
const getWebpremiumPlanesDataByID = (clientId) => getWebPlaneprocessServiceByID('Get Web Premium Plane Data',clientId, getPremiumWebPlaneDataInByIDRepo);


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

const deleteBasicWebPlanesDataByID = (id,cliendId) => DeletePlaneprocessServiceByID('Delete Web Basic Plane Data',id,cliendId, deleteBasicWebPlaneDataInRepoByID);
const deleteStandardWebPlanesDataByID = (id,cliendId) => DeletePlaneprocessServiceByID('Delete Web Standard Plane Data',id,cliendId, deleteStandardWebPlaneDataInRepoByID);
const deletepremiumWebPlanesDataByID = (id,cliendId) => DeletePlaneprocessServiceByID('Delete Web Premium Plane Data',id,cliendId, deletePremiumWebPlaneDataInRepoById);


const updatePlaneprocessServiceByID = async (planName, id,cliendId,data, repoFunction) => {
  try {
    logger.info(`src > Service > updatePlaneprocessServiceByID > ${planName}Service`);
    const dataInService = await repoFunction(id,cliendId,data);
    return dataInService
  } catch (error) {
    logger.error(`Error in ${planName}Service`, error);
    throw error;
  }
};

const updateBasicWebPlanesDataByID = (id,cliendId,data) => updatePlaneprocessServiceByID('Update Web Basic Plane Data',id,cliendId,data, updateBasicWebPlaneDataInRepoByID);
const updateStandardWebPlanesDataByID = (id,cliendId,data) => updatePlaneprocessServiceByID('Update Web Standard Plane Data',id,cliendId,data, updateStandardWebPlaneDataInRepoByID);
const updatepremiumWebPlanesDataByID = (id,cliendId,data) => updatePlaneprocessServiceByID('Update Web Premium Plane Data',id,cliendId, data,updatePremiumWebPlaneDataInRepoById);


module.exports = {
  webBasicPlanService, webStandardPlanService, webPremiumPlanService,
  getAllBasicWebPlanesData,getAllStandardWebPlanesData,getAllpremiumWebPlanesData,
  getWebBasicPlanesDataByID,getWebStandardPlanesDataByID,getWebpremiumPlanesDataByID,
  deleteBasicWebPlanesDataByID,deleteStandardWebPlanesDataByID,deletepremiumWebPlanesDataByID,
  updateBasicWebPlanesDataByID,updateStandardWebPlanesDataByID,updatepremiumWebPlanesDataByID

 };


 






