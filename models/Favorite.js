const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


// create Favorite model
class Favorite extends Model {}


Favorite.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'recipe',
      key: 'id'
    }
}
},
{
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'favorite'
}
);

module.exports = Favorite;
