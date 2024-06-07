const contactUs = require('../controller/contactController');


const contactRoute = async(fastify) => {
    fastify.post('/contact-us', contactUs);
};
module.exports = contactRoute;
