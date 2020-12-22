const Api = require('../services/api/index');
const appConfig = require('../common/app_config').default
const formatMoney = function (value) {
    value = Number(value)
    if (isNaN(value)) {
        return '--'
    }
    value = (value / 100).toFixed(2)
    if (Math.abs(value) < 1000) {
        return value
    }
    return value.replace(/./g, (c, i, a) => i && c !== '.' && !((a.length - i) % 3) ? ',' + c : c);
}

// 获取当前时间 YYYY-MMMM-DDDD
const getTime = function (dates,symbol='-') {
    dates = dates || new Date();
    const year = dates.getFullYear()
    const month = dates.getMonth() + 1
    const day = dates.getDate()
    const hour = dates.getHours()
    const minute = dates.getMinutes()
    const second = dates.getSeconds()

    var formatNumber = n => {
        n = n.toString()
        return n[1] ? n : '0' + n
    }
    return [year, month, day].map(formatNumber).join(symbol)

}

function gsTime(s) {
    s = s + ''
    return s.substr(0, 4) + '-' + s.substr(4, 2) + '-' + s.substr(6, 2) + ' ' + s.substr(8, 2) + ':' + s.substr(10, 2) + ':' + s.substr(12, 2)
}
// 获取当前时间 YYYY-MMMM-DDDD hh:mm:ss
const getNewTime = function (type = '', data) {
    var date = data || new Date();
    if (type == 2) {
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    }

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    //这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (second < 10) {
        second = '0' + second;
    }

    var x = date.getDay(); //获取星期
    if (type == 1 || type == 2) {
        return year + '-' + month + '-' + day;
    }
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}
// 计算两个时间的间隔天数
const getTimeToTimeDay = function ($time1, $time2) {
    var time1 = arguments[0],
        time2 = arguments[1];
    time1 = Date.parse(time1) / 1000;
    time2 = Date.parse(time2) / 1000;
    var time_ = time1 - time2;
    return (time_ / (3600 * 24));
}
// 计算结束 如期 
/**
 * day 天数
 * oldTime 开始时间 YYYY-MMMM-DDDD
 * time2  结束时间  YYYY-MMMM-DDDD
 */
const getDayEndTime = function (day, oldTime) {
    var date1 = new Date(oldTime);
    var date2 = new Date(oldTime);
    date2.setDate(date1.getDate() + day - 1);
    var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
    return time2;
}
const getCustomString = function (day, oldTime) {
    var date1 = new Date(oldTime);
    var date2 = new Date(oldTime);
    date2.setDate(date1.getDate() + day);
    var time2 = date2.getFullYear() + "" + (date2.getMonth() + 1) + "" + date2.getDate();
    return time2;
}
/**
 * 生成图片名称
 * dir 文件前缀
 * suffix 图片类型
 */
