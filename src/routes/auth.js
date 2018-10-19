const jwt = require('jsonwebtoken');
const userModel = require('../database/models/user');
const config = require('./../config');

const authRoute = (router) => {
	router
		.post('/auth', (req, res) => {
      const { email, password } = req.body;

      userModel.find({ email, password }, (err) => {
        if (err) return res.status(500).send("There was a problem finding the users.");
        
        const token = jwt.sign(
          { email, password },
          config.secret,
          {
            expiresIn: config.expiresToken
          }
        );
        res.status(200).json({ token });
      });
    })

    .get('*', (req, res, next) => {
      console.log('--- Check authentication');
      next();
    });
};

module.exports = authRoute;
