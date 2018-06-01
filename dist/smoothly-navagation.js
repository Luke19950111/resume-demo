!function () {
    var view = View('nav.menu');
    var controller = {
        view: null,
        init: function (view) {
            this.view = view;
            this.initAnimation();
            this.bindEvents();
        },
        initAnimation: function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },
        scrollToElement: function (top) {
            let currentTop = window.scrollY;
            let targetTop = top - 80;
            let s = targetTop - currentTop;
            var coords = { y: currentTop };
            var t = Math.abs(s / 100 * 300); //每100像素用时300ms
            if (t > 500) {
                t = 500;
            }
            var tween = new TWEEN.Tween(coords).to({ y: targetTop }, t).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
                window.scrollTo(0, coords.y);
            }).start();
        },
        bindEvents: function () {
            /*鼠标进入菜单动画*/
            let liTags = this.view.querySelectorAll('nav.menu>ul>li');
            for (let i = 0; i < liTags.length; i++) {
                liTags[i].onmouseenter = function (x) {
                    x.currentTarget.classList.add('active');
                };
                liTags[i].onmouseleave = function (x) {
                    x.currentTarget.classList.remove('active');
                };
            }

            /*平滑滚动到指定元素*/
            let aTags = this.view.querySelectorAll('nav.menu > ul > li > a');
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = x => {
                    x.preventDefault();
                    /*let a = x.currentTarget;
                    let href = a.getAttribute('href');
                    let element =document.querySelector(href);
                    let top = element.offsetTop;*/
                    let top = document.querySelector(x.currentTarget.getAttribute('href')).offsetTop; //以上四句
                    this.scrollToElement(top);
                };
            }
        }

    };

    controller.init(view);
}.call();