const nodemailer = require('nodemailer');
const {
  logoBasicPlaneRepo,logoStandardPlaneRepo,logoPremiumPlaneRepo,logoBusinessPlaneRepo,

  getBasicLogoPlaneDataInRepo,getStandardLogoPlaneDataInRepo,getPremiumLogoPlaneDataInRepo,getBusinnessLogoPlaneDataInRepo,

  getBasicLogoPlaneDataByIDInRepo,getStandardLogoPlaneDataByIDInRepo,getPremiumLogoPlaneDataInByIDRepo,getBusinessLogoPlaneDataInByIDRepo,

  deleteBasicLogoPlaneDataInRepoByID,deleteStandardLogoPlaneDataInRepoByID,deletePremiumLogoPlaneDataInRepoById,deleteBusinessLogoPlaneDataInRepoById,
  updateBasicLogoPlaneDataInRepoByID,updateStandardLogoPlaneDataInRepoByID,updatePremiumLogoPlaneDataInRepoById,updateBusinessLogoPlaneDataInRepoById

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
    from: `Softmark Solutions <${process.env.SALES_EMAIL}>`, 
    to: process.env.SALES_EMAIL,
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
    from: `Softmark Solutions <${process.env.SALES_EMAIL}>`, 
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
    const createdAt = new Date();
    let deliveryDate;

    if (planName === 'Logo Basic Plan') {
      deliveryDate = new Date(createdAt);
      deliveryDate.setDate(createdAt.getDate() + 4);
    } else if (planName === 'Logo Standard Plan') {
      deliveryDate = new Date(createdAt);
      deliveryDate.setDate(createdAt.getDate() + 8);
    } else if (planName === 'Logo Premium Plan') {
      deliveryDate = new Date(createdAt);
      deliveryDate.setDate(createdAt.getDate() + 12);
    }
    else if (planName === 'Logo Business Plan') {
      deliveryDate = new Date(createdAt);
      deliveryDate.setDate(createdAt.getDate() + 16);
    }

    planData.delivery_date = deliveryDate;
    planData.created_at = createdAt;
    const data = await repoFunction(planData);
    await sendEmails(planName, planData);
    return { success: true, message: 'Email sent successfully', data };
  } catch (error) {
    logger.error(`Error in ${planName}Service`, error);
    throw error;
  }
};

const logoBasicPlaneService = (data) => processService('Logo Basic Plan', data, logoBasicPlaneRepo);
const logoStandardPlaneService = (data) => processService('Logo Standard Plan', data, logoStandardPlaneRepo);
const logoPremiumPlaneService = (data) => processService('Logo Premium Plan', data, logoPremiumPlaneRepo);
const logoBusinessPlaneService = (data) => processService('Logo Business Plan', data, logoBusinessPlaneRepo);





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
  const getLogoBusinessPlanesDataByID = (clientId) => getPlaneprocessServiceByID('Get Logo Business Plane Data',clientId, getBusinessLogoPlaneDataInByIDRepo);



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
  
  const deleteBasicLogoPlanesDataByID = (id,cliendId) => DeletePlaneprocessServiceByID('Delete Logo Basic Plane Data',id,cliendId, deleteBasicLogoPlaneDataInRepoByID);
  const deleteStandardLogoPlanesDataByID = (id,cliendId) => DeletePlaneprocessServiceByID('Delete Logo Standard Plane Data',id,cliendId, deleteStandardLogoPlaneDataInRepoByID);
  const deletepremiumLogoPlanesDataByID = (id,cliendId) => DeletePlaneprocessServiceByID('Delete Logo Premium Plane Data',id,cliendId, deletePremiumLogoPlaneDataInRepoById);
  const deleteBusinessLogoPlanesDataByID = (id,cliendId) => DeletePlaneprocessServiceByID('Delete Logo Business Plane Data',id,cliendId, deleteBusinessLogoPlaneDataInRepoById);
  


  
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
  
  const updateBasicLogoPlanesDataByID = (id,cliendId,data) => updatePlaneprocessServiceByID('Update Logo Basic Plane Data',id,cliendId,data, updateBasicLogoPlaneDataInRepoByID);
  const updateStandardLogoPlanesDataByID = (id,cliendId,data) => updatePlaneprocessServiceByID('Update Logo Standard Plane Data',id,cliendId,data, updateStandardLogoPlaneDataInRepoByID);
  const updatepremiumLogoPlanesDataByID = (id,cliendId,data) => updatePlaneprocessServiceByID('Update Logo Premium Plane Data',id,cliendId,data, updatePremiumLogoPlaneDataInRepoById);
  const updateBusinessLogoPlanesDataByID = (id,cliendId,data) => updatePlaneprocessServiceByID('Update Logo Business Plane Data',id,cliendId,data, updateBusinessLogoPlaneDataInRepoById);
  


module.exports = {
  logoBasicPlaneService,logoStandardPlaneService,logoPremiumPlaneService,logoBusinessPlaneService,

  getAllBasicLogoPlanesData,getAllStandardLogoPlanesData,getAllpremiumLogoPlanesData,getAllBusinessLogoPlanesData,

  getLogoBasicPlanesDataByID,getLogoStandardPlanesDataByID,getLogopremiumPlanesDataByID,getLogoBusinessPlanesDataByID,

  deleteBasicLogoPlanesDataByID,deleteStandardLogoPlanesDataByID,deletepremiumLogoPlanesDataByID,deleteBusinessLogoPlanesDataByID,
  updateBasicLogoPlanesDataByID,updateStandardLogoPlanesDataByID,updatepremiumLogoPlanesDataByID,updateBusinessLogoPlanesDataByID


};
