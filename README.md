# ComponentsMediator
[![npm version](https://badge.fury.io/js/components-mediator.svg)](https://badge.fury.io/js/components-mediator)
VUE组间(事件中心)
#Log 2022年11月4日
现已经支持vue3.0,vue2.X依然可用

## 加入依赖
```npm i components-mediator```
或是
```cnpm i components-mediator```
## 安装模块
```
import ComponentMediator from "components-mediator" //组件管理器
```

##使用方法
>功能组件是安装在全局的,会绑定到VM对像上,也就是当前节点树的每一个节点;

### 我们在组件上使用他
结构层级嵌套
```
components-mediator
          components-mediator
                    components-mediator
```

1. 需要激活当前节点的管理器,才可以管理自身及子节点
```
  ...
  created() {
    this.createComponentsMediator();//激活当前节点
  },
  ...
```
激活:会在当前节点注册,三个事件:register(注册方法),send(触发对应的已经注册的方法),remove(删除对应的UID下的所有注册)

2. 注册方法
  context Object 上下文环境
  'register' String 关键字
  options Object 注册的信息

  ```
  {}type:指定注册的事件,用于send时触发对应的事件
  uid:当前组件的uid,//this._uid,用于删除,
  fn:触发器回调函数}

  ```
  ```
  this.emits(context,'register',{
    type:'init',
    uid:this._uid,
    fn:(val)=>{
      console.log(val);
    }
  })
  ```




3.  触发方法
  context Object 上下文环境
  'send' String 关键字
  registerType String 已经注册过的触发关键字,下面这个的触发关键字是init
  ...params 

```

this.emits(this.$root,'send','init',params1,params2);
```


