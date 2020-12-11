
import fahter from './db_sf_8.js'
class son extends fahter{	
	
	constructor(){
		super()
	} 
	
	/**
	 * @method 1 获取所有产品列表
	 * @param 
	 */
	paymentCustomer(data) {
		return new Promise((resolve, reject) => {
			this.base({url: this.HOST_URL +  "api/orders/prepay/",data: data,}).then(res => {resolve(res.data)}).catch(res => reject(res))
		})
	}
}
module.exports = son