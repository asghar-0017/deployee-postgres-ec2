const nodemailer = require('nodemailer');
const {
    seoBasicPlaneRepo,
    seoStandardPlaneRepo,
    seoPremiumPlaneRepo,

    getBasicSeoPlaneDataInRepo,
    getStandardSeoPlaneDataInRepo,
    getPremiumSeoPlaneDataInRepo,

    getBasicSeoPlaneDataByIDInRepo,
    getStandardSeoPlaneDataByIDInRepo,
    getPremiumSeoPlaneDataInByIDRepo
} = require('../repository/seoRepository');
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
        subject: `New ${plan} Form Submission from ${planData.name} clientID ${planData.clientId}`,
        text: `
            Name: ${planData.name}
            Email: ${planData.email}
            Company: ${planData.company}
            Website of the client: ${planData.Website_of_the_client}
            Platform of the website: ${planData.Platform_of_the_website}
            Competitor website reference: ${planData.competitor_website_reference}
            Current SEO Efforts: ${planData.current_SEO_Efforts}
            Access and permissions: ${planData.access_and_permissions}
            Description: ${planData.description}
        `,
    };

    const clientMailOptions = {
        from: process.env.EMAIL,
        to: planData.email,
        subject: `Thanks ${planData.name}`,
        html: `Thank you for your submission. <b> Your Order Id Number: ${planData.clientId} </b>. Our team will contact you soon.`,
    };

    await sendEmail(transporter, adminMailOptions);
    await sendEmail(transporter, clientMailOptions);
};

const processService = async (planeName, planData, repoFunction) => {
    try {
        logger.info(`seo > service > seoService > ${planeName}Service`);
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

const seoBasicPlaneService = async (planData) => {
    return await processService('SEO Basic Plane', planData, seoBasicPlaneRepo);
};

const seoStandardPlaneService = async (planData) => {
    return await processService('SEO Standard Plane', planData, seoStandardPlaneRepo);
};

const seoPremiumPlaneService = async (planData) => {
    return await processService('SEO Premium Plane', planData, seoPremiumPlaneRepo);
};




const getSeoPlaneprocessService = async (planName, repoFunction) => {
    try {
      logger.info(`src > Service > getAppPlaneprocessService > ${planName}Service`);
      const data = await repoFunction();
      return { success: true,  data };
    } catch (error) {
      logger.error(`Error in ${planName}Service`, error);
      throw error;
    }
  };
  
  const getAllBasicSeoPlanesData = () => getSeoPlaneprocessService('Get SEO Basic Plane Data', getBasicSeoPlaneDataInRepo);
  const getAllStandardSeoPlanesData = () => getSeoPlaneprocessService('Get SEO Standard Plane Data', getStandardSeoPlaneDataInRepo);
  const getAllpremiumSeoPlanesData = () => getSeoPlaneprocessService('Get SEO Premium Plane Data', getPremiumSeoPlaneDataInRepo);
  

  
 const getSEOPlaneprocessServiceByID = async (planName, clientId, repoFunction) => {
    try {
      logger.info(`src > Service > getSEOPlaneprocessServiceByID > ${planName}Service`);
      const data = await repoFunction(clientId);
      return { success: true,  data };
    } catch (error) {
      logger.error(`Error in ${planName}Service`, error);
      throw error;
    }
  };
  
  const getSeoBasicPlanesDataByID = (clientId) => getSEOPlaneprocessServiceByID('Get SEO Basic Plane Data',clientId, getBasicSeoPlaneDataByIDInRepo);
  const getSeoStandardPlanesDataByID = (clientId) => getSEOPlaneprocessServiceByID('Get SEO Standard Plane Data',clientId, getStandardSeoPlaneDataByIDInRepo);
  const getSeopremiumPlanesDataByID = (clientId) => getSEOPlaneprocessServiceByID('Get SEO Premium Plane Data',clientId, getPremiumSeoPlaneDataInByIDRepo);


module.exports = { seoBasicPlaneService, seoStandardPlaneService, seoPremiumPlaneService,
    getAllBasicSeoPlanesData,getAllStandardSeoPlanesData,getAllpremiumSeoPlanesData,
    getSeoBasicPlanesDataByID,getSeoStandardPlanesDataByID,getSeopremiumPlanesDataByID
 };
