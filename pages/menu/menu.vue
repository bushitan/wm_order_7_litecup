<template>
	<view>
		<!-- <view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-shadeTop text-white">
				<block slot="backText" @click="back()">返回</block>
				<block slot="content">垂直导航</block>
			</cu-custom>
		</view> -->
		
		
		<!-- <swiper class="screen-swiper square-dot  bg-white" :indicator-dots="true" :circular="false" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item class="swiper-height" v-for="(item,index) in swiperList" :key="index">
				<image :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper> -->
		
		
		 <!-- :style="'height:calc(100vh - '+ SpaceSwiper +'upx - '+ SpaceBottom +'px)'" -->
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" :style="'height:calc(100vh - '+ SpaceSwiper +'rpx - '+ SpaceBottom +'px)'" >
				<view class="cu-item" 
				:class="index==tabCur?'text-yellow text-bold  bg-white cur flex align-center ':''" 
				v-for="(category,index) in list" :key="index" @tap="TabSelect" :data-id="index"
				style="white-space: nowrap;    overflow: hidden;    text-overflow: ellipsis;">
					{{category.category.cate_name}}
				</view>
				<view class="pg-space-xxl"></view>
				<view class="pg-space-xxl"></view>				
			</scroll-view>
			<!-- :style="'height:calc(100vh - '+ SpaceSwiper +'upx - '+ SpaceBottom +'px)'"    style="height:100vh" -->
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation  :style="'height:calc(100vh - '+ SpaceSwiper +'rpx - '+ SpaceBottom +'px)'" 
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(category,index) in list" :key="index" :id="'main-'+index">
					<view class="cu-bar  bg-white">
						<view class="action">
							<text class="cuIcon-title text-blue"></text>{{category.category.cate_name}}</view>
					</view>
					
					<view class="cu-list menu ">
						<!-- <view class="cu-item " style=" align-items: flex-start"  v-for="(item,itemIndex) in category.products"  v-bind:key="itemIndex" @click="toGood(item.id)"> -->
						<view class="cu-item " style=" align-items: flex-start"  v-for="(item,itemIndex) in category.products"  v-bind:key="itemIndex" @click="openDetail(index,itemIndex)">
							<view class="">
								<image :src='item.imgs? item.imgs[0] ? item.imgs[0].src : "" :"" '
									class="cu-avatar radius lg  bg-gray margin-right-sm " 
									style="width:60px;height:60px"
									mode="aspectFill"
									></image>
							</view>							
							<view class="action basis-xl padding-bottom" >
								<view class="">
									<text class=" text-black text-bold text-df">{{item.name}}</text>
								</view>
								<view class="margin-top-xs">
									<text class="bg-gray radius  text-xs margin-right-sm "  v-for="(tag,tagIndex) in item.tags" v-bind:key="tagIndex"
									style="padding:2px 3px;margin-top: 20px;">{{tag}}</text>				
								</view>
								<!-- <view class="text-gray text-xs margin-top-xs">
									月销售234
								</view> -->								
								<!-- <view class="flex flex-start margin-top-sm">
									<text class="text-gray radius  text-sm  text-left" >{{item.shortDescription}}</text>					
								</view> -->
								<!-- <view class="margin-top-xs" v-if="item.shortDescription? true :false " >
									<text class="bg-gray radius  text-xs margin-right-sm " style="padding:2px 3px;">{{item.shortDescription}}</text>				
								</view> -->
								
								<view class="margin-top-xs flex justify-between align-center">
									<view class="text-red text-lg">
										
										<text class="text-price"></text>{{item.price}}
										
										
										<view class="text-gray text-sm margin-left-sm"  style="display: inline-block ;text-decoration:line-through">
											<text class="text-price"></text>{{item.oldprice}}
										</view>
										
									</view>
									<view style="position:relative">
										<button class="cu-btn round line-yellow  sm" >选规格</button>
										<view class="cu-tag badge" v-if="item.num">{{item.num}}</view>										
									</view>
								</view>
							</view>							
						</view>
					</view>				
				</view>
				
				<view class="pg-space-xxl"></view>
				<view class="pg-space-xxl"></view>
			</scroll-view>
		</view>
		
		
		
		<view class="bg-white cu-list menu-avatar" :style="'position: fixed; bottom:'+ SpaceBottom +'px; left: 0; right: 0;'" v-if="Object.keys(order).length>0">
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
					<!-- <view class="text-gray text-sm flex">
						<text class="text-cut">
							<text class="cuIcon-infofill text-red  margin-right-xs"></text>
							顺风专送 | 免配送费 | 支持自取
						</text>
					 </view> -->
					 
					 <view class="text-gray text-sm flex align-center">
					 	<!-- <image src='/static/sf.png'
					 		class="cu-avatar radius lg  bg-gray margin-right-sm" 
					 		style="width: 23px;height: 23px;"
					 		></image> -->
					 	包邮
					  </view>
				</view>
				<view class="">
						<button class='cu-btn round bg-yellow text-white shadow margin-right-sm' @click="toPay()">去结算</button>	
				</view>
			</view>
		</view>
		<view class="bg-white cu-list menu" :style="'position: fixed; bottom:'+ SpaceBottom +'px; left: 0; right: 0;'" v-else>			
			<view class="cu-item ">
				<view class="action">					
					<text class="line-red text-sm">{{shopDiscount}}</text>				
				</view>
				<view class="action  text-sm basis-df text-right" @click="selectShop">
					<!-- <text class="line-black ">{{shopName}}</text>
					<text class="line-gray" >(选择门店)</text> -->
					<!-- <button class="cu-btn  line-red">返回直播间</button> -->
					<!-- <view class="pg-arrow"></view> -->
				</view>
			</view>
		</view>
			
			
		<!-- 详情选项 -->
		<view :class="['cu-modal', showChoice?'show':'']" >
			<view class="cu-dialog" :style="' position: absolute;top:'+ (CustomBar ) +'px;bottom:15px;left: 15px;right: 15px;'">
				<view class="cu-bar bg-white justify-end">
				  <view class="content text-bold">{{currentItem.name}}</view>
				  <view class="action" @click="closeShow()">
						<text class="cuIcon-close text-red"></text>
				  </view>
				 </view>
				 <!--height: calc(100vh - 150px - 105px -36px); -->
				 
				 <!-- 
					:style="'width: 100%;height: calc(100vh - 50px - 105px - 36px - 30px - ' + CustomBar + 'px)'"> -->
				<scroll-view 
					scroll-y scroll-with-animation 
					:style="'width: 100%;height: calc(100vh - 50px - 100px - 30px - ' + CustomBar + 'px)'">
					<view class="" >
						<image :src=' currentItem.imgs? currentItem.imgs[0] ? currentItem.imgs[0].src : "" :"" ' class="block " style="width: 100%;"  mode="widthFix"></image>
					</view>
					<view class="padding-lr margin-top">
						<view class="flex flex-start">
							<text class="bg-gray radius  text-xs margin-right-sm padding-xs"
								v-for="(tag , tagIndex ) in currentItem.tags" v-bind:key="tagIndex">{{tag}}</text>						
						</view>
						<view class="flex flex-start margin-top-sm">
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
					<view class="pg-space-xxl"></view>
				</scroll-view>
				<view class="" style="position: absolute ;bottom: 0; left: 0;right: 0; ">
					<view class="padding-lr padding-tb-sm   solid-bottom" :hidden="order[key]?order[key].attDes == ''? true:false : true" style="background-color: rgba(255,255,255,0.8);">
						<view class="flex flex-start text-sm align-center">		
							<text class="text-gray ">已选规格：</text>{{order[key]?  order[key].attDes:""}}						
						</view>					
					</view>
					
					<view class="padding " style="background-color: rgba(255,255,255,0.8);">
						<view class="flex justify-between align-center text-xxl">						
							<view class="text-red ">
								<text class="text-price"></text>{{currentItem.price}}
							</view>				
							<view class="flex justify-between align-center">
								<!-- <button class="cu-btn  round  bg-gray sm "  
									:hidden="order[key]? false : true"
									@click="cutItem()">
								</button> -->
								
								<image src="/static/images/icon/cut.png"  class="pg-icon" @click="cutItem()" 	:hidden="order[key]? false : true"></image>								
								<text class="padding-lr-sm">{{order[key]? order[key].Quantity : 0 }}</text>								
								<image src="/static/images/icon/add.png"  class="pg-icon" @click="addItem()"></image>
								<!-- <button class="cu-btn text-bold round bg-yellow text-white text-lg pg-btn-icon"  @click="addItem()">
									+
								</button> -->
							</view>						
						</view>
						<view class="margin-top-sm">
							<button class="cu-btn block round bg-yellow text-white lg" @click="confirmDetail()">确定</button>
						</view>
					</view>
				</view>
			</view>
		</view>

		
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
									<!-- <button class="cu-btn  round  bg-gray sm" @click="cutOrder(item.categoryIndex,item.itemIndex,item.attIndex,item.valueIndex)">-</button> -->
									<image src="/static/images/icon/cut.png"  class="pg-icon" @click="cutOrder(item.categoryIndex,item.itemIndex,item.attIndex,item.valueIndex)"></image>
									<!-- {{item.Quantity}}	 -->
									<text class="padding-lr-xs ">{{order[key]? order[key].Quantity : 0 }}</text>								
									<!-- <button class="cu-btn  round bg-yellow text-white sm" @click="addOrder(item.categoryIndex,item.itemIndex,item.attIndex,item.valueIndex)">+</button>								 -->
									<image src="/static/images/icon/add.png"  class="pg-icon" @click="addOrder(item.categoryIndex,item.itemIndex,item.attIndex,item.valueIndex)"></image>
								
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
				CustomBar:this.CustomBar,
				
				SpaceSwiper:0,
				SpaceBottom:0,
							
				cardCur: 0,
				swiperList:[
					"/static/images/strong/swiper1_lg.jpg",
					"/static/images/strong/swiper2_lg.jpg",
				],
				
				
				list: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				
				showChoice:false, //展示详情
				showOrder:false, // 展示账单
				
				// 当前选择的蟾皮								
				currentItem:{
					imgs:[
						{src:""},
					],
					tags:[],
					attributes:[
						{
							isSelect:false,
							productAttributeName:"",
							attributeValues:[],
						},
					],
				},				
				
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
				
				shopId:"",
				shopName:"南湖店",
				shopDiscount:"赶紧抢购",
			};
		},
		async onLoad(options) {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			this.setData({				
				shopId:uni.getStorageSync(this.db.KEY_SHOP_ID) || "",
				// shopName:uni.getStorageSync(this.db.KEY_SHOP_NAME) || "",
				// shopId:8,
				shopName:uni.getStorageSync(this.db.KEY_SHOP_NAME) || "",
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
			// var that = this 
			// setInterval(function(){that.test()},500)
		},
		onReady() {
			uni.hideLoading()
		},
		
		onShareAppMessage(){
			return {
				// title: "都市会生活直播",
				imageUrl: "/static/images/share.jpg",
				path:"/pages/route/route",
			}
		},
		methods: {
			// 选择门店
			selectShop(){
				uni.redirectTo({
					url: '/pages/live/live'
				});
			},
			
			async test(){
				
				var res = await this.db.productMenu()
				if(res.hasOwnProperty("msg") == false){
					console.log(  new Date() )
					uni.request({
						url:this.db.HOST_URL + "api/log/addlog/",
						method:"POST",
						data:{
							logmsg:'error:'
						}
					})
				}
				// console.log(res)
			},
			async onInit(){
				// var res = await this.db.productGetList()
				// var res = await this.db.categoryGetList()
				// 未登录过，登陆
				if( uni.getStorageSync(this.db.KEY_SESSION ) == "" ){
					var res = await this.db.customerGetToken()					
				}		
				
				
				var res = await this.db.productMenu({
					shopId:this.$data.shopId
				})
				
				var temp = res.data
				// debugger
				for(var i=0; i<temp.length ;i++)
					temp[i].id = i
				// this.list = temp
				// this.listCur = temp[0];
				// console.log(temp)
				this.setData({
					list:temp,
				})
			},
			
			
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						console.log(this.list[i])
						
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}	
			},
			
			/*************模态框**************/
			
			toGood(itemId){
				uni.navigateTo({
					url:"/pages/good/good?itemId=" + itemId
				})
			},
			
			
			// 展示产品详情
			async openDetail(categoryIndex,itemIndex){						
				// var currentItem = this.$data.list[categoryIndex].products[itemIndex] 
				// console.log(currentItem)
				// 初始化订单数据							
				this.setData({
					showChoice:true,
					categoryIndex:categoryIndex,
					itemIndex:itemIndex,
					// currentItem:currentItem
				})				
						
				this.updateCurrentItem()
				this.initSelect()  // 点击窗口后，初始化选择框	
				this.updateKey() // 初始化key
				
			},
			
			// 确定订单
			confirmDetail(){ this.setData({showChoice:false,}) },			
			// 展示订单
			openBill(){ this.setData({showOrder:true,}) },
			// 关闭模态框
			closeShow(){ this.setData({showChoice:false,showOrder:false,}) },
			
			/***********详情操作*********/
			
			// 切换SKU
			clickAtt(attIndex,valueIndex){
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
			},
			// 增加数量
			addItem(){
				console.log("+")
				this.updateCurrentItem()
				this.updateKey()
				this.updateOrder(true)
				this.updateMenu(true)
				this.updateTotal()
				
				uni.setStorageSync("order", this.$data.order)
			},
			// 减少数量
			cutItem(){
				console.log("-")
				this.updateCurrentItem()
				this.updateKey()
				this.updateOrder(false)
				this.updateMenu(false)
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
			
			// 更新menu，选项卡的数量
			updateMenu(isAdd){
				var list = this.$data.list
				// debugger
				if( list[this.$data.categoryIndex].products[this.$data.itemIndex].hasOwnProperty("num") == false)
					list[this.$data.categoryIndex].products[this.$data.itemIndex].num = 0
					
				if(isAdd)
					list[this.$data.categoryIndex].products[this.$data.itemIndex].num += 1 
				else{
					
					list[this.$data.categoryIndex].products[this.$data.itemIndex].num -= 1 
					list[this.$data.categoryIndex].products[this.$data.itemIndex].num < 0 ? 0 :list[this.$data.categoryIndex].products[this.$data.itemIndex].num
				}
								
				this.$data.list = [] 
				this.$data.list = list
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
			},
			
			
			
			
			/******路由******/
			toPay(){
				uni.navigateTo({
					url:"/pages/order/pay"
				})
			},
			
			
		},
	}
