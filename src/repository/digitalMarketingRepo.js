const dataSource = require("../infrastructure/psql");
const { logger } = require("../../logger");
const digitalMarketingRepository = dataSource.getRepository("digital_marketing");

const  digitalMarketingRepo = async (ClientData) => {
    try {
        const data = digitalMarketingRepository.create(ClientData);
        logger.info("src > repository > digitalMarketingRepository > digitalMarketingRepo", data);
        const result = await digitalMarketingRepository.save(data);
        logger.info("Save contactRepository Data", result);
        return result;
    } catch (error) {
        throw error;
    }
};

const allDigitalMarketingDataInRepo=async()=>{
    try{
        const data=digitalMarketingRepository.find()
        if(data){
            return data
        }else{
            return null
        }
    
    }catch(error){
    throw error
    }
    }
    
    const findDigitalMarketingByIdRepo=async(id)=>{
    try{
        const data=await digitalMarketingRepository.findOne({where:{id}})
        if(data){
            const deletedata=await digitalMarketingRepository.remove(data)
            if(deletedata){
                return `client is Deleted Successfully with id ${id}`
            } 
        }
    
    }catch(error){
        throw error
    
    }
    }
const updateDigitalDataInRepo=async(id,clientData)=>{
    try{
        const data=await digitalMarketingRepository.findOne({where:{id}})
    if(!data){
        return "Data Not Found"
    }
    if(data){
      const UpdatedResult=  await digitalMarketingRepository.update({id},clientData)
      if(UpdatedResult){
        const UpdatedData=await digitalMarketingRepository.find({where:{id}})
        return UpdatedData

      }

      
    }

}catch(error){
    throw error
}

}

module.exports = {digitalMarketingRepo,allDigitalMarketingDataInRepo,findDigitalMarketingByIdRepo,updateDigitalDataInRepo};
