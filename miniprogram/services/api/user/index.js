import request from "../request";
import {couponsApi} from './coupons';
import {projectApi} from './project';
import {orderApi} from './order';
import {payApi} from './pay';
let userApi = Object.assign(couponsApi,projectApi,orderApi,payApi,{})
/**
 * 管理员
 */
// 检查是否是会员
userApi.isMember = function(data, isShowLoading=false){
    return request('control','user/isMember',data,isShowLoading);
}

export {userApi}