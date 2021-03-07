/**
 * Created by nova on 2017/5/18.
 */
import router from 'koa-router';

import login from './login'
import build from './build'
export default router()
    .use('/login', login.routes(), login.allowedMethods())

    .use('/build', build.routes(), build.allowedMethods())