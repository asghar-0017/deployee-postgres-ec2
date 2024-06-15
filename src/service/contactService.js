// contactService.js
const nodemailer = require('nodemailer');
const contactUsRepo = require('../repository/contactRepository');
const { logger } = require('../../logger');
const dotenv = require("dotenv");
dotenv.config();

const contactUsService = async (clientData) => {
    try {
        logger.info('src > Service > contactService > getDataFromUser');

        // Save data to repository
        const contactDataInService = await contactUsRepo(clientData);
        console.log("Data in service",contactDataInService)

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
            to: `${clientData.email} ${process.env.ADMIN_EMAIL}`,
            subject: `New Contact Form Submission from ${clientData.name}`,
            text: `
                Name: ${clientData.name}
                Email: ${clientData.email}
                Phone: ${clientData.phone}
                Company: ${clientData.company}
                Service Type: ${clientData.serviceType}
                Message: ${clientData.message}
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return { success: true, message: 'Email sent successfully', contactDataInService };
    } catch (error) {
        throw error;
    }
};

module.exports = contactUsService
