<template>
  <div id="app">

    <div class="container my-5">
      <h1 class="text-center title">Weather in</h1>
      <form-search></form-search>
      <card-body></card-body>
    </div>
  </div>
</template>

<script>

import FormSearch from './components/FormSearch.vue'
import CardBody from './components/cardBody.vue'

export default {
  name: 'app',
  components: {
    FormSearch,
    CardBody
    
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@100;400;700&display=swap");

#app {
  font-family: "Raleway", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #707070;
  margin: 0;
  padding: 0;

  .container {
    max-width: 400px;
    min-width: 400px;
    

    .title {
      font-weight: 700;
      font-size: 50px;
      
    }

    
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
