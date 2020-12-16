import routerx from 'express-promise-router';
import CryptoController from '../controllers/CryptoController';
import auth from '../middlewares/auth';
const router = routerx();

router.get('/listall',auth.verifyUser,CryptoController.listall);
router.post('/add',CryptoController.useradd);
router.get('/listbyuser',auth.verifyUser,CryptoController.listbyuser);
router.delete('/remove',auth.verifyUser,CryptoController.remove);


export default router;
