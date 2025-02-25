'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, { foreignKey: 'customerId', targetKey: 'id', as: 'customerData' })
      Booking.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeTypeDataCustomer' })
    }
  };
  Booking.init({ //khong can khai bao primary key id
    statusId: DataTypes.STRING,
    staffId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    date: DataTypes.STRING,
    timeType: DataTypes.STRING,
    token: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};