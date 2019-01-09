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
        this._pageLength = config.length[0];
        this._totalPage = Math.ceil(config.total / this._pageLength);
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
        this._numbers = $(Selector.NUMBERS);

        // 设置上一页、下一页
        this._setPrevAndNext();
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

            if (!/^\d+$/g.test(val)) return alert('输入页码格式不对');

            if (parseInt(val) > _this._totalPage) return alert(`输入页码太大，请不要大于${_this._totalPage}`);

            if (parseInt(val) < _this._firstPage) return alert(`输入页码太小，请不要小于${_this._firstPage}`);

            _this._currentPage = parseInt(val);
            _this._numbers.html(_this._setPaginateNumbers());
        });

        // 上一页或下一页
        this._element.on('click', `${Selector.PREV}, ${Selector.NEXT}`, function () {

            if ($(this).hasClass('disabled')) return false;
            '<' == $(this).text() ? _this._currentPage-- : _this._currentPage++;
            _this._numbers.html(_this._setPaginateNumbers());
        });

        // 更改分页大小
        this._element.on('change', Selector.LENGTH, function () {

            _this._pageLength = parseInt(this.value);
            _this._totalPage = Math.ceil(_this._total / _this._pageLength);
            _this._currentPage = _this._currentPage > _this._totalPage ? _this._totalPage : _this._currentPage;
            _this._numbers.html(_this._setPaginateNumbers());
        });
    }

    // 分页组件模板
    _setPaginationTmpl() {

        this._element.append(`
            <span class="pagination-total">共 ${this._total} 条</span>
            <select name="" id="" class="pagination-length">
                ${this._setPaginationLength()}
            </select>
            <div class="pagination-paginate">
                <span class="pagination-prev">&lt;</span>
                <ul class="pagination-numbers">
                    ${this._setPaginateNumbers()}
                </ul>
                <span class="pagination-next">&gt;</span>
            </div>
            <div class="pagination-jump">
                前往
                <input type="text" class="pagination-input" value="${this._currentPage}" min="${this._firstPage}" max="${this._totalPage}">
                页
            </div>
        `);
    }

    // 设置分页组件 分页大小
    _setPaginationLength() {

        let html = '';
        for (let i = 0; i < this._length.length; i++) {

            html += `<option value="${this._length[i]}">${this._length[i]} 条/页</option>`;
        }

        return html;
    }

    // 设置分页组件 上一页和下一页的状态
    _setPrevAndNext() {

        // 上一页
        this._firstPage == this._currentPage ? $(Selector.PREV).addClass('disabled') : $(Selector.PREV).removeClass('disabled');

        // 下一页
        this._totalPage == this._currentPage ? $(Selector.NEXT).addClass('disabled') : $(Selector.NEXT).removeClass('disabled');
    }

    // 设置分页组件 页码
    _setPaginateNumbers() {

        this._setPrevAndNext();
        $(Selector.JUMP).val(this._currentPage);

        // 总页数 <= 7 时
        if (this._totalPage <= 7) {

            return this._setPaginateNumbersTmpl(this._totalPage);
        }

        // 总页数 > 8 且能在最中间显示的
        if (this._currentPage - this._firstPage >= 4 && this._totalPage - this._currentPage >= 4) {

            return this._setPaginateNumbersTmpl(this._setPages('center'));
        }

        // 总页数 > 7 且在最左边显示
        if (this._currentPage - this._firstPage < 4) {

            return this._setPaginateNumbersTmpl(this._setPages('left'));
        }

        // 总页数 > 7 且在最右边显示
        if (this._totalPage - this._currentPage < 4) {

            return this._setPaginateNumbersTmpl(this._setPages('right'));
        }
    }

    // 通过当前页的显示位置 确定最终显示的页码
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

    // 通过具体要显示的页码数组 组合成最终显示的页面模板（html）
    _setPaginateNumbersTmpl(pages) {

        let tmpl = '';
        // 页码固定没有其它干扰项（总页数 <= 7）
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

    // 分页组件的jquery接口
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