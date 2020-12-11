
import fahter from './db_base_1.js'
class son extends fahter{	
	
	constructor(){
		super()
	}

	/**
     * @method 1 获取产品类别列表
     * @param 
			Ids
			SinceId
			Fields
			PublishedStatus
			AppId
			Session
     */
    categoryGetList(data) {
		return new Promise((resolve, reject) => {
			this.base({url: this.HOST_URL +  "api/categories/getlist/",data: data,}).then(res => {resolve(res.data)}).catch(res => reject(res))
		})
    }
	
	/**
	 * @method 2 查询产品类别数量
	 * @param 
			"PublishedStatus": true,
			"AppId": "string",
			"Session": "string"
	 */
	categoryCount(data) {
		return new Promise((resolve, reject) => {
			this.base({url: this.HOST_URL +  "api/categories/count/",data: data,}).then(res => {resolve(res.data)}).catch(res => reject(res))
		})
	}
	
	/**
	 * @method 3 获取产品类别详情
	 * @param 
			CateId
			Fields
			AppId
			Session
	 */
	categoryGetDetail(data) {
		return new Promise((resolve, reject) => {
			this.base({url: this.HOST_URL +  "api/categories/getdetail/",data: data,}).then(res => {resolve(res.data)}).catch(res => reject(res))
		})
	}
	
}
module.exports = son