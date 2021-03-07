/**
 * Created by nova on 2017/5/18.
 */
import router from 'koa-router';
import login from '../controller/login';

export default router()
    .post('/regist', login.regist)
    .post('/login', login.login)
    .post('/sms', login.sendSms)