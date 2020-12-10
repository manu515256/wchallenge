import routerx from 'express-promise-router';
import UserRouter from './user';
const router = routerx();


router.use('/user',UserRouter);



export default router;