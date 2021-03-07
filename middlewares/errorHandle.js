import logUtil from '../utils/logConfig';

export default async (ctx, next) => {
    const st = new Date();
    try {
        await next();
        logUtil.logResponse(ctx, new Date() - st);
    } catch (err) {
        if (err && err.code) {
            ctx.body = err;
        } else
            ctx.body = {
                code: 503,
                desc: '系统异常',
                result: false
            };
        logUtil.logError(ctx, err, new Date() - st);
    }
};