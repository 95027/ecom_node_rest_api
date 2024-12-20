'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ModelHasRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ModelHasRole.init({
    modelType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ModelHasRole',
  });
  return ModelHasRole;
};