<template>
	<view class="">
		<!--状态栏区域-->
		<view class="cu-card padding-lr margin-top" >
		    <view class=" bg-white pg-radius  shadow shadow-warp">
		        <!--< view class="cu-bar  solid-bottom " @click="selectStore()">
		            <view class="action">
		                <text class="cuIcon-title text-yellow "></text>                
		                <text class="text-black text-sm">下单门店</text>      
		            </view>
		            <view class="action">			
						<text class="text-bold ">{{StoreName}}</text>
						<view class="pg-arrow"></view>
		            </view>
		        </view>
				<view class=" cu-form-group"  @click="selectShopTake()">
					<view class="text-sm">配送方式</view>
					
					<view class="text-right basis-xl">			
						<text class="text-bold ">{{ShopTakeName}}</text>
					</view>
					<view class="pg-arrow"></view>
				</view>	 -->
				
					
				<view class="cu-form-group" @click="toAddress" >
					<view class="text-sm">{{pickUpInStore?"预留电话":"联系方式"}}</view>
					<view class=" text-right basis-xl text-bold">						
						<view class=" ">{{currentAddress.name || ""}} {{currentAddress.phoneNumber|| ""}} </view>
					</view>
					<view class="pg-arrow"></view>
				</view>		
				<view class="cu-form-group"  @click="toAddress"  >
					<view class="text-sm">收货地址</view>
					<view class=" text-right basis-xl text-bold">						
						<view class="">{{currentAddress.address}}</view>
				
					</view>
					<view class="pg-arrow"></view>
				</view>		
				<!-- <view class="cu-form-group  text-right text-sm" v-if="ShopTakeValue == SHOP_TAKE_ZQ">
					<view class=" text-sm">取单电话</view>
					<input placeholder="请输入取单电话" mode="digit" :value="OrderPrePhone"
					placeholder-class="text-sm" class="text-sm " @input="inputOrderPrePhone"></input>
					<view class="pg-arrow"></view>
				</view>
				<view class="cu-form-group"  v-if="ShopTakeValue == SHOP_TAKE_ZQ" >
					<view class="text-sm">取单时间</view>
					<picker mode="time" :value="PickTime" :start="PickStartTime" end="21:01" @change="TimeChange">
						<view class="picker">
							{{PickTime}}
						</view>
					</picker>
				</view> -->
				
				
				<!-- <view class="cu-form-group  text-right text-sm">
					<view class=" text-sm">订单备注(选填)</view>
					<input placeholder="请输入口味等" name="OrderNote" placeholder-class="text-sm" class="text-sm " @input="inputOrderNote"></input>
					<view class="pg-arrow"></view>
				</view> -->
		    </view>
		</view>
		
		
		<view class="cu-card padding-lr margin-top">
		    <view class=" bg-white pg-radius  shadow shadow-warp">
		        <view class="cu-bar  solid-bottom ">
		            <view class="action">
		                <text class="cuIcon-title text-yellow "></text>                
		                <text class="text-black text-sm">商品明细</text>      
		            </view>
		            <view class="action">
						<!-- <text class="text-gray  text-sm">全部</text>
						<view class="pg-arrow-sm"></view> -->
		            </view>
		        </view>
				<view class="cu-list menu ">
					<view class="cu-item margin-tb-sm" v-for="(item,key) in order " v-bind:key="key">
						<view class="action"> 
							<image :src='item.cover' 
								class="cu-avatar radius lg  bg-gray margin-right-sm " 
								style="width:60px;height:60px"
								mode="aspectFill"
								></image>
						</view>
						<view class="content">
							<view class="text-black   text">{{item.name}}</view>
							<view class="text-gray   text-sm">{{item.attDes}}</view>
							
							<view class=" flex justify-between">
								<view class="">
									<view class=" text-sm">数量：{{item.Quantity}}</view>		
									<!-- <view class=" text-sm">包装费：{{item.wm_cost}}</view>									 -->
								</view>
								<view class="action">
									<text class="text-price text-red"></text>
									<text class="text-red">{{item.total}}</text>									
								</view>
							</view>
						</view>
					<!-- 	<view class="action">
							<text class="text-price"></text>4
						</view> -->
					</view>
				</view>
				
				<!-- 	<view class="cu-list menu ">
					
					<view class="cu-item " >
						<view class="action">商品费用</view>
						<view class="action text-red ">							
							<template v-if="preOrder.order_discount > 0">
								<text class="text-gray  text-sm ">已优惠</text>						
								<text class="text-price text-sm text-red "></text>
								<text class="  text-sm text-red margin-right">{{preOrder.order_discount}}</text>
							</template>
							<text class="text-price"></text>
							<text class="text-red">{{preOrder.order_with_discount || ""}}</text>	
						</view>
					</view>
				<view class="cu-item " v-if="ShopTakeValue != SHOP_TAKE_TS">
						<view class="action">包装费</view>
						<view class="action text-red ">
							<text class="text-price"></text>
							<text class="text-red">{{preOrder.wm_cost}}</text>			
						</view>
					</view>
					<view class="cu-item " v-if="ShopTakeValue == SHOP_TAKE_WM">
						<view class="action">配送费</view>
						<view class="action text-red ">
							<template v-if="preOrder.ship_discount > 0">
								<text class="text-gray  text-sm ">已优惠</text>						
								<text class="text-price text-sm text-red "></text>
								<text class="  text-sm text-red margin-right">{{preOrder.ship_discount}}</text>
							</template>
							<text class="text-price"></text>
							<text class="text-red">{{preOrder.customer_take_ship_fee}}</text>	
						</view>
					</view>
				</view> -->
				<view class="cu-bar   ">
				    <view class="action"></view>
				    <view class="action">				
						<template v-if="preOrder.order_discount_total > 0">
							<text class="text-gray  text-sm ">已优惠</text>
							<text class="text-price text-sm text-red "></text>
							<text class="  text-sm text-red margin-right">{{preOrder.order_discount_total  || ""}}</text>
						</template>
						
						
						<text class="text-gray  text-sm margin-right-xs">合计</text>						
						<text class=" text-xl text-red text-bold text-price"></text>
						<text class=" text-xl text-red text-bold">{{preOrder.order_total || ""}}</text>
				    </view>
				</view>					
		    </view>
		</view>	
		<!-- <button type="primary" @click="pay">付款</button> -->
		
		<!-- 
		<view class=" padding-xs flex  align-center margin-top justify-center">
			<text class="text-center  text-gray">暂无更多订单</text>		
		</view> -->
		<view class="pg-space-xxl"></view>
		<view class="pg-space-xxl"></view>
		
		
		<view class="bg-white cu-list menu padding-tb-sm solid-top" style="position: fixed; bottom:0; left: 0; right: 0;">
			<view class="cu-item" >
				<view class="content">
					<view class="text-grey">
						<view class="text-red text-bold text-xxl">
							<text class="text-price text-red"></text>{{preOrder.order_total || ""}}
						</view>
					</view>
					<!-- <view class="text-gray text-sm flex align-center" v-if="ShopTakeValue == SHOP_TAKE_WM">
						<image src='/static/images/icon/sf_logo.png'
							class="cu-avatar radius lg  bg-white margin-right-sm" 
							style="width: 100px;" 
							mode="widthFix"
							></image>
					 </view> -->
				</view>
				<form class="action" report-submit="true"  @submit="toSuccess">
						<button class='cu-btn round bg-yellow text-white shadow margin-right-sm'  form-type="submit"
							:disabled="noPowerPay">微信支付</button>	
				</form>
			</view>
		</view>
			
		

	</view>
