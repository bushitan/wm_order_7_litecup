
import fahter from './db_product_6.js'
class son extends fahter{	
	
	constructor(){
		super()
	} 
	
	/**
	 * @method 1 获取当前门店信息
	 * @param 
		Fields
		AppId
		Session
	 */
	storeCurrent(data) {
		return new Promise((resolve, reject) => {
			this.base({url: this.HOST_URL +  "api/current_store/",data: data,})
			.then(res => {resolve(res.data)})
			.catch(res => reject(res))
		})
	}
	
	/**
	 * @method 2 获取所有门店信息
	 * @param 
		Fields
		AppId
		Session
	 */
	storeGetList(data) {
		return new Promise((resolve, reject) => {
			this.base({url: this.HOST_URL +  "api/stores/",data: data,}).then(res => {resolve(res.data)}).catch(res => reject(res))
		})
	}
	/**
	 * @method 3 获取门店轮播图
	 * @param 
		Fields
		AppId
		Session
	 */
	storeBanner(data) {
		return new Promise((resolve, reject) => {
			this.base({url: this.HOST_URL +  "api/store/banner/",data: data,}).then(res => {resolve(res.data)}).catch(res => reject(res))
		})
	}
}
module.exports = son