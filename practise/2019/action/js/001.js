// 分页组件相关

const Selector = {
    JUMP: '.pagination-jump .pagination-input',
    NUMBER: '.pagination-number',
    NUMBERS: '.pagination-numbers',
    PREV: '.pagination-prev',
    NEXT: '.pagination-next',
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

        this._length = config.length + ' 条/页';
        this._totalPage = Math.floor(config.total / config.length);
        this._total = config.total;
        this._currentPage = 1;

        this._element = $(element);

        this._init();
    }

    _init() {

        // 添加分页模板
        this._setPaginationTmpl();

        // 需要用到的jq对象
        this._jump = $(Selector.JUMP);
        this._prev = $(Selector.PREV);
        this._next = $(Selector.NEXT);
        this._numbers = $(Selector.NUMBERS);
        this._number = $(Selector.NUMBER);
    }

    _addEventListeners() {


    }

    _setPaginationTmpl() {

        this._element.append(`
            <span class="pagination-total">共 ${this._total} 条</span>
            <select name="" id="" class="pagination-length">
                <option>${this._length}</option>
            </select>
            <div class="pagination-paginate">
                <span class="pagination-prev disabled">&lt;</span>
                <ul class="pagination-numbers">
                    <li class="pagination-number active">1</li>
                    <li class="pagination-number">2</li>
                    <li class="pagination-number tip">...</li>
                    <li class="pagination-number">${this._totalPage}</li>
                </ul>
                <span class="pagination-next">&gt;</span>
            </div>
            <div class="pagination-jump">
                前往
                <input type="text" class="pagination-input" value="${this._currentPage}">
                页
            </div>
        `);
    }

    _setPaginateNumbers() {

        this._paginateNumbersTmpl = '';

        // 页数<=7时
        if (this._totalPage <= 7) {

            for (let i = 0; i < this._totalPage; i++) {

                this._paginateNumbersTmpl += `<li class="pagination-number active">${i + 1}</li>`;
            }
        }

        //
    }

    static _jQueryInterface(config) {

        return new Pagination(this, config);
    }
}

$.fn.pagination = Pagination._jQueryInterface;
$.fn.pagination.Constructor = Pagination;

$('.pagination').pagination({
    total: 100,
    length: 10
});