import crypto from 'crypto';
import config from '../config';

export const encrypt = (plainText) => {
  try {
    const hash = crypto.createHmac('sha256', config.app.cryptoSecret)
      .update(plainText)
      .digest('hex');
  
    return hash;
  } catch (e) {
    return null;    
  }
};

export const compare = (plainText: string, hash: string) => {
  try {
    return encrypt(plainText) === hash;
  } catch (e) {
    return null;
  }
};
