'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff_Address_Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Staff_Address_Specialty.init({
    staffId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER,
    specialty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Staff_Address_Specialty',
  });
  return Staff_Address_Specialty;
};