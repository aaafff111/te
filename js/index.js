window.onload = function() {
    var slider = document.getElementById("slider");
    var items = document.getElementsByClassName("item");
    var left = document.getElementById("left-btn");
    var right = document.getElementById("right-btn");
    var circles = document.getElementsByClassName("circle");
    var index = 0;
    var timer = null;

    // ===== 图片居中处理函数（备用方案） =====
    function centerImages() {
        var sliderWidth = 1200;
        var sliderHeight = 450;
        
        for (var i = 0; i < items.length; i++) {
            var img = items[i];
            
            // 如果图片已加载完成
            if (img.complete) {
                applyCenter(img, sliderWidth, sliderHeight);
            } else {
                // 等待图片加载完成
                img.onload = function() {
                    applyCenter(this, sliderWidth, sliderHeight);
                };
            }
        }
    }

    function applyCenter(img, width, height) {
        var imgWidth = img.naturalWidth;
        var imgHeight = img.naturalHeight;
        
        // 计算缩放比例（使用较大会保证覆盖整个容器）
        var ratioX = width / imgWidth;
        var ratioY = height / imgHeight;
        var ratio = Math.max(ratioX, ratioY);
        
        // 应用居中样式
        img.style.width = (imgWidth * ratio) + 'px';
        img.style.height = (imgHeight * ratio) + 'px';
        img.style.position = 'absolute';
        img.style.top = '50%';
        img.style.left = '50%';
        img.style.transform = 'translate(-50%, -50%)';
        img.style.objectFit = 'none'; // 禁用默认的object-fit
    }

    // 重置函数
    function reset() {
        for (var i = 0; i <= items.length - 1; i++) {
            items[i].style.opacity = 0;
            circles[i].style.backgroundColor = "dimgray";
        }
    }

    // 移动到下一张
    function move() {
        if (index > items.length - 1) {
            index = 0;
        }
        for (var i = 0; i <= items.length - 1; i++) {
            items[i].style.opacity = 0;
            circles[i].style.backgroundColor = "dimgray";
        }
        items[index].style.opacity = 1;
        circles[index].style.backgroundColor = "white";
        index++;
    }

    // 指示点点击事件
    function circleClick() {
        for (var i = 0; i <= circles.length - 1; i++) {
            circles[i].setAttribute("num", i);
            circles[i].onclick = function() {
                var j = parseInt(this.getAttribute("num"));
                reset();
                items[j].style.opacity = 1;
                circles[j].style.backgroundColor = "white";
                index = j;
            }
        }
    }

    // ===== 初始化 =====
    // 先处理图片居中
    centerImages();
    
    // 显示第一张
    move();
    
    // 自动播放
    timer = setInterval(move, 2000);
    
    // 鼠标悬停暂停
    slider.onmouseover = function() {
        clearInterval(timer);
    };
    
    // 鼠标离开继续
    slider.onmouseout = function() {
        timer = setInterval(move, 2000);
    };
    
    // 左箭头点击
    left.onclick = function() {
        index--;
        if (index < 0) {
            index = items.length - 1;
        }
        reset();
        items[index].style.opacity = 1;
        circles[index].style.backgroundColor = "white";
    };
    
    // 右箭头点击
    right.onclick = function() {
        move();
    };
    
    // 初始化指示点事件
    circleClick();
    
    // ===== 窗口调整时重新居中（可选） =====
    window.onresize = function() {
        centerImages();
    };
};