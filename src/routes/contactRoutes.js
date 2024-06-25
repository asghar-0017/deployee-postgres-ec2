const {contactUs,allContactUsData,delContactUsById,updateContactUsById} = require('../controller/contactController');


const contactRoute = async(fastify) => {
    fastify.post('/contact-us', contactUs);

    fastify.get('/all-conatctUs-data',allContactUsData)
    fastify.delete('/contact-us/:id',delContactUsById)
    fastify.put('/contact-us/:id',updateContactUsById)
};
module.exports = contactRoute;
