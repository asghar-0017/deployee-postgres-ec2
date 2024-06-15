const nodemailer = require('nodemailer');
const {
  logoBasicPlaneRepo,
  logoStandardPlaneRepo,
  logoPremiumPlaneRepo,
  logoBusinessPlaneRepo
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
    subject: `New ${plan} Form Submission from ${planData.name}`,
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
    text: 'Thank you for your submission. Our team will contact you soon.',
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

module.exports = {
  logoBasicPlaneService,
  logoStandardPlaneService,
  logoPremiumPlaneService,
  logoBusinessPlaneService
};
