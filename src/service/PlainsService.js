const nodemailer = require('nodemailer');
const {basicPlainRepo,standardPlainRepo,premiumPlainRepo} = require('../repository/PlainsRepository');
const { logger } = require('../../logger');

const basicPlainsService = async (basicPlain) => {
    try {
        logger.info('src > Service > PlainService > basicPlainsService');
        const Data = await basicPlainRepo(basicPlain);
        console.log("Data in Servive",Data)
        let transporter = nodemailer.createTransport({
            service: 'gmail', // Replace with your email service
            auth: {
                user: 'fa21bscs0017@maju.edu.pk',
                pass: 'cxan vcqf dikr aqob'
            }
        });

        // Email options
        let AdminmailOptions = {
            from: 'fa21bscs0017@maju.edu.pk',
            to: 'fa21bscs0017@maju.edu.pk',
            subject: `New Basic Plains Form Submission from ${basicPlain.name}`,
            text: `
                Name: ${basicPlain.name}
                Email: ${basicPlain.email}
                Phone: ${basicPlain.phone}
                Company: ${basicPlain.company}
                Description: ${basicPlain.description}
            `
        };
        let ClientMailOptions = {
           from: 'fa21bscs0017@maju.edu.pk',
            to: basicPlain.email,
            subject: `Thanks  ${basicPlain.name} `,
            text: 'Thank you for your submission. Our team will contact you soon.'
            
        };

        // Send email
        await transporter.sendMail(ClientMailOptions);
        await transporter.sendMail(AdminmailOptions);


        return { success: true, message: 'Email sent successfully', data: Data };
    } catch (error) {
        logger.error('Error in basicPlainsService', error);
        throw error;
    }
};

const standardPlainsService=async(standardPlain)=>{
    try {
        logger.info('src > Service > PlainService > standardPlainsService');
        const Data = await standardPlainRepo(standardPlain);
        console.log("Data in Servive",Data)
        let transporter = nodemailer.createTransport({
            service: 'gmail', // Replace with your email service
            auth: {
                user: 'fa21bscs0017@maju.edu.pk',
                pass: 'cxan vcqf dikr aqob'
            }
        });

        // Email options
        let AdminmailOptions = {
            from: 'fa21bscs0017@maju.edu.pk',
            to: 'fa21bscs0017@maju.edu.pk',
            subject: `New Standard Plains Form Submission from ${standardPlain.name}`,
            text: `
                Name: ${standardPlain.name}
                Email: ${standardPlain.email}
                Phone: ${standardPlain.phone}
                Company: ${standardPlain.company}
                Description: ${standardPlain.description}
            `
        };
        let ClientMailOptions = {
           from: 'fa21bscs0017@maju.edu.pk',
            to: standardPlain.email,
            subject: `Thanks  ${standardPlain.name} `,
            text: 'Thank you for your submission. Our team will contact you soon.'
            
        };

        // Send email
        await transporter.sendMail(ClientMailOptions);
        await transporter.sendMail(AdminmailOptions);


        return { success: true, message: 'Email sent successfully', data: Data };
    } catch (error) {
        logger.error('Error in standardPlainsService', error);
        throw error;
    }

}

const premiumPlainsService=async(premiumPlain)=>{
    try {
        logger.info('src > Service > PlainService > premiumPlainsService');
        const Data = await premiumPlainRepo(premiumPlain);
        console.log("Data in Servive",Data)
        let transporter = nodemailer.createTransport({
            service: 'gmail', // Replace with your email service
            auth: {
                user: 'fa21bscs0017@maju.edu.pk',
                pass: 'cxan vcqf dikr aqob'
            }
        });

        // Email options
        let AdminmailOptions = {
            from: 'fa21bscs0017@maju.edu.pk',
            to: 'fa21bscs0017@maju.edu.pk',
            subject: `New premium Plain  Form Submission from ${premiumPlain.name}`,
            text: `
                Name: ${premiumPlain.name}
                Email: ${premiumPlain.email}
                Phone: ${premiumPlain.phone}
                Company: ${premiumPlain.company}
                Description: ${premiumPlain.description}
            `
        };
        let ClientMailOptions = {
           from: 'fa21bscs0017@maju.edu.pk',
            to: premiumPlain.email,
            subject: `Thanks  ${premiumPlain.name} `,
            text: 'Thank you for your submission. Our team will contact you soon.'
            
        };

        // Send email
        await transporter.sendMail(ClientMailOptions);
        await transporter.sendMail(AdminmailOptions);


        return { success: true, message: 'Email sent successfully', data: Data };
    } catch (error) {
        logger.error('Error in premiumPlainsService', error);
        throw error;
    }


}
module.exports = {
    basicPlainsService,
    standardPlainsService,
    premiumPlainsService
}
