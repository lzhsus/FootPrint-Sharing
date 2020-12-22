Component({
    properties: {
        type:String
    },
    data: {

    },
    methods: {
        closeTap(type){
            this.triggerEvent('settingCloseEvent',type)
        },
        openSettingTap(){
            wx.openSetting({
                success:(res)=> {
                    // 获取相册权限
                    if( this.data.type=='scope.writePhotosAlbum' ){
                        if( res.authSetting['scope.writePhotosAlbum'] ){
                            this.closeTap()
                            wx.showToast({
                                title: '请重新保存图片！',
                                icon: 'none',
                                duration: 3000,
                            });
                        }else{
                            wx.showToast({
                                title: '请勾选"保存到相册"权限！',
                                icon: 'none',
                                duration: 3000,
                            });
                        }
                    }else if(this.data.type == 'scope.userLocation'){
                        if(res.authSetting['scope.userLocation']){
                            this.closeTap(true)
                            wx.showToast({
                                title: '已成功获取位置信息！',
                                icon: 'none',
                                duration: 3000,
                            });
                        }else{
                            wx.showToast({
                                title: '请允许获取您的位置信息，将为您更好的推荐！',
                                icon: 'none',
                                duration: 3000,
                            });
                        }
                    }
                },
            })
        }
    }
})
