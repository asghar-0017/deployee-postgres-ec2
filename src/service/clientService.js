const dataSource = require("../infrastructure/psql");
const Client = require("../entities/clientEntity");

const clientRepository = dataSource.getRepository("Client");

const generateClientId = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit code
};

const getClientId = async (email, name) => {
  let client = await clientRepository.findOne({ where: { email } });

  if (!client) {
    const newClientId = generateClientId();
    client = clientRepository.create({ clientId: newClientId, email, name });
    await clientRepository.save(client);
  }


  return client.clientId;
};

const RandomId = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit code
};

module.exports = { getClientId,RandomId };
