!function () {

    var view = document.querySelector('section.message')

    var controller = {
        view: null,
        messageList: null,
        init: function (view) {
            this.view = view
            this.messageList = view.querySelector('#messageList')
            this.myForm = view.querySelector('#postMessageForm')
            this.initAV()
            this.loadMessages()
            this.bindEvents()
        },
        initAV: function () {
            var APP_ID = 'YAfN7zEh3RzC9E2AaV6RWifr-gzGzoHsz';
            var APP_KEY = 'yRIGfz1brddLppELmYtR3zrD';
            AV.init({ appId: APP_ID, appKey: APP_KEY });
        },
        loadMessages: function () {
            var query = new AV.Query('Message');
            query.find()
                .then((messages) => {
                    let array = messages.map((item) => item.attributes)
                    array.forEach((item) => {
                        let li = document.createElement('li')
                        li.innerText = `${item.name}: ${item.content}`
                        this.messageList.appendChild(li)
                    })
                })
        },
        bindEvents: function () {           
            this.myForm.addEventListener('submit', function (e) {
                e.preventDefault()
            this.saveMessage()
            })
        },
        saveMessage: function () {
            let myForm = this.myForm
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
        }
    }







    controller.init(view)
}.call()
