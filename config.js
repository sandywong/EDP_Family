
exports.port = 8080;
exports.email='huangcong.pt@taobao.com';
exports.site_name = 'EDP Family';
exports.site_desc = '';
exports.session_secret = 'tsoedsosisession_secretonsheecfrxedta';

var db_options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'EDP_family'
};

var db = exports.db = new require('mysql').Client(db_options);
db.connect(function(err) {
    if(err) {
        console.error('connect db ' + db.host + ' error: ' + err);
        process.exit();
    }
});
