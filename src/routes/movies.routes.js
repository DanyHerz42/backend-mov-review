import {Router} from 'express';
const router = Router();
import {verifyToken, isAdminTwo} from '../middlewares/jwt.auth';
import {create, listAll} from '../controllers/movies.controller'

router.post('/create-movie', [verifyToken, isAdminTwo], create);
router.get('/list-all-movies', [verifyToken], listAll);

export default router;