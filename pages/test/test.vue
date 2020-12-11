<template>
	<view class="padding">
		<input placeholder="请输入订单" name="tel"  @change="inputOrderId" ></input>
		 <button @click="getCode" type="primary">获取code</button>
		<button @click="getPay" type="primary" style="margin-top:20px;">微信支付</button>
	</view>
</template>

<script>
	export default{
		data() {
			return {
					orderId:"",
			}
		},
		onLoad(){
			this.category()
		},
		methods:{
				inputOrderId(e){
					console.log(e.detail.value)
					this.setData({
						orderId : e.detail.value,
					})
				},
			
			
			    // 微信登陆，获取code
			    getCode(){
			        wx.login({
			            success(res){
			                console.log(res)
			            }
			        })
			    },
			    //微信支付
			    getPay(){
			        wx.request({
			            url: "https://wm.51zfgx.com/api/orders/prepay/",
			            method:  "POST",
			            header: {
			                'content-type': 'application/x-www-form-urlencoded',// 默认值
			                'Access-Control-Allow-Origin': true,
			            },
			            data: {
			                "Session": "5IRWgui7bOj2XIpL3tTOhl/Y98E6ys2CiAaVJZ8tSdf0cVdUGNzFr9xb/kENYJG6e+2FGdKWWlizH6S8AkCHkr6ASOlSyvqC64y1AS5hdaoCm3i9iqC87fvt735cmi/h8B1tC4Sv8EGVwNIqM+r5QY6HYtbOBo+iAaspr0oyhGmR+JbpMcFVIRjPpuOW5WDzM8K2SvJfodhy21fGocmqhNPwPpNrc/0MZztqUxwITxGSxASaQjlMjO66Qp0ZIGRVeAFNq7BaJeGtLzp5lpUa0PyvDw1PNei+fBDgJ1JviAM+X+NPlz988vJJ2LDCRTCdMJ7R6uMYlF8PI2mh4eOzcuc7HRxt7QBTvd3ZOZqSr4A=",
			                "AppId": "830d964eb4874490a04f86c23e24ad1a",
			                "OrderId": this.$data.orderId,
			            },
			            success(res){
			
			                var data = res.data.data
			                wx.requestPayment({
			
			                    timeStamp: data.timeStamp,
			                    nonceStr: data.nonceStr,
			                    package: data.package,
			                    signType: 'MD5',
			                    // paySign: data.paySign,		
			                    paySign: data.subpaySign,
			                    success(res) {
			
			                        console.log('success:', res)
			                    },
			                    fail(res) {
			                        console.log('fail:', res)
			                    }
			                })
			            }
			        })
			    },

		},
	}
</script>

<style>
</style>
