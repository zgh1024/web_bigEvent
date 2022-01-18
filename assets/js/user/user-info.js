$(function(){
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    nickname: function(value){ //value：表单的值、item：表单的DOM对象
      if(value.length > 10){
        return '必须在1-10个字符之间!'
      }
    }
  });

  initUserInfo();

  // 重置按钮事件
  $('#btnReset').on('click',function(e){
    //  console.log('reset');
    e.preventDefault();
    initUserInfo();
  })

  // 提交修改 按钮事件
  $('.layui-form').on('submit',function(e){
    // 阻止表单默认提交行为
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url:'/my/userinfo',
      data: $(this).serialize(),
      success: function(res){
        if(res.status !== 0) {
          return layer.msg('更新用户信息失败！');
        }
        // console.log(res);
        console.log('更新成功!');
        // 调用父页面中的方法，重新渲染用户头像和用户信息
        window.parent.getUserInfo();
      } 
    })
  })
 
})

// 初始化用户初始信息
function initUserInfo(){
  var form = layui.form;
  var layer = layui.layer;
  $.ajax({
    method: 'GET',
    url:'/my/userinfo',
    success: function(res){
      if(res.status !== 0) {
        return layer.msg('请求失败');
      }
      // form.val() layui内置方法 可以给表单快速赋值 
      form.val('formUserInfo',res.data); 
      //上面这句话的意思是  把res.data的数据快速给带有lay-filter属性 属性值为formUserInfo 的表单进行赋值
    }
  })
}
