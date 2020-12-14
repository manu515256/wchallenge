import routerx from 'express-promise-router';
import CryptoController from '../controllers/CryptoController';
import auth from '../middlewares/auth';
const router = routerx();

router.get('/list',auth.verifyUser,CryptoController.list);
router.post('/add',CryptoController.useradd);
router.get('/listbyuser',auth.verifyUser,CryptoController.listbyuser);


export default router;
