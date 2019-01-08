// 分页组件相关

const Selector = {
    JUMP: '.pagination-jump .pagination-input',
    NUMBER: '.pagination-number:not(.tip)',
    TIP: '.pagination-number.tip',
    NUMBERS: '.pagination-numbers',
    PREV: '.pagination-prev',
    NEXT: '.pagination-next',
    LENGTH: '.pagination-length',
    PAGINATE: '.pagination-paginate'
};

class Pagination {
    constructor(element, config) {

        this._length = config.length;
        this._totalPage = Math.floor(config.total / config.length);
        this._total = config.total;
        this._currentPage = 1;
        this._firstPage = 1;

        this._element = $(element);

        this._init();
    }

    _init() {

        // 添加分页模板
        this._setPaginationTmpl();

        // 添加事件监控器
        this._addEventListeners();

        // 需要用到的jq对象
        this._jump = $(Selector.JUMP);
        this._numbers = $(Selector.NUMBERS);
    }

    _addEventListeners() {

        let _this = this;

        // 点击切换分页
        this._element.on('click', Selector.NUMBER, function () {

            let $this = $(this);
            _this._currentPage = parseInt($this.text());
            _this._numbers.html(_this._setPaginateNumbers());
        });

        // 跳转到指定页
        this._element.on('change', Selector.JUMP, function () {

            let $this = $(this);
            let val = $this.val();

            if (!/\d/.test(val)) {

                alert('输入页码格式不对');
                return false;
            }

            if (parseInt(val) > _this._totalPage) {

                alert(`输入页码太大，请不要大于${_this._totalPage}`);
                return false;
            }

            if (parseInt(val) < _this._firstPage) {

                alert(`输入页码太小，请不要小于${_this._firstPage}`);
                return false;
            }

            _this._currentPage = parseInt(val);
            _this._numbers.html(_this._setPaginateNumbers());
        });

        // 上一页或下一页
        this._element.on('click', `${Selector.PREV}, ${Selector.NEXT}`, function () {

            if ($(this).hasClass('disabled')) return false;
            '<' == $(this).text() ? _this._currentPage-- : _this._currentPage++;
            _this._numbers.html(_this._setPaginateNumbers());
        });
    }

    _setPaginationTmpl() {

        this._element.append(`
            <span class="pagination-total">共 ${this._total} 条</span>
            ${this._setPaginationLength()}
            <div class="pagination-paginate">
                <span class="pagination-prev">&lt;</span>
                <ul class="pagination-numbers">
                    ${this._setPaginateNumbers()}
                </ul>
                <span class="pagination-next">&gt;</span>
            </div>
            <div class="pagination-jump">
                前往
                <input type="text" class="pagination-input" value="${this._currentPage}">
                页
            </div>
        `);

        this._setPrevAndNext();
    }

    _setPaginationLength() {

        let html = '<select name="" id="" class="pagination-length">';
        for (let i = 0; i < this._length; i++) {

            html += `<option value="${this._length[i]}">${this._length[i]}</option>`;
        }
        html += '</select>';

        return html;
    }

    _setPrevAndNext() {

        // 上一页
        this._firstPage == this._currentPage ? $(Selector.PREV).addClass('disabled') : $(Selector.PREV).removeClass('disabled');

        // 下一页
        this._totalPage == this._currentPage ? $(Selector.NEXT).addClass('disabled') : $(Selector.NEXT).removeClass('disabled');
    }

    _setPaginateNumbers() {

        this._setPrevAndNext();
        $(Selector.JUMP).val(this._currentPage);

        // 页数 <= 7 时
        if (this._totalPage <= 7) {

            return this._setPaginateNumbersTmpl(this._totalPage);
        }

        // 页数 > 8 且能在最中间显示的
        if (this._currentPage - this._firstPage >= 4 && this._totalPage - this._currentPage >= 4) {

            return this._setPaginateNumbersTmpl(this._setPages('center'));
        }

        // 页数 > 7 且在最左边显示
        if (this._currentPage - this._firstPage < 4) {

            return this._setPaginateNumbersTmpl(this._setPages('left'));
        }

        // 页数 > 7 且在最右边显示
        if (this._totalPage - this._currentPage < 4) {

            return this._setPaginateNumbersTmpl(this._setPages('right'));
        }
    }

    _setPages(site) {

        // 中
        if ('center' == site) {

            return [1, '...', this._currentPage - 2, this._currentPage - 1, this._currentPage, this._currentPage + 1, this._currentPage + 2, '...', this._totalPage];
        }

        // 左
        if ('left' == site) {

            return [1, 2, 3, 4, 5, 6, '...', this._totalPage];
        }

        // 右
        if ('right' == site) {

            return [1, '...', this._totalPage - 5, this._totalPage - 4, this._totalPage - 3, this._totalPage - 2, this._totalPage - 1, this._totalPage];
        }
    }

    _setPaginateNumbersTmpl(pages) {

        let tmpl = '';
        // 页码固定没有其它干扰项
        if ('number' == typeof pages) {

            for (let i = 0; i < pages; i++) {

                tmpl += `<li class="pagination-number ${i + 1 == this._currentPage ? 'active' : ''}">${i + 1}</li>`;
            }
            return tmpl;
        }

        // 按给定显示数组显示
        for (let i = 0; i < pages.length; i++) {

            let className = 'pagination-number';
            className += '...' == pages[i] ? ' tip' : '';
            className += this._currentPage == pages[i] ? ' active' : '';

            tmpl += `<li class='${className}'>${pages[i]}</li>`;
        }

        return tmpl;
    }

    static _jQueryInterface(config) {

        return new Pagination(this, config);
    }
}

$.fn.pagination = Pagination._jQueryInterface;
$.fn.pagination.Constructor = Pagination;

$('.pagination').pagination({
    total: 100,
    length: [10, 20, 30, 40, 50]
});