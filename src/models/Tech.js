const { Model, DataTypes } = require('sequelize');

class Tech extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'techs',
    })
  }

  static associate(models) {
    this.belongsToMany(models.User, { foreignKey: 'techId', through: 'userTechs', as: 'users' });
  }
}

module.exports = Tech;