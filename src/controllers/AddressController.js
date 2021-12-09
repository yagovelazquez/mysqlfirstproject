const User = require('../models/User');
const Address = require('../models/Address');
const jwt = require('jsonwebtoken');

module.exports = {
  async indexs(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { association: 'addresses' }
    });

    return res.json(user.addresses);
  },
  async getAddressAfter(req, res) {

    const token = req.header('x-auth-token')

    if (!token) return res.status(401).send('Access denied. No token provided.');
    
    try {
      

      const decoded = await jwt.verify(token, '1312421431');

      console.log(decoded.id)



      const Addresses = await Address.findAll({
       where: {
         userId: decoded.id
       },
     attributes: ['zipcode', 'street', 'number']}); 

      if (Addresses.length === 0) return res.status(404).json({error: "You don't have any address registered"});
      
  

      
    return  res.status(200).json({address: 'haha'})
    }
    catch (ex) {
      res.status(400).json({error: 'Invalid Token'});
    }

  

 


   // return res.json({token: token});
  },

  async getAddress(req, res) {
           
    return res.render("address")
  
   },


  async store(req, res) {
    const { user_id } = req.params;
    const { zipcode, street, number } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const address = await Address.create({
      zipcode,
      street,
      number,
      user_id,
    });

    return res.json(address);
  }
};