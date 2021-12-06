/**
 * User controller handles all requests that has to do with users
 *
 * - getStaffs - get all users
 */
import StaffService from './staff.service';
import {validateCreateStaff, validateUserLogin} from './validations';

/**
 *
 *
 * @class StaffController
 */
class StaffController {
  /**
   * create a user record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, user data and access token
   */
  static async createStaff(req, res, next) {
    const { error } = validateCreateStaff(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const user = await StaffService.createStaffService(req.body);

      return res.status(201).json({
        message: 'Successful, account created!',
        data: user,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * login a user
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, user data and access token
   */
  static async loginStaff(req, res, next) {
    const { error } = validateUserLogin(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const { token, user } = await StaffService.staffLoginService(req.body);

      return res.status(200).json({
        message: 'Login successful!',
        token,
        data: user,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all users
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with users data
   */
  static async getStaffs(req, res, next) {
    try {
      const users = await StaffService.getStaffs(req.query);

      return res.status(200).json({
        message: 'Data retrieved',
        data: users,
      });
    } catch (e) {
      return next(e);
    }
  }
}
export default StaffController;
