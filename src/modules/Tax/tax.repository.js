import { Sequelize } from 'sequelize';

const { User, Tax, Income } = require('../../database/models');

const { Op } = Sequelize;

const db = require('../../database/models/index');

/**
 * query tax record in the DB by user id
 *
 * @function
 * @returns {json} json object with user data
 * @param data
 */
export async function getUserByPhone(data) {
  return User.findOne({ where: { phone: data } });
}

/**
 * create tax record
 *
 * @function
 * @returns {json} json object with user data
 * @param data
 */
export async function createTaxRecord(data) {
  const { name, email, phone, address, source_of_income, incomes, tin } = data;
  const existingUser = await getUserByPhone(phone);
  let user;

  const result = await db.sequelize.transaction(async t => {
    if (!existingUser) {
      user = await User.create(
        {
          name,
          email,
          phone,
          address,
          tin,
        },
        { transaction: t }
      );
    }

    const tax = await Tax.create(
      {
        user_id: user ? user.id : existingUser.id,
        source_of_income,
      },
      { transaction: t }
    );

    const mapIncome = incomes.map(income => ({
      tax_id: tax.id,
      income: income.income,
      amount_tax_paid: income.amount_tax_paid,
      year: income.year,
    }));

    await Income.bulkCreate(mapIncome, { transaction: t });
    return tax;
  });
  return result;
}

/**
 * get taxes
 *
 * @function
 * @returns {json} json object with taxes data
 * @param currentPage
 * @param pageLimit
 */
export async function getTaxes(currentPage = 1, pageLimit = 10) {
  return Tax.paginate({
    page: currentPage,
    paginate: pageLimit,
    order: [['createdAt', 'DESC']],
    include: [{ model: User, attributes: ['name', 'phone'] }],
  });
}

/**
 * get taxes
 *
 * @function
 * @returns {json} json object with taxes data
 * @param data
 */
export async function getOfficerTaxes(data) {
  return Tax.findAll({
    order: [['createdAt', 'DESC']],
    where: {
      officer_assigned_to: data,
    },
    include: [{ model: User, attributes: ['name', 'phone'] }],
  });
}

/**
 * query tax record in the DB by user id
 *
 * @function
 * @returns {json} json object with user data
 * @param data
 */
export async function getTaxById(data) {
  return Tax.findByPk(data);
}

/**
 * approve tax
 *
 * @function
 * @returns {json} json object with tax data
 * @param data
 */
export async function approveTax(data) {
  const tax = await getTaxById(data.id);
  return tax.update({ officer_approval_status: 'Approved', officer_remarks: data.officer_remarks });
}

/**
 * reject tax
 *
 * @function
 * @returns {json} json object with user data
 * @param data
 */
export async function rejectTax(data) {
  const tax = await getTaxById(data.id);
  return tax.update({ officer_approval_status: 'Declined', officer_remarks: data.officer_remarks });
}

/**
 * final tax approval by chairman
 *
 * @function
 * @returns {json} json object with tax data
 * @param data
 */
export async function taxFinalApproval(data) {
  const tax = await getTaxById(data);
  await tax.update({ final_approval: true });
  return Tax.findOne({ where: { id: tax.id }, include: [{ model: User }] });
}

/**
 * assign tax to officer
 *
 * @function
 * @returns {json} json object with tax data
 * @param data
 */
export async function assignTaxToOfficer(data) {
  const tax = await getTaxById(data.id);
  return tax.update({ officer_assigned_to: data.staff_id });
}

/**
 * query tax record in the DB by user id
 *
 * @function
 * @returns {json} json object with user data
 * @param data
 */
export async function getTax(data) {
  return Tax.findOne({ where: { id: data }, include: [{ model: Income }, { model: User }] });
}
