import {
  approveTax,
  assignTaxToOfficer,
  createTaxRecord,
  getOfficerTaxes,
  getTax,
  getTaxes,
  rejectTax,
  taxFinalApproval,
} from './tax.repository';
import sendUserMail from '../../helpers/mail';

class TaxService {
  /**
   * create tax record
   *
   * @static
   * @returns {json} json object with tax data
   * @param body
   * @memberOf TaxService
   */
  static async createTaxService(body) {
    const tax = await createTaxRecord(body);
    return tax;
  }

  /**
   * get taxes
   *
   * @static
   * @returns {json} json object with users data
   * @memberOf StaffService
   */
  static async getTaxes() {
    return getTaxes();
  }

  /**
   * get taxes
   *
   * @static
   * @returns {json} json object with users data
   * @memberOf StaffService
   */
  static async getOfficerTaxes(data) {
    return getOfficerTaxes(data);
  }

  /**
   * approve tax
   *
   * @static
   * @returns {json} json object with tax data
   * @param body
   * @memberOf TaxService
   */
  static async approveTax(body) {
    const tax = await approveTax(body);
    return tax;
  }

  /**
   * reject tax
   *
   * @static
   * @returns {json} json object with tax data
   * @param body
   * @memberOf TaxService
   */
  static async rejectTax(body) {
    const tax = await rejectTax(body);
    return tax;
  }

  /**
   * assign tax
   *
   * @static
   * @returns {json} json object with tax data
   * @param body
   * @memberOf TaxService
   */
  static async assignTaxToOfficer(body) {
    const { taxIds, staff_id } = body;
    await Promise.all(
      taxIds.map(async tax => {
        tax.staff_id = staff_id;
        await assignTaxToOfficer(tax);
        return tax;
      })
    );
    return getTaxes();
  }

  /**
   * chairman final tax approval
   *
   * @static
   * @returns {json} json object with tax data
   * @param body
   * @memberOf TaxService
   */
  static async chairmanTaxApproval(body) {
    const tax = await taxFinalApproval(body);
    await sendUserMail(tax.User, tax);
    return tax;
  }

  /**
   * get tax
   *
   * @static
   * @returns {json} json object with tax data
   * @memberOf StaffService
   */
  static async getTax(body) {
    return getTax(body);
  }
}

export default TaxService;
