
import fahter from './db_customers_3.js'
class son extends fahter{	
	
	constructor(){
		super()
	}
	
	// /**
	//  * @method 1  获取具体订单项
	//  * @param 
	//  * 		orderId
	// 		Limit
	// 		Page
	// 		SinceId
	// 		Fields
	// 		AppId
	// 		Session
	//  */
	// orderItemGet(data) {
	// 	return new Promise((resolve, reject) => {
	// 		this.base({url: this.HOST_URL +  "api/orders/getitems/",data: data,method:"GET"}).then(res => {resolve(res.data)}).catch(res => reject(res))
	// 	})
	// }
	/**
	 * @method 2  获取订单项数
	 * @param 
	 	OrderId
		OrderItemId
		AppId
		Session
	 */
	orderItemGetCount(data) {
		return new Promise((resolve, reject) => {
			this.base({url: this.HOST_URL +  "api/orders/item/getcount/",data: data,}).then(res => {resolve(res.data)}).catch(res => reject(res))
		})
	}
	
	/**
	 * @method 3  获取某一订单项目具体详情
	 * @param 
	 	OrderId
		OrderItemId
		AppId
		Session
	 */
	orderItemGetDetailItem(data) {
		return new Promise((resolve, reject) => {
			this.base({url: this.HOST_URL +  "api/orders/getdetailitem/",data: data,}).then(res => {resolve(res.data)}).catch(res => reject(res))
		})
	}
	
	/**
	 * @method 4  添加订单项
	 * @param 
	 	orderId
		orderItemDelta
	 */
	orderItemCreate(data) {
		return new Promise((resolve, reject) => {
			this.base({url: this.HOST_URL +  "api/orders/createitem/",data: data,}).then(res => {resolve(res.data)}).catch(res => reject(res))
		})
	}
	
	/**
	 * @method 5  更新某一订单项
	 * @param 
	 	orderId
		orderItemId
		orderItemDelta
	 */
	orderItemUpdate(data) {
		return new Promise((resolve, reject) => {
			this.base({url: this.HOST_URL +  "api/orders/updateitem/",data: data,}).then(res => {resolve(res.data)}).catch(res => reject(res))
		})
	}
		
	/**
	 * @method 6  删除订单某一项
	 * @param 
		OrderId
		OrderItemId
		AppId
		Session
	 */
	orderItemDelete(data) {
		return new Promise((resolve, reject) => {
			this.base({url: this.HOST_URL +  "api/orders/delitem/",data: data,}).then(res => {resolve(res.data)}).catch(res => reject(res))
		})
	}
	
	/**
	 * @method 7  删除订单下所有项
	 * @param 
		OrderId
		OrderItemId
		AppId
		Session
	 */
	orderItemDeleteAll(data) {
		return new Promise((resolve, reject) => {
			this.base({url: this.HOST_URL +  "api/orders/delitems/",data: data,}).then(res => {resolve(res.data)}).catch(res => reject(res))
		})
	}
}
module.exports = son