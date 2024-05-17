const crypto = require('crypto');

exports.uid = (len) => crypto.randomBytes(len).toString('hex');