const createImgName = function (dir, suffix) {
    var name = '';
    let arr = dir.split('/')||[''];
    name = arr[arr.length-1] + '_' + new Date().getTime() + '.' + (suffix || 'png')

    return name;
}
// 判断手机号是否正常
const isMobilePhone = function (s) {
    let re = /^(((13[0-9]{1})|(15[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    return re.test(s);
};
// 时间转为秒 2020-02-27 16:01
const transdate = function (endTime) {
    var date = new Date();
    console.log(endTime.substring(0, 4), endTime.substring(5, 7) - 1, endTime.substring(8, 10))
    console.log(endTime.substring(11, 13), endTime.substring(14, 16), endTime.substring(17, 19))
    date.setFullYear(endTime.substring(0, 4));
    date.setMonth(endTime.substring(5, 7) - 1);
    date.setDate(endTime.substring(8, 10));
    date.setHours(endTime.substring(11, 13));
    date.setMinutes(endTime.substring(14, 16));
    date.setSeconds(endTime.substring(17, 19));
    return Date.parse(date) / 1000;
}
// 计算小时数  1小时20分钟
const getHoreLong = function (start, end) {
    var second_all = (transdate(end) - transdate(start));

    if (second_all < 0) {
        return false
    } else {
        return formateSeconds(second_all)
    }
}
const formateSeconds = function (endTime) {
    let secondTime = Number(endTime) //将传入的秒的值转化为Number
    let min = 0 // 初始化分
    let h = 0 // 初始化小时
    let d = 0 //初始化天
    let result = ''
    if (secondTime >= 60) { //如果秒数大于60，将秒数转换成整数
        min = Number(secondTime / 60) //获取分钟，除以60取整数，得到整数分钟
        secondTime = Number(secondTime % 60) //获取秒数，秒数取佘，得到整数秒数
        if (min >= 60) { //如果分钟大于60，将分钟转换成小时
            h = Number(min / 60) //获取小时，获取分钟除以60，得到整数小时
            min = Number(min % 60) //获取小时后取佘的分，获取分钟除以60取佘的分
            if (h >= 24) {
                d = Number(h / 24)
                h = Number(h % 24)
            }
        }
    }
    if (d) {
        result = parseInt(d) + '天' + parseInt(h) + '小时' + parseInt(min) + '分'
    } else if (h) {
        result = parseInt(h) + '小时' + parseInt(min) + '分'
    } else {
        result = parseInt(min) + '分'
    }
    return {
        time: result,
        day: Number(d) || 0
    }
}
// 根据当前时间和随机数生成流水号
const randomNumber = function (j = 2) {
    var random_no = "";
    for (var i = 0; i < j; i++) //j位随机数，用以加在时间戳后面。
    {
        random_no += Math.floor(Math.random() * 10);
    }
    const dates = new Date();
    var year = dates.getFullYear()
    var month = dates.getMonth() + 1

    var day = dates.getDate()
    var hour = dates.getHours()
    var minute = dates.getMinutes()
    var second = dates.getSeconds()
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (second < 10) {
        second = '0' + second;
    }
    random_no = year + '' + month + '' + day + '' + hour + '' + minute + '' + second + '' + random_no;
    return random_no;
}
// 处理手机号吗
const mobileStr = function (mobile) {
    return mobile.substr(0, 3) + "****" + mobile.substr(7); //131****5555
}
/**
 * 删除收尾空格 
 * @param {*} str 
 */
function trimStr(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 自动生成26个英文字母
 * @param {true大写字母 false小写字母} bol 
 * @param {其他 #} more 
 */
function generateLetter(bol, more) {
    var str = [];
    if (bol) {
        var i_start = 65,
            i_end = 91;
    } else {
        var i_start = 97,
            i_end = 123;
    }
    for (var i = i_start; i < i_end; i++) {
        str.push(String.fromCharCode(i));
    }
    if (more) str.push(more)
    return str;
}
/**
 * 积分领取初始化
 * @param {连续签到天数} day 
 */
function integralIninData(day = 0) {
    var integral = 1,
        status = 0,
        integrals = []
    for (let i = 1; i < 1000; i++) {
        if (day >= i) {
            status = 1
        } else {
            status = 0
        }
        if (i <= 2) {
            integral = 1
        } else if (i <= 5) {
            integral = 2
        } else if (i < 7) {
            integral = 3
        } else {
            integral = 5
        }
        integrals.push({
            integral: integral,
            status: status,
            id: i
        })
    }
    if (day <= 4) {
        return integrals.slice(0, 7)
    } else {
        return integrals.slice(day - 4, day + 3)
    }
}
// 直接打开文档
const openDocumentSystem = function (url, name) {
    wx.showLoading({
        title: '加载中',
    })
    wx.downloadFile({
        url: url,
        success: (res) => {
            const filePath = res.tempFilePath;
            wx.openDocument({
                filePath: filePath,
            });
        },
        fail: res => {
            console.log('fail', res)
            wx.showModal({
                content: "文件大小超限制，暂不可直接查看！",
                showCancel: false
            })
        },
        complete: res => {
            console.log('complete', res)
            wx.hideLoading()
        }
    })
}
// 重写文件名称
const renameFileSystem = async function (url, name) {
    // 同步函数流程
    clearFileLocalCache()
    wx.showLoading({
        title: '加载中',
    })
    let type = getType(url);
    let fs = wx.getFileSystemManager()
    // url为文件URL, name为文件名
    //downloadFile 运用 filePath 指定文件下载后存储的路径 (本地路径) 即我们要用到 wx.enUSER_DATA_PATH 创建路径和临时文件tem.pdf然后进行改名
    let path = wx.env.USER_DATA_PATH + '/pdf';
    var acc, dir;
    acc = await accessSync(path)
    console.log(acc)
    if (acc) {
        dir = await mkdirSync(path);
    }
    console.log(dir)
    if (dir) {
        wx.showModal({
            content: '加载失败请重试！',
            showCancel: false
        })
        wx.hideLoading()
        return
    }
    console.log(path)
    wx.downloadFile({
        url: url,
        filePath: path + `/${name}${type}`,
        success: function (res) {
            console.log(res)
            if (res.statusCode === 200) {
                let filePath = res.tempFilePath;
                //存诸文件名为我们清除缓存（本地用户文件最多10M，因此需要解决，避免占用存诸）
                let delectFile = wx.getStorageSync('filePath', delectFile) ? wx.getStorageSync('filePath', delectFile) : [];
                delectFile = [...delectFile, path + `/${name}${type}`]
                wx.setStorageSync('filePath', delectFile)
                wx.openDocument({
                    filePath: path + `/${name}${type}`,
                    success: function (res) {
                        console.log('打开文档成功')
                    },
                    fail: function (res) {
                        wx.showToast({
                            title: 'fail',
                            icon: 'none'
                        })
                    }
                })
            }
        },
        fail: function (res) {
            console.log('rename-fail', res)
        },
        complete: function (res) {
            wx.hideLoading()
        }
    })
}
const examineDirSync = async function (path) {
    // 同步函数流程
    return new Promise(function (resolve, reject) {
        accessSync().then(function (err) {
            if (err) {
                return mkdirSync();
            }
        }).then(function (err) {
            if (!err) {
                resolve();
            } else {
                wx.showModal({
                    content: res,
                })
            }
        });
    });
}
const accessSync = function (path) {
    return new Promise(function (resolve, reject) {
        let fm = wx.getFileSystemManager();
        try {
            fm.accessSync(path);
            resolve();
        } catch (err) {
            resolve(err);
        }
    });
}
const mkdirSync = function (path) {
    return new Promise(function (resolve, reject) {
        let fm = wx.getFileSystemManager();
        try {
            fm.mkdirSync(path, true);
            resolve();
        } catch (err) {
            resolve(err);
        }
    });
}
//重复删除之前缓存的文件
const clearFileLocalCache = function () {
    let delectFile = wx.getStorageSync('filePath', delectFile);
    if (!delectFile.length) return
    let fs = wx.getFileSystemManager();
    if (!delectFile.length) return
    for (let i = 0; i < delectFile.length; i++) {
        fs.unlink({
            filePath: delectFile[i],
            success: res => {},
            fail: res => {
                console.log('删除失败')
            }
        })
    }
    delectFile = [];
    wx.setStorageSync('filePath', delectFile)
}

// 获取文件后缀
const getType = function (file) {
    var filename = file;
    var index1 = filename.lastIndexOf(".");
    var index2 = filename.length;
    var type = filename.substring(index1, index2);
    return type;
}
// 验证身份证号码
const idCardNo = function (code) {
    //身份证号合法性验证 
    //支持15位和18位身份证号
    //支持地址编码、出生日期、校验位验证
    var city = {11: "北京",12: "天津",13: "河北",14: "山西",15: "内蒙古",21: "辽宁",22: "吉林",23: "黑龙江 ",31: "上海",32: "江苏",33: "浙江",34: "安徽",35: "福建",36: "江西",37: "山东",41: "河南",42: "湖北 ",43: "湖南",44: "广东",45: "广西",46: "海南",50: "重庆",51: "四川",52: "贵州",53: "云南",54: "西藏 ",61: "陕西",62: "甘肃",63: "青海",64: "宁夏",65: "新疆",71: "台湾",81: "香港",82: "澳门",91: "国外 "};
    var pass = true;
    var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
    if (!code || !code.match(reg)) {
        pass = false;
    } else if (!city[code.substr(0, 2)]) {
        pass = false;
    } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            if (parity[sum % 11] != code[17]) {
                pass = false;
            }
        }
    }
    return pass;
}
const loadFontFace = function(url,desc){
    return new Promise((resolve,reject)=>{
        wx.loadFontFace({
            family: desc,
            global:true,
            source: "url(" + url + ")",
            success: function (res) {
                resolve(true)
            },
            fail: function (res) {
                reject(res)
            }
        })
    })
}
const createUpdateShareMenu = function (data){
    return new Promise(async (resolve,reject)=>{
        var activityId = data.activityId||''
        if(!activityId){
            let res = await Api.weixinDynamic();
            if(!res['success']){
                wx.showModal({
                    content:res.msg,
                    showCancel:false
                })
                resolve(false)
                return
            }
            activityId = res.result.activityId||'';
        }
        wx.updateShareMenu({
            withShareTicket: data.withShareTicket||false,//是否使用带 shareTicket 的转发
            isUpdatableMessage: data.isUpdatableMessage||false,//是否是动态消息
            activityId:activityId, // 活动 ID  动态消息的 activityId
            toDoActivityId:data.toDoActivityId||false,
            isPrivateMessage:data.isPrivateMessage||false,
            templateInfo: data.templateInfo,
            success(res){
                resolve({
                    success:true,
                    activityId:activityId
                })
            },
            fail (res){
                reject(res)
            }
        })
    })
}

const setUpdateShareMenu  =async function(data){
    let res =await Api.weixinDynamic({
        type:2,
        activityId:data.activityId,
        targetState:data.targetState,
        patk:data.ptah,
        version_type:data.version_type,
        templateInfo:data.templateInfo
    })
    if(!res['success']){
        wx.showModal({
            content:res.msg,
            showCancel:false
        })
        return false
    }
    return true;
}
const isCheckObjectEmpty = function(obj){
    if(obj) return true;
    if(typeof obj != "object") return true;
    for (const key in obj){
        return false
    }
    return true;
}

// 订阅模板消息
const subscribeMessage = function(tmplIds=[]){
    return new Promise(function (resolve) {
        wx.requestSubscribeMessage({
            tmplIds: tmplIds,
            complete:(res)=>{
                console.log('requestSubscribeMessage',res)
                res.tmplIds = tmplIds;
                resolve(res);
            }
        });
    });
}
// 本地连接 替换正式连接
const ossPaghChange = function(link){
    if(!link) return link;
    if(link.indexOf('https://')!=-1) return link;
    return link.replace(appConfig.ossCloud,appConfig.ossPath)
}
module.exports = {
    getTime: getTime,
    getNewTime: getNewTime,
    getTimeToTimeDay: getTimeToTimeDay,
    getDayEndTime: getDayEndTime,
    getCustomString: getCustomString,
    createImgName: createImgName,
    isMobilePhone: isMobilePhone,
    getHoreLong: getHoreLong,
    randomNumber: randomNumber,
    mobileStr: mobileStr,
    trimStr: trimStr,
    generateLetter: generateLetter,
    integralIninData: integralIninData,
    openDocumentSystem: openDocumentSystem,
    renameFileSystem: renameFileSystem,
    examineDirSync: examineDirSync,
    gsTime: gsTime,
    idCardNo:idCardNo,
    loadFontFace:loadFontFace,
    createUpdateShareMenu:createUpdateShareMenu,
    setUpdateShareMenu:setUpdateShareMenu,
    isCheckObjectEmpty:isCheckObjectEmpty,
    subscribeMessage:subscribeMessage,
    ossPaghChange:ossPaghChange
}