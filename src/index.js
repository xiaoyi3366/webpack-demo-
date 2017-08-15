var messages=require('./messages'); 
var newMessage=()=>('<p>'+messages.hi +'，'+ messages.event+"</p>"); 
var app=document.getElementById('app'); 
app.innerHTML=newMessage(); 
if(module.hot){//启用热重载 
module.hot.accept(); 
}