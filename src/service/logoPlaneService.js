const nodemailer = require('nodemailer');
const {
  logoBasicPlaneRepo,
  logoStandardPlaneRepo,
  logoPremiumPlaneRepo,
  logoBusinessPlaneRepo,

  getBasicLogoPlaneDataInRepo,
  getStandardLogoPlaneDataInRepo,
  getPremiumLogoPlaneDataInRepo,
  getBusinnessLogoPlaneDataInRepo,

  getBasicLogoPlaneDataByIDInRepo,
  getStandardLogoPlaneDataByIDInRepo,
  getPremiumLogoPlaneDataInByIDRepo,
  getBusinessLogoPlaneDataInByIDRepo

} = require('../repository/logoRepository');
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
    from: process.env.EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `New ${plan} Form Submission from ${planData.name} clientId ${planData.clientId}`,
    text: `
      Name: ${planData.name}
      Email: ${planData.email}
      Company: ${planData.company}
      Reference Logos: ${planData.reference_logos}
      Reference Template: ${planData.reference_template}
      Reference Websites: ${planData.reference_websites}
      Product Design: ${planData.product_design}
      Custom Product Design: ${planData.custom_product_design}
      Drive Link to Reference Images: ${planData.drive_link_to_reference_images}
      Link to Graphics: ${planData.Link_to_Graphics}
      Description: ${planData.description}
    `,
  };

  const clientMailOptions = {
    from: process.env.EMAIL,
    to: planData.email,
    subject: `Thanks ${planData.name}`,
    html: `Thank you for your submission. <b> Your Order Id Number: ${planData.clientId} </b>. Our team will contact you soon.`,
  };

  await sendEmail(transporter, adminMailOptions);
  await sendEmail(transporter, clientMailOptions);
};

const processService = async (planName, planData, repoFunction) => {
  try {
    logger.info(`src > Service > logoPlaneService > ${planName}Service`);
    const data = await repoFunction(planData);
    await sendEmails(planName, planData);
    return { success: true, message: 'Email sent successfully', data };
  } catch (error) {
    logger.error(`Error in ${planName}Service`, error);
    throw error;
  }
};

const logoBasicPlaneService = (data) => processService('Logo Basic Plane', data, logoBasicPlaneRepo);
const logoStandardPlaneService = (data) => processService('Logo Standard Plane', data, logoStandardPlaneRepo);
const logoPremiumPlaneService = (data) => processService('Logo Premium Plane', data, logoPremiumPlaneRepo);
const logoBusinessPlaneService = (data) => processService('Logo Business Plane', data, logoBusinessPlaneRepo);





const getLogoPlaneprocessService = async (planName, repoFunction) => {
  try {
    logger.info(`src > Service > getLogoPlaneprocessService > ${planName}Service`);
    const data = await repoFunction();
    return { success: true,  data };
  } catch (error) {
    logger.error(`Error in ${planName}Service`, error);
    throw error;
  }
};

const getAllBasicLogoPlanesData = () => getLogoPlaneprocessService('Get Logo Basic Plane Data', getBasicLogoPlaneDataInRepo);
const getAllStandardLogoPlanesData = () => getLogoPlaneprocessService('Get Logo Standard Plane Data', getStandardLogoPlaneDataInRepo);
const getAllpremiumLogoPlanesData = () => getLogoPlaneprocessService('Get Logo Premium Plane Data', getPremiumLogoPlaneDataInRepo);
const getAllBusinessLogoPlanesData = () => getLogoPlaneprocessService('Get Logo Business Plane Data', getBusinnessLogoPlaneDataInRepo);



 const getPlaneprocessServiceByID = async (planName, clientId, repoFunction) => {
    try {
      logger.info(`src > Service > getAppPlaneprocessService > ${planName}Service`);
      const data = await repoFunction(clientId);
      return { success: true,  data };
    } catch (error) {
      logger.error(`Error in ${planName}Service`, error);
      throw error;
    }
  };
  
  const getLogoBasicPlanesDataByID = (clientId) => getPlaneprocessServiceByID('Get Logo Basic Plane Data',clientId, getBasicLogoPlaneDataByIDInRepo);
  const getLogoStandardPlanesDataByID = (clientId) => getPlaneprocessServiceByID('Get Logo Standard Plane Data',clientId, getStandardLogoPlaneDataByIDInRepo);
  const getLogopremiumPlanesDataByID = (clientId) => getPlaneprocessServiceByID('Get Logo Premium Plane Data',clientId, getPremiumLogoPlaneDataInByIDRepo);
  const getLogoBusinessPlanesDataByID = (clientId) => getPlaneprocessServiceByID('Get Logo Premium Plane Data',clientId, getBusinessLogoPlaneDataInByIDRepo);





module.exports = {
  logoBasicPlaneService,
  logoStandardPlaneService,
  logoPremiumPlaneService,
  logoBusinessPlaneService,

  getAllBasicLogoPlanesData,
  getAllStandardLogoPlanesData,
  getAllpremiumLogoPlanesData,
  getAllBusinessLogoPlanesData,

  getLogoBasicPlanesDataByID,
  getLogoStandardPlanesDataByID,
  getLogopremiumPlanesDataByID,
  getLogoBusinessPlanesDataByID
};
