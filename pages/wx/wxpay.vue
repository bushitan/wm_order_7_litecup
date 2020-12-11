<template>
	<view class="flex justify-center align-center" style="height:100vh">
		<button class="cu-btn rounde bg-gray ">返回</button>
	</view>
</template>

<script>
	
	export default {
		data(){
			return{
				orderId:"",				
			}
		},
		onLoad(options){
			// debugger
			this.setData({
				orderId : options.orderId || "",
			})
			this.onInit()
			// this.test()
		},
		methods:{
			// async test(){
			// 	var res =
			// 	{
			// 	  "code": 0,
			// 	  "msg": "ServicePrePay获取支付签名成功",
			// 	  "data": {
			// 	    "success": true,
			// 	    "prepay_id": "wx290158232228010c19a4b5010980070000",
			// 	    "appId": "wxcd49aa99fd3d1f6a",
			// 	    "timeStamp": "1603907903",
			// 	    "nonceStr": "5856ACC6045AB981AD97826845A88868",
			// 	    "package": "prepay_id=wx290158232228010c19a4b5010980070000",
			// 	    "signType": "MD5",
			// 	    "xmlbody": "{\"PackageRequestHandler\":{},\"Sign\":\"D8201B4814B3F3B5C1C0D0B813325D97\",\"AppId\":\"wx15eb92053f01ff86\",\"MchId\":\"1512927361\",\"SubAppId\":\"wxcd49aa99fd3d1f6a\",\"SubMchId\":\"1602886274\",\"DeviceInfo\":null,\"NonceStr\":\"5856ACC6045AB981AD97826845A88868\",\"SignType\":\"MD5\",\"Body\":\"欢迎您，使用微信先享支付\",\"Detail\":null,\"Attach\":null,\"FeeType\":\"CNY\",\"OutTradeNo\":\"338d492092cd4c3fa0862dd3b461af48\",\"TotalFee\":1000,\"SpbillCreateIP\":\"212.64.78.2\",\"TimeStart\":\"20201029015823\",\"TimeExpire\":null,\"GoodsTag\":null,\"NotifyUrl\":\"https://wm.51zfgx.com/api/order/paynotify\",\"TradeType\":0,\"ProductId\":null,\"LimitPay\":null,\"OpenId\":null,\"SceneInfo\":null,\"SubOpenid\":\"oTq7n5bST7zFrELxcdstp4wqNE0k\",\"Key\":\"w3214560w3214560w3214560w3214560\"}",
			// 	    "paySign": "50968F4D71797D0712CBE93B24FDEE5A",
			// 	    "subpaySign": "764096F960883FA005CD9ED6A00095B0"
			// 	  }
			// 	}
			// 	var data = res.data
			// 	var obj = {
			// 		timeStamp: data.timeStamp,
			// 		nonceStr: data.nonceStr,
			// 		package: data.package,
			// 		signType: 'MD5',
			// 		 paySign: data.paySign,	//雕改 2020年09月16日 17：27	
			// 		// paySign: data.subpaySign,																		
			// 		success (res) { 
			// 			console.log(res)
			// 			uni.showModal({
			// 				title:"支付成功",
			// 				success(){
			// 					uni.switchTab({
			// 						url:"/pages/my/my"
			// 					})
			// 				},
			// 			})
			// 		},
			// 		fail (res) { 
			// 			console.log(res)
			// 			uni.showModal({
			// 				title:"失败，请重新支付",
			// 				success(){
			// 					uni.switchTab({
			// 						url:"/pages/my/my"
			// 					})
			// 				},
			// 			})
			// 		}
			// 	}
				
			// 	uni.requestPayment(obj)
			// },
			
			async onInit(){
				var that = this
				uni.showToast({
					title:"支付中",
				})
				
				var orderId = this.$data.orderId
				if( orderId == ""){
					console.log("未传入orderId")
					return
				}
				
				var res = await this.db.paymentCustomer({
					OrderId:orderId
				})
				console.log(res)
				
				if(res.code == -2){
					uni.showModal({
						title: res.msg,
						success(){
							uni.switchTab({
								url:"/pages/my/my"
							})
						},
					})
					return 
				}
				
				if(res.code == 0){
					var data = res.data
				
					var obj = {
						timeStamp: data.timeStamp,
						nonceStr: data.nonceStr,
						package: data.package,
						signType: 'MD5',
						 paySign: data.paySign,	//雕改 2020年09月16日 17：27	
						// paySign: data.subpaySign,																		
						success (res) { 
							console.log(res)
							uni.showModal({
								title:"支付成功",
								success(){
									uni.switchTab({
										url:"/pages/my/my"
									})
								},
							})
						},
						fail (res) { 
							console.log(res)
							uni.showModal({
								title:"失败，请重新支付",
								success(){
									uni.switchTab({
										url:"/pages/my/my"
									})
								},
							})
						}
					}
					console.log(obj)
					uni.requestPayment(obj)
				} 
				else {
					uni.showModal({
						title: "网络异常",
						success(){
							uni.switchTab({
								url:"/pages/my/my"
							})
						},
					})
					return 
				}
				 
			},
		},
	}
</script>

<style>
</style>
