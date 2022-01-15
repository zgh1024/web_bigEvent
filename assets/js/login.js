$(function(){
  // 点击 去注册账号 的链接
  $('#link_reg').on('click',function(){
    $('.login-box').hide();
    $('.reg-box').show();
  })
  // 点击 去登陆 链接
  $('#link_login').on('click',function(){
    $('.reg-box').hide();
    $('.login-box').show();
  })

  // 表单验证
  // 从 layui 获取 form 对象
  var form = layui.form;
  // 通过 form.varify() 函数自定义校验规则
  form.verify({
    // 自定义了一个叫做 pwd 的校验规则  ^开始符 $结束符  \s 所有的空格字符 \S 所有的除空格外的字符 {6，12} 6到12位
    pwd:[
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    // 校验两次密码是否一致
    repwd: function(value){
      // 通过 形参 拿到 确认密码框中的value
      // 还需要 拿到 密码框的内容
      // 将 两个值进行比较，如果一致 则符合规则
      // 如果失败 则 return 一个错误的提示消息
      
      var passwordValue = $('.reg-box [name=password]').val(); // [] 中括号 是属性选择器
      if(passwordValue !== value) {
        return '两次密码不一致';
      }
    }
  })

  // 监听注册表单提交事件
  $('#form_reg').on('submit',function(e){
    e.preventDefault(); // 阻止默认行为
    // 发起ajax POST 请求 ps：文章中要求的post
    $.post('/api/reguser',
    {
      username: $('.reg-box [name=username]').val(),
      password: $('.reg-box [name=password]').val()
    },
    function(res){
      console.log(res);
      if(res.status !== 0) {
        return console.log('注册失败');
      }
      console.log("注册成功");
    })
  })

   // 监听登录表单提交事件
   
   $('#form_login').on('submit',function(e){
    e.preventDefault(); // 阻止默认行为
    // 发起ajax POST 请求 ps：文章中要求的post
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function(res){
        if(res.status !== 0) {
          return layer.msg('登录失败！');
        }
        layer.msg('登录成功！');
        // 把 token 存到本地，token身份标识，大概算是个临时令牌
        localStorage.setItem('token', res.token); // 把res.token 就叫token保存到本地
        // console.log(res.token);
        location.href = '/index.html'
      }
    })
    
  })


















})