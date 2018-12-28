// 用到的轮播图的相关模块
const Selector = {
    BOX: '.carousel',
    INNER: '.carousel-inner',
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT: '.carousel-ctrlNext',
    PREV: '.carousel-ctrlPrev',
    INDICATORS: '.carousel-indicators',
};

// 轮播框大小
const Box = {
    WIDTH: $(Selector.BOX).width(),
    HEIGHT: $(Selector.BOX).height()
};

// 相关类名
const ClassName = {
    ACTIVE : 'active'
};

// 方向
const Direction = {
    NEXT: 'next',
    PREV: 'prev'
};

class Carousel {
    constructor(selector, config) {

        this._isPaused = false;
        this._interval = null;
        this._activeElement = $(Selector.ACTIVE_ITEM);
        this._targetElement = null;
        this._element = $(selector);
        this._inner = $(Selector.INNER);
        this._indicatorsElement = $(Selector.INDICATORS);

        this._init();
    }

    pause() {

        this._isPaused = true;
        clearInterval(this._interval);
        this._inner.stop(true, true);
    }

    cycle() {

        this._isPaused = false;
        if (this._interval) {

            // 重新开始轮播时 要重新更新定时器 不然显示有误差，因为有多个定时器存在
            clearInterval(this._interval);
            this._interval = null;
        }
        this._interval = setInterval(() => this._slide('next'), 2000);
    }

    _init() {

        // 将最后一项放到第一项
        this._inner.find(Selector.ITEM).last().prependTo(this._inner);
        this._addEventListeners();
        this.cycle();
    }

    _addEventListeners() {

        // 下一页
        $(Selector.NEXT).on('click', () => this._slide('next'));

        // 上一页
        $(Selector.PREV).on('click', () => this._slide('prev'));

        // 鼠标移入轮播暂停
        $(Selector.BOX).on('mouseenter', () => this.pause());

        // 鼠标移除轮播继续
        $(Selector.BOX).on('mouseleave', () => this.cycle());

        // 指示器点击时 切换到对应的图片
        $(Selector.INDICATORS).on('click', 'li', event => this._slide('', $(event.target)));
    }

    _getActiveItemIndex() {

        return this._activeElement.data('index');
    }

    _getTargetItemIndex($indicator = null, direction = 'next') {

        if ($indicator) {

            return $indicator.data('index');
        } else {

            let itemsLength = $(Selector.ITEM).length;
            let index = Direction.NEXT == direction ? this._getActiveItemIndex() + 1 : this._getActiveItemIndex() - 1;
            itemsLength == index && (index = 0);
            -1 == index && (index = 5);
            return index;
        }
    }

    _setActiveIndicatorElement() {

        this._indicatorsElement
            .find(Selector.ACTIVE).removeClass(ClassName.ACTIVE)
            .end()
            .find(`[data-index='${this._getActiveItemIndex()}']`).addClass(ClassName.ACTIVE);
    }

    // $indicator 只有通过指示器改变轮播图才会用到
    _slide(direction = 'next', $indicator = null) {

        // 当轮播图开始滚动时 得到当前项和需要滚动到的指定目标项
        this._activeElement = $(Selector.ACTIVE_ITEM);
        this._targetElement = this._inner.find(`${Selector.ITEM}[data-index='${this._getTargetItemIndex($indicator, direction)}']`);

        // 根据方向 将targetElement插入到对应的位置
        direction = this._getTargetItemIndex($indicator) > this._getActiveItemIndex() ? 'next' : 'prev';
        Direction.NEXT == direction
            ? this._targetElement.insertAfter(this._activeElement)
            : this._targetElement.insertBefore(this._activeElement);

        // 需要将目标项显示出来
        this._targetElement.addClass('active');

        // prev和next分别操作不同的方向
        if (Direction.NEXT == direction) {

            // 将第一项放到最后一项
            this._inner.find(Selector.ITEM).first().appendTo(this._inner);
        } else {

            // 将最后一项放到第一项，原始的盒子inner的left需要修改
            this._inner.find(Selector.ITEM).last().prependTo(this._inner);
            this._inner.css('left', -Box.WIDTH);
        }

        // 切换轮播图的显示
        this._inner.animate({
            left: Direction.NEXT == direction ? -Box.WIDTH : 0
        }, 600, 'linear',() => {

            // 轮播图切换成功后的操作
            this._activeElement.removeClass('active');
            this._activeElement = this._targetElement;
            this._inner.css('left', 0)

            // 修改对应的指示器
            this._setActiveIndicatorElement();
        });
    }
}

new Carousel(Selector.BOX);