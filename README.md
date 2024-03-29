## ![](favicon.ico) Doonsec 
洞见微信聚合-安全圈搜狗微信搜索_订阅号及文章内容独家收录,一搜即达

🧱专为网络安全人员提供的上班划水🏊‍♂️看文章的插件，防止上班时间你在微信界面停留太久⌛️。

##### 数据来源: [http://wechat.doonsec.com](http://wechat.doonsec.com)

![](https://mmbiz.qpic.cn/mmbiz_gif/vML07fExwAcLuCt7jXGUmxSrXjOXG6KhANbYyCGaibp6sMPB8iaebRUV5EHGcaWHoibElmJGUl4eACiahMCVXFCBEA/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

## 🛠功能

- 简单、轻便、插件化
- 万千数据、瞬间响应、秒级检索
- **秒**采集、**快**检索、**全**数据

- [x] 翻页功能，上下翻页
- [x] 使用搜索功能，注意Search：空格结尾才进行搜索
- [x] 使用访问文章自动复制原文链接到剪切板
- [x] 只返回精选高质量文章

### 安装方式

#### 在线安装

在[uTools](https://u.tools/)插件中心搜索🔍`Doonsec洞见微信聚合`

#### github安装离线版

https://github.com/Hatcat123/uTools_WechatDoonsec

下载`Releases`，拖拽到`uTools`的输入框即可安装使用。

## 🏇另辟蹊径

我是前端小白🥬，不能独立编写出一套插件。只能在原作者的模板基础上修修改改🍮。由于`list`模块的设计思路只是作为部分展示使用，所以我想用它拿来做数据流的呈现比较困难🚑。

1. 翻页问题：

* 判断是否滚动到底部（无效）
* 监听键盘⌨️无效
* 尝试创建一个标签，捕获点击标签的事件，从而进行翻页。在使用翻页的过程中，对列表的数据进行-1处理。
> ✅解决方式：在最底部增加一行自定义数据，然后操作自定义数据进行翻页。效果见上☝️。

2. 搜索到之后，结束搜索，删除搜索的内容，3秒之后显示首页的内容。
> ✅解决方式：添加判断语句。根据判空与判断结果确定接下来执行什么方法。

3. 只能显示`标题`与`描述`两个字段。额外的字段无法添加，尝试过注入💉。无法绕过编码。
> ✅解决方式：使用明显的字符与空格💔分割`描述`字段。达到假装是两个字段的效果。


## 📝TODO

- [ ] ⌛️等待作者更新`list`模块功能，让其变得更加丰富。
- [ ] 分类查看。
- [x] 使用https的请求
- [x] 向上⬆️翻页功能

## 🕘日志

- **V 0.2.1**
    - [x] 更新：优化搜索方式，实现瞬时响应
    - [x] 更新：打开文章的方式，移除复制功能

- **V 0.2.0**
    - [x] 更新：替换新的数据源
    - [x] 更新：替换新的搜素方式 

- **V 0.1.0**
    - [x] 🐛 修复bug：用户打开插件错误

- **V 0.0.9**
    - [x] 为了符合用户输入习惯，使用空格作为搜索结尾符号

- **V 0.0.8**
    - [x] 增加访问文章自动复制原文链接到剪切板。

- **V 0.0.7**
    - [x] 修改了接口源，只返回高质量文章
    - [x] 修复了中文搜索失败的bug 
    - [x] 增加上一页翻页的功能
    - [x] 优化搜索的方式，让搜索更加丝滑⚠️注意Search：'、'或'\'结尾才进行搜索

- **V 0.0.6**
    - [x] 使用https的接口数据
    - [x] 更新了查询的方式，使用enter按钮的方式进行搜索
    - [x] 请求添加一些基础信息（用户id、插件版本）
    - [x] 感谢[LanyuanXiaoyao-Studio](https://github.com/LanyuanXiaoyao-Studio/utools-search-lite)提出的建议，参考了师傅的项目不少代码。
- **V 0.0.5**
    - [x] 重写api接口
    - [x] 修复&的查询错误
- **V 0.0.4**
    - [x] 适应多环境配置：win、mac
    - [x] 修改图标为静态图
- **V 0.0.3**
    - [x] 增加`👇下一页👇`功能
    - [x] 完善`搜索`与`首页`的转换衔接🛠，使用空格回到首页。
- **V 0.0.2**
    - [x] ajax对接获取网站数据🧑‍💻
- **V 0.0.1**
    - [x] 初次尝试插件编写，绕过`gif`限制🚫

## 🙋‍♂️问题反馈

1. 在[`猿料`](https://yuanliao.info/)发布问题。
2. 在[github](https://github.com/Hatcat123/uTools_WechatDoonsec)参与讨论。