</template>

<script>	
	export default {
		data(){
			
			var date = new Date();
			var hour = date.getHours();
			hour = hour < 10? "0" + hour : hour;
			var minute = date.getMinutes();
			minute = minute < 10? "0" + minute : minute;
			var currentTime = hour + ':'+minute
			return {				
				StatusBar:this.StatusBar,
				CustomBar : this.CustomBar,
				TabbarBot:this.TabbarBot,
				
				
				storeList:[], // 店铺列表
				order:{},	//当前订单			
				preOrder:{},//预订单
				StoreId:this.ShopID, // 默认店铺ID
				StoreName:"",
				ShipAddress:'',
				pickUpInStore:true,
				
				//点单方式
				SHOP_TAKE_WM :this.db.SHOP_TAKE_WM, //1
				SHOP_TAKE_ZQ :this.db.SHOP_TAKE_ZQ, //2
				SHOP_TAKE_TS :this.db.SHOP_TAKE_TS, //4
				ShopTakeList:[],
				ShopTakeValue:this.db.SHOP_TAKE_KD,
				ShopTakeName:'外卖',
				
				currentAddress:{}, // 当前地址
				// ReciveName:'',
				// RecivePhone:'',
				// ReciveAddress:'',
				// ReciveCityName:'',
				
				PickTime:currentTime, // 选择时间
				PickStartTime:currentTime,				
				
				OrderPrePhone:"",
				OrderNote:"",
				
				SF:{},
				Coupon:[],
				
				
				
				totalPrice:0, // 总价
				totalPack:0, // 包装费
				totalPost:0, // 配送费
				
				noPowerPay:true,
			}
		},
		onLoad(options){
			console.log('123')
			this.onInit()
		},
		
		methods:{
			// 初始化
			async onInit(){ 
				
				this.getOrder() // 获取已经选择的订单
				
				// 1 获取配送门店
				var res = await this.db.storeGetList()
				var storeList = res.data	
				
				if(storeList.length == 0 ) // 没有门店
					return				
				// 获取门店列表			
				var StoreId = storeList[0].Id
				var StoreName = storeList[0].Name
				var SyncStoreId = uni.getStorageSync(this.db.KEY_SHOP_ID) || "" 				
				for(var i =0 ; i<storeList.length ; i++){
					if(SyncStoreId == storeList[i].Id){						
						StoreId = storeList[i].Id
						StoreName = storeList[i].Name 
					}
				}					
				this.setData({
					storeList:storeList,
					StoreId : StoreId,
					StoreName : StoreName,
				})				
				
				// 3 设置默认的取单地址
				var res = await this.db.customerShipAddrs()
				
				if(res.data.length > 0){
					var index = uni.getStorageSync( this.db.KEY_ORDER_PRE_ADDRESS) || 0
					this.setData({ currentAddress: res.data[index] })
				}
					
				// 4 获取门店点单方式
				this.getShopTakeType() 
				
				// debugger
				// 5 设置默认的顺风预取单
				this.mathTotalPrice() // 预取顺风费用
				// 6 获取优惠券
				this.getCoupon() // 获取优惠券
				
				
				
				
				// this.getShopList() // 获取门店列表
				// this.getShopTakeType() // 获取门店点单方式
				// this.getTotal() //	计算总价
				// this.getDefaultAddress() // 获取默认的地址
				
				// 获取本地预留的电话
				this.setData({
					OrderPrePhone:uni.getStorageSync(this.db.KEY_ORDER_PRE_PHONE ) || ""
				})
				
			},
			
			// 1 获取已经选择的订单
			getOrder(){			
				// 获取订单信息
				var orderObj = uni.getStorageSync("order")
				var order = [] 				
				for (var i in orderObj){
					order.push( orderObj[i] )	
					// TODO  计算总价
				}				
				this.setData({
					order:order,
				})			
			},
			
			// 获取门店的点单方式
			async getShopTakeType(){
				// 获取配送方式
				var res = await this.db.storeCurrent({
					ShopId:this.$data.StoreId
				})
				var value = res.data.ShopTakeTypeMode
				var ShopTakeList = []
				// debugger
				switch(value){
					case 1 : ShopTakeList = [{"name":"外卖",value:1}] ;break;
					case 2 : ShopTakeList = [{"name":"到店自取",value:2}] ;break;
					case 4 : ShopTakeList = [{"name":"堂食",value:4}] ;break;
					case 3 : ShopTakeList = [{"name":"外卖",value:1},{"name":"到店自取",value:2}] ;break;
					case 5 : ShopTakeList = [{"name":"外卖",value:1},{"name":"堂食",value:4}] ;break;
					case 6 : ShopTakeList = [{"name":"到店自取",value:2},{"name":"堂食",value:4}] ;break;
					case 7 : ShopTakeList = [{"name":"外卖",value:1},{"name":"到店自取",value:2},{"name":"堂食",value:4}] ;break;
				}
				
				//如果桌面点单方式扫码已经确定
				var　ShopTakeValue = ShopTakeList[0].value || ""
				var　ShopTakeName = ShopTakeList[0].name || ""
				// var ShopTakeTypeValue = uni.getStorageSync(this.db.KEY_SHOP_TAKE_TYPE)
				// // var ShopTakeTypeValue = this.customerTakeType
				// // debugger
				// if(ShopTakeTypeValue != ""){   
				// 	for(var i =0 ; i<ShopTakeList.length ; i++){
				// 		if(ShopTakeTypeValue == ShopTakeList[i].value){
				// 			ShopTakeValue = ShopTakeList[i].value
				// 			ShopTakeName = ShopTakeList[i].name 
				// 		}
				// 	}
				// }				
				this.setData({	
					ShopTakeList:ShopTakeList,
					ShopTakeValue:ShopTakeValue,
					ShopTakeName:ShopTakeName,
				})					
			},
			
			// 3 设置用户地址
			setUserAddress(currentAddress){
				console.log(currentAddress)		
				
				this.setData({
					currentAddress:currentAddress
				})				
				this.mathTotalPrice() // 预取配送费				
			},
			// 3.2 设置用户地址为空
			noneUserAddress(currentAddress){
				this.setData({
					currentAddress:{}
				})		
				this.setData({
					noPowerPay:true,
				})
			},
			
			// 3 获取优惠券
			async getCoupon(){
				//  TODO  获取优惠券列表
			},	
					
			/*************选择 门店 | 点单方式 | 优惠券*************/
			// 选择门店
			async selectStore(){
				var storeList = this.$data.storeList
				var itemList = []
				for (var i=0; i<storeList.length ; i++){
					itemList.push(storeList[i].Name)
				}
				var that = this
				uni.showActionSheet({
					itemList:itemList,
					success(res){
						that.setData({
							StoreId : storeList[res.tapIndex].Id,
							StoreName : storeList[res.tapIndex].Name,
						})
						that.getShopTakeType() // 更新点单方式
						that.mathTotalPrice() // 预取配送费						
					},
				})
			},			
			// 选择点单方式
			selectShopTake(){
				var ShopTakeList = this.$data.ShopTakeList
				var itemList = []
				
				for (var i=0; i<ShopTakeList.length ; i++)
					itemList.push(ShopTakeList[i].name)
				var that = this
				uni.showActionSheet({
					itemList:itemList,
					success(res){
						that.setData({
							ShopTakeValue : ShopTakeList[res.tapIndex].value,
							ShopTakeName : ShopTakeList[res.tapIndex].name,
						})
						
						that.mathTotalPrice() // 到店自取 | 堂食 预下单	
					},
				})
			},
			
			// 计算费用
			async mathTotalPrice(){
				var addressId =  this.$data.currentAddress.id || ""
				// if( this.$data.ShopTakeValue == this.$data.SHOP_TAKE_KD &&  addressId == ""  ){
				// 	return 
				// }
				if( addressId == ""){
					uni.showModal({
						title:"请填写地址",
						// icon:"loading",
						confirmText:"去填写",
						showCancel:false,
						success:res=>{
							if(res.confirm){
								this.toAddress()
							}
						}
					})
					return 
				}
				
				var data =
				{
					"OrderId": 0,//新建订单 默认为零I"				  
					"PaymentMethodSystemName": "Payments.WeixinPay",//支付方式 当前默认微信 硬编码
					"OrderItems": this.$data.order,
					"OrderNote":this.$data.OrderNote,//订单描述				  
					"ShopId":this.$data.StoreId, //uni.getStorageSync(this.db.KEY_SHOP_ID)
					// "CustomerTakeType":this.$data.ShopTakeValue,
					"CustomerTakeType": 8, // 默认为自取的方式
					"WishDateTime": this.$data.PickTime,
					"ReceiverPhone":"123",
					
					"AddressId":addressId,
					// data["ReceiverPhone"] =
					// "AppId":"5099f520489646d28ce9df352237c059" ,// 门店点Appid，不是小程序ID
				}
				// if(this.$data.ShopTakeValue == this.db.SHOP_TAKE_KD){ 
				// 	data["AddressId"] = addressId
				// }
				
				
				var jsondata = JSON.stringify(data)		
				var res = await this.db.orderCaculatePrice({
					jsondata:jsondata
				})		
				console.log(res)
				if(res.code == -1){
					this.setData({noPowerPay:true,})
					return
				}
				
				if(res.code == -2){
					uni.showModal({
						title: res.msg,
						success(){
							uni.switchTab({
								url:"/pages/menu/menu"
							})
						},
					})
					return 
				}
				
					
				
				var preOrder = res.data 
				var all = preOrder.order_total + preOrder.wm_cost + preOrder.customer_take_ship_fee
				this.setData({
					// totalPrice:all, // 总价
					preOrder:preOrder,
					totalPrice:preOrder.order_total , // 总价
					totalPack:preOrder.wm_cost, // 包装费
					totalPost:preOrder.customer_take_ship_fee, // 配送费
					noPowerPay:false,
				})
				
			},
			/**
			 * @method 下单
			 */
			async toSuccess(e){	
				console.log(e)
				var formId = e.detail.formId
								
									// var addressId = 
				var data =
				{
					"OrderId": 0,//新建订单 默认为零I"
					// "ShippingMethod": this.$data.ShopTakeValue, // 1 外卖　2到店自取 4堂食				  
					"PaymentMethodSystemName": "Payments.WeixinPay",//支付方式 当前默认微信 硬编码
					"OrderItems": this.$data.order,
					"OrderNote":this.$data.OrderNote,//订单描述		  
					"ShopId":this.$data.StoreId,// 默认店铺ID为
					// "CustomerTakeType":this.$data.ShopTakeValue,					
					"CustomerTakeType":8, // 默认为自取的方式
					"WishDateTime": this.$data.PickTime,
					"formId":formId,
					
					"AddressId": this.$data.currentAddress.id ,
					// "AppId":"5099f520489646d28ce9df352237c059" ,// 门店点Appid，不是小程序ID
				}
				
				if(this.$data.currentAddress.id)
					data["AddressId"] = this.$data.currentAddress.id
				else{
					uni.showModal({title:"请填写联系方式"})
					return 
				}
				// // 取单联系方式判断
				// if(this.$data.ShopTakeValue == this.db.SHOP_TAKE_WM){ //外卖
				// 	if(this.$data.currentAddress.id)
				// 		data["AddressId"] = this.$data.currentAddress.id
				// 	else{
				// 		uni.showModal({title:"请添加收货地址"})
				// 		return 
				// 	}
				// } 
				// if(this.$data.ShopTakeValue == this.db.SHOP_TAKE_ZQ){// 到店自取 | 堂食 获取电话
				// 	var OrderPrePhone = this.$data.OrderPrePhone
				// 	if(OrderPrePhone.length == 11){ 
				// 		uni.setStorageSync(this.db.KEY_ORDER_PRE_PHONE ,  OrderPrePhone)
				// 		data["ReceiverPhone"] = OrderPrePhone
				// 	} else {
				// 		uni.showModal({title:"取单电话格式不对"})
				// 		return 
				// 	}						
				// }
				
				
				this.setData({ noPowerPay :true})
				// 下单数据
				var jsondata = JSON.stringify(data)				
				console.log(data)
				var res = await this.db.orderGen({
					jsondata:jsondata
				})
				if(res.code == 0){
					var data = res.data
					var orderId = data.id
					uni.redirectTo({
						url: '/pages/wx/wxpay?orderId=' + orderId,
					});
				} else {
					this.setData({ noPowerPay :false})
				}
				
			},
			
			
			/**************路由 || 输入*************/
			// 去到我的位置
			toAddress(){ uni.navigateTo({ url:"/pages/my/address" }) },			
			// // 获取本地预留的电话
			inputOrderPrePhone(e){ this.setData({ OrderPrePhone:e.detail.value, }) },
			// 输入备注内容
			inputOrderNote(e){ this.setData({OrderNote:e.detail.value}) },	
			// 返回
			back(){	uni.navigateBack({}) },				
			// 单时间选择
			TimeChange(e) { this.setData({PickTime: e.detail.value}) },
		}
	}
</script>

<style>


</style>
