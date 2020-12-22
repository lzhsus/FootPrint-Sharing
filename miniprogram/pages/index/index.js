
const Api = require('../../services/api/index');
const common = require('../../common/common');
const appConfig = require('../../common/app_config');
Page({
    data: {
        type:'',
        opt:"",
        settingShow:false,
        pageShow:false,
        latitude: 23.099994,
        longitude: 113.324520,
        mapScale:12,// 2-20 1000km-10m
        mapDefault:{
            width:100,
            height:100,
            scale:14,
            min_scale:14,
            max_scale:14,
            enablePoi: true,//是否展示 POI 点	
            enableBuilding: true,//是否展示建筑物	
            enableZoom: true,//是否支持缩放
            enableScroll: true,//是否支持拖动
            enableRotate: false,//是否支持旋转
            showCompass: false,
            enable3D: false,//展示3D楼块(工具暂不支持
            enableOverlooking: false,//开启俯视
            enableSatellite: false,//是否开启卫星图
            enableTraffic: false,//是否开启实时路况
        }
    },
    getLocationSync(){
        return new Promise((resolve,reject)=>{
            wx.getLocation({
                type: 'wgs84',
                altitude:true,
                isHighAccuracy:true,
                success (res) {
                    resolve(Object.assign(res,{
                        success:true
                    }))
                },
                fail:err=>{
                    if(err.errMsg=='getLocation:fail auth deny'){
                        wx.showModal({
                            content:"请点击确认，允许获取您的位置信息，将为您更好的推荐！",
                            cancelText:"随机位置",
                            success:async res=>{
                                if (res.confirm) {
                                    this.setData({settingShow:true,type:'scope.userLocation'})
                                } else if (res.cancel) {
                                    let configRes = await Api.footprintConfig();
                                    if(configRes.success){
                                        configRes = configRes.result||{}
                                        var location = configRes.location;
                                    }else{
                                        var location = {
                                            latitude: 121.47342403427125,
                                            longitude: 31.232445187489745
                                        }
                                    }
                                    this.onLoadEvent(location)
                                }
                            }
                        })
                    }else {
                        wx.showModal({
                            content:err,
                            showCancel:false,
                            confirmText:"重新加载",
                            success:res=>{}
                        })
                    }
                    resolve(Object.assign(err,{
                        success:false
                    }))
                }
            })
        })
    },
     onLoad (opt) {
        this.setData({opt:opt})
        this.onLoadEvent()
    },
    async onLoadEvent(location=null){
        // 保存获取到位置信息
        let opt = this.data.opt||{};
        if(location==null){
            let res = await this.getLocationSync();
            if(!res.success) return;
            location = {
                latitude: res.latitude,
                longitude: res.longitude
            }
        }
        const systemInfo = wx.getSystemInfoSync()
        let mapDefault = this.data.mapDefault;
        mapDefault.width = systemInfo.windowWidth;
        mapDefault.height = systemInfo.windowHeight;
        this.setData({
            latitude: location.latitude,
            longitude: location.longitude,
            mapDefault:mapDefault,
            pageShow:true
        })
        
    },
    settingCloseEvent(type){
        if(type) this.onLoadEvent()
        this.setData({settingShow:false})
    },

    onMarkerTap(e) {

    },

    onCalloutTap(e) {

    },

    onLabelTap(e) {
        
    }
})