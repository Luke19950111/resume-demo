var APP_ID = 'YAfN7zEh3RzC9E2AaV6RWifr-gzGzoHsz';
var APP_KEY = 'yRIGfz1brddLppELmYtR3zrD';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var query = new AV.Query('Message');
query.find()
    .then(function (messages) {
        let array = messages.map((item) => item.attributes)
        array.forEach((item) => {
            let li = document.createElement('li')
            li.innerText = `${item.name}: ${item.content}`
            let messageList = document.querySelector('#messageList')
            messageList.appendChild(li)
        })
    })



let myForm = document.querySelector('#postMessageForm')
myForm.addEventListener('submit', function (e) {
    e.preventDefault()
    let name = myForm.querySelector('input[name=name]').value 
    let content = myForm.querySelector('input[name=content]').value //content就是用户输入的信息

    var Message = AV.Object.extend('Message');
    var message = new Message();
    message.save({
        name: name,
        content: content
    }).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.appendChild(li) //提交成功，直接在页面添加一个li，不再刷新页面
        myForm.querySelector('input[name=content]').value = ''
    })
})
/*
//创建TestObject表
var TestObject = AV.Object.extend('TestObject');
//在表中创建一行数据
var testObject = new TestObject();
//数据内容是 words: 'Hello World!' 保存
//如果保存成功，运行 alert''
testObject.save({
  words: 'Save World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})
*/
