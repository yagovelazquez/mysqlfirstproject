const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.render("users");
  },




  async store(req, res) {
    const { name,birthday, email} = req.body;

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({ name, email, password, birthday });
    return res.json(user);



  }
};