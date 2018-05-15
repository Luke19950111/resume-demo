window.Model = function(options){
    let resourceName = options.resourceName
    return {
        //数据都是来自leanCloud，所以初始化leanCloud可以放在模板中
        init: function () {
            var APP_ID = 'YAfN7zEh3RzC9E2AaV6RWifr-gzGzoHsz';
            var APP_KEY = 'yRIGfz1brddLppELmYtR3zrD';
            AV.init({ appId: APP_ID, appKey: APP_KEY });
        },
        //获取数据
        fetch: function () {
            var query = new AV.Query(resourceName);
            return query.find() //Promise对象      
        },
        //新建数据
        save: function (object) {
            var X = AV.Object.extend(resourceName);
            var x = new X();
            return x.save( //Promise对象
                object
            )
        }
    }
}