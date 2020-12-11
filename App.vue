<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
					
					//适配全面屏底部距离
					if (Vue.prototype.CustomBar > 75) {
						Vue.prototype.TabbarBot = "y"
					}
				}
			})
			
			
			// 开启云函数
			if (wx.cloud) {
				wx.cloud.init({
					env: "cup-wm-release",
					traceUser: true
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './static/css/icon.wxss';
	@import './static/css/main.wxss';
	/* @import './static/css/iconfont.css'; */
	
	page{
		/* background-color: #f1f1f1; */
		
		background-color: #fafafa;
	}
	
	.pg-radius{overflow: hidden;border-radius: 10rpx;	}
	.pg-radius-bottom{overflow: hidden;border-bottom-right-radius: 10rpx;	border-bottom-left-radius: 10rpx;}
	
	
	.pg-icon{
		width: 50rpx;
		height: 50rpx;
	}
	/* .pg-icon{
		width: 50rpx;
		height: 50rpx;
	} */
	
	
	.pg-image-block{width: 100%;display: block;}
	
	.pg-space { height: 10px; }
	.pg-space-lg { height: 20px; }
	.pg-space-xl { height: 30px; }
	.pg-space-xxl { height: 60px; }
	
	.pg-arrow:after{
		/*position: ab solute;
		top: 0;
		right: 30rpx;
		bottom: 0; */
		display: block;
		/* margin: auto; */
		width: 30rpx;
		height: 30rpx;
		color: var(--gray);
		content: "\e6a3";
		text-align: center;
		font-size: 34rpx;
		font-family: "cuIcon";
		line-height: 30rpx
	}
	
	.pg-arrow-sm:after{
		display: block;
		width: 19rpx;
		height: 19rpx;
		color: var(--gray);
		content: "\e6a3";
		text-align: center;
		font-size: 27rpx;
		font-family: "cuIcon";
		line-height: 19rpx
		
	}
	
	
	.pg-btn-icon{
		padding:0 !important;;
		width:23px !important;
		height: 23px !important;;
		border-radius: 50% !important;;
	}
	
	
	.bg-cur{
		background-color: #fcf7e9 !important;
	}
	
	
	
	
	.cu-item::after{
		border: none !important;
	}
	
	
	.switch-mode::after {
		content: "店";
	}
	
	.switch-mode::before {
		content: "外";
	}
	
	.switch-mode .wx-switch-input {
		background: var(--blue) !important;
		border-color: var(--blue) !important;
		padding: 0 5px !important;
	}
	
	.switch-mode[checked] .wx-switch-input {
		background: var(--yellow) !important;
		border-color: var(--yellow) !important;
		padding: 0 5px !important;
	}
	
	
	
</style>
