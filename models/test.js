module.exports = function defineModel(sequelize, DataTypes) {
  const Test = sequelize.define('Test', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Test;
};