const getToken = (req) => {
  const authorization = (req && req.headers && req.headers.authorization) || '';
  const authorizationSplit = authorization.split(' ');
  
  if (
    authorizationSplit.length === 2 &&
    authorizationSplit[0] === 'Bearer'
  ) return authorizationSplit[1];
  return null;
};

module.exports = getToken;