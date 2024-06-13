// contactService.js
const nodemailer = require('nodemailer');
const searchEngineOptimazationRepo = require('../repository/seoRepository');
const { logger } = require('../../logger');
const dotenv = require("dotenv");
dotenv.config();

const SEOService = async (clientData) => {
    try {
        logger.info('src > Service > seoService > SEOService');

        // Save data to repository
        const searchEngineOptimizationService = await searchEngineOptimazationRepo(clientData);
        console.log("Data in service",searchEngineOptimizationService)

        // Set up Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email options
        let mailOptions = {
            from: process.env.Email,
            to: clientData.email,
            subject: `New SEO Form Submission from ${clientData.name}`,
            text: `
                Name: ${clientData.name}
                Email: ${clientData.email}
                Company: ${clientData.company}
                Website_of_the_client: ${clientData.Website_of_the_client}
                Platform_of_the_website: ${clientData.Platform_of_the_website}
                Competitor_website_reference: ${clientData.competitor_website_reference}
                Current_SEO_Efforts: ${clientData.current_SEO_Efforts}
                Access_and_permissions: ${clientData.access_and_permissions}
                Description: ${clientData.description}
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return { success: true, message: 'Email sent successfully', searchEngineOptimizationService };
    } catch (error) {
        throw error;
    }
};

module.exports = SEOService
