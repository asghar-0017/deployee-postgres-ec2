// contactService.js
const nodemailer = require('nodemailer');
const digitalMarketingRepo = require('../repository/digitalMarketingRepo');
const { logger } = require('../../logger');
const dotenv = require("dotenv");
dotenv.config();

const digitalMarketingService = async (clientData) => {
    try {
        logger.info('src > Service > DigitalMarketingService > digitalMarketingService');

        // Save data to repository
        const DigitalMarketingDataInService = await digitalMarketingRepo(clientData);
        console.log("Data in service",DigitalMarketingDataInService)

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
            subject: `New Digital Marketing Form Submission from ${clientData.name}`,
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

        // Send email
        await transporter.sendMail(mailOptions);

        return { success: true, message: 'Email sent successfully', DigitalMarketingDataInService };
    } catch (error) {
        throw error;
    }
};

module.exports = digitalMarketingService