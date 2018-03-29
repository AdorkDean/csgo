<template>
  <div id="app">
    <router-view>
      <v-home></v-home>
    </router-view>
   
  </div>
</template>

<script>
 
import Vue from 'vue'
import Router from 'vue-router'
import home from './components/Home/home.vue'
/* import gameDetail from './components/GameDetail/gameDetail.vue' */

export default {
  name: 'app',
  data() {
    return {
     
    }
  },
  components: {
	/* 	gameDetail, */
	 'v-home': home
  }
}
</script>

<style scoped>
  
</style>
