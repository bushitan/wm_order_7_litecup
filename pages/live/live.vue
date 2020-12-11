<template>
	<view>
		<!-- <view class="cu-bar bg-white solid-bottom">
			<view class='action'>
				<text class='cuIcon-titles text-yellow '></text>都市会生活Live
			</view>			
			<button class="cu-btn bg-yellow text-white round "  @click="addRoom" >添加</button>
		</view> -->
		<scroll-view scroll-x class="bg-white nav ">
			<view class='flex  text-center  '>
				<view :class="[ 'cu-item flex-sub', item.id==tabIndex?'text-yellow text-bold cur':' text-gray' ] " 
				v-for="(item,index) in SortMenu" v-key="index" @click="tabSelect(index)">
						<view style="  position: relative" >
							<text class="">{{item.name}}</text>
						</view>
				</view>
			</view>
		</scroll-view>
		
		<view class="cu-card case ">
		    <view class="cu-item shadow" v-for="(item,key) in list" v-key="index" @click="toRoom(item.roomID)" >
		        <view class="image">
		            <image :src="item.coverUrl" mode="widthFix"></image>
		            <view class="cu-tag bg-yellow text-white" v-if="item.status == STATUS_LIVE">开播时间：{{item.startTime}}</view>
		            <view class="cu-tag bg-red text-white" v-if="item.status == STATUS_PLAYBACK">回放</view>
		            <view class="cu-tag bg-grey text-white" v-if="item.status == STATUS_COMPLETE">已完成</view>
		            <view class="cu-bar bg-shadeBottom">
		            <text class="text-cut">{{item.title}}</text>
		        </view>
		    </view>
		    <view class="cu-list menu-avatar">
		        <view class="cu-item">
		            <image class="cu-avatar round lg"  :src="item.hostLogoUrl"> </image>
		            <view class="content flex-sub">
		                <view class="text-black text-bold">{{item.hostName}}</view>
		                <view class="text-gray text-sm flex justify-between">
		                    {{item.desc}}
		                    <view class="text-gray text-sm">
		                    <!--    <button class="cu-btn bg-yellow text-white round sm margin-right-sm"  wx:if="{{item.goodUrl}}"
		                            catchtap="toGood" data-good_url="{{item.goodUrl}}">精选推荐</button>-->
		                        <button  v-if="isHost" class="cu-btn bg-red text-white round   align-center margin-right"  
		                            @tap.native.stop="toAdd(item._id)"  margin-right >
		                            编辑
		                        </button> 
								<button class="cu-btn bg-blue text-white round   align-center"
								   >
								    观看
								    <text class="cuIcon-playfill"></text>
								</button> 
		                    </view>
		                </view>
		            </view>
		            </view>
		        </view>
		    </view>
		</view>
		<view class=" padding-xs flex align-center margin-top-sm">
		    <view class="flex-sub text-center">
		        <view class=" text-df ">
		            <text class="text-gray text-sm">Copyright © 2020 索骏科技提供技术支持</text>
		        </view>           
		    </view>
		</view>
		<view class="pg-space-xxl"></view>
		
		
		
		
		<view v-if="isHost" class="padding-tb-sm solid-top flex justify-center "  style="position: fixed; bottom:0; left: 0; right: 0; background-color: rgba(255, 255, 255, 0.7)">
		     <!-- <button class="cu-btn bg-yellow text-white round "  @click="toShop" >都市商城</button> -->
		     <!-- <button class="cu-btn bg-yellow text-white round " open-type="getUserInfo" @getuserinfo="getUserInfo()" >登陆</button> -->
		     <button class="cu-btn bg-red text-white round  margin-right"  @click="toAdd()" >添加直播间</button>
		     <!-- <button class="cu-btn bg-yellow text-white round " @click="toSort()" >排序编辑</button> -->
		</view>

	</view>
	

</template>

<script>	

var STATUS_PREPARE = 10
var STATUS_PROCESSING = 20
var STATUS_COMPLETE = 30
	export default{
		data(){
			return{
				bgColor:"#fef4ea",
				ShopId:"",
				ShopTakeType:"",
				
				isStart:false,
				
				isHost:false, //是否编辑人员
				
				tabIndex:0,
				SortMenu: [
					{ id: 0, name: "当前活动", },
					{ id: 1, name: "活动回放",},
					// { id: 2, name: "都市惠商城",},
				],
		
				STATUS_LIVE : this.db.STATUS_LIVE,
				STATUS_PLAYBACK : this.db.STATUS_PLAYBACK,
				STATUS_COMPLETE : this.db.STATUS_COMPLETE,
				list:[],
				
				
			}
		},
		
		onLoad(options){
			console.log(options)
			
			
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
		methods:{
			async onInit(){
				this.tabSelect(0)
				// console.log(res)		

				
				this.db.roomCheckPower().then(res=>{
					this.setData({
						isHost:res.data || false,
						// isHost:true,
					})
				})
			},
			// async toRoom(){},
			async tabSelect(tabIndex) {
				console.log(tabIndex)
				
				this.setData({
					tabIndex: tabIndex,
					list: [],
				})
				
				switch (tabIndex) {
					case 0:
						var res = await this.db.roomGetListByStatus({status: this.db.STATUS_LIVE});
						var data = res.data
						this.setData({
							list:data
						})
						this.checkIsStart(data)
						break;
					case 1:
						var res = await this.db.roomGetListByStatus({status: this.db.STATUS_PLAYBACK});
						this.setData({
							list:res.data
						})
						break;
					case 2:
						this.toShop();
						break;
					
				}
				// this.setData({
				// 	list: res.data
				// })
			},
			// 检测是否刚刚进入
			checkIsStart(data){
				if(this.$data.isStart == false){
					console.log(data)
					if(data.length > 0){
						
						var roomID = data[0].roomID
						this.toRoom(roomID)
						this.setData({isStart:true})
					}
				}
			},
		
		    toRoom(room_id){
		        wx.navigateTo({
		            url: 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=' + room_id ,
					success(res){ console.log(res)},
					fail(res){ 
						wx.showModal({
							title:"节目未开始，请耐心等待",
							showCancel:false,
						})
					},
		        })
		    },
		
			//  添加直播间
			// 老谭 头像   cloud://cup-customer-release.6375-cup-customer-release-1301587562/logo/tan_jn.jpg   拉花谭老师
			async toAdd(_id) {
				_id = _id || ""
				uni.navigateTo({
					url:"/pages/live/add?_id=" + _id
				})
			},
			
			getUserInfo(){
				
			},
			
			// 跳转排序页面
			toSort(){
				uni.navigateTo({
					url:"/pages/live/sort"
				})
			},
			
			toShop(){
				uni.switchTab({
					url:"/pages/menu/menu"
				})
			},
		},
	}
</script>

<style>
	page{
		background-color: var(--ghostWhite);
	}
</style>
