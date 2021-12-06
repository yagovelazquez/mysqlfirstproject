const User = require('../models/User');
const bcrypt = require('bcrypt');



module.exports = {

 async auth (req, res)  {

const user = await User.findOne({ where: { email: req.body.email } });

if (user === null) {
    console.log('Not found!');
} else {
    console.log(user.password); 
 }   

const validPassword = await bcrypt.compare(req.body.password, user.password);
if (!validPassword) return res.status(400).send('Invalid email or password.');



  res.send(user);
}

}







