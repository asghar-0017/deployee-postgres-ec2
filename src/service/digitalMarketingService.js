const nodemailer = require('nodemailer');
const { digitalMarketingRepo, allDigitalMarketingDataInRepo, findDigitalMarketingByIdRepo, updateDigitalDataInRepo, getDigitalMarketingByIdRepo } = require('../repository/digitalMarketingRepo');
const { logger } = require('../../logger');
const dotenv = require("dotenv");

dotenv.config();

const digitalMarketingService = async (clientData) => {
  try {
    logger.info('src > Service > DigitalMarketingService > digitalMarketingService');

    const createdAt = new Date();
    const deliveryDate = new Date(createdAt);
    deliveryDate.setDate(createdAt.getDate() + 4);
    
    clientData.delivery_date = deliveryDate;
    clientData.created_at = createdAt;


    const DigitalMarketingDataInService = await digitalMarketingRepo(clientData);
    console.log("Data in service", DigitalMarketingDataInService);

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
        links_to_soial_media: ${clientData.links_to_soial_media}
        target_audiance: ${clientData.target_audiance}
        access_and_permissions: ${clientData.access_and_permissions}
        description: ${clientData.description}
      `
    };

    let clientMailOptions = {
      from: process.env.EMAIL,
      to: clientData.email,
      subject: `Thanks ${clientData.name}`,
      html: `Thank you for your submission. <b> Your Order Id Number: ${clientData.clientId} </b>. Our team will contact you soon.`,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(clientMailOptions);

    return { success: true, message: 'Email sent successfully', DigitalMarketingDataInService };
  } catch (error) {
    throw error;
  }
};

const digitalMarketingdataInService = async () => {
  try {
    const data = await allDigitalMarketingDataInRepo();
    return data;
  } catch (error) {
    throw error;
  }
};

const digitalMarketingDataInServiceByID = async (clientId) => {
  try {
    const data = await findDigitalMarketingByIdRepo(clientId);
    return data;
  } catch (error) {
    throw error;
  }
};

const updateDigitalInService = async (id, clientId, clientData) => {
  try {
    const data = await updateDigitalDataInRepo(id, clientId, clientData);
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteDigitalMarketingByIdInService = async (id,clientId) => {
  try {
    const data = await getDigitalMarketingByIdRepo(id,clientId);
    return data;
  } catch (error) {
    console.error(`Error occurred in digitalMarketingDataInServiceByID: ${error}`);
    throw error;
  }
};

module.exports = { digitalMarketingService, digitalMarketingdataInService, digitalMarketingDataInServiceByID, updateDigitalInService, deleteDigitalMarketingByIdInService };
