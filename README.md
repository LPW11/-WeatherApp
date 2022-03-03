# weather-web

关于 vue 的一个入门项目

## 使用的技术

vue-cli 初始化项目，单文件组件的使用与注册到根组件中，vuex 的子组件和子组件的数据传递，一些 vue 的语法，axios 语法的使用，工具类的使用

原项目是用原生的前端三件套写的，因为刚学了 vue 框架及其一些工具，故想着用 vue 来仿写一下

[原项目地址](https://github.com/somteacodes/weatherapp)

## 基本效果

在输入框中输入城市名称（英文），就可以返回相关的数据

## 第一步：划分组件

<img src="https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220302113225465.png" alt="image-20220302113225465" style="zoom:67%;" />



​	在目录中

![image-20220302113324706](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220302113324706.png)



## 第二步：完成对单文件组件在根组件中的注册

一般都是把这两个组件拼成一个父组件（形成一个完整的页面），然后再注册到根组件（App.vue）中的，不过由于该项目只是一个简单的单页应用所以我就直接注册在了根组件（App.vue）中

<img src="https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220302113912161.png" alt="image-20220302113912161" style="zoom:67%;" />

## 第三步：完成对单文件组件的样式编写

工程话来说的话可以直接引用现成的组件库（像 element UI 之类的）

在这里的话，我们使用的是 bootstrap-vue 来使用的的，并没有使用现成的组件库，而是只是利用了 bootstrap 的 class 属性进行（bootstrap 的源码中有一套完整的 scss 样式供我们使用）

现在来讲一下如何引入：在 **==main.js （入口文件中）==**

==main.js 最大的作用就是帮助 webpack 进行一个更好的路径进行打包（bundle）把相关的依赖都说明的很清楚==

![image-20220302114533273](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220302114533273.png)

看源码，跟着调试的话就没问题了，这时候的话里面的数据都是静态的写死的，==我们需要动态的更新数据，引起更新数据的原因是什么？==

## 第四步：给标签添加事件

我们在 FormSearch 组件中添加事件：当我们提交表单的时候触发的

- 可以在 form 标签中触发
- 也可以在input 标签中触发

![image-20220302115455684](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220302115455684.png)

当这个表单提交的时候我们要做什么事情：==**显示下面的 card body 组件，并把动态的数据添加到里面**==

## 第五步：完成处理器函数的编写（也就是我们要做什么事情当触发这个事件的时候）

- 上面的 submit 事触发的时候会自动的刷新页面，因为我们不希望它刷新，所以我们使用修饰符 .prevent 来阻止默认的发生



submit 和 change 都是一个变量，在变量中储存着相关的处理函数，在生命周期中的 method 中进行编写

<img src="https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220302120201159.png" alt="image-20220302120201159" style="zoom:67%;" />



## 第六步：获取 API 接口的数据并将其动态的显示在我们的页面上

在 input 上绑定 change 事件

### input 框输入城市并将输入的东西实时返回到另外一个组件当中

- 如何定义一个全局定义一个变量，然后可以在任意组件中进行引用呢？

在 vuex 中可以定义一个默认的变量

![image-20220303001236072](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303001236072.png)

我们在组件中进行使用是在 computed 下进行调用然后声明变量

![image-20220303001316630](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303001316630.png)



- **==如何把 一个组件中拿到的数据来改变原来vuex 中定义的默认值然后传到另外一个组件当中呢？==**

什么时候**触发**进行**传值**这个操作：**因为触发了这个事件所以我拿到了我想要的数据**

![image-20220303001925455](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303001925455.png)

然后触发了 setCityName 这个 action（行动），**并携带了后面要传递的值**，这个 action（**行动要做什么？**）→ 提交 mutations

![image-20220303002954452](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303002954452.png)

> 这里为什么要解构赋值呢？是为了要得到 commit 方法吗？

mutations 主要用于操作state中的数据，说白了就是对state数据进行更改

![image-20220303003200937](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303003200937.png)

我们怎么读取到更改后新的值？

首先我们要先定义 getter 方法

![image-20220303003309981](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303003309981.png)

其次我们想使用获取来新的数据的话，我们要在要使用该数据的组件中的 computed 属性中进行定义

比如我们的 card body 组件中需要用到

![image-20220303003505809](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303003505809.png)

> 切记：我们在 computed 属性中已经定义过该变量了，就不需要再 data 中再次定义了

### 调用API接口来返回数据并显示再对应的组件中

问题：我们在一个组件中获取到了数据，但是要在另外一个组件中显示，我们应该怎么办？

我们通过表单 form 的 submit 方法，并在里面使用了 axios 进行调用接口的操作

我们在 utils 文件夹下创建了我们的工具类函数（request.js）并且进行对外的暴露

![image-20220303004937272](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303004937272.png)

**最后 data 返回的是 一串 json 格式的数据**

我们在使用到该函数的组件中进行引入

![image-20220303005133294](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303005133294.png)

然后使用

![image-20220303005334713](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303005334713.png)

### 如何在另一个组件中使用获取到的数据

先读取并存放到变量里

![image-20220303005519123](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303005519123.png)

如何使用变量

在文本里面使用 **双大括号语法** / 在属性中**使用模板字符串**

![image-20220303005626488](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303005626488.png)

### 如何进行调试

- 测试这个 input 标签中是否双向数据绑定成功

![image-20220303132908540](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303132908540.png)

双向数据绑定的原理是：

View的变化能实时让Model发生变化，而Model的变化也能实时更新View。

`View` 的变化能实时让`Model`发生变化，而`Model`的变化也能实时更新`View`。

![图片说明](https://uploadfiles.nowcoder.com/images/20210401/447785786_1617244044166/C21B5ECC8B63BE4DC27B38A70C75A1CB)

这里的 view 的变化指的是 input 框中从没有字到我们开始进行打字，

而我们由于这个 input 绑定了 v-model："city"，所以 view 变化的时候，会使 model 绑定的变量 city 发生动态变化从 “”（空字符串）变化成我们输入的值，并保存到这个变量里面

所以我们在 this.city 中可以拿到我们随 view 变化而拿到的值

![image-20220303133808593](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303133808593.png)



![image-20220303133835620](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303133835620.png)

> 我们输入的时候不会时时刻刻打印出我们所输入的值，只有我们按回车的时候才会显示我们按回车前在输入框中所输入的值



- 测试我们返回的数据是否正确返回

![image-20220303134750249](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303134750249.png)

直接打印就可以了，结果就是上面的图片的第三个 json 格式的数据



- 要测试根据拿到的数据去==**拼接**==拿到对应的网页图片的

可以引入一个工具类的函数里面可以放着我们要测试的东西，**我们只需引入这个函数就可以了**

![image-20220303135053040](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303135053040.png)

在这个函数里我们可以声明当前函数中所需要的测试变量然后进行打印

![](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303135231526.png)

> 切记：我们是不可以把这个变量当作全局变量在其他地方使用的



- 我们在读取 vuex 的变量的时候需要进行条件判断来调用不同的 vuex 变量，我们怎么判断是否进入到了该条件中

在一个 template 中

![image-20220303135932211](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303135932211.png)

在 script 的 computed 中

![image-20220303135951720](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303135951720.png)

我之前遇到的情况是 weather 返回的一直是 undefined

是否进入循环，this.$store.getters.getIcon 是否可以拿到值（这个可以在哪里测试呢？但是我肯定一定是拿到值了）

直接赋值

![image-20220303140342794](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303140342794.png)

发现是可以进入循环的

因为console 可以打出来，后来我发现 是写 store 而不是 getter 因为我们只是在 vuex 中设定了一个全局的静态变量，直接用 state 读取就好了



## 第七步：完成一开始下面的 card-body 组件时隐藏的，当我们进行 回车触发 submit 事件的时候下面的 card-body 组件才会显示

一开始我想的就是，给这个 card-body 组件的最外层 div 添加一个动态的 class 属性，怎么动态法：就是我控制什么时候打开这个class，什么时候关掉这个 class，我选择用一个变量进行控制，且这个变量默认时 true（boolean）说明这个属性平时是一直开着的

![image-20220303141637861](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303141637861.png)

在这里我为什么会选择 getter 来读取：因为这是动态的我们会在==**某个时刻**==触发来改变这个默认值

![image-20220303142137088](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303142137088.png)

某个时刻是哪个时刻，也就是显示 card body 组件的时刻 → 我们按下回车的时候，所以我们的 dispatch 方法要写在 submit 事件处理器下：

![image-20220303142351515](https://lpw11.oss-cn-beijing.aliyuncs.com/img/image-20220303142351515.png)

dispatch ==**携带要改变成的值**==触发 action ，action 提交 mutation 来改变数据，==**state 就会从默认值改变成我们传入的值**==





## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

唯一的不同是从 input 框中输入得到资料
另一个是要从 api 中得到资料，然后改变