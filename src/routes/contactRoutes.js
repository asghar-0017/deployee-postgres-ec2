const {contactUs,allContactUsData,delContactUsById} = require('../controller/contactController');


const contactRoute = async(fastify) => {
    fastify.post('/contact-us', contactUs);
    fastify.get('/all-conatctUs-data',allContactUsData)
    fastify.delete('/contact-us/:id',delContactUsById)
};
module.exports = contactRoute;
