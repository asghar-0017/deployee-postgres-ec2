const nodemailer = require('nodemailer');
const { webBasicPlaneRepo, webStandardPlaneRepo, webpremiumPlaneRepo } = require('../repository/PlainsRepository');
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
    to: process.env.EMAIL,
    subject: `New ${plan} Form Submission from ${planData.name}`,
    text: `
      Name: ${planData.name}
      Email: ${planData.email}
      Phone: ${planData.phone}
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
    text: 'Thank you for your submission. Our team will contact you soon.',
  };

  await transporter.sendMail(clientMailOptions);
  await transporter.sendMail(adminMailOptions);
};

const webBasicPlaneService = async (webBasicPlane) => {
  try {
    logger.info('src > Service > PlainService > webBasicPlaneService');
    const data = await webBasicPlaneRepo(webBasicPlane);
    console.log("Plain Data in service",data)
    await sendEmails('Web Basic Plains', webBasicPlane);
    return { success: true, message: 'Email sent successfully', data: data };
  } catch (error) {
    logger.error('Error in basicPlainsService', error);
    throw error;
  }
};

const webStandardPlaneService = async (webStandardPlane) => {
  try {
    logger.info('src > Service > PlainService > webStandardPlaneService');
    const data = await webStandardPlaneRepo(webStandardPlane);
    console.log("Plain Data in service",data)

    await sendEmails('Web Standard Plains', webStandardPlane);
    return { success: true, message: 'Email sent successfully', data: data };
  } catch (error) {
    logger.error('Error in standardPlainsService', error);
    throw error;
  }
};

const webPremiumPlaneService = async (webpremiumPlane) => {
  try {
    logger.info('src > Service > PlainService > webPremiumPlaneService');
    const data = await webpremiumPlaneRepo(webpremiumPlane);
    console.log("Plain Data in service",data)

    await sendEmails('Web Premium Plane', webpremiumPlane);
    return { success: true, message: 'Email sent successfully', data: data };
  } catch (error) {
    logger.error('Error in premiumPlainsService', error);
    throw error;
  }
};

module.exports = {
  webBasicPlaneService,
  webStandardPlaneService,
  webPremiumPlaneService,
};
