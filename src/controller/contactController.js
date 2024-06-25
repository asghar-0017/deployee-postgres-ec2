const {contactUsService,dataInService,contactDataInService} = require('../service/contactService');
const { logger } = require('../../logger');
// const { ValidateContact } = require('../scheema/contactUsSchema');

const contactUs = async (request, reply) => {
    try {
        logger.info("src > controller > contactController > getDataFromUser");
        const clientData = request.body;
        console.log("Client in Controller", clientData);

        if (!clientData) {
            logger.error("ClientData is undefined");
            return reply.code(400).send({ error: "Invalid input" });
        }

        // const { error } = ValidateContact.validate(clientData);
        // console.log("Validate Error ", error);
        // if (error) {
        //     return reply.code(400).send({ error: error.details[0].message });
        // }

        const data = await contactUsService(clientData);
        reply.code(200).send({ success: "success", data: data });

    } catch (error) {
        logger.error("Error occurred during contact form submission:", error);
        reply.code(500).send({ error: "Internal Server Error" });
    }
};

const allContactUsData=async(request,reply)=>{
try{
    const data=await dataInService();

    if(data){
        reply.code(200).send({
            success:"success",
            data:data   
             })
    }else if(!data){
        reply.code(201).send({
            message:"Contact Data Not Found"
        })
    }

}catch(error){
throw error
}
}

const delContactUsById=async(request,reply)=>{
try{
    const id=request.params.id
    const contactData=await contactDataInService(id)
    if(contactData){
        reply.code(200).send({
          status:"succcess" ,
          data:contactData 
        })
    }else if(!contactData){
        reply.code(200).send({
            message:`Client Data not Found With ID ${id}`
        })
    }

}catch(error){
    throw error
}
}

module.exports = {contactUs,allContactUsData,delContactUsById};
