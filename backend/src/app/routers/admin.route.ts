import Express from 'express';

//* CONTROLLERS
import ADMIN_CONTROLLER from '../controllers/admin.controller';

//* MIDDLEWARE
import ADMIN_MIDDLEWARE from '../share/middleware/access.admin.middleware'

const router = Express.Router();

router.get('/get-all-admin',ADMIN_MIDDLEWARE.accessAdminMiddle , ADMIN_CONTROLLER.getAllAdmin);
router.get('/profile', ADMIN_MIDDLEWARE.accessAdminMiddle, ADMIN_CONTROLLER.getProfile )
router.post('/register-admin,', ADMIN_CONTROLLER.registerAdmin);
router.post('/register-customer', ADMIN_CONTROLLER.registerCustomer);
router.post('/login-admin', ADMIN_CONTROLLER.loginAdmin)
router.post('/logout', ADMIN_CONTROLLER.logoutAdmin)
router.get('/renew-token', ADMIN_CONTROLLER.renewToken)
export default router;