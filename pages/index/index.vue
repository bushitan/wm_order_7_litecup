<template>
	<view >
		<view class="">
			<image src="../../static/images/strong/share.jpg" mode="widthFix" style="width: 100%; display: block;"></image>
		</view>
		<view class="cu-card padding-lr  ">
		    <view class=" pg-radius-bottom  shadow shadow-warp bg-white">				   
			   <view class=" flex text-center text-grey  padding-bottom" >
				   <view class="flex flex-sub flex-direction " @click="toMenu(item.id,item.name)" v-for="(item,key) in storeList" v:bind-key="key">
						<view class="text-xxl page-font-yellow flex justify-center">
							<image class="shop-icon " :src="item.url" mode="aspectFit"></image>
						</view>
						<view class=" page-flex-center text-sm">
							<button  class="cu-btn bg-red  text-white round sm">{{item.name}}</button>							
						</view>
				   </view>
				</view> 		
				<view class="padding-lr padding-bottom" v-if="orderList.length > 0">
					<view class="cu-bar  " style="background-color: #f1f1f1;">
					    <view class="action margin-right-sm">
							<text class="cuIcon-title text-yellow text-sm"></text> 
							<view class="">
								<view class="text-gray  text-bold text ">您当前有{{orderList.length}}个订单</view>
							</view>
					    </view>
					    <view class="action ">
					      <button class="cu-btn bg-yellow text-white round  " @click="toDetail()" data-target="menuModal">查看详情</button>
					    </view>
					</view>
				</view>
		    </view>
		</view>
		
		<view class="cu-card padding-lr margin-top ">
			<swiper class="screen-swiper  " :indicator-dots="false" :circular="false" :autoplay="true" interval="5000"
			 duration="500">
				<swiper-item class="swiper-height block" v-for="(item,index) in swiperList" :key="index">
					<image class="block" style="width: 100%;" :src="item" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
				
		<view class="cu-card padding-lr margin-top">
		    <view class=" pg-radius  shadow shadow-warp bg-white">
				<view class="cu-bar  solid-bottom " @click="toOrder()" >
					<view class="action">
						<text class="cuIcon-title text-yellow text-sm"></text> 
						<text class="text-sm">订单中心</text> 	
					</view>
					<view class="action ">
						<text class="text-grey  text-sm">所有订单</text>
						<view class="pg-arrow"></view>
				   </view>
				</view>
		    </view>
		</view>
		
		
		<view class=" flex justify-center margin-top">
		    <button class=" cu-btn round bg-darkGray text-gray text-sm"  type="" open-type="contact">联系Strong客服</button>
		</view>
		
		<view class=" padding-xs flex align-center  margin-top-sm">
		    <view class="flex-sub text-center">
		        <view class=" text-df ">
		            <text class="text-gray text-sm">Copyright © 2012 索骏科技提供技术支持</text>
		        </view>           
		    </view>
		</view>
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
					swiperList:[
						"/static/images/strong/swiper1_lg.jpg",
						"/static/images/strong/swiper2_lg.jpg",
					],
				storeList:[
					{name:"康浦店",id:1,url:"/static/images/strong/store_1.png"},
					{name:"盛天地店",id:7,url:"/static/images/strong/store_2.png"},
					{name:"南湖店",id:6,url:"/static/images/strong/store_3.png"},
				],
				store:{},
				orderList:[], //订单列表
			}
		},
		onLoad() {
			this.onInit()
		},
		onShareAppMessage() {
			 return {
				title: '都市会生活',
				path: '/pages/route/route'
			}
		},
		methods: {
		onShareAppMessage() {
			
		},
			async onInit(){		
				var res = await this.db.orderGetList({
					Page:1,
					Limit:15,				
					CreatedAtMin: this.today,
					
				})	
				this.setData({
					orderList:res.data
				})
			},
			toMenu(id,name){
				uni.setStorageSync(this.db.KEY_SHOP_ID,id)
				uni.setStorageSync(this.db.KEY_SHOP_NAME,name)
				uni.switchTab({
					url:"/pages/menu/menu"
				})				
			},			
			toOrder(){
				uni.navigateTo({
					url:"/pages/order/list"
				})
			},
			toDetail(){
				var shop = this.$data.storeList[0]				
				uni.setStorageSync(this.db.KEY_SHOP_ID,shop.id)
				uni.setStorageSync(this.db.KEY_SHOP_NAME,shop.name)
				uni.switchTab({
					url:"/pages/order/current"
				})
				
			},
		}
	}
</script>

<style>
	
	page{
	    background-color: var(--ghostWhite)
	}
	.shop-icon{
		width: 72px;
		height: 72px;
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
