// 用到的轮播图的相关模块
const Selector = {
    BOX: '.carousel',
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

// 轮播