var config = require('../config')
, db = config.db;
var http = require('http');

exports.index = function(req, res, next) {
  db.query('select member.id, member.nickName, member.name, location.x, location.y from member join location on member.id=location.mid order by location.x asc, location.y asc', function(err, rows) {
    if(err) return next(err);
    res.render('index', {family: rows});
  });
};

exports.getDetail = function(req, res, next){
  var i = req.params.i;
  var j = req.params.j;
  console.log("get detail:" + i + " ," + j);
  db.query('select * from member join location on member.id=location.mid where location.x='+i+' and location.y='+j, function(err, rows){
    if(err) return next(err);
    if(rows.length != 0){
      db.query('select tag from tag where mid='+rows[0].mid, function(err, tags){
        body = new Buffer(JSON.stringify({detail:rows[0], tags:tags}));
        res.writeHead(200, {"Content/type":"text/json", "Content/length":body.length});
        res.end(body);
      });
    }
    else{
      body = new Buffer(JSON.stringify({detail:{}}));
      res.writeHead(200, {"Content/type":"text/json", "Content/length":body.length});
      res.end(body);
    }
  });
};

exports.saveDetail = function(req, res, next){
  var nickName = ((req.body.nickName == '无' || req.body.nickName == '')? null : req.body.nickName);
  var name = ((req.body.name == '无' || req.body.name == '')? null : req.body.name);
  var extenNum = ((req.body.extenNum == '无' || req.body.extenNum == '')? null : req.body.extenNum);
  var wangWang = ((req.body.wangWang == '无' || req.body.wangWang == '')? null : req.body.wangWang);
  var cellPhone = ((req.body.cellPhone == '无' || req.body.cellPhone == '')? null : req.body.cellPhone);
  var mail = ((req.body.mail == '无' || req.body.mail == '')? null : req.body.mail);
  var weibo = ((req.body.weibo == '无' || req.body.weibo == '')? null : req.body.weibo);
  var position = ((req.body.position == '无' || req.body.position == '')? null : req.body.position);
  var place = ((req.body.place == '无' || req.body.place == '')? null : req.body.place);
  var tagsString = ((req.body.tagsString == '无' || req.body.tagsString == '')? null : req.body.tagsString);
  var tags;
  if(tagsString == null)
    tags = {};
  else
    tags = tagsString.split(';');
  console.log(tags);

  var x = req.body.x;
  var y = req.body.y;

  db.query('select mid from location where x=? and y=?', [x, y], function(err, result1){
    if(err) return next(err);
    db.query('update member set nickName=?,name=?,extenNum=?,wangWang=?,cellPhone=?,mail=?,weibo=?,position=?,place=? where id=?', [nickName, name, extenNum, wangWang, cellPhone, mail, weibo, position, place, result1[0].mid], function(err, result2){
      if(err) return next(err);
      db.query('delete from tag where mid=?', [result1[0].mid], function(err, result3){
        if(err) return next(err);
        if(tags.length >0){
          var q = 'insert into tag(mid, tag) values ';
          for(var i = 0; i < tags.length; i++){
            q += '(' + result1[0].mid + ',\'' + tags[i] + '\'),';
          }
          db.query(q.slice(0, q.length-1), function(err, result4){
            if(err) return next(err);
            temp = new Buffer(JSON.stringify({detail:{}}));
            console.log("save detail:" + result1[0].mid + " " + nickName + " " + name);
            res.writeHead(200, {"Content/type":"text/json", "Content/length":temp.length});
            res.end(temp);
          });
        }
        else{
          temp = new Buffer(JSON.stringify({detail:{}}));
          res.writeHead(200, {"Content/type":"text/json", "Content/length":temp.length});
          res.end(temp);
        }
      });
    });
  });
};

exports.newDetail = function(req, res, next){
  var nickName = ((req.body.nickName == '无' || req.body.nickName == '')? null : req.body.nickName);
  var name = ((req.body.name == '无' || req.body.name == '')? null : req.body.name);
  var extenNum = ((req.body.extenNum == '无' || req.body.extenNum == '')? null : req.body.extenNum);
  var wangWang = ((req.body.wangWang == '无' || req.body.wangWang == '')? null : req.body.wangWang);
  var cellPhone = ((req.body.cellPhone == '无' || req.body.cellPhone == '')? null : req.body.cellPhone);
  var mail = ((req.body.mail == '无' || req.body.mail == '')? null : req.body.mail);
  var weibo = ((req.body.weibo == '无' || req.body.weibo == '')? null : req.body.weibo);
  var position = ((req.body.position == '无' || req.body.position == '')? null : req.body.position);
  var place = ((req.body.place == '无' || req.body.place == '')? null : req.body.place);
  var tagsString = ((req.body.tagsString == '无' || req.body.tagsString == '')? null : req.body.tagsString);
  var tags;
  if(tagsString == null)
    tags = {};
  else
    tags = tagsString.split(';');
  var x = req.body.x;
  var y = req.body.y;

  db.query('insert into member set nickName=?,name=?,extenNum=?,wangWang=?,cellPhone=?,mail=?,weibo=?,position=?,place=?', [nickName, name, extenNum, wangWang, cellPhone, mail, weibo, position, place], function(err, result1){
    if(err) return next(err);
    db.query('insert into location set mid=?,x=?,y=?', [result1.insertId, x, y], function(err, result2){
      if(err) return next(err);
      if(tags.length >0){
        var q = 'insert into tag(mid, tag) values ';
        for(var i = 0; i < tags.length; i++){
          if(tags[i] != ""){
            q += '(' + result1.insertId + ',\'' + tags[i] + '\'),';
          }
        }
        db.query(q.slice(0, q.length-1), function(err, result3){
          if(err) return next(err);
          console.log("new detail:" + result1.insertId + " " + nickName + " " + name);
          temp = new Buffer(JSON.stringify({detail:{}}));
          res.writeHead(200, {"Content/type":"text/json", "Content/length":temp.length});
          res.end(temp);
        });
      }
      else{
        temp = new Buffer(JSON.stringify({detail:{}}));
        res.writeHead(200, {"Content/type":"text/json", "Content/length":temp.length});
        res.end(temp);
      }
    });
  });
};

exports.deleteDetail = function(req, res, next){
  var mid = req.body.mid;
  db.query('delete from location where mid=?', [mid], function(err, result1){
    if(err) return next(err);
    db.query('delete from member where id=?', [mid], function(err, result2){
      if(err) return next(err);
      console.log("delete:" + mid);
      temp = new Buffer(JSON.stringify({data:{}}));
      res.writeHead(200, {"Content/type":"text/json", "Content/length":temp.length});
      res.end(temp);
    });
  });
};

exports.tagSearch = function(req, res, next){
  var tag = req.body.tag;
  if(tag && tag != ""){
    db.query('select location.x, location.y from location, tag where tag.mid=location.mid and tag.tag=?', [tag], function(err, result){
      if(err) return next(err);
      console.log("tag search:" + result);
      temp = new Buffer(JSON.stringify({tag:result}));
      res.writeHead(200, {"Content/type":"text/json", "Content/length":temp.length});
      res.end(temp);
    });
  }
};
