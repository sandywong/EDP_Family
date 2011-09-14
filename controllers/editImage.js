var fs = require('fs');
var sys = require('sys');
var uploadDir = __dirname + '/../public/images';

exports.index = function(req, res, next){
  var id = req.params.id;
  console.log("id:"+id);
  res.render('editImage', {id:id});
};

exports.upload = function(req, res, next){
  /*
  var form = formidable.IncomingForm();
  form.parse(req, function(err, fields, files){
    res.writeHead(200, {'contend-type':'text/plain'});
    res.write('receive upload:\n\n');
    res.end(sys.inspect({fields:fields, files:files}));
  });
  */
  var id =  req.params.id;
  var fields = req.form.fields, files = req.form.files;
  var filePath = files.upload ? files.upload.filename : null;
  if(filePath == null)
    return res.render("error", {message:"未选择则文件"});
  var savePath = uploadDir+"/" + id + ".jpg";
  console.log(savePath);
  fs.rename(files.upload.path, savePath, function(err){
    if(err){
      return res.render("error",{message:"创建文件错误"});
    }
    res.redirect('/editImage/close');
  });
};
