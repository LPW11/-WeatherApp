<!--  -->
<template>
  <div class='FormSearch'>
    <form class="search-loaction" @submit.prevent="submit">
      <!-- 双向数据绑定，要在 data 中要声明 -->
        <input
          type="text"
          name="city"
          placeholder="What city?"
          autocomplete="off"
          class="form-control text-muted form-rounded p-4 shadow-sm"
          v-model="city"
          @change="change"
        />
      </form>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import {requestCity} from '../utils/request'
import {updateWeatherApp} from '../utils/updateWeatherApp'

// 例如：import 《组件名称》 from '《组件路径》'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  name: 'FormSearch',
  data () {
    // 这里存放数据
    return {
       city: ''
        
    }
  },
  // 监听属性 类似于data概念
  computed: {
      // citySearched: function() {
      //     return this.city.trim();
      //     //实现搜索之后清空input----------------
      // }
      citys: function() {
        return this.$store.getters.getCity;
      }
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
      change:function(e) {
        this.$store.dispatch('setCityName',e.target.value);
      },


      submit: function(){
          //可以声明在 data 中吗？-----------------------
          let citySearched = this.city.trim();
          console.log(this.city);     //我们在打字框中输入的值
          console.log(citySearched);
          
          requestCity(citySearched) 
              .then((data) => {
                  console.log(data);
                  updateWeatherApp(data);
                  this.$store.dispatch('getLocalTemputure',data.main.temp);
                  this.$store.dispatch('getLocalDescription',data.weather[0].description);
                  this.$store.dispatch('getLocalMax',data.main.temp_max);
                  this.$store.dispatch('getLocalMin',data.main.temp_min);
                  this.$store.dispatch('getLocalicon',data.weather[0].icon);
                  this.$store.dispatch('getLocalFeelLike',data.main.feels_like);
                  this.$store.dispatch('getLocalHumidity',data.main.humidity);
                  this.$store.dispatch('judge',false);

                  
              })
              .catch((error) => {console.log(error)})
          
      }
      
  }
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
.form-rounded {
  border-radius: 2em;
}
</style>
