// 每次先调用$.get() $.post() $.ajax()的时候 
// 会先调用这个函数
// 拿到这个函数中，可以拿到我们给Ajax提供的配置对象 

$.ajaxPrefilter(function(option){
    // 拼接根路径
    option.url='http://www.liulongbin.top:3007'+ option.url;
    console.log(option.url);
 })