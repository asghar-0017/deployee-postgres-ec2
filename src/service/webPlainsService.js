const nodemailer = require('nodemailer');
const { webBasicPlaneRepo, webStandardPlaneRepo, webPremiumPlaneRepo,
  getBasicWebPlaneDataInRepo,getStandardWebPlaneDataInRepo,getPremiumWebPlaneDataInRepo,
  getBasicWebPlaneDataByIDInRepo,getStandardWebPlaneDataByIDInRepo,getPremiumWebPlaneDataInByIDRepo

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
    from: process.env.EMAIL,
    to: process.env.ADMIN_EMAIL,
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
    from: process.env.EMAIL,
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

const webBasicPlaneService = async (planData) => {
  return await processService('WEB Basic Plane', planData, webBasicPlaneRepo);
};

const webStandardPlaneService = async (planData) => {
  return await processService('WEB Standard Plane', planData, webStandardPlaneRepo);
};

const webPremiumPlaneService = async (planData) => {
  return await processService('WEB Premium Plane', planData, webPremiumPlaneRepo);
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
    return { success: true,  data };
  } catch (error) {
    logger.error(`Error in ${planName}Service`, error);
    throw error;
  }
};

const getWebBasicPlanesDataByID = (clientId) => getWebPlaneprocessServiceByID('Get Web Basic Plane Data',clientId, getBasicWebPlaneDataByIDInRepo);
const getWebStandardPlanesDataByID = (clientId) => getWebPlaneprocessServiceByID('Get Web Standard Plane Data',clientId, getStandardWebPlaneDataByIDInRepo);
const getWebpremiumPlanesDataByID = (clientId) => getWebPlaneprocessServiceByID('Get Web Premium Plane Data',clientId, getPremiumWebPlaneDataInByIDRepo);


module.exports = { webBasicPlaneService, webStandardPlaneService, webPremiumPlaneService,
  getAllBasicWebPlanesData,getAllStandardWebPlanesData,getAllpremiumWebPlanesData,
  getWebBasicPlanesDataByID,getWebStandardPlanesDataByID,getWebpremiumPlanesDataByID

 };






