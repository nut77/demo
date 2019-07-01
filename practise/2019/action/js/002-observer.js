// 所有观察者容器
class Dep {
    constructor() {

        this.subs = [];
    }
    addSub(sub) {

        this.subs.push(sub);
    }
    notify() {

        this.subs.forEach(sub => sub.update());
    }
}
Dep.target = null;

// 观察者
class Observer {
    constructor(data) {

        this.data = data;
        this.walk(data);
    }

    walk(data) {

        Object.keys(data).forEach(key => this.defineReactive(data, key, data[key]));
    }

    defineReactive(data, key, val) {

        observe(val); // 递归遍历所有子属性
        let dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function () {

                if (Dep.target) dep.addSub(Dep.target);
                return val;
            },
            set: function (newVal) {

                if (val === newVal) return;
                val = newVal;
                console.log(`属性${key}已经被监听了，现在值为：${newVal}`);

                dep.notify(); // 如果数据变化，通知所有订阅者
            }
        });
    }
}

function observe(value) {

    if (!value || 'object' !== typeof value) return;
    return new Observer(value);
}
