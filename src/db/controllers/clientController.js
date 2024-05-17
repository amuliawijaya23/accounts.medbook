const Client = require('../models/Client');

const { uid } = require('../../helpers');

exports.createNewClient = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const existingClient = await Client.getClientByName(name);

    if (existingClient) {
      return res.sendStatus(400);
    }

    const clientId = uid(10);
    const clientSecret = uid(16);

    const client = await Client.createClient({ name, clientId, clientSecret });

    return res.status(200).json(client).end();
  } catch (error) {
    return res.sendStatus(500);
  }
};
