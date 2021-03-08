//第一次加载的时候执行
// 到底的弹窗信息
function info_end() {
    utools.showMessageBox({
        type: 'none',
        icon: 'logo.gif',
        title: '已经到底了',
        message: '已经到底了💔',

    })
}
function error_network() {
    utools.showMessageBox({
        type: 'error',
        icon: 'logo.gif',
        title: '连接失败',
        message: '🤡网路连接失败，请检查网路💔',

    })
}

// utools.setExpendHeight(300)
// setTimeout(() => {//这个计时器是等待dom刷新后 定位完成
//     alert(1)
// }, 5000);


// 数据来源与接口
var domain = 'http://wechat.doonsec.com/'
//最新接口
var last_article = 'articles/?page=&{page}'
//分类接口
var tag_article = 'tags/?page=1&cat_id=1'
//搜索接口
var search_article = 'search/?keyword=&{searchword}&page=&{page}'
//data page: 1,keyword: 1

var timeout = null
var searchItems = null

function request_get(options) {
    console.log("url", options.url)
    var ajax = new XMLHttpRequest()
    ajax.open('get', options.url)
    ajax.send()
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                options.success && options.success(ajax.responseText)
            } else {
                options.fail && options.fail(ajax.responseText)
            }
        }
    }
}
function request_post(options) {
    // var url = ALIYUN_MAVEN_BASE_URL.replace('${repoid}', options.type).replace('${name}', options.name)

    var url = domain + search_article
    console.log("url", url)
    var ajax = new XMLHttpRequest()
    ajax.open('get', url)
    ajax.send()
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                options.success && options.success(ajax.responseText)
            } else {
                options.fail && options.fail(ajax.responseText)
            }
        }
    }
}


var last_query = function (page, callbackSetList) {

    var result = []

    request_get({
        url: domain + last_article.replace("&{page}", page),
        success: function (res) {

            res = JSON.parse(res)
            console.log('查询出来的结果', res)

            for (const key in res.data) {

                result.push({
                    title: res.data[key].title,
                    description: '⏰' + res.data[key].publish_time + '\xa0✅\xa0' + res.data[key].digest,
                    url: res.data[key].url,
                    icon: 'logo.gif'// 图标(可选)
                })
            }
            result.push({
                title: '共' + page + "/" + res.count + "页",
                description: "👇下一页👇",
                url: 'last_article',
                icon: 'logo.gif',// 图标(可选)
                next: true
            })

            callbackSetList(result)
        },
        fail: function (error) {
            console.log(error)
            error_network()
        }
    })
}

var search_query = function (page, keyword, callbackSetList) {

    var result = []
    request_get({
        url: domain + search_article.replace("&{page}", page).replace("&{searchword}", keyword),
        success: function (res) {
            if (res.count == 0) {
                callbackSetList("未查询到结果")
            }
            else {
                res = JSON.parse(res)
                console.log('查询出来的结果', res)
                for (const key in res.data) {
                    result.push({
                        title: res.data[key].title,
                        description: '⏰' + res.data[key].publish_time + '\xa0✅\xa0' + res.data[key].digest,
                        url: res.data[key].url,
                        icon: 'logo.gif'// 图标(可选)
                    })
                }
                result.push({
                    title: '共' + page + "/" + res.count + "页",
                    description: "👇下一页👇",
                    url: 'search_article',
                    icon: 'logo.gif',// 图标(可选)
                    next: true
                })
                callbackSetList(result)
            }
        },
        fail: function (error) {
            console.log(error)
            error_network()
        }
    })
}


document.onkeydown = function (event) {
    var event = event || window.event;
    // 为了方便理解可以写成这种形式var event=event?event:window.event实现浏览器的兼容
    var keycode = event.which || event.keyCode;
    console.log(keycode)
    // 火狐不支持event.keyCode支持event.which
    switch (keycode) {
        case 38:
            console.log("上"); break;
        case 39:
            console.log("右"); break;
        case 40:
            console.log("下"); break;
        case 37:
            console.log("左"); break;
    }
}


window.scroll = function () {
    //变量scrollTop是滚动条滚动时，滚动条上端距离顶部的距离
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(scrollTop)
    //变量windowHeight是可视区的高度
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

    //变量scrollHeight是滚动条的总高度（当前可滚动的页面的总高度）
    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    //滚动条到底部
    if (scrollTop + windowHeight >= scrollHeight) {
        //要进行的操作
        console.log(2222)
    }
}

var result = []
var keyword = ''
var page = 1

window.exports = {
    "doon": { // 注意：键对应的是 plugin.json 中的 features.code
        mode: "list",  // 列表模式
        args: {
            // 进入插件时调用（可选）
            enter: (action, callbackSetList) => {
                // 如果进入插件就要显示列表数据
                last_query(page = page, callbackSetList = callbackSetList)

            },
            // 子输入框内容变化时被调用 可选 (未设置则无搜索)
            search: (action, searchWord, callbackSetList) => {
                // 获取一些数据
                if (searchWord !== null && searchWord !== undefined && searchWord !== '') {
                    keyword = searchWord
                    search_query(page = 1, keyword = searchWord, callbackSetList = callbackSetList)
                } else {
                    last_query(page = 1, callbackSetList = callbackSetList)
                }
            },
            // 用户选择列表中某个条目时被调用
            select: (action, itemData, callbackSetList) => {
                //  window.utools.hideMainWindow()
                page = page + 1
                const url = itemData.url
                const next = itemData.next
                if (next == true && url == 'last_article') {
                    last_query(page = page, callbackSetList = callbackSetList)
                }
                else if (next == true && url == 'search_article') {
                    search_query(page = page, keyword = keyword, callbackSetList = callbackSetList)
                }
                else {
                    //  require('electron').shell.openExternal(url)
                    window.utools.shellOpenExternal(url)
                    //  window.utools.outPlugin()
                }
            },
            // 子输入框为空时的占位符，默认为字符串"搜索"
            placeholder: "高级搜索：支持’&‘，’｜‘语法"
        }
    }
}