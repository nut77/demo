// 解析器

class Compile {
    constructor(el, vm) {

        this.vm = vm;
        this.el = document.querySelector(el);
        this.fragment = null;
        this.init();
    }

    init() {

        if (this.el) {

            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        } else {

            console.log('DOM元素不存在');
        }
    }

    nodeToFragment(el) {

        let fragment = document.createDocumentFragment();
        let child = el.firstChild;
        while (child) {

            // 将dom移入fragment中
            fragment.appendChild(child);
            child = el.firstChild;
        }

        return fragment;
    }

    compileElement(el) {

        let childNodes = el.childNodes;
        [].slice.call(childNodes).forEach(node => {

            let reg = /\{\{(.*)\}\}/;
            let text = node.textContent;

            if (3 === node.nodeType && reg.test(text)) {

                this.compileText(node, reg.exec(text)[1]);
            }

            if (node.childNodes && node.childNodes.length) {

                this.compileElement(node);
            }
        });
    }

    compileText(node, exp) {

        let initText = this.vm[exp];
        this.updateText(node, exp, initText);
        new Watcher(this.vm, exp, value => {

            this.updateText(node, exp, value);
        });
    }

    updateText(node, exp, value) {

        value = 'undefined' === typeof value ? '' : value;
        // node.textContent = node.textContent.replace(`{{${exp}}}`, value);
        node.textContent = value;
    }
}
