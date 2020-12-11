<template>
		<view class="">
			<form  @submit="save">
				<view class="cu-form-group  text-left">
					<view class="title">直播间ID：</view>
					<input placeholder="请输入直播间ID" name="roomID" :value="room.roomID"  class="text-right"></input>
				</view>
				<view class="cu-form-group  text-left">
					<view class="title">标题：</view>
					<input placeholder="请输入直播间标题" name="title" :value="room.title" class="text-right" ></input>
				</view>
				<view class="cu-form-group  text-left" @click="changeStatus">
					<view class="title">状态：</view>					
					<view class="">
						<text class="text-bold text-yellow" v-if="status == STATUS_LIVE" >直播</text>
						<text class="text-bold text-red" v-else-if="status == STATUS_PLAYBACK" >回放</text>
						<text class="text-bold text-black" v-else>已完成</text>	
						（切换状态）
					</view>
				</view>
				
				<view class="cu-bar bg-white  cu-form-group ">
					<view class="action" style="margin-left: 0rpx;">
					   封面图片
					</view>
					<!-- <view class="action">
						{{coverList.length}}/{{coverMax}}
					</view> -->
				</view>
				<view></view>
				<view class="cu-form-group">
					<view class="grid col-5 grid-square flex-sub ">
						<view class="bg-img" v-for="(item,index) in coverList " v-bind:key="index" @click="ViewCover(coverList[index])" >
							<image :src='coverList[index]' mode='aspectFit'></image>
							<view class="cu-tag bg-red" @click="DelCover(index)" >
								<text class="cuIcon-close"></text>
							</view>
						</view>
						<view class="solids" @click="ChooseCover" v-if="coverList.length<coverMax ">
							<text class="cuIcon-cameraadd"></text>
						</view>
					</view>
				</view>
				
				<view class="cu-form-group  text-left">
					<view class="title">主播名字：</view>
					<input placeholder="请输入姓名" name="hostName" :value="room.hostName" class="text-right"></input>
				</view>
				
				<view class="cu-bar bg-white  cu-form-group ">
					<view class="action" style="margin-left: 0rpx;">
					   主播头像
					</view>
					<!-- <view class="action">
						{{logoList.length}}/{{logoMax}}
					</view> -->
				</view>
				<view></view>
				<view class="cu-form-group">
					<view class="grid col-5 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in logoList " v-bind:key="index" @click="ViewLogo(logoList[index])" >
							<image :src='logoList[index]' mode='aspectFit'></image>
							<view class="cu-tag bg-red" @click="DelLogo(index)" >
								<text class="cuIcon-close"></text>
							</view>
						</view>
						<view class="solids" @click="ChooseLogo" v-if="logoList.length<logoMax ">
							<text class="cuIcon-cameraadd"></text>
						</view>
					</view>
				</view>
				<view class="cu-form-group  text-left">
					<view class="title">主播描述：</view>
					<input placeholder="请输入主播描述" name="desc" :value="room.desc" class="text-right" ></input>
				</view>
				<view class="cu-form-group  text-left">
					<view class="title">开始时间：</view>
					<input placeholder="请输入开始时间" name="startTime" :value="room.startTime" class="text-right" ></input>
				</view>
				<view class="cu-form-group  text-left">
					<view class="title">序号（降序排列）：</view>
					<input placeholder="请输入序号" name="sn" :value="room.sn" class="text-right" ></input>
				</view>
				
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn round line-yellow" @click="close()">取消</button>
						<button class="cu-btn round bg-yellow text-white margin-left"  form-type="submit" >确定</button>
					</view>
				</view>
			</form>		
			
			<view class="pg-space-xxl">
				
			</view>
		</view>
</template>

