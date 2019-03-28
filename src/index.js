import Vue from "vue"
export default {
  install: function (Vue, options) {
    Vue.mixin({
      data() {
        return {
          ComponentsMediator: {
            _events: {

            },
            _msgs: {

            }
          }
        }
      },
      methods: {
        ComponentsMediatorRegister(item) {
          try {
            console.log("register---start:",item.type);
          } catch (error) {
            
          }
          if (this.ComponentsMediator._msgs[item.type]) {
            this.ComponentsMediator._msgs[item.type][item.uid + ""] = item.fn;
          } else {
            this.ComponentsMediator._msgs[item.type] = {}
            this.ComponentsMediator._msgs[item.type][item.uid + ""] = item.fn;
          }
        },
        ComponentsMediatorSend(type, ...param) {
          if (this.ComponentsMediator._msgs && this.ComponentsMediator._msgs[type]) {
            Object.keys(this.ComponentsMediator._msgs[type]).forEach(i => {
              console.log("send---start---",type);
              this.ComponentsMediator._msgs[type][i] && this.ComponentsMediator._msgs[type][i](...param)
            });
          }


        },
        ComponentsMediatorRM(uid) {
          Object.keys(this.ComponentsMediator._msgs).forEach(i => {
            delete this.ComponentsMediator._msgs[i][uid]
          });

        },
        /**
         *
         */
        createComponentsMediator() {
          //创建命名空间
          this.CM$on('register', this.ComponentsMediatorRegister)
          this.CM$on('send', this.ComponentsMediatorSend)
          this.CM$on('rm', this.ComponentsMediatorRM)
        },
        /**
         * 触发已经注册在本级，及其以上的已经注册到组件中介对像(ComponentsMediator)的事件关按相应要求传入参数
         * @description 事件将逐级向上直到找到注册事件，或是到root层结束保持无状态、无触发
         * @description 目前只会触发匹配到的第一个方法！
         * @param {vNode} context 当前节点
         * @param {String} type 匹配事件名称
         * @param {any} item 根据不同的要求实现，传入相应的参数，
         */
        emits(context, type, ...item) {
          // console.log(context.ComponentsMediator._events);
          if (!context.$parent) {
            return;
          }
          if (context.ComponentsMediator._events && Object.hasOwnProperty.call(context.ComponentsMediator._events, type)) {
            var that = context.ComponentsMediator._events;
            that[type][0](...item);
          } else {
            this.emits(context.$parent, type, ...item);
          }
        },
        /**
         * 注册监听事件的触发方法到组件中介器(ComponentsMediator)事件管理器中
         * @param {String} eventName 事件名称
         * @param {Function} fn 监听事件触发时的回调，可以类比window.onload之类
         */
        CM$on(eventName, fn) {
          if (!Object.hasOwnProperty.call(this.ComponentsMediator._events, eventName)) {
            this.ComponentsMediator._events[eventName] = [];
            this.ComponentsMediator._events[eventName].push(fn)
          } else {
            this.ComponentsMediator._events[eventName].push(fn)
          }
        },
      },

      created: function () {
        // 逻辑...
      },
      destroyed() {
        this.emits(this, 'rm', this._uid);
      }
    })

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function (methodOptions) {
      // 逻辑...
    }
  }

}
