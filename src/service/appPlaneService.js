const nodemailer = require('nodemailer');
const { appBasicPlaneRepo, appStandardPlaneRepo, apppremiumPlaneRepo } = require('../repository/appPlanesRepository');
const { logger } = require('../../logger');
const dotenv = require("dotenv");
dotenv.config();

const sendEmails = async (plan, planData) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email service
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    },
  });

  let adminMailOptions = {
    from: process.env.EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: `New ${plan} Form Submission from ${planData.name}`,
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
    text: 'Thank you for your submission. Our team will contact you soon.',
  };

  await transporter.sendMail(clientMailOptions);
  await transporter.sendMail(adminMailOptions);
};

const appBasicPlaneService = async (appBasicPlane) => {
  try {
    logger.info('src > Service > appPlainService > appBasicPlaneService');
    const data = await appBasicPlaneRepo(appBasicPlane);
    console.log("Plain Data in service",data)
    await sendEmails('App Basic Plains', appBasicPlane);
    return { success: true, message: 'Email sent successfully', data: data };
  } catch (error) {
    logger.error('Error in appBasicPlaneService', error);
    throw error;
  }
};

const appStandardPlaneService = async (appStandardPlane) => {
  try {
    logger.info('src > Service > appPlainService > appStandardPlaneService');
    const data = await appStandardPlaneRepo(appStandardPlane);
    console.log("Plain Data in service",data)

    await sendEmails('App Standard Plains', appStandardPlane);
    return { success: true, message: 'Email sent successfully', data: data };
  } catch (error) {
    logger.error('Error in standardPlainsService', error);
    throw error;
  }
};

const appPremiumPlaneService = async (appPremiumPlane) => {
  try {
    logger.info('src > Service > appPlainService > appPremiumPlaneService');
    const data = await apppremiumPlaneRepo(appPremiumPlane);
    console.log("Plain Data in service",data)

    await sendEmails('App Premium Plane', appPremiumPlane);
    return { success: true, message: 'Email sent successfully', data: data };
  } catch (error) {
    logger.error('Error in premiumPlainsService', error);
    throw error;
  }
};

module.exports = {
  appBasicPlaneService,
  appStandardPlaneService,
  appPremiumPlaneService,
};
