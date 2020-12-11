<template>
	<view class="">	
		<view class="text-xl text-bold flex justify-between align-center padding">
           <view>
			   <text >订单ID：{{order.id}}</text>
                <!-- <text v-if="order.customertaketype == SHOP_TAKE_WM">订单ID：{{order.id}}</text> -->
                
              <!--  <text  v-if="order.customertaketype == SHOP_TAKE_WM">（外卖）</text>
                <text  v-if="order.customertaketype == SHOP_TAKE_ZQ">（到店自取）</text>
                <text  v-if="order.customertaketype == SHOP_TAKE_TS">（堂食）</text> -->
            </view>				
			<button v-if="order.payment_status_code == PAYMENT_STATUS_PENDING || order.payment_status_code == PAYMENT_STATUS_AUTHORIZED"
				class="cu-btn round bg-yellow text-white" 
				@click="clickPay">支付订单</button>
		</view>
		
			<view class="cu-card padding-lr ">
				<view class=" bg-white pg-radius  shadow shadow-warp">
					<view class="cu-bar  solid-bottom ">
						<view class="action">
							<text class="cuIcon-title text-yellow "></text>                
							<text class="text-black text-sm">订单状态</text>      
						</view>
						<view class="action">                    
							<view class=" text-sm">{{order.order_status}} </view>
						</view>
					</view>
					<view class="cu-bar  solid-bottom ">
						<view class="action">
							<text class="cuIcon-title text-yellow "></text>                
							<text class="text-black text-sm">支付状态</text>      
						</view>
						<view class="action">                    
							<view class=" text-sm">{{order.payment_status}} </view>
						</view>
					</view>
					<!-- <view class="cu-bar   "  v-if="order.customertaketype == STORE_TAKE_TYPE_WM">
						<view class="action">
							<text class="cuIcon-title text-yellow "></text>                
							<text class="text-black text-sm">配送状态</text>      
						</view>
						<view class="action">     
							<view class=" text-sm">{{order.shipping_status}}</view>
						</view>
					</view> -->
				</view>
			</view>
		
