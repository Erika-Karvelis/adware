export default function (sequelize, DataTypes) {
  const Click = sequelize.define('Click', {
    clickId: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    adId: DataTypes.INTEGER,
    likeAddress: DataTypes.STRING
  }, {
    associate: (models) => {
      Click.belongsTo(models.User, { foreignKey: 'accountId' });
      Click.belongsTo(models.Ad, { foreignKey: 'adId' });
    },
    tableName: 'click',
    timestamps: true,
    updatedAt: false
  });

  return Click;
}
