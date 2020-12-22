const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  })
const db = cloud.database({
    throwOnNotFound: false
})
const _ = db.command;
const globalConfig = require('../../config/index')
const $ = db.command.aggregate

module.exports =async (event,context,root)=>{
    const {
        OPENID
    } = cloud.getWXContext();
    let parame = event.data||{};
    try {
        var result= await db.collection('db_userinfo')
            .aggregate()
            .match({
                openId:parame.openId||OPENID,
            })
            .lookup({
                from:"mmote_personal",
                let:{
                    openId:"$openId"
                },
                pipeline: $.pipeline()
                    .match(_.expr($.and([
                        $.eq(['$openId', '$$openId'])
                    ])))
                    .done(),
                as:'mmote_personal'
            })
            .lookup({
                from:"mmote_list",
                let:{
                    openId:"$openId"
                },
                pipeline: $.pipeline()
                    .match(_.expr($.and([
                        $.eq(['$openId', '$$openId'])
                    ])))
                    .done(),
                as:'mmote_list'
            })
            .end()
            result = result.list||[];

        var res = {
            errcode:200,
            msg: "操作成功!",
            result:result[0]||{},
            success:true,
            timestamp:new Date().getTime()
        }
    } catch (error) {
        var error_type = globalConfig.common.error_type(error.errCode);
        var res = {
             errcode:404,
             msg: error_type.type,
             result:error,
             success:false,
             timestamp:new Date().getTime()
        }
    }
    return res;
}