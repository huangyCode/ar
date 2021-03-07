
/**
 * Created by nova on 2017/5/18.
 */
import router from 'koa-router';
import build from '../controller/build';

export default router()
    .post('/queryEstate', build.queryEstate)
    .post('/queryEstateDetail', build.queryEstateDetail)
    .post('/queryBuildDetail', build.queryBuildDetail)