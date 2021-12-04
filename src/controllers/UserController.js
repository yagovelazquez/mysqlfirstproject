const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.render("users");
  },




  async store(req, res) {
    const { name,password,birthday, email } = req.body;


    try {
        const user = await User.create({ name, email, password, birthday });
        return res.json(user);

        
    } catch (error) {
        console.log(error)
        return res.json('haha')
        
    }

  }
};