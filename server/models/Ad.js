export default function (sequelize, DataTypes) {
  const Ad = sequelize.define('Ad', {
    adId: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    accountId: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    Link: DataTypes.STRING,
    Url: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  }, {
    associate: (models) => {
      Ad.belongsTo(models.User, { foreignKey: 'accountId' });
      Ad.hasMany(models.Click, { foreignKey: 'adId' });
    },
    tableName: 'ad',
    timestamps: true,
    paranoid: true
  });

  return Ad;
}
