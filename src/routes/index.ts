import express from 'express';
import apikey from '../auth/apikey';
import signup from './access/signup';
import login from './access/login';
import logout from './access/logout';
import token from './access/token';
import blog from './blog';
import blogs from './blogs';
import profile from './profile';

const router = express.Router();

/*---------------------------------------------------------*/
router.use(apikey);
/*---------------------------------------------------------*/
router.use('/signup', signup);
router.use('/login', login);
router.use('/logout', logout);
router.use('/token', token);
router.use('/profile', profile);
router.use('/blog', blog);
router.use('/blogs', blogs);

export default router;
