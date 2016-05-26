var cheerio = require('cheerio');  
var superagent = require('superagent-charset');  
var fs = require('fs');  
var schedule = require('node-schedule');
var monk = require('monk');
var mongo = require('mongodb');
var db = monk('localhost:27017/bbstopten');

var url = 'http://bbs.byr.cn/rss/topten';

var toptens = [],
    toptensDay = [];
// 采用cron-style的定时写法
// 另外scheduleJob的回调函数必须是function(){}，在function(){}里面放要执行的功能，否则会报错
var nightJob = schedule.scheduleJob('* 55 23 * * *', function(){toptenSpider(toptens,'toptens',1,false);});
var dayJob = schedule.scheduleJob('* 0 6 * * *', function(){toptenSpider(toptensDay,'toptensDay',2,false);});

function toptenSpider(dbName,collectionName,flag,fileFlag){
  superagent.get(url)
    .charset('gb2312')
    .end(function (err, res) {
      // 常规的错误处理
      if (err) return next(err);
      var $ = cheerio.load(res.text,{
        xmlMode: true
      });
      var dbName = [];
      var d = new Date();
      var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+(d.getDate());
      var objectName = {
        date: date,
        info: []
      };

      $('item').each(function(i,el){
        i += 1;
        objectName.info.push({
          topno: i,
          title: $(this).find('title').text(),
          author: $(this).find('author').text(),
          pubDate: $(this).find('pubDate').text(),
          boardName: $(this).find('guid').text().replace(/https:\/\/bbs.byr.cn\/article\//,'').replace(/\/\d+/,'').trim(),
          link: $(this).find('link').text(),
          content: $(this).find('description').text()
        });
      });
      // flag 用于判断写入的json数组名
      flag == 1 ? dbName.push({topten: objectName}) : dbName.push({toptenDay: objectName});
      var dbToptens = db.get(collectionName);
      dbToptens.insert(dbName,function(err,doc){
        if (err) console.log(err) ;
        else console.log("数据库写入成功");
      });

      if (fileFlag === true){
        var json = JSON.stringify(dbName);
        fs.writeFile(collectionName + '-' + date + '.json', json, 'utf-8', function(err){
          if (err) throw err;
          else console.log('JSON写入成功'+'\r\n' + json);
        });
      }
    });
}





