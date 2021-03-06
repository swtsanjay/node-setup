const Response = require('../utilities/Response');
const Logger = require('../utilities/Logger');
const { errors } = require('celebrate');



const userRoute = require('./modules/admin/user/userRoute');

const api = (app) => {
    app.use('*', (req, res, next) => {
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        });
        if (req.method === 'OPTIONS') {
            res.status(200).json({ status: 'Okay' });
        } else {
            next();
        }
    });

    app.all('/status', (req, res) => {
        Logger.info('checking status', { status: 1 });

        Response.success(res, {
            data: {
                headers: req.headers,
                params: req.params,
                query: req.query,
                body: req.body,
            },
        });
    });

    /**
     * Public routes
     */
    // app.use(require('./modules/public'));

    /**
     * Private routes
     */
    app.use('/admin', userRoute);
    app.use(errors());

};

module.exports = api;