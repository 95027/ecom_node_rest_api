"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ModelHasPermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ModelHasPermission.init(
    {
      modelType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      modelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ModelHasPermission",
    }
  );
  return ModelHasPermission;
};
