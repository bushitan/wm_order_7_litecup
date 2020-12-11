<template>
	<view >
		<!-- <view class="">
			<image src="../../static/images/strong/swiper.jpg" mode="widthFix" style="width: 100%; display: block;"></image>
		</view> -->
		
		<view class="cu-list menu padding-tb ">
			<view class="cu-item " style="background-color: transparent;">
				<view class="action">
					<image :src='userInfo.WxAvatarUrl' 
						class="cu-avatar round  bg-gray margin-right" 
						style="width: 72px;height: 72px;"></image>
					<!-- <text class="text-black bg-yellow text-bold text-df" v-if="userInfo.name">{{userInfo.name}}</text> -->
					<button class="cu-btn round text-white bg-yellow text-bold text-df"  open-type="getUserInfo" @getuserinfo="getuserinfo" >
						{{userInfo ?　userInfo.WxNickName ? userInfo.WxNickName:'登陆' :'登陆'}}
					</button>
				</view>
				<!-- <view class="action">
					<button class="cu-btn round text-yellow text-bold" catchtap="deleteEmployee" > 删除</button>
				</view> -->
			</view>
		</view>
		
		
		<!-- <view class="cu-card padding-lr margin-top" @click="toOrder()">
		    <view class=" pg-radius  shadow shadow-warp bg-white">
				<image  src="https://6375-cup-wm-release-1302028748.tcb.qcloud.la/image/self.jpg?sign=181a1b9419d18dc1461c81632248552b&t=1604336227" mode="widthFix" class="pg-image-block"></image>
		    </view>
		</view> -->
		
	<!-- 	<view class="cu-card padding-lr margin-top ">
		    <view class=" pg-radius  shadow shadow-warp bg-white">
		        <view class="cu-bar  solid-bottom ">
		            <view class="action">
		                <text class="cuIcon-title text-yellow "></text>                
		                <text class="text-black text-sm">我的集点卡</text>      
		            </view>
		            <view class="action">
						<text class="text-grey  text-sm" @click="openMini">查看</text>
						
		            </view>
		        </view>
		    </view>
		</view> -->
		
	<!-- 	<view class="cu-card padding-lr margin-top ">
		    <view class=" pg-radius  shadow shadow-warp bg-white">
		        <view class="cu-bar  solid-bottom ">
		            <view class="action">
		                <text class="cuIcon-title text-yellow "></text>                
		                <text class="text-black text-sm">我的优惠券</text>      
		            </view>
		            <view class="action">
						<text class="text-grey  text-sm">全部</text>
						<view class="pg-arrow"></view>
		            </view>
		        </view>
				<view class="cu-list menu ">
					<view class="cu-item ">
						<view class="action">
							<text class="text-black  text-sm">5元外送券</text>
						</view>
						<view class="action">
							<text class="text-grey   text-sm">剩余10天</text>
						</view>
					</view>
				</view>
		    </view>
		</view> -->
		
		<view class="cu-card padding-lr margin-top ">
		    <view class=" pg-radius  shadow shadow-warp bg-white">				
				<view class="cu-bar  solid-bottom " @click="toOrder()" >
					<view class="action">
						<text class="cuIcon-title text-yellow text-sm"></text> 
						<text class="text-sm">我的订单</text> 	
					</view>
					<view class="action ">
						<text class="text-grey  text-sm">所有订单</text>
						<view class="pg-arrow"></view>
					</view>
				</view>		
				<view class="cu-bar  solid-bottom " @click="toAddress()" >
					<view class="action">
						<text class="cuIcon-title text-yellow text-sm"></text> 
						<text class="text-sm">我的地址</text> 	
					</view>
					<view class="action ">						
						<view class="pg-arrow"></view>
					</view>
				</view>
				<!-- <view class="cu-bar  solid-bottom " @click="toAddress()" >
					<view class="action">
						<text class="cuIcon-title text-yellow text-sm"></text> 
						<text class="text-sm">我的地址</text> 	
					</view>
					<view class="action ">
						<view class="pg-arrow"></view>
				   </view>
				</view> -->
			<!-- 	<view class="cu-bar  solid-bottom " @click="toOrder()" >
					<view class="action">
						<text class="cuIcon-title text-yellow text-sm"></text> 
						<text class="text-sm">联系客服</text> 
					</view>
					<view class="action ">
						<view class="pg-arrow"></view>
				   </view>
				</view> -->
		    </view>
		</view>
		
		<view class=" flex justify-center margin-top">
		    <button class=" cu-btn round  text-gray text-sm"  type="" open-type="contact">联系客服</button>
		</view>
		
		<view class=" padding-xs flex align-center margin-top-sm">
		    <view class="flex-sub text-center">
		        <view class=" text-df ">
		            <text class="text-gray text-sm">Copyright © 2020 索骏科技提供技术支持</text>
		        </view>           
		    </view>
		</view>
		<!-- <view class=" flex justify-center ">
		    <button class=" cu-btn round bg-darkGray text-gray text-sm"  >联系客服</button>
		</view> -->
		<view class="pg-space-xxl"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				isHost: true,
				isSeller: true,
				daystats: { totalScore: 0, totalPrize:0}, // 今日数据
		
				store:{},
				userInfo: {
					// id: '202232',
					// name: '',
					// logo:"http://192.168.200.103:8083/wm_order_uni/static/images/strong/swiper.jpg",
					// allScoreNum: 1,
					// allPrizeNum: 1,
					// allStoreNum: 1,
					
					// avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLhpCNoXf1fPWsNViacVuZfZaDmINO9LLQ53sokGNZShic3hNBSwiaKIMlLlJfx4vxyOX0SoCk9SBJicw/132"
					// city: ""
					// country: "Ireland"
					// gender: 1
					// language: "zh_CN"
					// nickName: "this.丰丰 (¦(¦3[]"
					// province: "Wicklow"
				},

			}
		},
		onLoad() {
			this.onInit()
		},
		
		onShareTimeline(res){
			console.log(res , 'onShareTimeline')
			return {
				title: "",
				imageUrl: "/static/images/share.jpg",
				query:"/pages/route/route",
			}
		},
		onShareAppMessage(){
			return {
				title: "",
				imageUrl: "/static/images/share.jpg",
				path:"/pages/route/route",
			}
		},
		methods: {
			toTest(){
				uni.navigateTo({
					url:"/pages/test/test"
				})
			},
			
			
			async onInit(){
				var res = await this.db.customerGetInfo()
				console.log(res)
				this.setData({
					userInfo:res.data
				})
			},
			
			//登录
			async getuserinfo(e){
				console.log(e.detail.userInfo)
				// var res = await this.db.customerUpdate()
				var userInfo = e.detail.userInfo
				var wxUserInfo = {
					WxAvatarUrl:userInfo.avatarUrl ,
					WxCity:userInfo.city ,
					WxCountry:userInfo.country ,
					WxGender:userInfo.gender ,
					WxLanguage:userInfo.language ,
					WxNickName:userInfo.nickName ,
					WxProvince:userInfo.province ,
				}
				this.setData({
					userInfo:wxUserInfo
				})				
				await this.db.customerSetInfo(wxUserInfo)
				
				await this.db.roomAddUserInfo(wxUserInfo)
				
				uni.showToast({
					title:"更新成功"
				})
			},
			
			toMenu(){
				uni.navigateTo({
					url:"/pages/order/menu"
				})
				
			},
			
			toOrder(){
				// uni.previewImage({
				// 	urls:['cloud://nntv-qx-release.6e6e-nntv-qx-release-1303246888/image/dian.jpg'],
				// })
				
				// uni.navigateToMiniProgram({
				//   appId: 'wx4b74228baa15489a',
				//   path: 'lib/shop/dist/pages/index/index.html?distributorId=&shopId=1611972072',
				
				// })
				
				
				uni.navigateTo({
					url:"/pages/order/list"
				})
			},
			toDetail(){
				uni.navigateTo({
					url:"/pages/order/detail"
				})
			},
			// 去到我的位置
			toAddress(){ uni.navigateTo({ url:"/pages/my/address?isMyEnter=true" }) },	
			
			openMini(){
				console.log("openMini")
				uni.navigateToMiniProgram({
				  appId: 'wxd19bbe9cb3b293b6',
				  path: 'pages/route/route?mode=store&store_uuid=68e54718-7156-11e9-b456-e95aa2c51b5d',
				  // extraData: {
				  //   'data1': 'test'
				  // },
				  success(res) {
				    // 打开成功
					console.log(res)
				  },
				  fail(res) {
				    // 打开成功
					console.log(res)
				  },
				})
			},
			
			// // 打开我的地址
			// toAddress(){
			// 	var that = this
			// 	uni.getSetting({
			// 	   success(res) {
			// 			console.log(res.authSetting)
			// 			that.getAddress()
			// 			if(res.authSetting["scope.address"] == false){						  
			// 			// 	that.getAddress()
			// 			// }else{
			// 				uni.openSetting({
			// 					success(res) {
			// 						console.log(res.authSetting)
			// 						if(res.authSetting["scope.address"])										
			// 							that.getAddress()
			// 					}
			// 				})
			// 			}
			// 	   }
			// 	})
			// },
			
			// getAddress(){
			// 	uni.chooseAddress({
			// 	  success(res) {
			// 	    console.log(res.userName)
			// 	    console.log(res.postalCode)
			// 	    console.log(res.provinceName)
			// 	    console.log(res.cityName)
			// 	    console.log(res.countyName)
			// 	    console.log(res.detailInfo)
			// 	    console.log(res.nationalCode)
			// 	    console.log(res.telNumber)
			// 	  },
			// 	  fail(res){
			// 		  console.log(res)
			// 	  },
			// 	})
			// },
		}
	}
</script>

<style>
	
	page{
	    /* background-color: var(--white) */
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
