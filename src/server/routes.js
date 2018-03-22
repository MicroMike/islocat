import { Router } from 'express';
import * as PropertyController from './controllers/property';
const router = new Router();

router.route('/property/getPropertyType').get(PropertyController.getPropertyType);

export default router;
