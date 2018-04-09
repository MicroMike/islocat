import { Router } from 'express';
import * as PropertyController from './controllers/property';
const router = new Router();

router.route('/init').get(PropertyController.init);
router.route('/property/getPropertyData').get(PropertyController.getPropertyData);

export default router;
