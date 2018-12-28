// 用到的轮播图的相关模块
const Selector = {
    BOX: '.carousel',
    INNER: '.carousel-inner',
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    ITEM_IMG: '.carousel-item img',
    NEXT: '.carousel-item-next',
    PREV: '.carousel-item-prev',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
};

// 轮播框大小
const Box = {
    WIDTH: $(Selector.BOX).width(),
    HEIGHT: $(Selector.BOX).height()
};

/*var timer = setInterval(() => {

    let $cur = $(Selector.ACTIVE_ITEM);
    let $target = $cur.next(Selector.ITEM);
    slide($cur, $target, 'next');
}, 2000);
console.log(timer);

setTimeout(function () {

    clearInterval(timer);
    console.log(timer);
}, 4000);*/

// 创建轮播图指示器
$(Selector.INDICATORS).on('mouseover', 'li', function () {

    // 清除所有按钮的样式
    $(this).addClass('active').siblings('li').removeClass('active');


});

// 下一页
$(".carousel-ctrlNext").on('click', function () {

    let $cur = $(Selector.ACTIVE_ITEM);
    let $target = $cur.next(Selector.ITEM);
    slide($cur, $target, 'next');
});

// 把最后一张轮播图放在第一个
$(Selector.INNER).find(Selector.ITEM).last().prependTo($(Selector.INNER));

// 上一页
$(".carousel-ctrlPrev").on('click', function () {

    let $cur = $(Selector.ACTIVE_ITEM);
    let $target = $cur.prev(Selector.ITEM);

    slide($cur, $target, 'prev');
});

// 滚动到指定的轮播图 图片序号
function slide($cur, $target, dir) {

    // 装轮播图片的盒子
    let $inner = $(Selector.INNER);
    $target.addClass('active');

    if ('prev' == dir) {

        $(Selector.INNER).find(Selector.ITEM).last().prependTo($(Selector.INNER));
        $inner.css('left', -Box.WIDTH);
    } else {

        $(Selector.INNER).find(Selector.ITEM).first().appendTo($(Selector.INNER));
    }

    // 切换轮播图的显示
    $inner.animate({
        left: 'next' == dir ? -Box.WIDTH : 0
    }, 600, 'linear',() => {

        // 对应的指示器也要在一定的更改


        $cur.removeClass('active');
        $inner.css('left', 0)
    });
}