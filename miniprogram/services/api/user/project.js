import request from "../request";
let projectApi = {}
// 获取产品列表
projectApi.projectList = function(data, isShowLoading=true){
    return request('control','project/list',data,isShowLoading);
}
// 获取产品类别
projectApi.projectKinds = function(data, isShowLoading=true){
    return request('control','project/kinds',data,isShowLoading);
}
// 获取产品详情
projectApi.projectDetail = function(data, isShowLoading=true){
    return request('control','project/detail',data,isShowLoading);
}
// 添加评论
projectApi.projectSetcomment = function(data, isShowLoading=true){
    return request('control','project/setcomment',data,isShowLoading);
}
// 获取产品评价列表
projectApi.projectComment = function(data, isShowLoading=true){
    return request('control','project/comment',data,isShowLoading);
}
// 产品点赞 取消点赞
projectApi.projectFavorites = function(data, isShowLoading=true){
    return request('control','project/favorites',data,isShowLoading);
}

export { projectApi }