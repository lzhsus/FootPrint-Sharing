Page({
    data: {
        latitude: 23.099994,
        longitude: 113.324520,
        mapScale:12,// 2-20 1000km-10m
        mapDefault:{
            scale:14,
            min_scale:14,
            max_scale:14	
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
                            content:"请允许获取您的位置信息，将为您更好的推荐！",
                            cancelText:"随机位置",
                            success:res=>{
                                if (res.confirm) {
                                    console.log('用户点击确定')
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })
                    }else {
                        wx.showModal({
                            content:err,
                            showCancel:false,
                            confirmText:"重新加载",
                            success:res=>{
                                
                            }
                        })
                    }
                    resolve(Object.assign(err,{
                        success:false
                    }))
                }
            })
        })
    },
    async onLoad () {
        let res = await this.getLocationSync()
        console.log('res',res)
    },

    onMarkerTap(e) {
        console.log('@@ markertap', e)
    },

    onCalloutTap(e) {
        console.log('@@ onCalloutTap', e)
    },

    onLabelTap(e) {
        console.log('@@ labletap', e)
    }
})