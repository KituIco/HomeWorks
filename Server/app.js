var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require("./routes/index");
var addressRouter = require('./routes/address-route');
var adminRouter = require('./routes/admin-route');
var agencyRouter = require('./routes/agency-route');
var bookingRouter = require('./routes/booking-route');
var cardPaymentRouter = require('./routes/card-payment-route');
var certifacteRouter = require('./routes/certificate-route');
var credentialsRouter = require('./routes/credentials-route');
var messageRouter = require('./routes/message-route');
var paymentRouter = require('./routes/payment-route');
var portfolioRouter = require('./routes/portfolio-route');
var providerRouter = require('./routes/provider-route');
var reviewRouter = require('./routes/review-route');
var seekerRouter = require('./routes/seeker-route');
var serviceRouter = require('./routes/service-route');
var serviceSpecsRouter = require('./routes/service-specs-route');
var serviceTypeRouter = require('./routes/service-type-route');
var transactionReportRouter = require('./routes/transaction-reports-route');
var userRouter = require('./routes/users-route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use('/address', addressRouter);
app.use('/admin', adminRouter);
app.use('/agency', agencyRouter);
app.use('/booking', bookingRouter);
app.use('/card-payment', cardPaymentRouter);
app.use('/certificate', certifacteRouter);
app.use('/credentials', credentialsRouter);
app.use('/message', messageRouter);
app.use('/payment', paymentRouter);
app.use('/portfolio', portfolioRouter);
app.use('/provider', providerRouter);
app.use('/review', reviewRouter);
app.use('/seeker', seekerRouter);
app.use('/service', serviceRouter);
app.use('/service-specs', serviceSpecsRouter);
app.use('/service-type', serviceTypeRouter);
app.use('/transaction-report', transactionReportRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
