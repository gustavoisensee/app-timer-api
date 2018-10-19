const userModel = require('../database/models/user');

const userRoute = (router) => {
  router
    .get('/user', (req, res) => {
      userModel
        .find({})
        .then(result => {
          res.status(200).send(result);
        })
        .catch(() =>
          res.status(500).send("There was a problem finding the users.")
        );
    })
    .post('/user', (req, res) => {
      const { name, email, password } = req.body;
      userModel
        .find({ email, password })
        .then(result => {
          if (result.length > 0) return res.status(409).send('User already exist.')

          userModel
            .create({ name, email, password})
            .then(response => {
              res.status(200).send(response);
            })
            .catch(() => res.status(500).send('Error creating the user'));
        })
        .catch(() => res.status(500).send('Error checking the user'));
    });
};

module.exports = userRoute;