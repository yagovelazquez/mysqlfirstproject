const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.render("users");
  },




  async store(req, res) {
    const { name,birthday, email} = req.body;

    const findUser = await User.findOne({ where: { email}})
    if (findUser) return res.status(400).send('User already registered.');

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({ name, email, password, birthday });

    
    const token = User.generateAuthToken(user.id, user.isAdmin);

    return res.header('x-auth-token', token).json(user);

  },

  async getUserAfter(req, res) {
      
          
     const token = req.header('x-auth-token')

     if (!token) return res.status(401).send('Access denied. No token provided.');
  
     try {

       const decoded = await jwt.verify(token, '1312421431');


       const users = await User.findByPk(decoded.id,  {attributes: ['name', 'email', 'birthday']}); 

       if (!users) return res.status(400).send('Invalid user.');
   

       
     return  res.status(200).json(users.dataValues)
     }
     catch (ex) {
       res.status(400).send('Invalid token.');
     }

   

  },

  async getUser(req, res) {
           
  return res.render("me")

 },

  async testrender(req,res) {

 
 
    return res.render("test");
 
   },

  async test1(req,res,next) {
    
    req.dataProcesseds = `${req.body.email} + email final` 


   return next()

  },
  async test2(req,res) {

    let email = req.dataProcesseds;
    email = `${email} + email final duplo processado` 

    return res.json(email);

  
      
 }
};