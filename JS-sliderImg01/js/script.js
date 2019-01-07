//封装一个代替getElementById()的方法
function byId(id) {
    return typeof(id) === "string" ? document.getElementById(id) : id;
}

//全局变量
var index = 0, //！！！所有的操作的在控制index的值,来让图片轮播
    timer = null,
    pics = byId("banner").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("span"),
    main = byId("main"),
    len = pics.length,
    prev = byId("prev"),
    next = byId("next"),
    menu = byId("menu-content"),
    menuItems = menu.getElementsByClassName("menu-item"),
    subMenu = byId("sub-menu"),
    subItems = subMenu.getElementsByClassName("inner-box");

//停止轮播
function stopAutoMove() {
    if (timer) clearInterval(timer);
}

//开始轮播
function startAutoMove() {
    timer = setInterval(function() {
        index++;
        if (index >= len) index = 0;
        //调用切换图片函数
        changeImg();
    }, 3000);
}

//切换图片
function changeImg() {
    //遍历banner下所有的div,将其隐藏
    //同时遍历 dots下所有的span,将其隐藏
    for (var i = 0; i < len; i++) {
        dots[i].className = "";
        pics[i].style.display = "none";
    }
    //根据index索引找到当前div,将其显示 
    //当前圆点的class激活
    dots[index].className = "active";
    pics[index].style.display = "block";
}

//主函数
function sliderImg() {
    //滑过定时器,离开继续
    main.onmouseover = function() {
        stopAutoMove();
    };

    main.onmouseout = function() {
        startAutoMove();
    };
    //自动在main上触发鼠标离开的事件
    main.onmouseout();
    //遍历虽有圆点,绑定事件,点击圆点来切换图片
    for (var d = 0; d < len; d++) {
        dots[d].id = d;
        dots[d].onclick = function() {
            //让index为当前span的索引
            index = this.id;
            //调用切换图片函数
            changeImg();
        };
    }
    //下一张
    next.onclick = function() {
        index++;
        if (index >= len) index = 0;
        changeImg();
    }
    // 上一张
    prev.onclick = function() {
        index--;
        if (index < 0) index = len - 1;
        changeImg();
    }
    //导航菜单
    //遍历主菜单,且绑定事件
    for (var m = 0; m < menuItems.length; m++) {
        //给每一个menu-item添加data-index属性,作为索引
        menuItems[m].setAttribute("data-index", m);
        menuItems[m].onmouseover = function() {
            subMenu.className = "sub-menu";
            var idx = this.getAttribute("data-index");
            //遍历所有子菜单,将每一个都隐藏
            for (var n = 0; n < subItems.length; n++) {
                subItems[n].style.display = "none";
                menuItems[n].style.background = "none";
            }
            subItems[idx].style.display = "block";
            menuItems[idx].style.background = "rgba(0,0,0,0.1)";
        };
    }

    subMenu.onmouseover = function() {
        this.className = "sub-menu";
    };

    subMenu.onmouseout = function() {
        this.className = "sub-menu hide";
    }

}
sliderImg();