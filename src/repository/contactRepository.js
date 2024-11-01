const dataSource = require("../infrastructure/psql");
const { logger } = require("../../logger");
const { err } = require("pino-std-serializers");
const { error } = require("ajv/dist/vocabularies/applicator/dependencies");
const contactRepository = dataSource.getRepository("contactUs");
const getAProposalRepo = dataSource.getRepository('get-A-Proposal')

const contactUsRepo = async (ClientData) => {
    try {
        const data = contactRepository.create(ClientData);
        logger.info("src > repository > contactRepository > contactUsRepo", data);
        const result = await contactRepository.save(data);
        logger.info("Save contactRepository Data", result);
        return result;
    } catch (error) {
        throw error;
    }
};

const allContactUsDataInRepo=async()=>{
try{
    const data=contactRepository.find()
    if(data){
        return data
    }else{
        return null
    }

}catch(error){
throw error
}
}

const findContactByIdRepo=async(id)=>{
try{
    const data=await contactRepository.findOne({where:{id}})
    if(data){
        const deletedata=await contactRepository.remove(data)
        if(deletedata){
            return `client is Deleted Successfully with id ${id}`
        } 
    }

}catch(error){
    throw error

}
}

const updateDataInRepo=async(id,clientData)=>{
    try{
        const data=await contactRepository.find({where:{id}})
        if(!data){
            return "Data Not Found"
        }
        if(data){
          const UpdatedResult=  await contactRepository.update({id},clientData)
          if(UpdatedResult){
            const UpdatedData=await contactRepository.find({where:{id}})
            return UpdatedData

          }
        }
    }catch(error){
        throw error
    }

}

const SaveDataInRepo = async (email) => {
    try {
      const data = getAProposalRepo.create({ email });
      console.info("SaveDataInRepo:", data);
      const result = await getAProposalRepo.save(data);
      console.info("Saved GetAProposal Email:", result);
      return result;
    } catch (error) {
      console.error("Error in SaveDataInRepo:", error);
      throw error;
    }
  };
module.exports = {contactUsRepo,allContactUsDataInRepo,findContactByIdRepo,updateDataInRepo,SaveDataInRepo};
