import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    citys: 'wuhan',   //设置初始值
    kelvin: '300',
    description: 'Thunder Storm',
    max: '30',
    min: '27',
    icon: '01n',
    morning: 'day',
    evening: 'night',
    feellike: '300.32',
    humidity: '45',
    judge: true
  },
  getters: {
    getCity(state) {
      return state.citys   //返回目前城市名称
    },
    getTemp(state) {
      return state.kelvin
    },
    getDescription(state) {
      return state.description
    },
    getMax(state) {
      return state.max
    },
    getMin(state) {
      return state.min
    },
    getIcon(state) {
      return state.icon
    },
    getFeelLike(state) {
      return state.feellike
    },
    getHumidity(state) {
      return state.humidity
    },
    getJudge(state) {
      return state.judge
    }

  },
  mutations: {
    setCity(state,name) {
      state.citys = name;   //设置新的值
    },
    setTemp(state,temp) {
      state.kelvin = temp;
    },
    setDescription(state,description) {
      state.description = description;
    },
    setMax(state,max) {
      state.max = max;
    },
    setMin(state,min) {
      state.min = min;
    },
    setIcon(state,icon) {
      state.icon = icon;
    },
    setFeelLike(state,feellike) {
      state.feellike = feellike;
    },
    setHumidity(state,humidity) {
      state.humidity = humidity;
    },
    setJudge(state,TF) {
      state.judge = TF;
    }
  },
  actions: {   //使用解构赋值，参数列表{commit, state}
    setCityName({commit,state},name) {
      //commit 调用 mutations 方法
      commit('setCity',name)  //用于提交 mutations 方法 ，传递城市名称
    },
    getLocalTemputure({commit,state},temp) {
      commit('setTemp',temp)
    },
    getLocalDescription({commit,state},description) {
      commit('setDescription',description)
    },
    getLocalMax({commit,state},max) {
      commit('setMax',max)
    },
    getLocalMin({commit,state},min) {
      commit('setMin',min)
    },
    getLocalicon({commit,state},icon) {
      commit('setIcon',icon)
    },
    getLocalFeelLike({commit,state},feellike) {
      commit('setFeelLike',feellike)
    },
    getLocalHumidity({commit,state},humidity) {
      commit('setHumidity',humidity)
    },
    judge({commit,state},TF) {
      commit('setJudge',TF)
    }
  },
  modules: {
  }
})
