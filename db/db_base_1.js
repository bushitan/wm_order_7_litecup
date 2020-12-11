
var step = 0
class dbBase{	
	/**
	 * @statics 静态变量
	 */
	KEY_USER_INFO = "user_info"
	KEY_UUID = "uuid"
	KEY_TOKEN = "token"
	KEY_SESSION = "Session"
	KEY_SHOP_ID = "shop_id"
	KEY_SHOP_NAME = "shop_name"
	KEY_SHOP_TAKE_TYPE= "shop_take_type"
	KEY_ORDER_PRE_PHONE = "order_pre_phone"
	KEY_ORDER_PRE_ADDRESS = "order_pre_address"
	
	
	
	SHOP_TAKE_WM = 1 // 外卖
	SHOP_TAKE_ZQ = 2 // 到店自取
	SHOP_TAKE_TS = 4 // 堂食
	SHOP_TAKE_KD = 8 // 快递	
	
	PAYMENT_STATUS_PENDING = 10 // 待支付
	PAYMENT_STATUS_AUTHORIZED = 20 // 待支付
	PAYMENT_STATUS_PAID = 30 // 已经支付
	PAYMENT_STATUS_REFUND = 40 // 退款
	PAYMENT_STATUS_CANCEL = 50 // 取消支付
    PAYMENT_STATUS_REFUND_APPLY = 60 // 申请退款
	
	ORDER_STATUS_PENDING = 10 // 订单待处理
	ORDER_STATUS_PROCESSING = 20 // 订单处理中
	ORDER_STATUS_COMPLETE = 30 // 订单已完成
	ORDER_STATUS_CANCEL = 40 // 订单已取消 ==  退款

	SHIP_STATUS_NOT_REQUIRED = 10 //不需要配送
	SHIP_STATUS_NOT_YET = 20 //未配送
	SHIP_STATUS_PARTIALLY = 25 //部分已配送
	SHIP_STATUS_ING = 30 //配送中
	SHIP_STATUS_DELIVER = 40 //已送达
	SHIP_STATUS_CANCEL = 50 //已取消
	
	
	// APP_ID = "fb03065306ca41ecb15fc3872e04d355"  // Strong
	APP_ID = "4da3f7477a4d4c2fbc1282c61ea489b0"  // 小杯子精选
	
	// APP_ID = "aaa418db45c94cf7863a30b3f97c7e30" // 门店安心卡 
	
	// URL = "http://221.7.253.6:9019/Api/Task/TaskHandler.ashx?"
	HOST_URL = "https://wm.51zfgx.com/"
	
	// URL_WORK = "http://221.7.253.6:9019/Api/Task/WorkHandler.ashx?action="
	
	constructor(){}
	
	/********瀑布流模块*********/
	checkIsMore(page,limit,count){		
		// 版本2
		if (count < limit)
			return false
		else 
			return true
	}
	
	/**
	 * @method 初始化瀑布流
	 */
	listInit(self){
		self.setData({
			page : 1,
			limit : 10,
			lock : false,
			isMore:true,
			list:[],
		})
	}
	
	/**
	 * @method 更新
	 */
	listUpdate(self,res){
		// debugger
		var page = self.$data.page
		var limit = self.$data.limit
		// var count = res.count || res.data.length
		var count = res.data.length
		var oldList = self.$data.list
		var newList = res.data
		
		var isMore = this.checkIsMore(page,limit,count)
		self.setData({
			page:self.$data.page + 1,
			lock:false,
			list: oldList.concat(newList) ,
			isMore:isMore,
		})					
	}
	
	/**************计算************/
	accDiv(arg1,arg2){
	  let t1=0,t2=0,r1,r2;
	  try{t1=arg1.toString().split(".")[1].length}catch(e){}
	  try{t2=arg2.toString().split(".")[1].length}catch(e){}
	  r1=Number(arg1.toString().replace(".",""))
	  r2=Number(arg2.toString().replace(".",""))
	  return (r1/r2)*Math.pow(10,t2-t1);
	}
	
	
	/********基础请求*********/
	
