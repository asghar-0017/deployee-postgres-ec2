const {contactUs,allContactUsData,delContactUsById,updateContactUsById,GetAProposal} = require('../controller/contactController');


const contactRoute = async(fastify) => {
    fastify.post('/contact-us', contactUs);
    fastify.get('/all-conatctUs-data',allContactUsData)
    fastify.delete('/contact-us/:id',delContactUsById)
    fastify.put('/contact-us/:id',updateContactUsById)

    fastify.post('/get-a-proposal',GetAProposal)
};
module.exports = contactRoute;
