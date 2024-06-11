const nodemailer = require('nodemailer');
const { basicPlainRepo, standardPlainRepo, premiumPlainRepo } = require('../repository/PlainsRepository');
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

const basicPlainsService = async (basicPlain) => {
  try {
    logger.info('src > Service > PlainService > basicPlainsService');
    const data = await basicPlainRepo(basicPlain);
    console.log("Plain Data in service",data)
    await sendEmails('Basic Plains', basicPlain);
    return { success: true, message: 'Email sent successfully', data: data };
  } catch (error) {
    logger.error('Error in basicPlainsService', error);
    throw error;
  }
};

const standardPlainsService = async (standardPlain) => {
  try {
    logger.info('src > Service > PlainService > standardPlainsService');
    const data = await standardPlainRepo(standardPlain);
    console.log("Plain Data in service",data)

    await sendEmails('Standard Plains', standardPlain);
    return { success: true, message: 'Email sent successfully', data: data };
  } catch (error) {
    logger.error('Error in standardPlainsService', error);
    throw error;
  }
};

const premiumPlainsService = async (premiumPlain) => {
  try {
    logger.info('src > Service > PlainService > premiumPlainsService');
    const data = await premiumPlainRepo(premiumPlain);
    console.log("Plain Data in service",data)

    await sendEmails('Premium Plains', premiumPlain);
    return { success: true, message: 'Email sent successfully', data: data };
  } catch (error) {
    logger.error('Error in premiumPlainsService', error);
    throw error;
  }
};

module.exports = {
  basicPlainsService,
  standardPlainsService,
  premiumPlainsService,
};
