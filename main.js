import Vue from 'vue'
import App from './App'

import DB from './db/db.js'

Vue.config.productionTip = false

Vue.prototype.db = DB


import cuCustom from './components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

// 选择框
import tabbar from '@/components/tabbar/tabbar.vue'
Vue.component('tabbar', tabbar)
import Footer from '@/components/footer.vue'
Vue.component('footer', Footer)
//二维码插件
import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
Vue.component('tki-qrcode', tkiQrcode)

Vue.prototype.ShopID = 87

Vue.prototype.Shop = {
	Id:0,
	TakeTypeValue:7,
}
Vue.prototype.customerTakeType = ''


var date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate() 
Vue.prototype.today = [year, month, day].join('-') 


function setData(obj){  
	let that = this;  
	let keys = [];  
	let val,data;  
	Object.keys(obj).forEach(function(key){  
		 keys = key.split('.');  
		 val = obj[key];  
		 data = that.$data;  
		 keys.forEach(function(key2,index){  
			 if(index+1 == keys.length){  
				 that.$set(data,key2,val);  
			 }else{  
				 if(!data[key2]){  
					that.$set(data,key2,{});  
				 }  
			 }  
			 data = data[key2];  
		 })  
	});  
}  
Vue.prototype.setData = setData

function GeoDistance (la1, lo1, la2, lo2) {
    var La1 = la1 * Math.PI / 180.0;
    var La2 = la2 * Math.PI / 180.0;
    var La3 = La1 - La2;
    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));
    s = s * 6378.137;//地球半径
    s = Math.round(s * 10000) / 10000;
    // console.log("计算结果", s)
    return s
 }
Vue.prototype.GeoDistance = GeoDistance


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
