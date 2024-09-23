/*
 * @Author: Diana Tang
 * @Date: 2024-09-23 15:23:36
 * @LastEditors: Diana Tang
 * @Description: some description
 * @FilePath: /WeChat-OpenAI-English-Assistant/wechat-miniprogram/pages/index/index.js
 */
// wechat-miniprogram/pages/index/index.js

Page({
    data: {
      userMessage: '',
      aiReply: '',
    },
  
    // 输入框事件处理
    onMessageInput(e) {
      this.setData({ userMessage: e.detail.value });
    },
  
    // 点击发送按钮时触发
    async onSend() {
      const { userMessage } = this.data;
  
      if (!userMessage.trim()) {
        wx.showToast({
          title: '请输入内容',
          icon: 'none',
        });
        return;
      }
  
      wx.showLoading({ title: 'AI处理中...' });
  
      // 发送请求到后端
      try {
        const response = await wx.request({
          url: 'http://localhost:3000/learn-english',  // 后端API地址
          method: 'POST',
          data: { message: userMessage },
          header: { 'content-type': 'application/json' },
          success: (res) => {
            this.setData({ aiReply: res.data.reply });
          },
          fail: () => {
            wx.showToast({ title: '请求失败', icon: 'none' });
          },
        });
      } catch (error) {
        wx.showToast({ title: '处理失败', icon: 'none' });
      } finally {
        wx.hideLoading();
      }
    },
  });
  