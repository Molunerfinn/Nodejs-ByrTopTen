# Nodejs-ByrTopTen

目前这是一个爬取[北邮人论坛](http://bbs.byr.cn)每日十大的爬虫。

## 更新日志

v1.0 pro-a

这个爬虫目前能够爬取十大的基本相关信息了。每日定时在0点55分和6点00分的时候爬取论坛十大。因为十大每天在1:00更新。所以在这个时间段更新是能够获取昨天十大的最终的信息了。而6点00分作为一天早晨的开始，是能反应半夜顶贴的十大的。

## 使用方法

命令行内输入`node index.js`，将会自动执行定时程序。在0点55分的时候就会生成一个叫做`toptens.json`，在6点00分的时候会生成`toptensDay.json`。如果你不想特定时间看到效果，想直接输出json文件的话，那么只需要将`index.js`的文件里的包含在`superagent`的外部计时功能去掉即可。

输出的格式：  

```json
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
  },
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
  },
  ...
]
```