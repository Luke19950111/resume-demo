!function () {

    var view = View('section.message');

    var model = Model({ resourceName: 'Message' });

    var controller = Controller({
        init: function (view, model) {
            this.messageList = view.querySelector('#messageList');
            this.myForm = view.querySelector('#postMessageForm');
            this.loadMessages();
        },
        loadMessages: function () {
            this.model.fetch().then(messages => {
                let array = messages.map(item => item.attributes);
                array.forEach(item => {
                    let li = document.createElement('li');
                    li.innerText = `${item.name}: ${item.content}`;
                    this.messageList.appendChild(li);
                });
            });
        },
        bindEvents: function () {

            this.myForm.addEventListener('submit', e => {
                e.preventDefault();
                this.saveMessage();
            });
        },
        saveMessage: function () {
            let myForm = this.myForm;
            let name = myForm.querySelector('input[name=name]').value;
            let content = myForm.querySelector('input[name=content]').value; //content就是用户输入的信息
            this.model.save({ name: name, content: content }).then(function (object) {
                let li = document.createElement('li');
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`;
                let messageList = document.querySelector('#messageList');
                messageList.appendChild(li); //提交成功，直接在页面添加一个li，不再刷新页面
                myForm.querySelector('input[name=content]').value = '';
            });
        }

    });

    // var model = {
    //     init: function () {
    //         var APP_ID = 'YAfN7zEh3RzC9E2AaV6RWifr-gzGzoHsz';
    //         var APP_KEY = 'yRIGfz1brddLppELmYtR3zrD';
    //         AV.init({ appId: APP_ID, appKey: APP_KEY });
    //     },
    //     //获取数据
    //     fetch: function () {
    //         var query = new AV.Query('Message');
    //         return query.find() //Promise对象      
    //     },
    //     //新建数据
    //     save: function (name, content) {
    //         var Message = AV.Object.extend('Message');
    //         var message = new Message();
    //         return message.save({ //Promise对象
    //             name: name,
    //             content: content
    //         })
    //     }
    // }


    // var controller = {
    //     view: null,
    //     model: null,
    //     messageList: null,
    //     init: function (view, model) {
    //         this.view = view
    //         this.model = model
    //         this.messageList = view.querySelector('#messageList')
    //         this.myForm = view.querySelector('#postMessageForm')
    //         this.model.init()
    //         this.loadMessages()
    //         this.bindEvents()
    //     },

    //     loadMessages: function () {
    //         this.model.fetch()
    //             .then((messages) => {
    //                 let array = messages.map((item) => item.attributes)
    //                 array.forEach((item) => {
    //                     let li = document.createElement('li')
    //                     li.innerText = `${item.name}: ${item.content}`
    //                     this.messageList.appendChild(li)
    //                 })
    //             })
    //     },
    //     bindEvents: function () {

    //         this.myForm.addEventListener('submit', (e) => {
    //             e.preventDefault()
    //             this.saveMessage()
    //         })
    //     },
    //     saveMessage: function () {
    //         let myForm = this.myForm
    //         let name = myForm.querySelector('input[name=name]').value
    //         let content = myForm.querySelector('input[name=content]').value //content就是用户输入的信息
    //         this.model.save({ name: name, content: content })
    //             .then(function (object) {
    //                 let li = document.createElement('li')
    //                 li.innerText = `${object.attributes.name}: ${object.attributes.content}`
    //                 let messageList = document.querySelector('#messageList')
    //                 messageList.appendChild(li) //提交成功，直接在页面添加一个li，不再刷新页面
    //                 myForm.querySelector('input[name=content]').value = ''
    //             })
    //     }
    // }

    controller.init(view, model);
}.call();