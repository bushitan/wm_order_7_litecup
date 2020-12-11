<template>
	<view class="tabs">
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
            <view v-for="(tab,index) in list" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
                <text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
            </view>
        </scroll-view>
	</view>
</template>

<script>
	
    // 缓存每页最多
    const MAX_CACHE_DATA = 100;
    // 缓存页签数量
    const MAX_CACHE_PAGE = 3;

	export default {
		data() {
            return {
				newsList: [{data: []}],
				cacheTab: [],
				tabIndex: 0,
                
				scrollInto: "",
			}
		},
		props:{
			list:{
				type:Array,
				default:[],
			}
		},
		created() {
			console.log(213278)
			this.list.forEach((tabBar) => {
                this.newsList.push({
                    data: [],
                    refreshText: "",
                    loadingText: '加载更多...'
                });
            });
            this.getList(0);
		},
		methods:{
			getList(index) {
                let activeTab = this.newsList[index];
                let list = [];
                // for (let i = 1; i <= 10; i++) {
                //     let item = Object.assign({}, newsData['data' + Math.floor(Math.random() * 5)]);
                //     item.id = this.newGuid();
                //     list.push(item);
                // }
                activeTab.data = activeTab.data.concat(list);
            },
			
			ontabtap(e) {
				
                let index = e.target.dataset.current || e.currentTarget.dataset.current;
                this.switchTab(index);
				this.$emit("ontabtap" , {"index":index})
            },
			  switchTab(index) {
				  // debugger
                if (this.newsList[index].data.length === 0) {
                    this.getList(index);
                }

                if (this.tabIndex === index) {
                    return;
                }

                // 缓存 tabId
                if (this.newsList[this.tabIndex].data.length > MAX_CACHE_DATA) {
                    let isExist = this.cacheTab.indexOf(this.tabIndex);
                    if (isExist < 0) {
                        this.cacheTab.push(this.tabIndex);
                        //console.log("cache index:: " + this.tabIndex);
                    }
                }

                this.tabIndex = index;
                // this.scrollInto = this.list[index].id;

                // 释放 tabId
                if (this.cacheTab.length > MAX_CACHE_PAGE) {
                    let cacheIndex = this.cacheTab[0];
                    this.clearTabData(cacheIndex);
                    this.cacheTab.splice(0, 1);
                    //console.log("remove cache index:: " + cacheIndex);
                }
            },
		}
	}
</script>

<style>
	
    .tabs {
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        background-color: #ffffff;
        /* #ifdef MP-ALIPAY || MP-BAIDU */
        height: 100vh;
        /* #endif */
    }
    .scroll-h {
        width: 750upx;
        height: 80upx;
        flex-direction: row;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
        /* flex-wrap: nowrap; */
        /* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
    }
    .scroll-v {
        flex: 1;
        /* #ifndef MP-ALIPAY */
        flex-direction: column;
        /* #endif */
        width: 750upx;
    }
	
	
    .uni-tab-item {
        /* #ifndef APP-PLUS */
        display: inline-block;
        /* #endif */
        flex-wrap: nowrap;
        padding-left: 34upx;
        padding-right: 34upx;
    }
    .uni-tab-item-title {
        color: #555;
        font-size: 30upx;
        height: 80upx;
        line-height: 80upx;
        flex-wrap: nowrap;
        /* #ifndef APP-PLUS */
        white-space: nowrap;
        /* #endif */
    }

    .uni-tab-item-title-active {
        color: #007AFF;
		border-bottom: 2px solid #007AFF;
    }


</style>
