import request from "../request";
let payApi = {}
/**
 * 下单(已废弃)
 */
payApi.userPayCreate = function(data, isShowLoading=true){
    return request('control','user/pay/create',data,isShowLoading);
}
/**
 * 创建订单
 */
payApi.userPayUnifiedOrder = function(data, isShowLoading=true){
    return request('control','user/pay/unifiedOrder',data,isShowLoading);
}
/**
 * 申请退款
 */
payApi.userPayRefund = function(data, isShowLoading=true){
    return request('control','user/pay/refund',data,isShowLoading);
}
export { payApi }