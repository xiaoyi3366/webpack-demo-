import face from './face'; 
import content from './content'; 
var newMessage=()=>(
` <p>${face} ${content}</p>`
); 
var app=document.getElementById('app'); 
app.innerHTML=newMessage(); 
if(module.hot){//启用热重载 
module.hot.accept(); 
}