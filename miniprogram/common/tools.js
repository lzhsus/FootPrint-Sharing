/**
 * 
 * @param {*} files 不可为空 字符串 数组
 *      如果是数组要压缩的图片字段必须是@param {press_img}
 *      可以过滤掉不需要压缩的图片@param {press_success}
 * @param {*} quality 可以为空 默认80
 * @returns {}
 *      files 对应压缩后的源文件
 *      press_num 对应这次压缩了多少文件
 *      press_status 1 全部压缩成功 0 部分压缩成功
 */
export const compressImage = (files,quality)=>{
    if(!toString(files)&&!toArray(files)){
        throw new Error("compressImage >> files:argument must be either a string or an array!");
    }
    if(quality&&(isNaN(quality)||Number(quality)<0||Number(quality)>100)){
        throw new Error("compressImage >> quality:argument must be a number from 0 to 100!");
    }
    if(toString(files)){
        files = [{press_img:files}]
    }
    files = files.map((item,i)=>{
        item.press_id = i;
        return item;
    })
    console.log('初始：',JSON.parse(JSON.stringify(files)))

    let filesPressList = []
    for(let i=0;i<files.length;i++){
        filesPressList.push(init(files[i],files[i].press_success))
    }
    return new Promise((resolve,reject)=>{
        Promise.all(filesPressList).then((result) => {
            returnData(resolve,reject,result)
        })
    })
    function returnData(resolve,reject,list){
        let backList = [];
        for(let i=0;i<list.length;i++){
            backList.push(list[list[i].press_id])
        }
        console.log(backList)
        resolve(backList.map(item=>{
                let obj = item;
                console.log(obj)
                if(obj.press_id>=0) delete obj.press_id;
                return obj;
            }))
    }
    function info(files){
        return new Promise(async (resolve,reject)=>{
            getImageInfo(files,resolve, reject,0);
        })
    }
    function init(data,exclude){
        return new Promise(async (resolve,reject)=>{
            if(exclude) resolve(data)
            let path = await info(data.press_img)
            console.log('path',path)
            wx.compressImage({
                src: path, // 图片路径
                quality: Number(quality)||80, // 压缩质量
                success:res=>{
                    resolve(Object.assign(data,{
                        press_img:res.tempFilePath,
                        press_success:true
                    }))
                },
                fail:err=>{
                    console.log(err)
                    resolve(Object.assign(data,{
                        press_success:false
                    }))
                }
            })
        })
    }
}
/**
 * 检查是否为字符串
 */
function toString(s){
    return Object.prototype.toString.call(s)==='[object String]'
}
/**
 * 检查是否为数组
 */
function toArray(s){
    return Object.prototype.toString.call(s)==='[object Array]'
}
function getImageInfo(imgPath, resolve, reject,errorNum=0){
    wx.getImageInfo({
        src: imgPath,
        success: (res)=>{
            resolve(res.path)
        },
        fail: ()=>{
            // 图片加载失败重试三次
            errorNum++
            if( errorNum>3 ) {
                reject()
                return
            }
            getImageInfo(imgPath, resolve, reject,errorNum)
        }
    })
}