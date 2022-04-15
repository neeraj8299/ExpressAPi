const BaseService = require("./BaseService");
const UserRepository = require("../repositories/UserRepository");

class UserService extends BaseService {
  constructor() {
    super();
    this.repository = new UserRepository();
  }

  /**
   *
   * @returns
   */
  authenticateUser = async (data) => {
    try {
      var loginResponse = await(this.repository.authenticateUser(data));
      return loginResponse;
    } catch (e) {
      //
    }
  };

  /**
   * get user listing
   */
  getUserListing = async (id) => {
    return (await this.repository.getUserListing(id)).response;
  };

  /**
   * Save User Data
   */
  saveUserData = async (userData) => {
    return (await this.repository.saveUserData(userData)).message;
  };

  /**
   * update user data
   */
  updateUserData = async (userData) => {
    return (await this.repository.updateUserData(userData)).message;
  };

  /**
   * delete user data
   */
  deleteUserData = async (userId) => {
    return (await this.repository.deleteUserData(userId)).message;
  };
}

module.exports = UserService;
