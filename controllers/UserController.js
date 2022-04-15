"use strict";
const BaseController = require("./BaseController");
const UserService = require("../services/UserService");

class UserController extends BaseController {
  constructor() {
    super();
    this.service = new UserService();
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  login = async (req, res, next) => {
    try {
      var userData = req.body;
      var loginResponse = await this.service.authenticateUser(userData);
      var statusCode = loginResponse.statusCode;
      delete loginResponse.statusCode;

      res.status(statusCode).json({
        data: loginResponse,
      });
    } catch (e) {
      next(e);
    }
  };

  /**
   * Get All User Listing
   * @param
   * @returns
   */
  index = async (req, res, next) => {
    try {
      var id = 2;
      var userData = await this.service.getUserListing(id);
      res.json({
        data: userData,
      });
    } catch (e) {
      next(e);
    }
  };

  /**
   * Add New User Details
   * @param
   * @returns
   */
  store = async (req, res, next) => {
    try {
      var userData = req.body;
      var response = await this.service.saveUserData(userData);
      res.json({
        data: {
          message: response,
        },
      });
    } catch (e) {
      next(e);
    }
  };

  /**
   * Update User Details
   */
  update = async (req, res, next) => {
    try {
      var userData = req.body;

      var response = await this.service.updateUserData(userData);
      res.json({
        data: {
          message: response,
        },
      });
    } catch (e) {
      next(e);
    }
  };

  /**
   * Delete User Details
   */
  destroy = async (req, res, next) => {
    try {
      var userId = req.body.id;

      var response = await this.service.deleteUserData(userId);
      res.json({
        data: {
          message: response,
        },
      });
    } catch (e) {
      next(e);
    }
  };
}

module.exports = UserController;
