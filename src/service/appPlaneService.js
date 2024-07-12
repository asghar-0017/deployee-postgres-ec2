const nodemailer = require('nodemailer');
const { appBasicPlaneRepo, appStandardPlaneRepo, appPremiumPlaneRepo } = require('../repository/appPlanesRepository');
const { logger } = require('../../logger');
const dotenv = require("dotenv");
// const { consumeQueue } = require('../service/RabbitMQService');

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
    subject: `New ${plan} Form Submission from ${planData.name} Client Id ${planData.clientId}`,
    text: `
      Name: ${planData.name}
      Email: ${planData.email}
      Company: ${planData.company}
      Reference_App: ${planData.reference_App}
      Drive_links_to_icons: ${planData.drive_links_to_icons}
      Animation_Reference: ${planData.animation_Reference}
      Description: ${planData.description}
      Functionalities: ${planData.functionalities}
      Link_to_Graphics: ${planData.Link_to_Graphics}
    `,
  };

  let clientMailOptions = {
    from: process.env.EMAIL,
    to: planData.email,
    subject: `Thanks ${planData.name}`,
    html: `Thank you for your submission. <b> Your Order Id Number: ${planData.clientId} </b>. Our team will contact you soon.`,
  };

  await sendEmail(transporter, clientMailOptions);
  await sendEmail(transporter, adminMailOptions);
};


const processService = async (planName, planData, repoFunction) => {
  try {
    logger.info(`src > Service > appPlaneService > ${planName}Service`);
    const createdAt = new Date();
    let deliveryDate;

    if (planName === 'App-Basic-Plan') {
      deliveryDate = new Date(createdAt);
      deliveryDate.setDate(createdAt.getDate() + 4);
    } else if (planName === 'App-Standard-Plan') {
      deliveryDate = new Date(createdAt);
      deliveryDate.setDate(createdAt.getDate() + 8);
    } else if (planName === 'App-Premium-Plan') {
      deliveryDate = new Date(createdAt);
      deliveryDate.setDate(createdAt.getDate() + 12);
    }

    planData.delivery_date = deliveryDate;
    planData.created_at = createdAt;

    await repoFunction(planData);
    await sendEmails(planName, planData);


    return { success: true, message: 'Email sent successfully', planData };
  } catch (error) {
    logger.error(`Error in ${planName}Service`, error);
    throw error;
  }
};

const appBasicPlaneService = (data) => processService('App-Basic-Plan', data, appBasicPlaneRepo);
const appStandardPlaneService = (data) => processService('App-Standard-Plan', data, appStandardPlaneRepo);
const appPremiumPlaneService = (data) => processService('App-Premium-Plan', data, appPremiumPlaneRepo);

// const startConsumers = () => {

//   consumeQueue('App-basic-plan-queue', async (data) => {
//     console.log('Consuming App-basic-plan-queue', data);
//     // await appBasicPlaneRepo(data);
//   });

//   consumeQueue('App-standard-plan-queue', async (data) => {
//     console.log('Consuming App-standard-plan-queue', data);
//     // await appStandardPlaneRepo(data);
//   });

//   consumeQueue('App-premium-plan-queue', async (data) => {
//     console.log('Consuming App-premium-plan-queue', data);
//     // await appPremiumPlaneRepo(data);
//   });
// };





const getAppPlaneprocessService = async (planName, repoFunction) => {
  try {
    logger.info(`src > Service > getAppPlaneprocessService > ${planName}Service`);
    const data = await repoFunction();
    return { success: true,  data };
  } catch (error) {
    logger.error(`Error in ${planName}Service`, error);
    throw error;
  }
};

const getAllBasicAppPlanesData = () => getAppPlaneprocessService('Get App Basic Plane Data', getBasicPlaneDataInRepo);
const getAllStandardAppPlanesData = () => getAppPlaneprocessService('Get App Standard Plane Data', getStandardPlaneDataInRepo);
const getAllpremiumAppPlanesData = () => getAppPlaneprocessService('Get App Premium Plane Data', getPremiumPlaneDataInRepo);


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

const deleteBasicAppPlanesDataByID = (id,cliendId) => DeletePlaneprocessServiceByID('Delete App Basic Plane Data',id,cliendId, deleteBasicPlaneDataInRepoByID);
const deleteStandardAppPlanesDataByID = (id,cliendId) => DeletePlaneprocessServiceByID('Delete App Standard Plane Data',id,cliendId, deleteStandardPlaneDataInRepoByID);
const deletepremiumAppPlanesDataByID = (id,cliendId) => DeletePlaneprocessServiceByID('Delete App Premium Plane Data',id,cliendId, deletePremiumPlaneDataInRepoById);


 const getPlaneprocessServiceByID = async (planName, clientId, repoFunction) => {
    try {
      logger.info(`src > Service > getAppPlaneprocessService > ${planName}Service`);
      const data = await repoFunction(clientId);
      return data
    } catch (error) {
      logger.error(`Error in ${planName}Service`, error);
      throw error;
    }
  };
  
  const getBasicAppPlanesDataByID = (clientId) => getPlaneprocessServiceByID('Get App Basic Plane Data',clientId, getBasicPlaneDataByIDInRepo);
  const getStandardAppPlanesDataByID = (clientId) => getPlaneprocessServiceByID('Get App Standard Plane Data',clientId, getStandardPlaneDataByIDInRepo);
  const getpremiumAppPlanesDataByID = (clientId) => getPlaneprocessServiceByID('Get App Premium Plane Data',clientId, getPremiumPlaneDataInByIDRepo);
  

  
const updatePlaneprocessServiceByID = async (planName, id,cliendId, data,repoFunction) => {
  try {
    logger.info(`src > Service > DeletePlaneprocessServiceByID > ${planName}Service`);
    const dataInService = await repoFunction(id,cliendId,data);
    return dataInService
  } catch (error) {
    logger.error(`Error in ${planName}Service`, error);
    throw error;
  }
};

const updateBasicAppPlanesDataByID = (id,cliendId,data) => updatePlaneprocessServiceByID('Update App Basic Plane Data',id,cliendId,data, updateBasicPlaneDataInRepoByID);
const updateStandardAppPlanesDataByID = (id,cliendId,data) => updatePlaneprocessServiceByID('Update App Standard Plane Data',id,cliendId,data, updateStandardPlaneDataInRepoByID);
const updatepremiumAppPlanesDataByID = (id,cliendId,data) => updatePlaneprocessServiceByID('Update App Premium Plane Data',id,cliendId,data, updatePremiumPlaneDataInRepoById);


module.exports = {
  appBasicPlaneService,appStandardPlaneService,appPremiumPlaneService,
  getAllBasicAppPlanesData,getAllStandardAppPlanesData,getAllpremiumAppPlanesData,
  getBasicAppPlanesDataByID,getStandardAppPlanesDataByID,getpremiumAppPlanesDataByID,
  deleteBasicAppPlanesDataByID,deleteStandardAppPlanesDataByID,deletepremiumAppPlanesDataByID,
  updateBasicAppPlanesDataByID,updateStandardAppPlanesDataByID,updatepremiumAppPlanesDataByID,
  startConsumers,


};
