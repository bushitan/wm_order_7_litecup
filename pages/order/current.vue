<template>
	<view class="">
		<!-- <view class="box" :style="'height:'+ CustomBar +'px;'"></view> -->
		<!-- <view class="padding prepare"  :style="'top:' +CustomBar +'px;'"> -->
			
		<view class="padding prepare"   v-if="list.length==0">			
			<view class="bg-white pg-radius flex justify-center align-center"  style="height: 100%;">
				<view class="text-center">
					<view class="">
						<image src="/static/images/strong/logo.jpg"  class="icon_image round" mode="widthFix"></image>					
					</view>
					<view class=" margin-top-xl text-black text-bold text-lg">
						你好，<open-data  type="userNickName"></open-data>
					</view>
					<view class="text margin-top-xs">现在您还没有下单</view>
					<!-- <view class="text-gray text">快选择一杯喜欢的茶吧</view> -->
					<view class="margin-top" @click="toMenu()">
						<button class="cu-btn bg-yellow lg round  text-white padding-lr" style="width: 150px;">去下单</button>					
					</view>
					<view class=" text-gray text flex justify-center align-center margin-top" @click="toOrderList()">
						历史订单 <view class="pg-arrow-sm"></view>
					</view>					
				</view>				
			</view>
		</view>
	
		<view class="" v-else>
				
			<view class="cu-card padding-lr margin-top"  @click="toDetail(order.id)" v-for="(order,key) in list">
				
				<view class="text-yellow  text-sm  padding-bottom-xs"><text class="cuIcon-timefill "></text>{{order.created_on_utc}}</view>
				<view class=" bg-white pg-radius  shadow shadow-warp">
					<view class="cu-bar  solid-bottom ">
						<view class="action">
							<text class="cuIcon-title text-yellow "></text>                
							<text class="text-black text-sm">订单ID:{{order.id}}</text>      
						</view>
						<view class="action">
							<view class="text-yellow text-bold">
								<text v-if="order.order_status_code == ORDER_STATUS_PROCESSING">{{order.order_status}}</text>
								<text v-if="order.order_status_code == ORDER_STATUS_COMPLETE">{{order.order_status}}</text>
								<text v-if="order.order_status_code == ORDER_STATUS_CANCEL">{{order.order_status}}</text>
								<text v-if="order.payment_status_val == ORDER_STATUS_PENDING">{{order.payment_status}}（去支付）</text>
								<text v-if="order.payment_status_val == PAYMENT_STATUS_REFUND_APPLY">({{order.payment_status}})</text>
							
							
							</view>
							<view class="pg-arrow"></view>
						</view>
					</view>
					<view class="cu-list menu ">					
					<!-- 	<view class="cu-item " >
							<view class="action text-gray text-sm">下单门店</view>
							<view class="action text-sm">{{order.store_name}}</view>
						</view>					
						<view class="cu-item ">
							<view class="action text-gray text-sm">取单方式</view>
							<view class="action text-sm">{{order.ship_method_desc}}</view>
						</view>		
						<view class="cu-item " v-if="order.customertaketype == SHOP_TAKE_ZQ && order.order_status_code != ORDER_STATUS_PENDING " >
							<view class="action text-gray text-sm">取单码</view>
							<view class="action text-bold text-red text-xl">{{order.id}}</view>
						</view>	
						<view class="cu-item " v-if="order.customertaketype == SHOP_TAKE_TS && order.order_status_code != ORDER_STATUS_PENDING " >
							<view class="action text-gray text-sm">取单码</view>
							<view class="action text-bold text-red text-xl">{{order.id}}</view>
						</view>	 -->
						<view class="cu-item ">
							<view class="action">
								<view class="text-gray text-sm">订单产品</view>
							</view>
						</view>
						<view class="cu-item margin-bottom-sm" v-for="(item,key) in order.order_items" style="align-items: flex-start;">
							<view class="action">
								<image :src='item.product.images[0]' 
									class="cu-avatar radius lg  bg-gray margin-right-sm " 
									style="width:60px;height:60px"
									mode="aspectFill"
									></image>
							</view>
							<view class="content">
								<view class="text-black   text">{{item.product.name}}</view>
								<view class="text-gray   text-sm">{{item.attr_desc}}</view>
								<view class="text-gray   text-sm">数量：{{item.quantity}}</view>
							</view>
							<!-- <view class="action">
								<view class="text-gray   text-sm">x{{item.quantity}}</view>
							</view> -->
						</view>
					</view>
					<!-- <view class="cu-bar  solid-bottom ">
						<view class="action"></view>
						<view class="action">						
							<text class="text-black ">共3件商品</text>
						</view>
					</view>		 -->			
				</view>
				
			</view>
			<view class=" padding-xs flex  align-center margin-top justify-center">
				<text class="text-center  text-gray text-sm" >正在制作，请耐心等待</text>					
			</view>
			<view class=" text-gray text flex justify-center align-center margin-top" @click="toOrderList()">
				历史订单 <view class="pg-arrow-sm"></view>
			</view>		
			<view class="pg-space-xxl"></view>
		
		</view>
		
	</view>
