$(function(){
    // 调用获取用户基本信息
    getUserInfo()

})

// 点击退出按钮 实现页面退出 重新回到登录页面
$('#btnLogout').on('click', function(res){
    // 弹出提示框
    let layer = layui.layer;
// 获取用户的基本信息
layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
    //do something
    // 清除本地存储中的token
    localStorage.removeItem('token')
    // 重新跳转登录页
    location.href = '/login.html';
    // 关闭confirm询问框
    layer.close(index)

  });

})

function getUserInfo(){
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers是请求头配置对象
        // headers: 
        // {
        // Authorization: localStorage.getItem('token') || ''},
        success: function(res){
            if(res.status !== 0){
               return  layui.layer.msg('请求失败');
            }
            // 定义一个渲染头像的函数
            renderAvatar(res.data);

        }
        // 优化 写到baseAPI中 全局挂载
        // 无论成功与否都会调用complete回调,使用res.responseJSON 可以拿到服务器响应回来的数据
        // complete:function(res){
        //     // console.log('ok');
        //     // console.log(res);
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //     //    强制清空token
        //     // 回到登录页面

        //      // 清除本地存储中的token
        //     localStorage.removeItem('token')
        //     // 重新跳转登录页
        //     location.href = '/login.html';
        //     }

        // }
    })
}

// 渲染头像
function renderAvatar(user){
    // 1. 获取用户的名称
    let name = user.nickname || user.username;
    // 设置欢迎的文字
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3. 按需渲染用户的头像
    if(user.user_pic !== null){
        // 渲染图片头像
        $('.layui-nav-img').attr('src', uesr.user_pic).show();
    }else{
        // 如果没有图片头像就渲染文本
    $('.layui-nav-img').hide();
    // name是一个字符串
    let first = name[0].toUpperCase();
    $('.text-avatar').html(first).show();

    }
    

}