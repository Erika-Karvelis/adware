export default function (sequelize, DataTypes) {
  const Adrun = sequelize.define('Adrun', {
    runId: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    accountId: DataTypes.INTEGER,
    adId: DataTypes.INTEGER,
    runDateTime: DataTypes.DATE,
  }, {
    associate: (models) => {
      Adrun.belongsTo(models.User, { foreignKey: 'accountId' });
      Adrun.belongsTo(models.Ad, { foreignKey: 'adId' });
    },
    tableName: 'adrun',
    timestamps: false
  });

  return Adrun;
}
