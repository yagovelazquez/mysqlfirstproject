const { Model, DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      birthday: DataTypes.DATE,
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
        }
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: 'userId', as: 'addresses' });
    this.belongsToMany(models.Tech, { foreignKey: 'userId', through: 'userTechs', as: 'techs' });
  }

  static generateAuthToken = function(id, isAdmin) { 
    const token = jwt.sign({ id, isAdmin,exp: Math.floor(Date.now() / 1000) + (60*60)}, '1312421431');
    return token;
  }


}

module.exports = User;