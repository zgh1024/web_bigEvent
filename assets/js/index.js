$(function(){
  // 调用 getUserInfo 函数 获取用户基本信息
  getUserInfo();

  // 退出事件
  $('#btnLogout').on('click',function(){
    // layui的confirm函数 可以看看手册 无敌方便 
    layer.confirm('确定退出?', {icon: 3, title:'提示'}, function(index){
      // do something

      // 清空本地存储
      localStorage.removeItem('token')
      // 跳转页面
      location.href = '/login.html'
      // 关闭 layer询问框
      layer.close(index)
    });

  });

})

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',

    success: function(res) {
      if(res.status !== 0) {
        return console.log('请求失败!');
      }
      randerAvatar(res.data);
    },
    //  无论成功还是 失败 都会调用 complete函数 
    complete: function(res) {
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
}

function randerAvatar(user) {
  let name = user.username||user.nickname;
  $('#welcome').html('你好 '+ name);
  if(user.user_pic !== null) {
    // 用户自己的头像
    $('.layui-nav-img')
    .attr('src', user.user_pic).show();
    console.log(user.user_pic);
    $('.text-avater').hide();
  } else {
    $('.layui-nav-img').hide();
    $('.text-avater').html(name[0].toUpperCase()).show();
  }
}

