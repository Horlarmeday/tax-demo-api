import bcrypt from 'bcryptjs';
import {
  createStaff,
  findUserByPhoneOrUsername,
  findUserByUsername,
  getUsers,
  searchUsers,
} from './staff.repository';
import APIError from '../../utils/apiError';

class StaffService {
  /**
   * create user account
   *
   * @static
   * @returns {json} json object with user data
   * @param body
   * @memberOf StaffService
   */
  static async createStaffService(body) {
    const user = await findUserByPhoneOrUsername({ phone: body.phone, username: body.username });
    if (user) throw new APIError('INVALID', 400, 'User already exists');

    return createStaff(body);
  }

  /**
   * login user account
   *
   * @static
   * @returns {json} json object with user data
   * @param body
   * @memberOf StaffService
   */
  static async staffLoginService(body) {
    const user = await findUserByUsername(body);
    if (!user) throw new APIError('INVALID', 400, 'Invalid username or password');

    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) throw new APIError('INVALID', 400, 'Invalid username or password');

    const token = user.generateAuthToken();

    return {
      token,
      user,
    };
  }

  /**
   * get users
   *
   * @static
   * @returns {json} json object with users data
   * @param body
   * @memberOf StaffService
   */
  static async getStaffs(body) {
    const { currentPage, pageLimit, search } = body;
    if (search) {
      return searchUsers(Number(currentPage), Number(pageLimit), search);
    }

    if (Object.values(body).length) {
      return getUsers(Number(currentPage), Number(pageLimit));
    }

    return getUsers();
  }
}
export default StaffService;
