const nodemailer = require('nodemailer');
const contactUsRepo = require('../repository/contactRepository');
const { logger } = require('../../logger');

const getDataFromUser = async (clientData) => {
    try {
        logger.info('src > Service > contactService > getDataFromUser');

        // Save data to repository
        const contactDataInService = await contactUsRepo(clientData);

        // Set up Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'gmail', // Replace with your email service
            auth: {
                user: 'fa21bscs0017@maju.edu.pk',
                pass: 'cxan vcqf dikr aqob'
            }
        });

        // Email options
        let mailOptions = {
            from: 'fa21bscs0017@maju.edu.pk',
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