<script>
	var _id = ""
	export default{
		data(){
			return{
				room:{},
				coverList: [],
				coverMax: 1,
				logoList: [],
				logoMax: 1,
				
				
				status:this.db.STATUS_LIVE,
				STATUS_LIVE : this.db.STATUS_LIVE,
				STATUS_PLAYBACK : this.db.STATUS_PLAYBACK,
				STATUS_COMPLETE : this.db.STATUS_COMPLETE,
			}
		},
		
		onLoad(options){
			console.log(options)
			_id = options._id || ""
			this.onInit()
		},
		
		methods:{
			async onInit(){
				console.log(this.$data.itemID)
				if(_id == "")
					return
					
				var res = await this.db.roomGetDetail({_id:_id})
				var room = res.data
				if(res.code == 0){
					this.setData({
						room: room,
						status:room.status,
						coverList: [room.coverUrl],
						logoList: [room.hostLogoUrl],
					})
				}
				
			},
			
			
			//  添加直播间
			// 老谭 头像   cloud://cup-customer-release.6375-cup-customer-release-1301587562/logo/tan_jn.jpg   拉花谭老师
			async addRoom() { 
				// debugger
				// var res = await this.db.roomAdd({
				// 	isShow: true,
				// 	sn: 0,
				// 	roomID: 33,
				// 	title: '素人大改造の"Lisa仿妆"',
				// 	status: STATUS_PREPARE, // 1、进行中  2、已结束   
				// 	coverUrl: "cloud://gxtv-release.6778-gxtv-release-1301781438/cover/2020-4-6-1.jpg",      
				// 	hostLogoUrl: "cloud://gxtv-release.6778-gxtv-release-1301781438/logo/jiangjiang.jpg",
				// 	hostName: "@蒋蒋viyan",
				// 	desc: "爱喝咖啡",
				// 	goodUrl: "", // 商品连接
				// 	startTime: "2020-04-6 20:30", 
				// })
				// console.log(res)
			},
		
		   // 保存
			async save(e) {
				var formData = e.detail.value
				for(var  i in formData){
					if(formData[i]==''){
						uni.showToast({
							title:"请填写完整信息",
							icon:"loading"
						})
						return
					}						
				}
				if( this.$data.coverMax.length == 0){
					uni.showToast({
						title:"无海报图片",
						icon:"loading"
					})
					return
				}
				
				if( this.$data.logoList.length == 0){
					uni.showToast({
						title:"无主播图片",
						icon:"loading"
					})
					return
				}				
				this.saveAdd(formData)
				
			},
			
			async saveAdd(formData){				
				var userID = 1
				// 上传cover
				var coverUrl = this.$data.coverList[0] 
				var filePath = this.$data.coverList[0] 
				var isLocal = /^cloud:\/\//.test(filePath)
				if ( !isLocal) {
					var cloudName = "cover/" + userID + "_" + new Date().getTime()
					var cloudPath = cloudName + filePath.match(/\.[^.]+?$/)[0]
					coverUrl = await this.db.uploadImage({
						filePath: filePath,
						cloudPath: cloudPath,
					})
				}
				formData.coverUrl =coverUrl
				
				var hostLogoUrl = this.$data.logoList[0] 
				filePath = this.$data.logoList[0] 
				var isLocal = /^cloud:\/\//.test(filePath)
				if ( !isLocal) {
					var cloudName = "logo/" + userID + "_" + new Date().getTime()
					var cloudPath = cloudName + filePath.match(/\.[^.]+?$/)[0]
					hostLogoUrl = await this.db.uploadImage({
						filePath: filePath,
						cloudPath: cloudPath,
					})
				}
				formData.hostLogoUrl =hostLogoUrl
				
				formData._id = _id
				formData.isShow = true
				// formData.sn = 0
				formData.status = this.$data.status
				console.log(formData)
				// debugger
				var res = await this.db.roomAdd(formData)
				console.log(res)
				wx.showModal({
					title: res.msg,
					showCancel:false,
					success(res){						
						var prePage = getCurrentPages()[getCurrentPages().length - 2]
						prePage.$vm.onInit()
						wx.navigateBack() 
					},
				})
			},
				
				
			//切换状态
			changeStatus(){
				uni.showActionSheet({
					itemList:["直播","回放","已完成"],
					success:(res)=>{
						if(res.tapIndex == 0)
							this.setData({ status :this.db.STATUS_LIVE })
						else if(res.tapIndex == 1)
							this.setData({ status :this.db.STATUS_PLAYBACK })
						else
							this.setData({ status :this.db.STATUS_COMPLETE })
						
					}
				})
			},
		
			// async getYunUrl(){
			// 	if (filePath) {
			// 	var userID = 1
			// 	var cloudName = "logo/" + userID + "_" + new Date().getTime()
			// 	console.log(cloudName)
			// 	// 上传图片
			// 	const cloudPath = cloudName + filePath.match(/\.[^.]+?$/)[0]
			// 	formData.logo = await app.db.uploadImage({
			// 		filePath: filePath,
			// 		cloudPath: cloudPath,
			// 	})
			// },
		
			close(){
				uni.navigateBack()
			},
			/*************封面的编辑*************/
			DelCover(index) {
				wx.showModal({
					title: '确定要删除这长图片?',
					success: res => {
						if (res.confirm) {
							this.$data.coverList.splice(index, 1);
							this.setData({
								coverList: this.$data.coverList
							})
						}
					}
				})
			},
			ViewCover(url) {
				wx.previewImage({
					urls: this.$data.coverList,
					current: url
				});
			},
			async ChooseCover() {
				wx.chooseImage({
					count: this.$data.coverMax, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.$data.coverList.length != 0) {
							this.setData({
								coverList: this.$data.coverList.concat(res.tempFilePaths)
							})
						} else {
							this.setData({
								coverList: res.tempFilePaths
							})
						}
					}
				});
			},
		
			/*************LOGO的编辑*************/
			DelLogo(index) {
				wx.showModal({
					title: '确定要删除这长图片?',
					success: res => {
						if (res.confirm) {
							this.$data.logoList.splice(index, 1);
							this.setData({
								logoList: this.$data.logoList
							})
						}
					}
				})
			},
			ViewLogo(url) {
				wx.previewImage({
					urls: this.$data.logoList,
					current: url
				});
			},
			async ChooseLogo() {
				wx.chooseImage({
					count: this.$data.logoMax, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.$data.logoList.length != 0) {
							this.setData({
								logoList: this.$data.logoList.concat(res.tempFilePaths)
							})
						} else {
							this.setData({
								logoList: res.tempFilePaths
							})
						}
					}
				});
			},
		}
	}
	
	
	
	//         var noticeUrlList = []
	//         for (var i = 0; i < this.data.imgList.length; i++) {
	//             var filePath = this.data.imgList[i]
	//             // var isLocal = /^http:\/\/tmp\//.test(filePath) // 检查是否含有本地图片，有则上传，没有按顺序添加到数组
	//             var isLocal = /^cloud:\/\//.test(filePath) // 检查是否含有本地图片，有则上传，没有按顺序添加到数组
	//             if (isLocal) {
	//                 noticeUrlList.push(filePath)
	//             } else{
	//                 var cloudName = "cover/" + userID + "_" + new Date().getTime()
	//                 var cloudPath = cloudName + filePath.match(/\.[^.]+?$/)[0]
	//                 var noticeUrl = await app.db.uploadImage({
	//                     filePath: filePath,
	//                     cloudPath: cloudPath,
	//                 })
	//                 noticeUrlList.push(noticeUrl)
	//             }
	//         }
	//         formData.noticeUrlList = noticeUrlList
	        // formData.addressList = this.data.store.addressList
	        // formData.bgColor = this.data.bgColor || "#e54d42"
	
	        // var r = await app.db.editorSelfStore(formData)
	        // wx.showModal({
	        //     title: r.msg,
	        //     showCancel:false,
	        //     success(res){
	        //         var prePage = app.getPrePage()
	        //         prePage.onInit()
	        //         wx.navigateBack({}) 
	        //     },
	        // })
</script>

<style>
	page{
		background-color: var(--white);
	}
</style>


