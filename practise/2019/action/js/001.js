// 分页组件相关

const Selector = {
    JUMP: '.pagination-jump .pagination-input',
    NUMBER: '.pagination-number',
    PREV: '.pagination-prev',
    NEXT: '.pagination-next',
    TOTAL: '.pagination-total',
    LENGTH: '.pagination-length',
    PAGINATE: '.pagination-paginate'
};

const ClassName = {
    ACTIVE: 'active',
    DISABLED: 'disabled',
    TIP: 'tip'
};

class Pagination {
    constructor(element, config) {

        this._totalPage = config.totalPage;
        this._length = config.length;

        this._element = $(element);
        this._jump = $(Selector.JUMP);
        this._prev = $(Selector.PREV);
        this._next = $(Selector.NEXT);
        this._total = $(Selector.TOTAL);

        console.log(this._element);
    }

    _init() {

        this._currentPage = 1;
    }

    _addEventListeners() {


    }

    static _jQueryInterface(config) {

        return new Pagination(this, config);
    }
}

$.fn.pagination = Pagination._jQueryInterface;
$.fn.pagination.Constructor = Pagination;

$('.pagination').pagination({
    totalPage: 100,
    length: 10
});