</template>

<script>

	export default {
		data(){
			return {				
				StatusBar:this.StatusBar,
				CustomBar : this.CustomBar,
				
				TabCur: 0,
				scrollLeft:0,
				// SortMenu: [{id:0,name:"全部订单"},{id:1,name:"待付款"},{id:2,name:"待发货"},{id:3,name:"待收货"},{id:4,name:"已完成"}],
				
				list:[],
				
				SHOP_TAKE_WM :this.db.SHOP_TAKE_WM, //1
				SHOP_TAKE_ZQ :this.db.SHOP_TAKE_ZQ, //2
				SHOP_TAKE_TS :this.db.SHOP_TAKE_TS, //4
				
				PAYMENT_STATUS_REFUND_APPLY :this.db.PAYMENT_STATUS_REFUND_APPLY,
				ORDER_STATUS_PENDING:this.db.ORDER_STATUS_PENDING,
				ORDER_STATUS_PROCESSING :this.db.ORDER_STATUS_PROCESSING , // 订单处理中
				ORDER_STATUS_COMPLETE :this.db.ORDER_STATUS_COMPLETE , // 订单已完成
				ORDER_STATUS_CANCEL  :this.db.ORDER_STATUS_CANCEL , // 订单已取消 ==  退款
			}
		},
		onLoad(){
			// this.onInit()			
		},
		
		onShow(){
			this.onInit()				
		},
		
		methods:{
			async onInit(){
				// 获取未支付的订单								
				var res = await this.db.orderGetCustomerOrder({
					Page:1,
					Limit:15,
					// Status:this.db.ORDER_STATUS_PENDING,
					CreatedAtMin: this.today,
				})		
				var list = res.data
				
				this.setData({
					list:list
				})
				// // 获取未完成订单
				// var res = await this.db.orderGetCustomerOrder({
				// 	Page:1,
				// 	Limit:10,
				// 	Status:this.db.ORDER_STATUS_PROCESSING,
				// 	CreatedAtMin: this.today,
				// })			
				// var proccessing = res.data
				// var res = await this.db.orderGetCustomerOrder({
				// 	Page:1,
				// 	Limit:10,
				// 	Status:this.db.ORDER_STATUS_COMPLETE,
				// 	CreatedAtMin: this.today,
				// })			
				// var complete = res.data
				
				// var list = padding.concat(proccessing)
				// var _list = list.concat(proccessing)
				// this.setData({
				// 	list:list
				// })
			},
			
			
			// async getOrderList(){
				
			// },
			
			
			
			toDetail(id){
				uni.navigateTo({
					url:'/pages/order/detail?orderId=' + id
				})
			},
			
			
			
			toMenu(){
				uni.switchTab({
					url:"/pages/menu/menu"
				})
			},
			toOrderList(){
				uni.navigateTo({
					url:"/pages/order/list"
				})
			},
			
		}
	}
</script>

<style>
	page{
	    /* background-color: #fafafa; */
	}
	.page{
		
	}
	.prepare{
		position: absolute;
		top:0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		
	}
	.icon_image{ width: 128px; }
	
</style>
