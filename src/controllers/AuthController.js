const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports = {

 async auth (req, res)  {

  if (!req.body.email  || !req.body.password) {
    return  res.status(400).json({error:'Please inform your email/password'});
  }  

const user = await User.findOne({ where: { email: req.body.email } });

if (user === null)  return res.status(400).json({error:'Invalid username/password'});   

const validPassword = await bcrypt.compare(req.body.password, user.password);
if (!validPassword) return res.status(400).json({error:'Invalid username/password'});

const token = User.generateAuthToken(user.id, user.isAdmin);

return res.status(200).json({token, id: user.id})

},

async authTest (req, res)  {

    
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');
  
    try {
      const decoded = await jwt.verify(token, '1312421431');
      req.user = decoded; 
      res.send(decoded)
    }
    catch (ex) {
      res.status(400).send('Invalid tokens.');
    }

    
    
    },

async login (req,res) {
    return res.render("login");
},

 foo (req,res) {
  return res.send("FUDEU");
}

}







