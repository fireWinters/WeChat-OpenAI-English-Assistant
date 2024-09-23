/*
 * @Author: Diana Tang
 * @Date: 2024-09-23 15:22:57
 * @LastEditors: Diana Tang
 * @Description: some description
 * @FilePath: /WeChat-OpenAI-English-Assistant/wechat-miniprogram/app.js
 */
// wechat-miniprogram/app.js

App({
    // 小程序初始化时触发，全局只触发一次
    onLaunch() {
      // 获取用户信息或初始化一些全局设置
      console.log("小程序初始化");
  
      // 示例：获取用户信息的代码
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            // 如果已经授权，可以直接获取用户信息
            wx.getUserInfo({
              success: (res) => {
                this.globalData.userInfo = res.userInfo;
              }
            });
          }
        }
      });
    },
  
    // 小程序启动或从后台进入前台时触发
    onShow() {
      console.log("小程序显示");
    },
  
    // 小程序从前台进入后台时触发
    onHide() {
      console.log("小程序隐藏");
    },
  
    // 全局数据对象
    globalData: {
      userInfo: null,
      apiUrl: 'http://localhost:3000'  // 后端服务的基础 API URL
    }
  });
  