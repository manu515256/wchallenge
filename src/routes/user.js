import routerx from 'express-promise-router';
import UserController from '../controllers/UserController';
const router = routerx();

router.post('/add',UserController.add);
router.post('/login',UserController.login);


export default router;
