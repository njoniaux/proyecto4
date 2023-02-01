"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customer.init(
    {
      customerNumber: { type: DataTypes.STRING, primaryKey: true },
      customerName: DataTypes.STRING,
      contactLastName: DataTypes.STRING,
      contactFirstName: DataTypes.STRING,
      phone: DataTypes.STRING,
      addressLine1: DataTypes.STRING,
      addressLine2: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      country: DataTypes.STRING,
      salesRepEmployeeNumber: DataTypes.INTEGER,
      creditLimit: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "customer",
      timestamps: false,
    }
  );
  return customer;
};
