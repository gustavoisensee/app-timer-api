const crypto = require('crypto');
const {
  app: appConfig,
} = require('../config');

const encrypt = (plainText) => {
  try {
    const hash = crypto.createHmac('sha256', appConfig.cryptoSecret)
      .update(plainText)
      .digest('hex');
  
    return hash;
  } catch (e) {
    return null;    
  }
};

const compare = (plainText, hash) => {
  try {
    return encrypt(plainText) === hash;
  } catch (e) {
    return null;
  }
};

module.exports = {
  encrypt,
  compare
};
