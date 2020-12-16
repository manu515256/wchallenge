import routerx from 'express-promise-router';
import CryptoRouter from './crypto'
import UserRouter from './user';
const router = routerx();

router.use('/crypto',CryptoRouter);
router.use('/user',UserRouter);

export default router;