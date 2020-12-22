import request from "../request";
let couponsApi = {}
/***
 * 获取优惠券
 */
couponsApi.userCouponsReceive = function(data, isShowLoading=true){
    return request('control','user/coupons/receive',data,isShowLoading);
}
/**
 * 优惠券列表
 */
couponsApi.userCouponsList = function(data, isShowLoading=true){
    return request('control','user/coupons/list',data,isShowLoading);
}

export { couponsApi }