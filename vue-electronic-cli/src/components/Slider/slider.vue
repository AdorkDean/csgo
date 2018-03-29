<template>
    <div>
        <mt-swipe :auto="3000">
            <mt-swipe-item>
                <img src="static/img/csgo.png">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="static/img/csgo.png">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="static/img/csgo.png">
            </mt-swipe-item>
        </mt-swipe>
        <div class="foating">
             本平台提供完整比赛数据直播
        </div>
    </div>
    
</template>
<script>

    import { Swipe, SwipeItem } from 'mint-ui'

    export default {
            data() {
                return {

                }
            }
        }
</script>
<style>
.mint-swipe{ height:100%; width:100%;height:16rem}
.mint-swipe img{display: block;height:16rem}
.foating{color:white;line-height: 2rem}
.mint-swipe-indicator{width: 1.4rem!important;height: 0.3rem!important;border-radius: 0.3rem; display: inline-block;background: white;opacity: 1;margin: 0 3px;}
.mint-swipe-indicators{left:70%;transform: translateX(10%);z-index: 101;}
.mint-swipe-indicator.is-active {background: red;} 
</style>