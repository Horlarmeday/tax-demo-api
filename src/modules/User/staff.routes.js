import { Router } from 'express';
import StaffController from './staff.controller';
import verify from '../../middleware/verify';

const router = Router();
router.post('/', StaffController.createStaff);
router.post('/login', StaffController.loginStaff);
router.get('/', verify, StaffController.getStaffs);

export default router;
