import routerx from 'express-promise-router';
import UserController from '../controllers/UserController';
import auth from '../middlewares/auth';
const router = routerx();

router.post('/add',UserController.add);
router.put('/update',auth.verifyUser, UserController.update);
router.delete('/remove',auth.verifyUser,UserController.remove);
router.post('/login',UserController.login);

export default router;
