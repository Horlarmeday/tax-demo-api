import { Router } from 'express';
import TaxController from './tax.controller';
import verify from '../../middleware/verify';

const router = Router();
router.post('/', TaxController.createTaxRecord);
router.post('/approve/:id', verify, TaxController.approveTax);
router.post('/final-approval', verify, TaxController.finalTaxApproval);
router.post('/reject/:id', verify, TaxController.rejectTax);
router.post('/assign', verify, TaxController.assignOfficer);
router.get('/', verify, TaxController.getTaxes);
router.get('/officer', verify, TaxController.getOfficerTaxes);
router.get('/:id', verify, TaxController.getTax);

export default router;
