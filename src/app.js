"use strict";
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path_1 = require('path');
const index_1 = require('./routes/index');
const user_1 = require('./routes/user');
const subscription_1 = require('./routes/subscription');
const transaction_1 = require('./routes/transaction');
const cookieParser = require('cookie-parser'); // this module doesn't use the ES6 default export yet
const app = express();
// view engine setup
app.set('views', path_1.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path_1.join(__dirname, 'public')));
app.use('/', index_1.default);
app.use('/user', user_1.default);
app.use('/subscription', subscription_1.default);
app.use('/transaction', transaction_1.default);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((error, req, res, next) => {
        res.status(error['status'] || 500);
        res.render('error', {
            message: error.message,
            error: error
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((error, req, res, next) => {
    res.status(error['status'] || 500);
    res.render('error', {
        message: error.message,
        error: {}
    });
    return null;
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
//# sourceMappingURL=app.js.map