</script>

<style>
	page{
	/* background-color: var(--ghostWhite); */
		/* background-color: #fafafa; */
	}
	.screen-swiper , .screen-swiper swiper-item,.screen-swiper image{
		
	}
	.swiper-height{
		height: 250rpx;
	}
	
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		/* background-color: #fff; */
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		/* background-color: #f1f1f1; */
		background-color: #ffffff;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		/* background-color: #f1f1f1; */
		background-color: --var(ghostWhite);
		flex: 1;
	}
	
	.cu-item:after{border: none !important;}
</style>

<!-- 
<view class="cu-list menu-avatar">
	<view class="cu-item">
		<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
		<view class="content">
			<view class="text-grey">凯尔</view>
			<view class="text-gray text-sm flex">
				<text class="text-cut">
					<text class="cuIcon-infofill text-red  margin-right-xs"></text>
					我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。
				</text> </view>
		</view>
		<view class="action">
			<view class="text-grey text-xs">22:20</view>
			<view class="cu-tag round bg-grey sm">5</view>
		</view>
	</view>
	<view class="cu-item">
		<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Taric.png);">
			<view class="cu-tag badge">99+</view>
		</view>
		<view class="content">
			<view class="text-grey">
				<text class="text-cut">瓦洛兰之盾-塔里克</text>
				<view class="cu-tag round bg-orange sm">战士</view>
			</view>
			<view class="text-gray text-sm flex">
				<text class="text-cut">
					塔里克是保护者星灵，用超乎寻常的力量守护着符文之地的生命、仁爱以及万物之美。塔里克由于渎职而被放逐，离开了祖国德玛西亚，前去攀登巨神峰寻找救赎，但他找到的却是来自星界的更高层的召唤。现在的塔里克与古代巨神族的神力相融合，以瓦洛兰之盾的身份，永不疲倦地警惕着阴险狡诈的虚空腐化之力。
				</text>
			</view>
		</view>
		<view class="action">
			<view class="text-grey text-xs">22:20</view>
			<view class="cuIcon-notice_forbid_fill text-gray"></view>
		</view>
	</view>
	<view class="cu-item ">
		<view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
		<view class="content">
			<view class="text-pink"><text class="text-cut">莫甘娜</text></view>
			<view class="text-gray text-sm flex"> <text class="text-cut">凯尔，你被自己的光芒变的盲目！</text></view>
		</view>
		<view class="action">
			<view class="text-grey text-xs">22:20</view>
			<view class="cu-tag round bg-red sm">5</view>
		</view>
	</view>
	<view class="cu-item grayscale">
		<view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81007.jpg);"></view>
		<view class="content">
			<view><text class="text-cut">伊泽瑞尔</text>
				<view class="cu-tag round bg-orange sm">断开连接...</view>
			</view>
			<view class="text-gray text-sm flex"> <text class="text-cut"> 等我回来一个打十个</text></view>
		</view>
		<view class="action">
			<view class="text-grey text-xs">22:20</view>
			<view class="cu-tag round bg-red sm">5</view>
		</view>
	</view>
	<view class="cu-item cur">
		<view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg);">
			<view class="cu-tag badge"></view>
		</view>
		<view class="content">
			<view>
				<text class="text-cut">瓦罗兰大陆-睡衣守护者-新手保护营</text>
				<view class="cu-tag round bg-orange sm">6人</view>
			</view>
			<view class="text-gray text-sm flex">
				<text class="text-cut"> 伊泽瑞尔：<text class="cuIcon-locationfill text-orange margin-right-xs"></text> 传送中...</text></view>
		</view>
		<view class="action">
			<view class="text-grey text-xs">22:20</view>
			<view class="cuIcon-notice_forbid_fill text-gray"></view>
		</view>
	</view> -->