// 每次先调用$.get() $.post() $.ajax()的时候 
// 会先调用这个函数
// 拿到这个函数中，可以拿到我们给Ajax提供的配置对象 

$.ajaxPrefilter(function(option){
    // 拼接根路径
    option.url='http://www.liulongbin.top:3007'+ option.url;
    //  统一为有权限的接口设置headers
  if(option.url.indexOf('/my/')!== -1){
    option.headers = {
        Authorization: localStorage.getItem('token') || ''
    }

    }

    // 全局统一挂载complete函数
    option.complete = function(res){
      if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //    强制清空token
        // 回到登录页面

         // 清除本地存储中的token
        localStorage.removeItem('token')
        // 重新跳转登录页
        location.href = '/login.html';
        }
    }
   
 })



    
  