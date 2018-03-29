import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        setStr: '十进制'
    },
    mutations: {
        switchOddShi: state => state.setStr = '十进制',
        switchOddFen: state => state.setStr = '分数'
    },
    actions: {

    },
    getters: {  

    }
})

export default store
