const nodemailer = require('nodemailer');
const {contactUsRepo,allContactUsDataInRepo,findContactByIdRepo,updateDataInRepo,SaveDataInRepo} = require('../repository/contactRepository');
const { logger } = require('../../logger');
const dotenv = require("dotenv");
dotenv.config();

const contactUsService = async (clientData) => {
    try {
        logger.info('src > Service > contactService > getDataFromUser');

        const contactDataInService = await contactUsRepo(clientData);
        console.log("Data in service",contactDataInService)

        logger.debug('Email Credentials:', { user: process.env.EMAIL, pass: process.env.EMAIL_PASS });

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        });

        let adminMailOptions = {
            from: `Softmark Solutions <${process.env.SALES_EMAIL}>`, 
            to: `${process.env.SALES_EMAIL}`,
            subject: `New Contact Form Submission from ${clientData.name}`,
            text: `
                Name: ${clientData.name}
                Email: ${clientData.email}
                Phone: ${clientData.phone}
                Company: ${clientData.company}
                Service Type: ${clientData.serviceType}
                Message: ${clientData.message}
                website: ${clientData.website}
            `
        };
         const clientMailOptions = {
            from: `Softmark Solutions <${process.env.SALES_EMAIL}>`, 
            to: clientData.email,
            subject: `Thanks ${clientData.name}`,
            text: 'Thank you for your submission. Our team will contact you soon.',
          };

        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(clientMailOptions);

        return { success: true, message: 'Email sent successfully', contactDataInService };
    } catch (error) {
        throw error;
    }
};

const dataInService=async()=>{
try{
    const data=await allContactUsDataInRepo();
    return data
}catch(error){
    throw error
}
}

const contactDataInService=async(id)=>{
    try{
    const data=await findContactByIdRepo(id)
    return data

    }catch(error){
        throw error
    }
}

const updateContactInService=async(id,clientData)=>{
    try{
        const data=await updateDataInRepo(id,clientData)
        return data

    }catch(error){
        throw error
    }

}

const GetProposalController=async(email)=>{
    try{
        const data = await SaveDataInRepo(email)
        return data
    }catch(error){
        throw error
    }
}
module.exports = {contactUsService,dataInService,contactDataInService,updateContactInService,GetProposalController}
