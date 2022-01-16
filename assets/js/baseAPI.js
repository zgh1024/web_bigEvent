// 注意: 每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 函数
// 在这个函数中 可以拿到 我们给 Ajax提供的配置对象
$.ajaxPrefilter(function(options){
  // 在发起真正的Ajax请求之前，统一拼接请求的根路径
  options.url = 'http://www.liulongbin.top:3007' + options.url;
  
  // 统一位有权限的接口，设置 headers 请求头
  if(options.url.indexOf('/my/') !== -1) // indexOf == -1 就是没有的意思，不等于就是有的意思
    options.headers = {
      // token 令牌 用于验证身份
      Authorization: localStorage.getItem('token')||''
    },

    // 全局统一 挂载complete函数 
    //  无论成功还是 失败 都会调用 complete函数 
    options.complete = function(res) {
      console.log('执行了complete函数');
      // 在complete回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
      if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！' ) {
        // 强制清空 token
        localStorage.removeItem('token');
        // 强制 跳转到登录页面
        location.href = '/login.html';
      }
    }
})