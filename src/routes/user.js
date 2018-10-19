const userModel = require('../database/models/user');

const userRoute = (router) => {
  router
    .get('/user', (req, res) => {
      userModel.find({}, (err, users) => {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
      });
    })
    .post('/user', (req, res) => {
      const { name, email, password } = req.body;
      userModel.create({
        name,
        email,
        password
      }, 
      (err, user) => {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        res.status(200).send(user);
      });
    });
};

module.exports = userRoute;