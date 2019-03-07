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

                // 先建立文本片段 (document fragment) -> 將元素 (element) 加入文本片段中 -> 再將文本片段加入 DOM 樹中。
                // 正因為文本片段是存在内存中，不是 DOM 树的一部分，增加子元素并不會导致网页重刷 (reflow)(重新计算元素的位置和几何)。
                // 因此采用文本片段通常会有比较好的性能表现
                let fragment = document.createDocumentFragment()
                messages.forEach(item => {
                    var li = document.createElement('li')
                    li.textContent = item.name + ': ' + item.content
                    fragment.append(li)
                })
                messageList.append(fragment)
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