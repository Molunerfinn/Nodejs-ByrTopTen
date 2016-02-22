var cheerio = require('cheerio');  
var superagent = require('superagent-charset');  
var fs = require('fs');  
var schedule = require('node-schedule');

var url = 'http://bbs.byr.cn/rss/topten';

var rule = new schedule.RecurrenceRule();  
var rule2 = new schedule.RecurrenceRule(); 
rule.hour = 0;
rule.minute = 55;
rule.hour = 6;
rule.minute = 0;

var toptens = [];
var toptensDay = [];

var j = schedule.scheduleJob(rule, function(){  
  superagent.get(url)
    .charset('gb2312')
    .end(function (err, res) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(res.text,{
        xmlMode: true
      });
      
      var d = new Date();
      var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

      var topten = {
        date: date,
        info: []
      };

      $('item').each(function(i,el){
        i += 1;
        topten.info.push({
          topno: i,
          title: $(this).find('title').text(),
          author: $(this).find('author').text(),
          pubDate: $(this).find('pubDate').text(),
          boardName: $(this).find('guid').text().replace(/http:\/\/bbs.byr.cn\/article\//,'').replace(/\/\d+/,'').trim(),
          link: $(this).find('link').text(),
          content: $(this).find('description').text()
        })
      })
      toptens.unshift({topten: topten});

      var json = JSON.stringify(toptens);

      fs.writeFile('toptens.json', json, 'utf-8', function(err){
        if (err) throw err;
        else console.log('JSON写入成功'+'\r\n' + json)
      });
    });
});

var job = schedule.scheduleJob(rule2, function(){  
  superagent.get(url)
    .charset('gb2312')
    .end(function (err, res) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(res.text,{
        xmlMode: true
      });
      
      var d = new Date();
      var date = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();

      var topten = {
        date: date,
        info: []
      };

      $('item').each(function(i,el){
        i += 1;
        topten.info.push({
          topno: i,
          title: $(this).find('title').text(),
          author: $(this).find('author').text(),
          pubDate: $(this).find('pubDate').text(),
          boardName: $(this).find('guid').text().replace(/http:\/\/bbs.byr.cn\/article\//,'').replace(/\/\d+/,'').trim(),
          link: $(this).find('link').text(),
          content: $(this).find('description').text()
        })
      })
      toptensDay.unshift({topten: topten});

      var json = JSON.stringify(toptensDay);

      fs.writeFile('toptensDay.json', json, 'utf-8', function(err){
        if (err) throw err;
        else console.log('JSON写入成功'+'\r\n' + json)
      });
    });
});




