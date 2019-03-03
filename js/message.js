!function () {

    var APP_ID = 'rQhQ70xKATpQ9h4zSmxzXYMF-gzGzoHsz';
    var APP_KEY = '3Xv7NyJWxgNKagsufQ6f4bt3';
    AV.init({ appId: APP_ID, appKey: APP_KEY });
    
    
    let view = document.querySelector('#siteMessage')
    fetch()
    
    view.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
        var name = view.querySelector('input[name="name"]').value
        var content = view.querySelector('textarea[name="content"]').value
        
        let message = new (AV.Object.extend('message'))()
        message.save({
            name: name,
            content: content
        }).then(function (obj) {
            view.querySelector('input[name="name"]').value = ''
            view.querySelector('textarea[name="content"]') = ''
            var li = document.createElement('li')
            li.textContent = obj.attributes.name + ': ' + obj.attributes.content
            messageList.append(li)
        })
    })
    
    function fetch() {
        let query = new AV.Query('message')
        query.find().then(function (objects) {
            let messages = objects.map(item => item.attributes)
            messageList = view.querySelector('ol.messageList')
            messages.forEach(item => {
                var li = document.createElement('li')
                li.textContent = item.name + ': ' + item.content
                messageList.append(li)
            })
        })
    }

}.call()