<template>
    <div>
        <header>
            <a href="javascript:;" class="dl cs-header-l" id="pop-btn" @touchstart="showBox=!showBox">
                <img src="static/img/nav1.png">
            </a>
            <center>{{headLine}}</center>
            <a href="javascript:;" class="dr cs-h-logo" v-show="!type">
                <img src="static/img/sco_logo.png">
            </a>

            <a href="javascript:;" class="dr shax-img" v-show="type" @click="openPicker()">
                <img src="static/img/riqi.png">
            </a>
            <mt-datetime-picker ref="picker" type="date" @confirm="handleConfirm"></mt-datetime-picker>
            <a href="javascript:;" class="dr shax-img2" v-show="type">
                <img src="static/img/shax.png">
            </a>

        </header>
        <v-setUp v-show="showBox"></v-setUp>
        
    </div>
</template>
<script>

    import axios from 'axios'
    import Vue from 'vue'
    import setUp from '../SetUp/setUp.vue'
    import { DatetimePicker } from 'mint-ui'
    import Bus from '../Bus/bus.vue'

    export default {
        data() {
            return {
                showBox:false,
                oTime: ''
            }
        },
        props: ["headLine","type"],
		methods: {
            openPicker() {
                this.$refs.picker.open()//时间插件
            },
            handleConfirm(value) {
                this.oTime = `${value.getFullYear()}-${value.getMonth()+1<10?'0'+ (value.getMonth() + 1): value.getMonth() + 1}-${value.getDate()>=10?value.getDate():'0'+ value.getDate()}`
                Bus.$emit('dateSelect', this.oTime)
            }
        },
        components: {
           'v-setUp': setUp
        }
    }
</script>
<style scoped>
   
    /*筛选*/
    .screen-box{ font-size:1.2rem;position:relative;top:4rem;left:0;}
    .screen-left{ width:40%; height:50rem; padding-bottom:2rem; background:rgb(243,243,243);}
    .screen-left ul{ border:.1rem solid rgb(238,238,238); border-bottom:none;}
    .screen-left ul li{ border-bottom:.1rem solid rgb(238,238,238); background:rgb(255,255,255); height:3.8rem; line-height:3.8rem; padding-left:2.3rem;}
    .screen-left ul li.sre-on{ background:none;}
    .screen-left ul li img{ height:1.3rem; float:right;margin-top: 1.2rem; margin-right:1.5rem;}
    .screen-right{ padding:4rem 2rem 0rem 1.3rem; width:60%;}
    .screen-right a{ display:block; width:100%; color:rgb(0,0,0); height:4rem; line-height:4rem; padding-left:1.8rem; background:rgb(238,238,238); border-radius:.3rem; margin-bottom:1.2rem;}
    .screen-no{ margin-top:40%;}
   
    .mint-popup{width:100%;height:100%;overflow:hidden;}
    .mint-button{top:200px;left:160px;}
    .mint-popup-bottom {top:50%;}
     /*筛选*/
</style>