const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.createNewUser = async (req, res) => {
  try {
    const { email, password, medical_records } = req.body;

    if (!email || !password) {
      res.sendStatus(400);
    }

    if (medical_records && medical_records.medication.length > 0) {
      for (const medication of medical_records.medication) {
        if (!medication.name || !medication.dose || !medication.frequency) {
          return res.sendStatus(400);
        }
      }
    }

    const existingUser = await User.getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.createUser({
      ...req.body,
      password: hashedPassword,
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

exports.getUserMedication = async (req, res) => {
  try {
    const id = req.user._id.toHexString();

    if (!id) {
      return res.sendStatus(400);
    }

    const user = await User.getUserById(id).select('+medical_records.medication');

    if (!user) {
      return res.sendStatus(400);
    }

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

exports.addUserMedication = async (req, res) => {
  try {
    const id = req.user._id.toHexString();
    const { name, dose, frequency } = req.body;

    if (!id) {
      return res.sendStatus(400);
    }

    if (!name || !dose || !frequency) {
      return res.sendStatus(400);
    }

    const user = await User.getUserById(id).select('+medical_records.medication');

    if (!user) {
      return res.sendStatus(400);
    }

    user.medical_records.medication.push({ name, dose, frequency });
    const userData = await user.save().then((data) => data.toObject());

    return res.status(200).json(userData).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

exports.updateUserMedication = async (req, res) => {
  try {
    const id = req.user._id.toHexString();

    const { name, dose, frequency } = req.body;

    if (!id || !name) {
      return res.sendStatus(400);
    }

    if (!dose && !frequency) {
      return res.sendStatus(400);
    }

    const user = await User.getUserById(id).select('+medical_records.medication');

    if (!user) {
      return res.sendStatus(400);
    }

    const medication = user.medical_records.medication.find(
      // eslint-disable-next-line no-underscore-dangle
      (med) => med.name === name,
    );

    if (!medication) {
      return res.sendStatus(400);
    }

    if (dose) {
      medication.dose = dose;
    }

    if (frequency) {
      medication.frequency = frequency;
    }

    const userData = await user.save().then((data) => data.toObject());

    return res.status(200).json(userData).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
