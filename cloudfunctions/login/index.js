
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()

    var res = await db.collection('user_info').where({
        openId: _.eq(wxContext.OPENID)
    }).get()

    if (!res.data[0]) {
        var data_info = {};
        data_info.openId = wxContext.OPENID||'';
        data_info.appId = wxContext.APPID||'';
        data_info.unionId = wxContext.UNIONID||'',
        data_info.env = wxContext.ENV||'';
        data_info.create_time = db.serverDate();
        data_info.updata_time = db.serverDate();
        await db.collection('user_info').add({
            // data 字段表示需新增的 JSON 数据
            data: data_info
        })
    }
    return {
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
        env: wxContext.ENV,
    }
}