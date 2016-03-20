# Nodejs-ByrTopTen

目前这是一个爬取[北邮人论坛](http://bbs.byr.cn)每日十大的爬虫。写得很糙很糙，重复代码太多，后续版本将会改进。

## 更新日志

### v1.0 pro-c

- 代码整合大幅精简，感谢@BUPT-HJM的启发
- 加入写入mongodb数据库功能
- 更改写出的json文件形式
- 更改爬取时间
- 忽略node_modules文件夹，改为用户自行安装所需依赖

### v1.0 pro-b

- 修复了一个小bug，这个bug会导致`toptensDay.json`不按预期时间输出。
- 改进了一个地方，使`topten.json`里的十大时间显示为采集时间的前一天。（注：因为十大是每天凌晨1点更新，原爬虫在1点前采集的是昨天的十大但是采集时间会显示成今天的时间）

------

### v1.0 pro-a

这个爬虫目前能够爬取十大的基本相关信息了。每日定时在0点55分和6点00分的时候爬取论坛十大。因为十大每天在1:00更新。所以在这个时间段更新是能够获取昨天十大的最终的信息了。而6点00分作为一天早晨的开始，是能反应半夜顶贴的十大的。

------

## 使用方法

**首先需要在本地配置好mongodb数据库。这个部分不再赘述，教程很多。只需配置好mongodb并开启它的服务即可。**

然后在命令行内输入**`npm install`**，将会安装所需依赖。如果你安装了cnpm的话，我也推荐你用**`cnpm install`**来安装，会更快。  

接着在命令行输入**`node index.js`**，程序将运行，在23点55分的时候就会生成一个叫做`toptens-date.json`，在6点00分的时候会生成`toptensDay-date.json`，其中的`date`将会是当天的日期。  

如果你想要立刻看到效果的话，可以将
`var nightJob = schedule.scheduleJob('* 55 23 * * *', function(){toptenSpider(toptens,'toptens',1,false)});`或者`var dayJob = schedule.scheduleJob('* 0 6 * * *', function(){toptenSpider(toptensDay,'toptensDay',2,false)});`里面的`* 55 23 * * *`或者`* 0 6 * * *`改成你想要输出的时间段，比如`45 * * * * *`就是每45秒执行一次。具体的语法可以参见[node-schedule](https://github.com/node-schedule/node-schedule#cron-style-scheduling)中cron-style语法。  

`toptenSpider(dbName,collectionName,flag,fileFlag)`这个函数里，**如果将最后一个参数fileFlag设为false将不会输出json文件**。

输出的格式：  

```js
[
  topten:{
    date: *,        // 日期
    info:[{
      topno: i,     // 在十大里的顺序
      title: *,     // 标题
      author: *,    // 作者
      pubDate: *,   // 发布日期
      boardName: *, // 发布版面
      link: *,      // 文章链接地址
      content: *    // 文章内容
    }]
  }
]
```