
import fahter from './db_store_7.js'
class son extends fahter{	
	
	constructor(){
		super()
	} 
	
	/**
	 * @method 1 顺丰获取预订单
	 * @param 
	 */
	sfPreCreateOrder(data) {
		return new Promise((resolve, reject) => {
			// 测试接口
			this.base({url: this.HOST_URL +  "api/sf/precreateorder/",data: data,}).then(res => {resolve(res.data)}).catch(res => reject(res))
			// 正式接口
			// this.base({url: this.HOST_URL +  "api/ship/precreateorder/",data: data,}).then(res => {resolve(res.data)}).catch(res => reject(res))
		})
	}
	
	
}
module.exports = son