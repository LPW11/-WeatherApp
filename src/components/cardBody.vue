<!--  -->
<template>
  <div class="Cardbody">
    <div class="card rounded my-3 shadow-lg back-card"
          v-bind:class="{'d-none': isTrue}"
          >
      <div class="card-top text-center">
        <div class="city-name my-3">
          <p>{{citys}}</p>
          <span>...</span>
        </div>
        <img :src="`https://lpw11.oss-cn-beijing.aliyuncs.com/img/${weather}_image.svg`" alt="" class="card-img-top time" />
      </div>

      <div class="card-body">
        <!-- 栅格系统 -->
        <div class="card-mid row">
          <div class="col-8 text-center temp">
            <span>{{ kelvin }}&deg;C</span>
          </div>

          <div class="col-4 condition-temp">
            <p class="condition">{{description}}</p>
            <!-- 接下来是添加上升和下降的图片 -->
            <p class="high">{{max}}&deg;C</p>
            <p class="low">{{min}}&deg;C</p>
          </div>
        </div>

        <div class="icon-container card shadow mx-auto">
          <!-- <img :src="`http://openweathermap.org/img/wn/`+ icon + `@2x.png`" alt="" /> -->
          <img :src="`http://openweathermap.org/img/wn/${icon}@2x.png`" alt="" />
        </div>

        <div class="card-bottom px-5 py-4 row">
          <div class="col text-center">
            <p>{{feellike}}&deg;C</p>
            <span>Feels Like</span>
          </div>
          <div class="col text-center">
            <p>{{humidity}}%</p>
            <span>Humidity</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
// import {updateWeatherApp} from '../utils/updateWeatherApp'
import {spitOutCelcius} from '../utils/spitOutCelcius'


export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  name: "CardBody",
  data() {
    // 这里存放数据
    
    return {
        // city: updateWeatherApp(data) 
        
        
        
        
    };
  },
  // 监听属性 类似于data概念
  computed: {
    citys: function() {
      return this.$store.state.citys;
    },
    kelvin: function() {
      return spitOutCelcius(this.$store.getters.getTemp);
    },
    description: function() {
      return this.$store.getters.getDescription;
    },
    max: function() {
      return spitOutCelcius(this.$store.getters.getMax);
    },
    min: function() {
      return spitOutCelcius(this.$store.getters.getMin);
    },
    icon: function() {
      return this.$store.getters.getIcon;
    },
    weather: function() {
      if(this.$store.getters.getIcon.includes('d')) {
        console.log(111)
        return this.$store.state.morning;
        
      }else {
        return this.$store.state.evening;
      }
    },
    feellike: function() {
      return spitOutCelcius(this.$store.getters.getFeelLike);
    },
    humidity: function() {
      return this.$store.getters.getHumidity
    },
    isTrue: function() {
      return this.$store.getters.getJudge
    }
    
    
    
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {},
};
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
//圆角
.back-card {
  //4
  border-radius: 40px !important;

  .city-name {
    //6，脱离文本流让这个属性的 div 不再占位置让同级的 img 代替这个 div 的位置就可以实现覆盖
    position: absolute;
    //相对谁的？？
    width: 100%;

    p {
      //城市名字变大
      font-size: 16pt !important;
      font-weight: 400;
    }

    span {
      //变大小
      font-weight: 400;
      font-size: 36pt;
      font-family: "Times New Roman", Times, serif;
      //以下两个是控制三个点的位置，因为设置了 relative 才可进行上下左右的移动
      position: relative;
      top: -60px;
    }
  }
}

.card-mid {
  line-height: 0.5;

  .temp span {
    //18
    //粗细
    font-weight: 100;
    //大小
    font-size: 5em;
    //字间距
    letter-spacing: -5px;
    white-space: nowrap;
  }

  .condition {
    //21
    //行高拉伸，不会挤在一起
    line-height: 1em;
    font-weight: 700;
    font-size: 1em;
    text-transform: capitalize;
  }

  .high::before {
    //伪元素一定要设置内容为空，然后由自己添加 23
    content: "";
    background: url("../assets/up.svg") no-repeat;
    width: 10px;
    height: 15px;
    display: inline-block;
    position: relative;
    top: 3px;
  }

  .low::before {
    //24
    content: "";
    background: url("../assets/down.svg") no-repeat;
    width: 10px;
    height: 15px;
    //可以没有 block 的独占一行，有 inline 的设宽高
    display: inline-block;
    position: relative;
    top: 3px;
  }
}

.icon-container {
  //设置容纳 svg 图片容器的宽高
  border-radius: 100%;
  width: 100px;
  height: 100px;
  background: #202020;

  img {
    margin: auto;
  }
}

.card-bottom {
  //最下面那个 div 的行间距缩小
  line-height: 0.5;

  p {
    font-size: 50px;
    font-weight: 100;
    letter-spacing: -2px;
  }

  span {
    //feel like
    font-size: 12px;
  }
}
</style>


