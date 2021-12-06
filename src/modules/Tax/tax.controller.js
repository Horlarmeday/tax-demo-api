import { validateApproveTax, validateAssignOfficer, validateCreateTax } from './validation';
import TaxService from './tax.service';

class TaxController {
  /**
   * create tax record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, tax data
   */
  static async createTaxRecord(req, res, next) {
    const { error } = validateCreateTax(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const tax = await TaxService.createTaxService(req.body);

      return res.status(201).json({
        message: 'Successful, data submitted!',
        data: tax,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all taxes
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with taxes data
   */
  static async getTaxes(req, res, next) {
    try {
      const taxes = await TaxService.getTaxes();

      return res.status(200).json({
        message: 'Data retrieved',
        data: taxes,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all taxes
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with taxes data
   */
  static async getOfficerTaxes(req, res, next) {
    try {
      const taxes = await TaxService.getOfficerTaxes(req.user.sub);

      return res.status(200).json({
        message: 'Data retrieved',
        data: taxes,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * approve tax
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, tax
   */
  static async approveTax(req, res, next) {
    const { error } = validateApproveTax(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const data = { officer_remarks: req.body.officer_remarks, id: req.params.id };
    try {
      const tax = await TaxService.approveTax(data);

      return res.status(200).json({
        message: 'Tax Approved',
        data: tax,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * approve tax
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, tax
   */
  static async rejectTax(req, res, next) {
    const { error } = validateApproveTax(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const data = { officer_remarks: req.body.officer_remarks, id: req.params.id };

    try {
      const tax = await TaxService.rejectTax(data);

      return res.status(200).json({
        message: 'Tax Rejected',
        data: tax,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * approve tax
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, tax
   */
  static async finalTaxApproval(req, res, next) {
    try {
      const tax = await TaxService.chairmanTaxApproval(req.body.id);

      return res.status(200).json({
        message: 'Tax Approved',
        data: tax,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * approve tax
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status, tax
   */
  static async assignOfficer(req, res, next) {
    const { error } = validateAssignOfficer(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const data = { staff_id: req.body.staff_id, taxIds: req.body.taxIds };

    try {
      const tax = await TaxService.assignTaxToOfficer(data);

      return res.status(200).json({
        message: 'Tax Assigned',
        data: tax,
      });
    } catch (e) {
      return next(e);
    }
  }

  /**
   * get all tax
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with tax data
   */
  static async getTax(req, res, next) {
    try {
      const tax = await TaxService.getTax(req.params.id);

      return res.status(200).json({
        message: 'Data retrieved',
        data: tax,
      });
    } catch (e) {
      return next(e);
    }
  }
}

export default TaxController;
