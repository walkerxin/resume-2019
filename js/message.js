!function () {
    
    let view = document.querySelector('#siteMessage')
    
    let model = {
        init() {
            var APP_ID = 'rQhQ70xKATpQ9h4zSmxzXYMF-gzGzoHsz';
            var APP_KEY = '3Xv7NyJWxgNKagsufQ6f4bt3';
            AV.init({ appId: APP_ID, appKey: APP_KEY });
        },
        fetch() {
            let query = new AV.Query('message')
            return query.find()
        },
        save: (name, content) => {
            let message = new (AV.Object.extend('message'))()
            return message.save({
                name: name,
                content: content
            })
        }
    }

    let controller = {
        view: null,
        model: null,
        init(view, model) {
            this.view = view
            this.model = model
            this.model.init()
            this.showMessage()
            this.bindEvents()
        },
        bindEvents() {
            view.querySelector('form').addEventListener('submit', (e) => {
                e.preventDefault()
                this.saveMessage()
            })
        },
        showMessage() {
            this.model.fetch().then(function (objs) {
                let messages = objs.map(item => item.attributes)
                
                messageList = view.querySelector('ol.messageList')
                while(messageList.children.length > 0) {
                    messageList.removeChild(messageList.children[0])
                }

                messages.forEach(item => {
                    var li = document.createElement('li')
                    li.textContent = item.name + ': ' + item.content
                    messageList.append(li)
                })
            })
        },
        saveMessage() {
            var name = view.querySelector('input[name="name"]').value
            var content = view.querySelector('textarea[name="content"]').value
            this.model.save(name, content).then((obj) => {
                this.showMessage()
            })
        }
    }

    controller.init(view, model)
            

}.call()