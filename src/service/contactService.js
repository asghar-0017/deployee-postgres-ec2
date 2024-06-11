const nodemailer = require('nodemailer');
const contactUsRepo = require('../repository/contactRepository');
const { logger } = require('../../logger');
const dotenv = require('dotenv');
dotenv.config();

const getDataFromUser = async (clientData) => {
    try {
        logger.info('src > Service > contactService > getDataFromUser');

        // Save data to repository
        const contactDataInService = await contactUsRepo(clientData);

        // Set up Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail', // Replace with your email service
            auth: {
                user: process.env.Email,
                pass: process.env.Email_Pass
            }
        });

        // Email options
        let mailOptions = {
            from: process.env.Email,
            to: clientData.email,
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
        logger.error('Error in getDataFromUser:', error);
        throw error;
    }
};

module.exports = getDataFromUser;
