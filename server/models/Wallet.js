export default function (sequelize, DataTypes) {
  const Wallet = sequelize.define('Wallet', {
    walletId: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    accountId: DataTypes.INTEGER,
  }, {
    associate: (models) => {
      Wallet.belongsTo(models.User, { foreignKey: 'accountId' });
      Wallet.belongsTo(models.Ad, { foreignKey: 'adId' });
    },
    tableName: 'wallet',
    timestamps: true
  });

  return Wallet;
}