	// 封装基础的请求
    base(options){
        return new Promise((resolve, reject) => {
            var data = options.data || {}
			for (var i in data){
				if (data[i] == undefined)
					data[i] = ""
			}					
            data["Session"] = wx.getStorageSync(this.KEY_SESSION)
			// data["Session"] = "5IRWgui7bOjkYGlrvi766K9mKd2tRwIgC4WzmK+7X+CZp7kSGSmJSIqltssQ/OrB9p2lDvRpvUin0yjie7GJ7mZb5PXUZTTlx8w737wzdRzwrePHmYWLj4bUvFUrzWCjB6YaLiWte5+/W7YZrm6CzseU4jAvZ3vckhY+T+qfdrCrtig+LpW4XNwmw3sWuotpQehImOyje4aK2zIQ/8UF6PoM/EgItRoOGfplfX0FuESN4z+Fd6vjxAcxHrhuzJ6RLOCiL+0gTCka+kRdZERzxXl262keOsnn1X6CvwZfFKeFckWkF4NYPw1ES5ELF0q2+aiznxXSXzUzatU5xirc1XcySPMCSzLbjd+8DTaWs4l11GTOXxqxIQTecC857+rCBHOjFB3lI8g="
			data["AppId"] = this.APP_ID
		
		
		// uni.request({
		// 	url:this.HOST_URL,
		// 	method:"POST",
		// 	data:{
		// 		logmsg:options.url 
		// 	}
		// })
			var that = this
			// debugger
			// console.log(uni.getStorageSync("token"))
			
			var url = options.url
			// var url = options.url + "?sn=" + step
			// step++
			
			var startTime = new Date().getTime();
			// console.log('startTime',startTime)
			
            wx.showLoading({ title: "" ,mask:true})
            uni.request({
                url: url,
                method: options.method || "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded' ,// 默认值
					'Access-Control-Allow-Origin':true,
					'Authorization': 'Bearer ' + uni.getStorageSync("token")
                },
                data: data,
                success(res) {
                    wx.hideLoading()
					
					var completeTime = new Date().getTime();
					var dateTime = completeTime - startTime
					console.log(options.url , completeTime - startTime)
					if( dateTime > 2000) {
						uni.request({
							url:that.HOST_URL + "api/log/addlog/",
							method:"POST",
							data:{
								logmsg:options.url + ":" + dateTime
							}
						})
					}
					resolve(res)
                },
                fail(res) {
                    console.log(url)
                    wx.hideLoading()
					
					uni.request({
						url:that.HOST_URL + "api/log/addlog/",
						method:"POST",
						data:{
							logmsg:url + res
						}
					})
                    reject(res)
                },
				complete(){
					
				},
				
            })
        })
    }
	
	openSettingLocation(){
		return new Promise((resolve, reject) => {
			uni.openSetting({
				success(res) {
					console.log(res)
					resolve(res.authSetting['scope.userLocation'])
				},
				fail(res) {
					console.log(res)
					reject(false)
				},
			})
		})
	}
	
	// 校验地址设置
	checkAuthorUserLocation(){
		return new Promise((resolve, reject) => {
			// if(uni.hasOwnProperty("authorize") == false)
			// 	resolve(false)
				
			uni.authorize({
				scope: "scope.userLocation",
				success(res) {
					resolve(true)
					// console.log(res)
				},
				fail(res) {
					reject(false)
					// console.log(res)
				},
			})
			
		})
	}
	// 获取用户当前的位置
	getLocation() {
		return new Promise((resolve,reject) => {
			var that = this
			uni.getLocation({
				type: 'gcj02',
				success(res) {
					var obj = {}
					obj.latitude = res.latitude
					obj.longitude = res.longitude
					obj.speed = res.speed
					obj.accuracy = res.accuracy
					obj.altitude = res.altitude
					obj.horizontalAccuracy = res.horizontalAccuracy
					resolve(obj)
				},
				fail(res) {
					resolve(false)
					console.log("地址未授权")
				}
			})
		})

	}
}
module.exports = dbBase

// export default dbBase;