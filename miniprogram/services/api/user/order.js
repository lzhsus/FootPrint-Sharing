import request from "../request";
let orderApi = {}
// 订单列表
orderApi.userOrderBuyList = function(data, isShowLoading=true){
    return request('control','user/order/buylist',data,isShowLoading);
}
// 订单详情
orderApi.userOrderBuylistDetail = function(data, isShowLoading=true){
    return request('control','user/order/buylist/detail',data,isShowLoading);
}
// 未支付取消订单
orderApi.userOrderBuylistClose = function(data, isShowLoading=true){
    return request('control','user/order/buylist/close',data,isShowLoading);
}
// 确认接单
orderApi.userOrderBuylistConfirm = function(data, isShowLoading=true){
    return request('control','user/order/buylist/confirm',data,isShowLoading);
}

// 申请归还
orderApi.userOrderBuylistGiveBack = function(data, isShowLoading=true){
    return request('control','user/order/buylist/giveback',data,isShowLoading);
}
export { orderApi }