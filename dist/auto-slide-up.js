!function () {
    //添加offset类
    let specialTags = document.querySelectorAll('[data-x]');
    for (let i = 0; i < specialTags.length; i++) {
        specialTags[i].classList.add('offset');
    }

    //移除offset类
    setTimeout(function () {
        findClosestAndRemoveOffset();
    }, 0);
    window.addEventListener('scroll', function () {
        findClosestAndRemoveOffset();
    });

    //helper
    function findClosestAndRemoveOffset() {
        let specialTags = document.querySelectorAll('[data-x]');
        let minIndex = 0;
        for (let i = 1; i < specialTags.length; i++) {
            if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
                minIndex = i;
            }
        }
        //minIndex就是离屏幕窗口顶部最近的元素
        specialTags[minIndex].classList.remove('offset');
        let id = specialTags[minIndex].id;
        let a = document.querySelector('a[href="#' + id + '"]'); //根据元素id获取a标签
        let li = a.parentNode;
        let brothersAndMe = li.parentNode.children;
        for (let i = 0; i < brothersAndMe.length; i++) {
            brothersAndMe[i].classList.remove('highlight');
        }
        li.classList.add('highlight');
    }
}.call();