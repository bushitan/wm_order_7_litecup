<template>
	<view>
		<view class="cu-bar bg-white justify-end">
			<view class="content text-bold">{{currentItem.name}}</view>
		 
		</view>
		 <!--height: calc(100vh - 150px - 105px -36px); -->
		 
		 <!-- 
			:style="'width: 100%;height: calc(100vh - 50px - 105px - 36px - 30px - ' + CustomBar + 'px)'"> -->
		<scroll-view 
			scroll-y scroll-with-animation 
			:style="'width: 100%;height: calc(100vh - 50px - 100px - 30px - ' + CustomBar + 'px)'">
			<view class="" >
				<image @click="previewImage"
					 :src=' currentItem.imgs? currentItem.imgs[0] ? currentItem.imgs[0].src : "" :"" ' class="block " style="width: 100%;"  mode="widthFix"></image>
	
			</view>
			
			<view class="flex justify-between  padding ">
				<view class="action  ">
					
					<text class="text-price text-xl text-red text-bold"></text>
					<text class="text-xxl text-red text-bold margin-right">{{currentItem.price}}</text>
						
					<view class="text-gray "  style="display: inline-block ;text-decoration:line-through">
						<text class="   text-bold">原价：</text>
						<text class="text-price   text-bold"></text>
						<text class="  text-bold" >{{currentItem.oldprice}}</text>	
					</view>
				</view>
				<view class="action text-gray">
					仅剩<text class="text-red text-xxl text-bold">{{currentItem.stock}}</text>	件				
				</view>
				
				
				
			</view>
			<view class="padding-lr ">
				<view class="flex flex-start">
					<text class="bg-gray radius  text-xs margin-right-sm padding-xs"
						v-for="(tag , tagIndex ) in currentItem.tags" v-bind:key="tagIndex">{{tag}}</text>						
				</view>
				<view class="flex flex-start margin-top-sm" v-if="showMiniBtn==false">
					<text class="text-gray radius  text-sm  text-left" >{{currentItem.shortDescription || ""}}</text>
				</view>
				
				<!-- <view class="flex flex-start margin-top-sm">
					<text class="text-gray radius  text-sm  text-left" >{{currentItem.fullDescription || ""}}</text>					
				</view> -->
			</view>
			<view class="padding-lr margin-top " v-for="(att , attIndex) in currentItem.attributes" v-bind:key="attIndex">
				<view class="flex flex-start margin-top-sm">
					<text class="text-gray radius  text-sm  text-left" >{{att.productAttributeName}} </text>					
				</view>
				<view class="flex flex-start  flex-wrap margin-top-sm">	
										<!-- {{att.attributeValues[0]}}
										
										{{currentItem}} -->
					  <!-- class="cu-btn radius text-sm text-center margin-right-sm margin-bottom-sm"  -->
					<button :class="['cu-btn radius text-sm text-center margin-right-sm margin-bottom-sm' , value.isSelect?'bg-yellow text-white' :'line-gray']" 
					v-for="(value,valueIndex) in att.attributeValues" v-bind:key="valueIndex"
					@click="clickAtt(attIndex,valueIndex)">{{value.name}}</button>						
				</view>
			</view>
			
			<!-- <view class="pg-space-xxl"></view> -->
		</scroll-view>
		
		<!-- <view class="flex flex-start margin-top-sm"> -->
		<rich-text :nodes="currentItem.fullDescription" class="margin-top" style="width: 750rpx;"  ></rich-text>
		<!-- </view> -->
		<view class="pg-space-xxl"></view>
		<view class="pg-space-xxl"></view>
		
		<!-- <view class="bg-white cu-list menu-avatar" :style="'position: fixed; bottom:'+ SpaceBottom +'px; left: 0; right: 0;'" >
			<view class="cu-item" >
				<view class="cu-avatar round lg " @click="openBill()"> 
					<view  style="position:relative">
						<image  src='/static/images/strong/logo.jpg'
							class="cu-avatar  lg round " 
							style="background-color:#ffffff"
							mode="aspectFill"
							></image>
							
						<view class="cu-tag badge">{{totalQuantity}}</view>
					</view>
				</view>
				<view class="content">
					<view class="text-grey">
						<view class="text-bold text-xl text-red">
							<text class="text-price "></text>{{totalPrice}}
						</view>
					</view>					 
					 <view class="text-gray text-sm flex align-center">
					 	顺丰专送 | 支持自取
					  </view>
				</view>
				<view class="">
						<button class='cu-btn round bg-yellow text-white shadow margin-right-sm' @click="toPay()">去结算</button>	
				</view>
			</view>
		</view> -->
		
		<!-- <view class="" style="position: fixed ;bottom: 0; left: 0;right: 0; " v-if="showMiniBtn == false">		 -->
		<view class="" style="position: fixed ;bottom: 0; left: 0;right: 0; ">			
			<view class="padding " style="background-color: rgba(255,255,255,0.8);">			
				<view class="flex justify-between align-center text-xxl margin-top-sm">	
					<view class="flex ">
						<button class="cu-btn block round bg-red text-white lg margin-right"
							:disabled="totalQuantity>0?false :true "	@click="confirmDetail()">支付抢购</button>
						<button class="cu-btn block round bg-yellow lg " @click="openBill()">
							<view class="cuIcon-cart text-white lg"></view>
							<view class="cu-tag badge lg" style="z-index: 999;">{{totalPrice}}</view>
						</button>						
					</view>
					<view class="flex justify-between align-center"  v-show="isLoading==false">		
									
						<image src="/static/images/icon/cut.png"  class="pg-icon" @click="cutItem()" 	v-if="order[key]?true : false"></image>	
						<image src="/static/images/icon/cut_un.png"  class="pg-icon"  	v-else></image>								
						<text class="padding-lr-sm">{{order[key]? order[key].Quantity : 0 }}</text>			
						<image src="/static/images/icon/add.png"  class="pg-icon" @click="addItem()"   v-if="isMore"  ></image>
						<image src="/static/images/icon/add_un.png"  class="pg-icon"  @click="addItemUn()"  v-else></image>
					</view>	
				</view>
			</view>
		</view>
		
		<!-- <view class="" style="position: fixed ;bottom: 0; left: 0;right: 0; " v-else>			
			<view class="padding " style="background-color: rgba(255,255,255,0.8);">			
				<view class="flex justify-center align-center text-xxl margin-top-sm">	
						<button class="cu-btn block round bg-red text-white lg "
								@click="toOther()">{{miniConfig[0]}}</button>
				</view>
			</view>
		</view> -->
		
		<view :class="['cu-modal padding-tb-xl', showOrder?'show':'']" >
			<view class="cu-dialog" style=" position: relative;">
				<view class="cu-bar bg-white justify-end">
				  <view class="content text-bold">当前订单</view>
				  <view class="action" @click="closeShow()">
						<text class="cuIcon-close text-red"></text>
				  </view>
				</view>
				<view class="padding-lr padding-tb-sm text-left">
					<text class="line-red text-sm ">{{shopDiscount}}</text>
					
				</view>
				<view class="cu-list menu bg-white">
					<view class="cu-item margin-tb-sm" v-for="(item , key) in order" v-bind:key="key">
						<view class="action">
							<image :src='item?item.cover:""' 
								class="cu-avatar radius lg  bg-gray margin-right-sm " 
								style="width:60px;height:60px"
								mode="aspectFill"
								></image>
						</view>
						<view class="content ">
							<view class="text-black text-left">{{item.name}}</view>
							<view class="text-gray  text-sm text-left">{{item.attDes}}</view>
							<view class="flex justify-between">
								<view class="text-gray ">
									 <text class="text-price"></text>
									 <text class="text-red">{{item.total}}</text>
								</view>
								<view class="text-gray  flex justify-between align-center">									
									<!-- <image src="/static/images/icon/cut.png"  class="pg-icon" @click="cutOrder(item.categoryIndex,item.itemIndex,item.attIndex,item.valueIndex)"></image> -->
									<!-- {{item.Quantity}}	 -->
									<text class="padding-lr-xs ">{{order[key]? order[key].Quantity : 0 }}</text>								
								<!-- 	<image src="/static/images/icon/add.png"  class="pg-icon" @click="addOrder(item.categoryIndex,item.itemIndex,item.attIndex,item.valueIndex)" v-if="isMore"></image>
									<image src="/static/images/icon/add_un.png"  class="pg-icon" @click="addItemUn()" v-else></image> -->
								</view>
							</view>
						</view>
					</view>					
				</view>
						
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-yellow round " @click="closeShow()">取消</button>
						<button class="cu-btn bg-yellow text-white round margin-left" @click="closeShow()">确定</button>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>

	export default {
		data() {
			return {
				SpaceBottom:50,
				itemId:"", // 商品ID
				currentItem:{},
				categoryIndex:0,  // 当前选择的目录
				itemIndex:0, // 当前选择产品标志位
				attIndex:0, //属性标志位
				valueIndex:0,// 值标志位
				key:"", //订单对应的 标签序列号
				order:{
					// '0_0_0_0':{Quantity:0}
				}, //订单数据
				
				totalPrice:0,
				totalQuantity:0,
				
				showOrder:false,
				shopDiscount:"数量有限，限时优惠抢购",
				
				isMore:true,
				isLoading:true,
				
				showMiniBtn:false,
				miniConfig:[],
			}
		},
		onLoad(options) {
			console.log("onload")
			this.setData({
				itemId:options.itemId || ""
			})
			this.onInit()
			
			
			wx.showShareMenu({
			  withShareTicket: true,
			  menus: ['shareAppMessage', 'shareTimeline'],
			  success(res){
				  console.log('success',res)
			  },
			  fail(res){
				  console.log('fail',res)
			  }
			})
		},
		
		onShareAppMessage(){
			return {
				title: this.$data.currentItem.name,
				imageUrl: this.$data.currentItem.imgs[0].src || "",
				path:"/pages/good/good?itemId=" + this.$data.itemId,
			}
		},
		methods: {
			toOther(){
				uni.navigateToMiniProgram({
					appId:this.$data.miniConfig[1],
					path:this.$data.miniConfig[2],
					success(res){
						console.log("success",res)
					},
					fail(res){
						console.log("fail",res)
					},
				})
			},
			previewImage(){
				uni.previewImage({
					urls:[ this.$data.currentItem.imgs[0].src],
				})
			},
			chechMini(){
				if(!this.$data.currentItem.shortDescription)
					return
				var miniConfig = this.$data.currentItem.shortDescription.split("-")
				if(miniConfig.length == 3){
					this.setData({
						showMiniBtn:true,
						miniConfig:miniConfig,
					})
				}
			},
			
			async onInit(){
				// 
				// if()
				
				// 未登录过，登陆
				if( uni.getStorageSync(this.db.KEY_SESSION ) == "" ){
					var res = await this.db.customerGetToken()					
				}
				
				var res = await this.db.productGetDetail({
					ID:  this.$data.itemId
				})	
				
				var item = res.data
				// item.order_max_quantity = 2
				// item.order_min_quantity = 1
				item.stock = item.stock > 0 ? item.stock:0
				this.setData({
					currentItem:item,
					isLoading:false,
					// order:{},  //
				})
				// this.updateTotal()
				this.checkIsMore() // 判断库存
				this.initSelect()// 初始化选择框
				
				this.chechMini()
				
				this.clickAtt(0,0) // 点击第一个SKU
			},
			
			// 判断是否还有库存
			checkIsMore(){
				// v-if="currentItem.order_max_quantity <= totalQuantity " 
				var isMore = true
				if( this.$data.totalQuantity >= this.$data.currentItem.order_max_quantity ) // 大于品类限制
					isMore = false
				if( this.$data.totalQuantity >= this.$data.currentItem.stock) // 大于库存
					isMore = false
				this.setData({
					isMore:isMore
				})
			},
			
			
			// 确定订单
			confirmDetail(){
				this.toPay()
			},			
			// 展示订单
			openBill(){ this.setData({showOrder:true,}) },
			// 关闭模态框
			closeShow(){ this.setData({showOrder:false,}) },
			
			// 初始化选择框
			initSelect(){
				var currentItem = this.$data.currentItem		
				// 初始化订单数据
				for(var i=0; i<currentItem.attributes.length ; i++){
					for(var j=0; j<currentItem.attributes[i].attributeValues.length ; j++){						
						if(j == 0)
							currentItem.attributes[i].attributeValues[j].isSelect = true
						else	
							currentItem.attributes[i].attributeValues[j].isSelect = false
					}
				}
			},	
			
			async clickAtt(attIndex,valueIndex){
				var categoryIndex = this.$data.categoryIndex
				var itemIndex = this.$data.itemIndex		
				var currentItem = this.$data.currentItem								
				for(var i=0; i<currentItem.attributes[attIndex].attributeValues.length ; i++){ //将已经选择的置false
					currentItem.attributes[attIndex].attributeValues[i].isSelect = false
				}
				currentItem.attributes[attIndex].attributeValues[valueIndex].isSelect = true // 选择SKU
				this.$data.currentItem = {}
				this.$data.currentItem = currentItem // 更新当前SKU信息
				this.$data.attIndex = attIndex		// 更新属性位置	
				this.$data.valueIndex = valueIndex	// 更新值位置			
				this.updateKey() //设置当前key为SKU的序列号
				
				//更新价格
				// debugger
				var obj = { 
						"id":currentItem.id, 
						"Attributes": [
							{  
								"Id":currentItem.attributes[attIndex].productAttributeID,  
								"Value":currentItem.attributes[attIndex].attributeValues[valueIndex].id 
							}
						]
					}
				var res = await this.db.productGetSKUPrice({
					productSkuParameter:JSON.stringify(obj)
				})
				console.log(res)
				currentItem.price = res.data.price
				currentItem.stock = res.data.StockQuantity > 0 ?  res.data.StockQuantity : 0
				
				this.setData({
					currentItem:currentItem
				})
			},
			
			addItemUn(){
				if( this.$data.totalQuantity >= this.$data.currentItem.order_max_quantity ) // 大于品类限制
					uni.showToast({
						title:"限购" + this.$data.currentItem.order_max_quantity + "件",
						icon:"loading",
						duration:600,
					})
				if( this.$data.totalQuantity >= this.$data.currentItem.stock) // 大于库存
					uni.showToast({
						title:"暂无更多库存",
						icon:"loading",
						duration:600,
					})	
			},
			// 增加数量
			addItem(){
				console.log("+")
				// this.updateCurrentItem()
				this.updateKey()
				this.updateOrder(true)
				// this.updateMenu(true)
				this.updateTotal()
				
				uni.setStorageSync("order", this.$data.order)
			},
			// 减少数量
			cutItem(){
				console.log("-")
				// this.updateCurrentItem()
				this.updateKey()
				this.updateOrder(false)
				// this.updateMenu(false)
				this.updateTotal()
				
				uni.setStorageSync("order", this.$data.order)				
			},
			
			// 订单内的增删
			addOrder(categoryIndex,itemIndex,attIndex,valueIndex){
				this.setData({
					categoryIndex: categoryIndex,  // 当前选择的目录
					itemIndex:itemIndex, // 当前选择产品标志位
					attIndex:attIndex, //属性标志位
					valueIndex:valueIndex,
				})
				this.addItem()	
				
			},
			cutOrder(categoryIndex,itemIndex,attIndex,valueIndex){		
				this.setData({
					categoryIndex: categoryIndex,  // 当前选择的目录
					itemIndex:itemIndex, // 当前选择产品标志位
					attIndex:attIndex, //属性标志位
					valueIndex:valueIndex,
				})
				this.cutItem()	
				if(Object.keys(this.$data.order ).length == 0)
					this.closeShow()
				// console.log(this.$data.order.length)
			},
			
			/////////////////公共工具///////////////
					
			// 设置当前订单
			updateCurrentItem(){
				this.setData({ currentItem : this.$data.list[this.$data.categoryIndex].products[this.$data.itemIndex] , })
			},
			// 设置key
			updateKey(){
				var key =  this.$data.categoryIndex + "_" + this.$data.itemIndex + "_"
				var currentItem = this.$data.currentItem
				for(var i=0; i<currentItem.attributes.length ; i++){
					for(var j=0; j<currentItem.attributes[i].attributeValues.length ; j++){
						if(currentItem.attributes[i].attributeValues[j].isSelect == true){
							key = key + i + "_" + j + "_" 
						}
					}
				}
				this.$data.key = key				
			},
			
			// 更新已选择订单order
			updateOrder(isAdd){				
				var order = this.$data.order
				// var currentItem = this.$data.list[this.$data.categoryIndex].products[this.$data.itemIndex] // 当前
				var currentItem = this.$data.currentItem
				var Attributes = []	//上传属性列表		
				var attDes="" // 属性描述
				for(var i=0; i<currentItem.attributes.length ; i++){
					for(var j=0; j<currentItem.attributes[i].attributeValues.length ; j++){
						if(currentItem.attributes[i].attributeValues[j].isSelect == true){
							Attributes.push({
								"Id": currentItem.attributes[i].productAttributeID,
								"Value": currentItem.attributes[i].attributeValues[j].id								
							})
							attDes = attDes + currentItem.attributes[i].attributeValues[j].name + "、"
						}
					}
				}	
				attDes = attDes.substr(0, attDes.length - 1);  // 删除最后一个字符
				var key = this.$data.key
				if( order.hasOwnProperty(key) == false){
					order[key] = {
						// 下单需要参数
						ProductId:currentItem.id,
						Quantity: 1,
						Attributes:Attributes,
						// 展示需要参数
						cover:currentItem.imgs? currentItem.imgs[0] ? currentItem.imgs[0].src : "" :"" ,
						name:currentItem.name,
						price:currentItem.price,
						total:parseFloat(currentItem.price).toFixed(2),
						attDes:attDes,
						// 订单位置标记
						categoryIndex: this.$data.categoryIndex,  // 当前选择的目录
						itemIndex:this.$data.itemIndex, // 当前选择产品标志位
						attIndex:this.$data.attIndex, //属性标志位
						valueIndex:this.$data.valueIndex,// 值标志位
						
					}
				} else {
					if(isAdd)
						order[key].Quantity += 1 
					else{
						order[key].Quantity -= 1 		
						order[key].Quantity < 0 ? 0 :order[key].Quantity
					}
					order[key].total = parseFloat( order[key].Quantity * order[key].price ).toFixed(2)
				}
				
				// 删除key下的数据
				if(order[key].Quantity <= 0)
					delete order[key]
				this.$data.order = []
				this.$data.order = order
				
				
				// console.log(key,Attributes,attDes)
				
				// order[key] = OrderItems
			},
			
			
			updateTotal(){
				var totalPrice = 0
				var totalQuantity = 0
				var order = this.$data.order
				for(var i in order){
					totalPrice += order[i].Quantity * order[i].price
					totalQuantity += order[i].Quantity
				}
				console.log(totalPrice,totalQuantity)
				this.setData({
					totalPrice:parseFloat(totalPrice).toFixed(2), 
					totalQuantity: parseInt( totalQuantity ),
				})
				
				this.checkIsMore() // 判断库存
			},
			
			/******路由******/
			toPay(){
				uni.navigateTo({
					url:"/pages/order/pay"
				})
			},
			
		}
	
	}
</script>

<style>
</style>
