
var express = require('express')
  , ejs = require('ejs')
  , family = require('./controllers/family')
  , csrf = require('./lib/csrf')
  , config = require('./config')
  , form = require('connect-form')
  , editImage = require('./controllers/editImage');

var app = express.createServer(
  form({ uploadDir: __dirname + '/public', keepExtensions: true }),
  function(req, res, next) {
    if(req.form) {
      req.form.complete(function(err, fields, files){
        req.body = {};
        if(!err) {
          req.form.fields = fields;
          req.form.files = files;
          req.body = fields;
        }
        next(err);
      });
    }
    else {
      return next();
    }
  });
app.use(express.static(__dirname + '/public', {maxAge: 3600000 * 24 * 30}));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({
    secret: config.session_secret
}));
/**
 * Fixed CSRF
 *  add '<input type="hidden" name="csrf" value="<%- it.csrf %>" />' to form
 */
app.use(csrf.check());
app.dynamicHelpers({
    csrf: csrf.token
});
app.helpers({
    config: config
});

/**
 * Views settings
 */
app.set("view engine", "html");
app.set("views", __dirname + '/views');
app.register("html", ejs);

/**
 * Routing
 */
app.get('/', family.index);
app.get('/detail/:i/:j', family.getDetail);
app.post('/saveDetail', family.saveDetail);
app.post('/newDetail', family.newDetail);
app.get('/editImage/:id', editImage.index);
app.post('/upload/:id', editImage.upload);
app.post('/deleteDetail', family.deleteDetail);
app.post('/tagSearch', family.tagSearch);

app.listen(config.port);
console.log('Server start http://localhost:' + config.port);
