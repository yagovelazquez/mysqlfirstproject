const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      birthday: DataTypes.DATE
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: 'userId', as: 'addresses' });
    this.belongsToMany(models.Tech, { foreignKey: 'userId', through: 'userTechs', as: 'techs' });
  }
}

module.exports = User;