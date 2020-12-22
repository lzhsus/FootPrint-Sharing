import request from "./request";
import { userApi } from "./user/index";
let api = Object.assign(userApi,{});

/**
 * 默认位置信息
 */
api.footprintConfig = function(data, isShowLoading=true){
    return request('footprint','user/config',data,isShowLoading);
}


module.exports = api;