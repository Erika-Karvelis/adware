// import md5 from 'md5';

export default function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    accountId: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    userName: DataTypes.STRING,
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
    },
  }, {
    classMethods: {
      encryptPassword: password => (password)
    },
    instanceMethods: {
      authenticate(password) {
        return (password) === this.password;
      },
      is: type => (this.role === type)
    },
    associate: (models) => {
      User.hasMany(models.Ad, { foreignKey: 'accountId' });
      User.hasMany(models.Click, { foreignKey: 'accountId' });
      User.hasMany(models.Adrun, { foreignKey: 'accountId' });
    },
    tableName: 'user',
    timestamps: true,
    paranoid: true
  });

  return User;
}
