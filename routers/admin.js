import router from 'koa-router';
import admin from '../controller/admin';

export default router()
    .post('/login', admin.login)
    .get('/auto', admin.auto)
    .get('/out',admin.out)
    .post('/list',admin.list)
    .post('/add',admin.add)
    .post('/update',admin.update)
    .post('/signIn', admin.mlogin)
    .post('/updatePwd',admin.updatePwd)