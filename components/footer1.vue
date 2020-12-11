<template>
	<view class="">
		<view class=" padding-xs flex align-center margin-top">
		    <view class="flex-sub text-center">
		        <view class=" text-df ">
		            <text class="text-grey text-sm">Copyright © 2012 索骏科技提供技术支持</text>
		        </view>           
		    </view>
		</view>
		<view class=" flex justify-center ">
		    <button class=" cu-btn round bg-darkGray text-grey text-sm"  type="" open-type="contact">联系客服</button>
		</view>
	</view>
</template>

<script>
	
		export default {
			data() {
				console.log('123')
				return {
					StatusBar: this.StatusBar,
					CustomBar: this.CustomBar
				};
			},
			name: 'footer',
		}
</script>

<style>
</style>
