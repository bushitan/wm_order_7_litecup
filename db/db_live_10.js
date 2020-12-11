
import fahter from './db_payment_9.js'
class son extends fahter{	
	
	STATUS_LIVE = 10   //直播
	STATUS_PLAYBACK = 20 // 回放
	STATUS_COMPLETE = 30 // 已完成
	
	constructor(){
		super()
	} 
	
    /**
     * @method 1 获取直播房间
     * @return 
     *      []
     */
    roomGetList(data) {
        return new Promise((reslove, reject) => {
            wx.showLoading()
            data = data || {}
            data['action'] = "get_list"
            wx.cloud.callFunction({
                name: 'room',
                data: data,
                success: res => {
                    wx.hideLoading()
                    if (res.result.code == 0)
                        reslove(res.result)
                    else
                        wx.showToast({
                            icon: "none",
                            title: res.result.msg,
                        })
                },
                fail: res => {
                    console.log(res.result)
                    wx.hideLoading()
                },
            })
        })
    }
	
	/**
	 * @method 1 获取直播房间
	 * @return 
	 *      []
	 */
	roomGetListByStatus(data) {
	    return new Promise((reslove, reject) => {
	        wx.showLoading()
	        data = data || {}
	        data['action'] = "get_list_by_status"
	        wx.cloud.callFunction({
	            name: 'room',
	            data: data,
	            success: res => {
	                wx.hideLoading()
	                if (res.result.code == 0)
	                    reslove(res.result)
	                else
	                    wx.showToast({
	                        icon: "none",
	                        title: res.result.msg,
	                    })
	            },
	            fail: res => {
	                console.log(res.result)
	                wx.hideLoading()
	            },
	        })
	    })
	}

	/**
	 * @method 2 天机直播房间
	 * @return 
	 *      []
	 */
	roomAdd(data) {
		return new Promise((reslove, reject) => {
			wx.showLoading()
			data = data || {}
			data['action'] = "add"
			wx.cloud.callFunction({
				name: 'room',
				data: data,
				success: res => {
					wx.hideLoading()
					if (res.result.code == 0)
						reslove(res.result)
				},
				fail: res => {
					console.log(res.result)
					wx.hideLoading()
				},
			})
		})
	}
	
	/**
	 * @method 3 获取直播间详情
	 * @return 
	 *      []
	 */
	roomGetDetail(data) {
	    return new Promise((reslove, reject) => {
	        wx.showLoading()
	        data = data || {}
	        data['action'] = "get_detail"
	        wx.cloud.callFunction({
	            name: 'room',
	            data: data,
	            success: res => {
	                wx.hideLoading()
	                if (res.result.code == 0)
	                    reslove(res.result)
	                else
	                    wx.showToast({
	                        icon: "none",
	                        title: res.result.msg,
	                    })
	            },
	            fail: res => {
	                console.log(res.result)
	                wx.hideLoading()
	            },
	        })
	    })
	}
	

	/**
	 * @method 4 添加直播间人员信息
	 * @return 
	 *      []
	 */
	roomAddUserInfo(data) {
	    return new Promise((reslove, reject) => {
	        wx.showLoading()
	        data = data || {}
	        data['action'] = "add_user_info"
	        wx.cloud.callFunction({
	            name: 'room',
	            data: data,
	            success: res => {
	                wx.hideLoading()
					console.log(res)
	                if (res.result.code == 0)
	                    reslove(res.result)
	                else
	                    wx.showToast({
	                        icon: "none",
	                        title: res.result.msg,
	                    })
	            },
	            fail: res => {
	                console.log(res.result)
	                wx.hideLoading()
	            },
	        })
	    })
	}
	
	/**
	 * @method 5 验证直播间权限
	 * @return 
	 *      []
	 */
	roomCheckPower(data) {
	    return new Promise((reslove, reject) => {
	        wx.showLoading()
	        data = data || {}
	        data['action'] = "check_user_power"
	        wx.cloud.callFunction({
	            name: 'room',
	            data: data,
	            success: res => {
	                wx.hideLoading()
					console.log(res)
	                if (res.result.code == 0)
	                    reslove(res.result)
	                else
	                    wx.showToast({
	                        icon: "none",
	                        title: res.result.msg,
	                    })
	            },
	            fail: res => {
	                console.log(res.result)
	                wx.hideLoading()
	            },
	        })
	    })
	}
	
	/**********综合模块**********/
	// 上传图片
	uploadImage(obj){
		return new Promise((reslove, reject) => {
			// var data = {}
			// reslove(data)
			wx.showLoading({ title: "图片上传中" })
			wx.cloud.uploadFile({
				cloudPath:obj.cloudPath,
				filePath:obj.filePath,
				success: res => {
					wx.hideLoading()
					// console.log('[上传文件] 成功：', res)

					// app.globalData.fileID = res.fileID
					// app.globalData.cloudPath = cloudPath
					// app.globalData.imagePath = filePath
					// debugger
					reslove(res.fileID)
				},
				fail: e => {
					console.error('[上传文件] 失败：', e)
					wx.showToast({
						icon: 'none',
						title: '上传失败请重试',
					})
					// reject()
				},
				complete: () => {
					wx.hideLoading()
				}
			})
		})
	}
}
module.exports = son