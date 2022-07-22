$(function(){
// 点击去注册账号的链接
$('#link_reg').on('click', function(){
    $('.login-box').hide();
    $('.reg-box').show();
})

// 点击去登录链接
$('#link_login').on('click', function(){
    $('.login-box').show();
    $('.reg-box').hide();
})

// 从layui中获取form对象  (只要导入了layui的js就会有form这个对象)
let form = layui.form
let layer = layui.layer
// 通过form.verify()函数来自定义校验规则
form.verify({
    // 自定义psw校验规则
    pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致
    repwd: function(value){
        // 通过形参拿到的是确认密码框的内容
        // 还需要拿到密码框的内容 再进行判断
        // 判断失败 则return一个错误提示框

// 属性选择器
      let pwd =  $('.reg-box [name=password]').val();
      if( pwd !== value){
        return '两次密码不一致';
      }
    }
  })

   // 监听注册表单的提交事件
   $('#form_reg').on('submit', function(e){
    //阻止表单的默认提交行为
    e.preventDefault();
    // data太长了 所以单独拿出来
    let data = {username: $('#form_reg [name=username]').val(), password:$('#form_reg [name=password]').val()}
    // 发起post请求
    $.post('/api/reguser',data,function(res){
      // #form_reg [name=password] 中间一定要有一个空格
      if(res.status !==0){
        // 用layer.msg方法 进行消息提示
        return layer.msg(res.message)
      }
      layer.msg('注册成功,请登录');
      console.log(res);
      // 模拟点击行为
      $('#link_login').click();
    })
  })

    // 使用接口发起登录功能
    // 监听登陆表单的提交事件
    $('#form_login').submit(function(e){
      e.preventDefault();
      // let data = {username:$('#form_login [name=username]').val(), password:$('#form_login [name=password]').val()}
     $.ajax({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function(res){
        if(res.status!==0){
          layer.msg('登陆失败')
        }
        layer.msg('登录成功');
        console.log(res.token);
        // 将登录成功的token保存到localstorage
        localStorage.setItem('token', res.token);
        // 调到后台主页
        location.href = '/index.html';
      }

     })
     
    
    })


})

