<template>
	<view class="">
		<view class="" v-for="(item,key) in list" v-bind:key="key">
			<view class="cu-bar bg-white  margin-top">
				<view class="action">
					<text class="cuIcon-title text-yellow"></text>{{item.name}} ，{{item.phoneNumber}}
				</view>
				<view class="action">
					<text class="cu-btn bg-red text-white round shadow margin-right-sm" @click="deleteAddress(item.id)">删除</text>
					<text class="cu-btn bg-yellow text-white round shadow " @click="select(key)" v-if="isMyEnter==false">选择</text>
				</view>
			</view>
			<!-- <view class="title padding-lr padding-bottom  text-gray sm bg-white">{{item.cityName}}--{{item.address}}</view> -->
			<view class="title padding-lr padding-bottom  text-gray sm bg-white">{{item.address}}</view>
		</view>
		<view class="padding">
			<view class="pg-flex-center  margin-top">
		        <button class="cu-btn block round bg-red  text-white lg" @click="addAddress()" v-if="isAuthorLocaiton">增加地址</button>
		        <button class="cu-btn block  round bg-red  text-white lg" @click="openSetting" v-else>授权打开地址</button> 
		    </view>

		</view>
		<!-- id: 131
		email: "281256755@qq.com"
		company: "广西索骏科技有限责任公司"
		stateCode: ""
		stateProvinceName: ""
		cityCode: ""
		cityName: "南宁"
		address: "广西南宁青秀区 盛天国际"
		zipPostalCode: "530000"
		phoneNumber: "18588276558"
		faxNumber: "07713212955"
		name: null
		Longitude: ""
		Latitude: "" -->
		
		
		<view :class="['cu-modal', showEdt?'show':'']" >
			<view class="cu-dialog" style=" position: relative;">
				<view class="cu-bar bg-white justify-end">
				  <view class="content text-bold">编辑地址</view>
				  <view class="action" @click="close()">
						<text class="cuIcon-close text-red"></text>
				  </view>
				</view>
				
				<!-- <view class=" padding text-left">
					<textarea placeholder="智能识别地址(地址、姓名、电话请用空格分开)" ></textarea>
				</view>
				<view class="cu-form-group flex justify-end"> 
					<button class="cu-btn round ">识别</button>
				</view> -->
				<form  @submit="formSubmit">
					<!-- <view class="cu-form-group  text-left">
						<view class="title">城市：</view>
						<input placeholder="请输入城市名称(如:南宁市)" value="南宁市" name="cityName" ></input>
					</view> -->
					<view class="cu-form-group  text-left">
						<view class="title">地址：</view>
						<input placeholder="请输入地址" name="address" :value="address"></input>
					</view>
					<view class="cu-form-group  text-left" v-show="false">
						<view class="title">经度：</view>
						<input name="longitude" :value="currentLongitude" disabled="true"></input>
					</view>
					<view class="cu-form-group  text-left" v-show="false">
						<view class="title">纬度：</view>
						<input name="latitude" :value="currentLatitude" disabled="true"></input>
					</view>
					
					<view class="cu-form-group  text-left">
						<view class="title">姓名：</view>
						<input placeholder="请输入姓名" name="name"></input>
					</view>
					
					<view class="cu-form-group  text-left">
						<view class="title">电话：</view>
						<input placeholder="请输入电话" name="phoneNumber" maxlength="11"></input>
					</view>
					
					<view class="cu-bar bg-white justify-center">
						<view class="action">
							<button class="cu-btn round line-yellow" @click="close()">取消</button>
							<button class="cu-btn round bg-yellow margin-left text-white"  form-type="submit" >确定</button>
						</view>
					</view>
				</form>		
			<!-- 	<view class="cu-list menu bg-white">
					<view class="cu-item margin-tb-sm">
						<view class="action">
							<image src='/static/images/strong/swiper.jpg' 
								class="cu-avatar radius lg  bg-gray margin-right-sm " 
								style="width:60px;height:60px"
								></image>
						</view>
						<view class="content ">
							<view class="text-black text-left">挂耳包</view>
							<view class="text-gray  text-sm text-left">(加冰)</view>
						</view>
						<view class="action">
							<view class="text-gray   text-sm">x1</view>
						</view>
					</view>
				</view> -->
						
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				showEdt:false,
				list:[],
				
				isAuthorLocaiton:false,
				address:"",
				currentLongitude:0,
				currentLatitude:0,
				isMyEnter:false,
			}
		},
		onLoad(options){
			this.setData({
				isMyEnter: options.isMyEnter ||　false,
			})
			this.onInit()
		},
		
		methods:{
			async onInit(){
				// var list = [
				// 	{ address:"2idsado",name:"我的", phone:"157778545"},
				// ]
				var res = await this.db.customerShipAddrs()
				var auth = await this.db.checkAuthorUserLocation()
				console.log(auth)
				this.setData({
					list:res.data,
					isAuthorLocaiton: auth
				})
			},
			// 选择地址
			select(index){
				uni.setStorageSync( this.db.KEY_ORDER_PRE_ADDRESS  , index)
				var currentAdd = this.$data.list[index]
				var prePage = getCurrentPages()[ getCurrentPages().length - 2] 
				
				prePage.$vm.setUserAddress(currentAdd)
				uni.navigateBack({})
			},
			// 删除地址，更新pay页面内容
			deletePreUpdate(){				
				uni.setStorageSync( this.db.KEY_ORDER_PRE_ADDRESS, "")
				var prePage = getCurrentPages()[ getCurrentPages().length - 2] 	
							
				if( prePage.$vm.hasOwnProperty("noneUserAddress"))
					prePage.$vm.noneUserAddress()
			},
			
			
			add(){				
				this.show()
			},
		
			// 增加地址
			async addAddress(){
				this.show()
				// var location = this.db.getLocation()
				// var that = this
				// uni.chooseLocation({
				// 	latitude: location.latitude,
				// 	longitude: location.longitude,
					
				// 	success(res){
				// 		console.log(res)
				// 		that.setData({
				// 			address:res.address,
				// 			currentLongitude:res.longitude,
				// 			currentLatitude:res.latitude,
				// 		})	
				// 		that.show()						
				// 	},
				// })
			},
			
			// 删除地址
			deleteAddress(addressId){
				var that = this
				console.log(addressId)
				uni.showModal({
					title:"是否删除该地址？",
					success(){
						that.db.customerDelShipAddre({
							addressid:addressId
						})
						
						that.onInit()
						that.deletePreUpdate()
					},
				})
			},
			
			// 添加地址成功
			async formSubmit(e){
				var formData = e.detail.value
				// console.log(e)
				if(formData.address == "") {
					uni.showModal({title:"请输入地址" , showCancel:false})
					return 
				}
				if(formData.name == "") {
					uni.showModal({title:"请输入姓名" , showCancel:false})
					return 
				}
				if(formData.phoneNumber.length != 11) {
					uni.showModal({title:"请输入正确电话" , showCancel:false})
					return 
				}
				
				// var cityName = formData.cityName || ""
				var cityName = "城市名称"
				// if ( cityName == "北京" || cityName == "北京市"  ) 
				// 	cityName =  "北京市"
				// else
				// 	cityName =  "南宁市"
				
				var  info = {
					Address:formData.address,
					Name:formData.name,
					PhoneNumber:formData.phoneNumber,
					CityName:cityName,
					Longitude:formData.longitude || 108,
					Latitude:formData.latitude || 22,
				}
				// TODO  上传地址
				var res = await this.db.customerAddShipAddr(info)
				this.onInit()
				this.close()
			},
			async openSetting(){
				// debugger
				// if( await this.db.checkAuthorUserLocation()) {
					var res = await this.db.openSettingLocation()
					console.log(res)
					this.setData({
						isAuthorLocaiton: res
					})
				// }
			},
			// 打开模态框
			show(){
				this.setData({
					showEdt:true,
				})
			},
			
			// 关闭模态框
			close(){
				this.setData({
					showEdt:false,
				})
			},
		},
	}
</script>

<style>
</style>
