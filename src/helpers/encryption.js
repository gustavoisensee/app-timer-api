// https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcrypt');

// the cost of processing the data.
const saltRounds = 10;

const encrypt = (plainText) => {
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plainText, salt);
  
    return hash;
  } catch (e) {
    return null;    
  }
};

const compare = (plainText, hash) => {
  try {
    return bcrypt.compareSync(plainText, hash);
  } catch (e) {
    return null;
  }
};

module.exports = {
  encrypt,
  compare
};
