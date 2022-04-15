const BaseRepository = require("./BaseRepository");
const { Sequelize, Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const sequelize = new Sequelize("chatapp", "root", null, {
  host: "127.0.0.1",
  dialect: "mysql",
});

const User = require("../models/user")(sequelize, Sequelize.DataTypes);
var bcryptjs = require("bcryptjs");

class UserRepository extends BaseRepository {
  constructor() {
    super();
  }

  /**
   *
   * @returns
   */
  authenticateUser = async (data) => {
    let { email, password } = data;

    var statusCode = 401;
    var message = "Invalid Credentials";
    var response = await User.findOne({
      where: [{ email: email }],
    });
    if (response) {
      var checkPassword = await bcryptjs.compare(password, response.password);
      if (checkPassword) {
        statusCode = 200;
        message = {
          msg: "Logged In SuccessFully",
          token: jwt.sign(
            {
              id: response.id,
              email: email,
            },
            "abcd",
            { expiresIn: "7d" }
          ),
        };
      }
    }

    return {
      statusCode: statusCode,
      message: message,
    };
  };

  /**
   * get user listing
   */
  getUserListing = async (id) => {
    var response = await User.findAll({
      attributes: ["id", "name", "email", "createdAt", "updatedAt"],
      where: {
        [Op.not]: [{ id: id }],
      },
    });
    return {
      response: response,
    };
  };

  /**
   * Save User Data
   */
  saveUserData = async (userData) => {
    await User.create({
      name: userData.name,
      email: userData.email,
      password: await bcryptjs.hash(userData.password, 12),
    });

    return {
      message: "User Added Successfully.",
    };
  };

  /**
   * update user data
   */
  updateUserData = async (userData) => {
    var id = userData.id;
    delete userData.id;

    if ("password" in userData) {
      userData.password = await bcryptjs.hash(userData.password, 12);
    }
    await User.update(userData, {
      where: {
        id: id,
      },
    });

    return {
      message: "User Updated Succesfully.",
    };
  };

  /**
   * delete user data
   */
  deleteUserData = async (userId) => {
    await User.destroy({
      where: {
        id: userId,
      },
    });
    return {
      message: "User Deleted Successfully.",
    };
  };
}

module.exports = UserRepository;
