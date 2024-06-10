const {basicPlainsService,standardPlainsService,premiumPlainsService} = require('../service/PlainsService');
const { logger } = require('../../logger');
const { ValidateBasicPlains, ValidateStandardPlains , ValidatePremiumPlains } = require('../scheema/PlainsSchema');
const { err } = require('pino-std-serializers');

const basicPlains = async (request, reply) => {
    try {
        logger.info("src > controller > PlainController > basicPlains");
        const basicPlain = request.body;
        console.log("BasicPlains Data in Controller", basicPlain);

        if (!basicPlain) {
            logger.error("basicPlain is undefined");
            return reply.code(400).send({ error: "Invalid input" });
        }

        const { error } = ValidateBasicPlains.validate(basicPlain);
        console.log("Validate Error ", error);
        if (error) {
            return reply.code(400).send({ error: error.details[0].message });
        }

        const data = await basicPlainsService(basicPlain);
        reply.code(200).send({ success: "success", data: data });

    } catch (error) {
        logger.error("Error occurred during basicPlain form submission:", error);
        reply.code(500).send({ error: "Internal Server Error" });
    }
};


const standardPlains = async (request, reply) => {
    try {
        logger.info("src > controller > PlainController > standardPlains");
        const standardPlain = request.body;
        console.log("standardPlains Data in Controller", standardPlain);

        if (!standardPlain) {
            logger.error("standardPlains is undefined");
            return reply.code(400).send({ error: "Invalid input" });
        }

        const { error } = ValidateStandardPlains.validate(standardPlain);
        console.log("Validate Error ", error);
        if (error) {
            return reply.code(400).send({ error: error.details[0].message });
        }

        const data = await standardPlainsService(standardPlain);
        console.log("After Data in Controller", data)
        reply.code(200).send({ success: "success", data: data });

    } catch (error) {
        logger.error("Error occurred during standardPlainsService form submission:", error);
        throw error;
    }
}

const premiumPlains=async(request,reply)=>{
    try {
        logger.info("src > controller > PlainController > premiumPlains");
        const premiumPlain = request.body;
        console.log("premiumPlain Data in Controller", premiumPlain);

        if (!premiumPlain) {
            logger.error("premiumPlain is undefined");
            return reply.code(400).send({ error: "Invalid input" });
        }

        const { error } = ValidatePremiumPlains.validate(premiumPlain);
        console.log("Validate Error ", error);
        if (error) {
            return reply.code(400).send({ error: error.details[0].message });
        }
        premiumPlain.functionalities = JSON.stringify(premiumPlain.functionalities);

        const data = await premiumPlainsService(premiumPlain);
        console.log("After Data in Controller", data)
        reply.code(200).send({ success: "success", data: data });

    } catch (error) {
        logger.error("Error occurred during premiumPlainsService form submission:", error);
        throw error;
    }

}
module.exports = {
    basicPlains,
    standardPlains,
    premiumPlains

}
