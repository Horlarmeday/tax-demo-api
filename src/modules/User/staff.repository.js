import { Sequelize } from 'sequelize';

const { Staff } = require('../../database/models');

const { Op } = Sequelize;

/**
 * Save user details to the DB
 *
 * @function
 * @returns {json} json object with user data
 * @param data
 */
export async function createStaff(data) {
  const { name, email, password, role, phone, username } = data;
  return Staff.create({
    name,
    email,
    password,
    role,
    phone,
    username,
  });
}

/**
 * query user details in the DB by phone or username
 *
 * @function
 * @returns {json} json object with user data
 * @param data
 */
export async function findUserByPhoneOrUsername(data) {
  return Staff.findOne({
    where: { [Op.or]: [{ phone: data.phone }, { username: data.username }] },
  });
}

/**
 * query user account in the DB by username
 *
 * @function
 * @returns {json} json object with user data
 * @param data
 */
export async function findUserByUsername(data) {
  return Staff.findOne({ where: { username: data.username } });
}

/**
 * query user account in the DB by phone
 *
 * @function
 * @returns {json} json object with user data
 * @param data
 */
export async function findUserByPhone(data) {
  return Staff.findOne({ where: { phone: data.phone } });
}

/**
 * query user account in the DB by user id
 *
 * @function
 * @returns {json} json object with user data
 * @param data
 */
export async function getUserById(data) {
  return Staff.findByPk(data);
}

/**
 * get users
 *
 * @function
 * @returns {json} json object with users data
 * @param currentPage
 * @param pageLimit
 */
export async function getUsers(currentPage = 1, pageLimit = 10) {
  return Staff.paginate({
    page: currentPage,
    paginate: pageLimit,
    where: {
      role: 'Officer',
    },
    order: [['createdAt', 'DESC']],
    attributes: { exclude: ['password'] },
  });
}

/**
 * search users
 *
 * @function
 * @returns {json} json object with users data
 * @param currentPage
 * @param pageLimit
 * @param search
 */
export async function searchUsers(currentPage = 1, pageLimit = 10, search) {
  return Staff.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    attributes: { exclude: ['password'] },
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          role: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          username: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${search}%`,
          },
        },
        {
          phone: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },
  });
}
