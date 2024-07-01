const nodemailer = require('nodemailer');
const { digitalMarketingRepo, allDigitalMarketingDataInRepo, findDigitalMarketingByIdRepo, updateDigitalDataInRepo, getDigitalMarketingByIdRepo, deleteDigitalMarketingByIdRepo } = require('../repository/digitalMarketingRepo');
const { logger } = require('../../logger');
const dotenv = require("dotenv");

dotenv.config();

const digitalMarketingService = async (clientData) => {
  try {
    logger.info('src > Service > DigitalMarketingService > digitalMarketingService');
    const DigitalMarketingDataInService = await digitalMarketingRepo(clientData);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    let adminMailOptions = {
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New Digital Marketing Form Submission from ${clientData.name} Client Id ${clientData.clientId}`,
      text: `
        Name: ${clientData.name}
        Email: ${clientData.email}
        Company: ${clientData.company}
        links_to_social_media: ${clientData.links_to_social_media}
        target_audience: ${clientData.target_audience}
        access_and_permissions: ${clientData.access_and_permissions}
        description: ${clientData.description}
      `
    };

    let clientMailOptions = {
      from: process.env.EMAIL,
      to: clientData.email,
      subject: `Thanks ${clientData.name}`,
      html: `Thank you for your submission. <b>Your Order Id Number: ${clientData.clientId}</b>. Our team will contact you soon.`,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(clientMailOptions);

    return { success: true, message: 'Email sent successfully', DigitalMarketingDataInService };
  } catch (error) {
    logger.error("Error occurred in digitalMarketingService:", error);
    throw error;
  }
};

const digitalMarketingdataInService = async () => {
  try {
    const data = await allDigitalMarketingDataInRepo();
    return data;
  } catch (error) {
    logger.error("Error occurred in digitalMarketingdataInService:", error);
    throw error;
  }
};

const deleteDigitalMarketingByIdInService = async (id, clientId) => {
  try {
    const data = await findDigitalMarketingByIdRepo(id, clientId);
    if (data) {
      await deleteDigitalMarketingByIdRepo(id, clientId);
      return `Client data deleted successfully with ID ${clientId}`;
    } else {
      return null;
    }
  } catch (error) {
    logger.error("Error occurred in deleteDigitalMarketingByIdInService:", error);
    throw error;
  }
};

const updateDigitalInService = async (id, clientData) => {
  try {
    const data = await updateDigitalDataInRepo(id, clientData);
    return data;
  } catch (error) {
    logger.error("Error occurred in updateDigitalInService:", error);
    throw error;
  }
};

const digitalMarketingDataInServiceByID = async (clientId) => {
  try {
    const data = await getDigitalMarketingByIdRepo(clientId);
    return data;
  } catch (error) {
    logger.error("Error occurred in digitalMarketingDataInServiceByID:", error);
    throw error;
  }
};

module.exports = { digitalMarketingService, digitalMarketingdataInService, deleteDigitalMarketingByIdInService, updateDigitalInService, digitalMarketingDataInServiceByID };
