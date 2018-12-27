// 用到的轮播图的相关模块
const Selector = {
    BOX: '.carousel',
    INNER: '.carousel-inner',
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    ITEM_IMG: '.carousel-item img',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
};

// 轮播框大小
const Box = {
    WIDTH: $(Selector.BOX).width(),
    HEIGHT: $(Selector.BOX).height()
};

// 创建轮播图指示器
for (let i = 0; i < $(Selector.ITEM).length; i++) {

    $(Selector.INDICATORS).append(`<li class=${0 == i ? 'active' : ''} data-index='${i}'>${i + 1}</li>`)
}
$(Selector.INDICATORS).on('mouseover', 'li', function () {

    // 清除所有按钮的样式
    $(this).addClass('active').siblings('li').removeClass('active');

    // 切换到对应的图片
    let curIndex = this.getAttribute('data-index');
});

// 获取指定item的序号  从0开始
function getElementIndex(element) {

    let items = element && element.parentNode
        ? [].slice.call(element.parentNode.querySelectorAll(Selector.ITEM))
        : [];
    return items.indexOf(element);
}

// 下一页
$(".carousel-ctrlNext").on('click', function () {

    $(Selector.ACTIVE_ITEM).removeClass('active').next(Selector.ITEM).addClass('active');
    slide($(Selector.INNER)[0].offsetLeft, -getElementIndex($(Selector.ACTIVE_ITEM)[0]) * Box.WIDTH);
});

// 滚动到指定的轮播图 图片序号
function slide(cur, target) {

    // 装轮播图片的盒子
    let $inner = $(Selector.INNER);

    // 每次移动的距离
    let step = cur - target > 0 ? 10 : -10;

    // 切换轮播图的显示
    let timer = setInterval(() => {

        cur -= step;
        if (Math.abs(cur - target) > Math.abs(step)) {

            $inner.css('left', cur);
        } else {

            $inner.css('left', target);
            clearInterval(timer);
        }
    }, 10);
}