<!-- 		<view class="cu-card padding-lr ">
			<view class=" bg-white pg-radius  shadow shadow-warp">
				<view class="cu-bar  solid-bottom ">
					<view class="action">
						<text class="cuIcon-title text-yellow "></text>                
						<text class="text-black text-sm">配送地图</text>      
					</view>
					<view class="action">
						<text class="text-gray  text-sm">预计还有30分钟到达</text>
					</view>
				</view>				
				<view>
					<map
						style="width: 100%; height:400rpx">
						
					</map>
				</view>
			</view>
		</view> -->
		
		<view class="cu-card padding-lr margin-top">
			<view class=" bg-white pg-radius  shadow shadow-warp">
				<view class="cu-bar  solid-bottom ">
					<view class="action">
						<text class="cuIcon-title text-yellow "></text>
						<text class=" text-black  text-sm">商品</text>
					</view>
					<!-- <view class="action">                
						<text class="text-black text-sm">{{order.ship_address.addr_detail}}</text>      
					</view> -->
				</view>
				<view class="cu-list menu ">
					<!-- <view class="cu-item " >
						<view class="action text-gray text-sm">下单门店</view>
						<view class="action text-sm">{{order.store_name}}</view>
					</view> -->
					<view class="cu-item margin-tb-sm" style="align-items: flex-start;"
					v-for="(item,key) in order.order_items" v:bind-key="key">
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
							<view class="text-gray   text-sm">
								单价：<text class="text-price"></text>{{item.unit_price_exclTax}}
							</view>
							<!-- <view class="text-gray  text-sm" v-if="item.product.wmCost">
                                包装费：<text class="text-price"></text>{{item.product.wmCost}} 
                            </view> -->
							
						</view>
						<view class="action text-red ">
							<text class="text-price"></text>{{item.price_excl_tax}}
						</view>
					</view>			
				</view>
				
				<view class="cu-list menu ">	
				
					<view class="cu-item " >
						<view class="action text-gray text-sm">商品费用</view>
						<view class="action text-red">
							<template v-if="order.order_discount > 0">
								<text class="text-gray  text-sm ">已优惠</text>						
								<text class="text-price text-sm text-red "></text>
								<text class="  text-sm text-red margin-right">{{order.order_discount}}</text>
							</template>
							
							<text class="text-price"></text>{{order.order_with_discount || ""}}
						</view>
					</view>
					<!-- <view class="cu-item "  v-if="order.customertaketype != SHOP_TAKE_TS">
						<view class="action text-gray text-sm">包装费</view>
						<view class="action text-red">
							<text class="text-price"></text>{{order.wm_cost || 0 }}
						</view>
					</view> -->
					<view class="cu-item "  v-if="order.customertaketype == SHOP_TAKE_WM" >
						<view class="action text-gray text-sm">配送费</view>
						<view class="action text-red">
							<template v-if="order.ship_discount > 0">
								<text class="text-gray  text-sm ">已优惠</text>						
								<text class="text-price text-sm text-red "></text>
								<text class="  text-sm text-red margin-right">{{order.ship_discount }}</text>
							</template>
							<text class="text-price"></text>{{order.customer_take_ship_fee }}
						</view>
					</view>
				</view>
				<view class="cu-bar  solid-bottom ">
					<view class="action"></view>
					<view class="action">						
						<!-- <text class="text-gray  text-sm ">已优惠</text>						
						<text class="text-price text-sm text-yellow "></text>
						<text class="  text-sm text-yellow margin-right">{{order.order_discount}}</text> -->
					
						<template v-if="order.order_discount_total > 0">
							<text class="text-gray  text-sm ">已优惠</text>
							<text class="text-price text-sm text-red "></text>
							<text class="  text-sm text-red margin-right">{{order.order_discount_total  || ""}}</text>
						</template>
						
						<text class="text-gray  text-sm margin-right-xs">合计</text>						
						<text class=" text-xl text-red text-bold text-price "></text>
						<text class=" text-xl text-red text-bold">{{order.order_total  || ""}}</text>
					</view>
				</view>					
			</view>
		</view>
		
		<view class="cu-card padding-lr margin-top">
			<view class=" bg-white pg-radius  shadow shadow-warp">
				<view class="cu-bar  solid-bottom ">
					<view class="action">
						<text class="cuIcon-title text-yellow "></text>                
						<text class="text-black text-sm">备注信息</text>      
					</view>
					<view class="action">
					</view>
				</view>				
				<view class="cu-list menu ">					
					<view class="cu-item " v-for="(item,key) in order.order_notes" v:bind-key="key" v-if="item.display_to_customer == true">
						<view class="content">
							<text class="text-gray text-sm">{{item.Note}}</text>
						</view>
						<view class="action ">
						</view>
					</view>
				</view>
			</view>
		</view>
				<!-- 
		<view class="cu-card padding-lr margin-top">
			<view class=" bg-white pg-radius  shadow shadow-warp">
				<view class="cu-bar  solid-bottom ">
					<view class="action">
						<text class="cuIcon-title text-yellow "></text>                
						<text class="text-black text-sm">配送信息</text>      
					</view>
					<view class="action">
					</view>
				</view>
				
				<view class="cu-list menu " v-if="order.pick_up_in_store">
					<view class="cu-item ">
						<view class="content">
							<text class="text-gray text-sm">堂食</text>
						</view>
						<view class="action">
							<view class="text-black text-sm">自取</view>
						</view>
					</view>
				</view>
				<view class="cu-list menu " v-else>
					<view class="cu-item ">
						<view class="content">
							<text class="text-gray text-sm">配送服务</text>
						</view>
						<view class="action">
							<view class="text-black text-sm">顺风专送</view>
						</view>
					</view>
				
					<view class="cu-item ">
						<view class="content">
							<text class="text-gray text-sm">配送地址</text>
						</view>
						<view class="action text-right basis-lg">
							<view class="text-black text-sm">{{order.ship_address.addr_detail}}</view>
						</view>
					</view>
					<view class="cu-item ">
						<view class="content">
							<text class="text-gray text-sm">联系人</text>
						</view>
						<view class="action text-right basis-lg">
							<view class="text-black text-sm ">
								{{order.ship_address.name }}
								{{order.ship_address.phonenumber}}
							</view>
						</view>
					</view>
					<view class="cu-item solid-top">
						<view class="content text-center text-bold text-black text-lg" >
							<text class="cuIcon-phone "></text>
							<text class="" @click="toRider">致电骑手</text>
						</view>
					</view>
					
				</view>				
			</view>
		</view> -->
		
		
		<view class="cu-card padding-lr margin-top">
			<view class=" bg-white pg-radius  shadow shadow-warp">
				<view class="cu-bar  solid-bottom ">
					<view class="action">
						<text class="cuIcon-title text-yellow "></text>                
						<text class="text-black text-sm">订单信息</text>      
					</view>
				</view>
				<view class="cu-list menu ">
					<!-- <view class="cu-item ">
						<view class="content">
							<text class="text-gray text-sm">取单码</text>
						</view>
						<view class="action">
							<view class="text-black text-sm">{{order.id}}</view>
						</view>
					</view> -->
					<view class="cu-item ">
						<view class="content">
							<text class="text-gray text-sm">下单时间</text>
						</view>
						<view class="action">
							<view class="text-black text-sm">{{order.created_on_utc}}</view>
						</view>
					</view>
					<view class="cu-item ">
						<view class="content">
							<text class="text-gray text-sm">支付方式</text>
						</view>
						<view class="action ">
							<view class="text-black text-sm">微信支付</view>
						</view>
					</view>
				</view>				
			</view>
		</view>
		
		<view class=" flex  justify-center margin-top">
						
			<button v-if="order.order_status_code == ORDER_STATUS_PROCESSING && order.payment_status_code != PAYMENT_STATUS_REFUND_APPLY  "
					class="cu-btn round line-red" 
					@click="clickCancle">退款申请</button>	
		</view>
		
		
		<view class=" padding-xs flex  align-center margin-top justify-center">
			<text class="text-center  text-gray text-sm">{{order?"信息加载完毕":"信息加载中"}}</text>		
		</view>
		<view class="pg-space-xxl"></view>		
		
			<!-- <view class="box" :style="'top:' +CustomBar +'px;'">
				<view class="canui-order-details-head">
			
					<view class="cu-list menu">
						<view class="cu-item">
							<view class='content'>
								<view class="text-df">包裹正在运送路上</view>
								<view class='text-sm'>2019-03-21 18:00:00</view>
							</view>
							<view class='action canui-status-3'></view>
						</view>
					</view>
			
				</view>
			
				<view class="padding canui-card-fiex-radius-box">
					<view class="cu-list menu bg-white">
						<view class="cu-item">
							<view class='content'>
								<view class="canui-xzwz text-df">包裹正在运送路上</view>
								<view class='text-gray text-sm'>2019-03-21 18:00:00</view>
							</view>
							<view class='action'><view class='text-grey icon-right'></view></view>
						</view>
					</view>
				</view>
			
				<view class="bg-white canui-goods-box">
			
					<view class="canui-card-order">
						<view class="canui-order-item bg-white">
							<view class="head-title-box">
								<navigator open-type="navigate" hover-class='none' url="/pages/shop/index/index">
									<text class="icon-shop"></text>
									<text>某某某旗舰店铺</text>
									<text class="icon-right"></text>
								</navigator>
							</view>
							<view class="cu-list menu menu-avatar">
								<navigator open-type="navigate" class="cu-item" hover-class='none' url="/pages/shop/goods/details">
									<view class="cu-avatar radius lg" style="background-image:url(https://image.weilanwl.com/img/square-3.jpg);"></view>
									<view class='content canui-xzwz tow'>商品名称商品名称商品名称商品名称商品名称商品名称</view>
									<view class='action'>
										<view class='text-price'>20.00</view>
										<view class="text-xs text-right text-gray">x1</view>
									</view>
								</navigator>
								<navigator open-type="navigate" class="cu-item" hover-class='none' url="/pages/shop/goods/details">
									<view class="cu-avatar radius lg" style="background-image:url(https://image.weilanwl.com/img/square-3.jpg);"></view>
									<view class='content canui-xzwz tow'>商品名称商品名称商品名称商品名称商品名称商品名称</view>
									<view class='action'>
										<view class='text-price'>20.00</view>
										<view class="text-xs text-right text-gray">x1</view>
									</view>
								</navigator>
							</view>
						</view>
					</view>
			
					<view class="text-gray text-sm solid-bottom order-price-log">
						<view class="log-list">
							<text>商品总价</text> <text class="text-price canui-text-right">252.00</text>
						</view>
						<view class="log-list">
							<text>运费(快递)</text> <text class="text-price canui-text-right">0.00</text>
						</view>
						<view class="log-list">
							<text>会员卡</text> <text class="text-price canui-text-right">0.00</text>
						</view>
						<view class="log-list">
							<text>优惠券</text> <text class="text-price canui-text-right">0.00</text>
						</view>
						<view class="log-list">
							<text>手续费</text> <text class="text-price canui-text-right">5.00</text>
						</view>
						<view class="log-list bg-white text-df">
							<text>订单总价</text><text class="text-sm text-gray">（手续费除外）</text>
							<text class="text-price canui-text-right">252.00</text>
						</view>
					</view>
					<view class="order-price-log-zj">
						<text>实际消费积分</text> <text class="text-price canui-text-right text-yellow">252.00</text>
					</view>
					<view class="order-price-log-zj">
						<text>实付手续费</text> <text class="text-price canui-text-right text-yellow">5.00</text>
					</view>
				</view>
			
				<view class="margin-top order-address-box">
					<view class="cu-list menu bg-white">
						<view class="cu-item">
							<view class='content'>
								<view class="text-df">收货人 <text>13800138000</text></view>
								<view class='text-gray text-sm canui-xzwz'>地址：重庆市某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某某</view>
							</view>
						</view>
					</view>
				</view>
			
				<view class="margin-top bg-white order-details-log">
			
					<view class="order-menu-list solid-bottom">
						<view class="log-list bg-white text-df">
							<text>订单编号：</text> <text class="text-gray">1234567897894</text>
						</view>
						<view class="log-list bg-white text-df">
							<text>下单时间：</text> <text class="text-gray">2019-03-05 09:25:00</text>
						</view>
						<view class="log-list bg-white text-df">
							<text>付款时间：</text> <text class="text-gray">2019-03-05 09:25:00</text>
						</view>
					</view>
					<view class="order-menu-list solid-bottom">
						<view class="log-list bg-white text-df">
							<text>快递单号：</text> <text class="text-gray">123456789789</text>
						</view>
						<view class="log-list bg-white text-df">
							<text>快递名称：</text> <text class="text-gray">顺丰快递</text>
						</view>
						<view class="log-list bg-white text-df">
							<text>发货时间：</text> <text class="text-gray">2019-03-05 09:25:00</text>
						</view>
					</view>
				</view>
			
				<view class="grid col-2 flex bg-white order-contact-box">
					<view class="contact-table">
						<text class="icon-service text-blue"></text> 联系客服
					</view>
					<view class="contact-table">
						<text class="icon-phone text-blue"></text> 电话联系
					</view>
				</view>
			
			</view> 
			
			
			
			<view class="bg-white " style="position: fixed; bottom:0;left: 0; right: 0;">
				<view class="grid col-4 flex justify-end order-btn-box">
					<view class='margin-tb-sm text-center'>
						<button class='cu-btn round line-gray shadow'>删除订单</button>
					</view>
					<view class='margin-tb-sm text-center'>
						<button class='cu-btn round line-gray shadow'>查看物流</button>
					</view>
					<view class='margin-tb-sm text-center'>
						<button class='cu-btn round line-red shadow'>确认收货</button>
					</view>
				</view>
			</view>-->
	</view>
