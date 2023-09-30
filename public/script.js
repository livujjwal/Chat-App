
var socket = io();
let username ='';
const userForm = document.querySelector('.form');
const usernameTag = document.getElementById('user_name')
const btn = document.getElementById('join_chat');
const chatroom = document.querySelector('.chatroom_coantainer')

const msgInput = document.querySelector('#massage_input')
const sendBtn = document.querySelector('#massage_input_btn')


btn.addEventListener('click',(event) => {
    event.preventDefault();
    username = usernameTag.value;
    console.log(username);
    if(username){
        userForm.style.display = 'none';
        chatroom.style.display = 'block';
    }
})

sendBtn.addEventListener('click', (event) => {
event.preventDefault();
let data = {
    id: socket.id,
    username: username,
    massage: msgInput.value
}
socket.emit('massage',data)
appendMassage(data,'sent')
})

socket.on('massage',(data) => {
 if(data.id !== socket.id)
 {
    appendMassage(data,'recived');
 }
})

function appendMassage(data,type){
    const massageDisplay = document.querySelector('.massage_display');
    const msg = document.createElement('div')
    if(type === 'sent'){
        msg.innerHTML = `<p class="massage sent"> ${data.massage}</p>`;
    }else{
        msg.innerHTML = `<p class="massage">${data.username} : ${data.massage}</p>`
    }
    massageDisplay.append(msg);
    msgInput.value = '';
}