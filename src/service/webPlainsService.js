const nodemailer = require('nodemailer');
const { webBasicPlaneRepo, webStandardPlaneRepo, webPremiumPlaneRepo } = require('../repository/webPlaneRepository');
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
    to: process.env.EMAIL,
    subject: `New ${plan} Form Submission from ${planData.name}`,
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
    text: 'Thank you for your submission. Our team will contact you soon.',
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

module.exports = { webBasicPlaneService, webStandardPlaneService, webPremiumPlaneService };






