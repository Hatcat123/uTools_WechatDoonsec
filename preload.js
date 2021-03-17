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



// 数据来源与接口
// var domain = 'http://127.0.0.1:8000/'
var domain = 'http://wechat.doonsec.com/'
//最新接口
var last_article = 'api/v1/articles/?page=&{page}&limit=9'
//分类接口
var tag_article = 'tags/?page=1&cat_id=1'
//搜索接口
var search_article = 'api/v1/search/'
//data page: 1,keyword: 1,limit:9

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
 
    var ajax = new XMLHttpRequest()
    ajax.open('post', options.url)
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajax.send(convertData(options.data))
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
function convertData(data){ 
    if( typeof data === 'object' ){ 
      var convertResult = "" ;  
      for(var c in data){  
          
        convertResult+= c + "=" + data[c] + "&";  
      }  
      convertResult=convertResult.substring(0,convertResult.length-1) 
      return convertResult; 
    }else{ 
      return data; 
    } 
  }
  
var search_query = function (page, keyword, callbackSetList) {

    var result = []
    keyword =window.btoa(keyword)  //转换为base64
    request_post({
        url: domain + search_article ,
        data:{"keyword":keyword,"page":page,"limit":9},
        success: function (res) {
            res = JSON.parse(res)
            if (res.count == 0) {
              
                callbackSetList([{title: res.message,}])
            }
            else {
              
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