</template>

<script>
	export default {
		data(){
			return {				
				StatusBar:this.StatusBar,
				CustomBar : this.CustomBar,
				TabbarBot:this.TabbarBot,
				
				
				PAYMENT_STATUS_PENDING : this.db.PAYMENT_STATUS_PENDING, // 待支付
				PAYMENT_STATUS_AUTHORIZED : this.db.PAYMENT_STATUS_AUTHORIZED ,// 待支付
				PAYMENT_STATUS_REFUND_APPLY :this.db.PAYMENT_STATUS_REFUND_APPLY , // 申请退款中
				
				ORDER_STATUS_PENDING:this.db.ORDER_STATUS_PENDING,
				ORDER_STATUS_PROCESSING: this.db.ORDER_STATUS_PROCESSING, //订单处理中
				ORDER_STATUS_COMPLETE:this.db.ORDER_STATUS_COMPLETE,
				SHOP_TAKE_WM : this.db.SHOP_TAKE_WM , // 外卖配送
				SHOP_TAKE_ZQ : this.db.SHOP_TAKE_ZQ , // 外卖配送
				SHOP_TAKE_TS : this.db.SHOP_TAKE_TS , // 外卖配送
				
				orderId:"",
				order:{
					ship_address:{},
				}, // 订单信息
			}
		},
		onLoad(options){
			console.log(this.CustomBar)
			this.setData({
				orderId:options.orderId || ""
			})
			this.onInit()
		},
		
		methods:{
			async onInit(){
				// var order = await this.db.orderGen()
				var res = await this.db.orderGetDetail({
					orderId:this.$data.orderId
				})
				this.setData({
					order:res.data
				})
			},
			
			back(){
				uni.navigateBack({
					
				})
			},
			
			// 去支付
			clickPay(){
				uni.redirectTo({
					url: '/pages/wx/wxpay?orderId=' + this.$data.orderId,
				});
			},
			
			// 取消订单
			async clickCancle(){
				var that = this
				uni.showModal({
					title:"是否取消订单",
					success(res){
						if(res.confirm){
							that.db.orderRefund({
								orderId:that.$data.orderId
							}).then(res=>{
								uni.showModal({	title:res.msg , showCancel:false })
								uni.navigateBack({})
							})							
						}
					}
				})
				
			},
			
			// 致电骑手
			toRider(){
				uni.makePhoneCall({
					phoneNumber : "3468732874",
				})
			},
		}
	}
</script>

<style>


</style>
