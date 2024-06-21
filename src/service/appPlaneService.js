const nodemailer = require('nodemailer');
const { appBasicPlaneRepo, appStandardPlaneRepo, appPremiumPlaneRepo } = require('../repository/appPlanesRepository');
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
  const transporter=createTransporter()

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

  await sendEmail(transporter,clientMailOptions);
  await sendEmail(transporter,adminMailOptions);
};


const processService = async (planName, planData, repoFunction) => {
  try {
    logger.info(`src > Service > appPlaneService > ${planName}Service`);
    const data = await repoFunction(planData);
    await sendEmails(planName, planData);
    return { success: true, message: 'Email sent successfully', data };
  } catch (error) {
    logger.error(`Error in ${planName}Service`, error);
    throw error;
  }
};

const appBasicPlaneService = (data) => processService('App Basic Plane', data, appBasicPlaneRepo);
const appStandardPlaneService = (data) => processService('App Standard Plane', data, appStandardPlaneRepo);
const appPremiumPlaneService = (data) => processService('App Premium Plane', data, appPremiumPlaneRepo);


module.exports = {
  appBasicPlaneService,
  appStandardPlaneService,
  appPremiumPlaneService,
};
