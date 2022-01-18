$(function(){
  let form = layui.form;
  let layer = layui.layer;

  form.verify({
    password: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    samePwd: function(value){
      let passwordValue = $('.layui-form [name=oldPwd]').val();
      if(value === passwordValue) {
        return '新旧密码一致！'
      }
    },
    rePwd: function(value) {
      let passwordValue = $('.layui-form [name=newPwd]').val();
      if(value !== passwordValue) {
        return '两次密码不一致！'
      }
    }
  });      

  $('.layui-form').on('submit',function(e){
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function(res){ 
        if(res.status !== 0) {
          console.log('密码更新失败！');
        }
        console.log('密码跟新成功！');
        // 重置密码
        $('.layui-form')[0].reset()
      }
    })
  })






})