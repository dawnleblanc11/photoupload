const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
//const bcrypt = require("bcrypt");
// create our User model
class User extends Model {}
// set up method to run on instance data (per user) to check password
//  checkPassword(loginPw) {
//    return bcrypt.compareSync(loginPw, this.password);
//  }
//}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_image: {
      type: DataTypes.STRING,
    },
    job_title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
