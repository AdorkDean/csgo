<template>
    <transition name="box">
        <section id="evt-pop" class="box">
            <div class="pop-logo">
                <p>
                    <img src="static/img/sco_logo2.png">
                </p>
                <p class="tc t16">电子竞技</p>
            </div>
            <router-link to="/home">
                <div class="pop-list">
                    <a href="#">
                        我的首页
                        <img src="static/img/pop1.png">
                        <i class="arrow-r"></i>
                    </a>
                </div>
            </router-link>
            <router-link to="/livingEvents">
                <div class="pop-list">
                    <a href="#">
                        实况赛事
                        <img src="static/img/pop2.png">
                        <i class="arrow-r"></i>
                    </a>
                </div>
            </router-link>
            <router-link to="/jingEvents">
                <div class="pop-list">
                    <a href="#">
                        竞猜赛事
                        <img src="static/img/pop3.png">
                        <i class="arrow-r"></i>
                    </a>
                </div>
            </router-link>
            <router-link to="/oddSetPage">
                <div class="pop-list pop-mg">
                    <a href="#">
                        赔率设置
                        <img src="static/img/pop4.png">
                        <i class="arrow-r"></i>
                        <i class="arrow-j">10进制</i>
                    </a>
                </div>
            </router-link>
            <router-view></router-view>
        </section>
    </transition>
</template>
<script>
    export default {
        data() {
            return {

            }
        }
    }
    
</script>
<style>

</style>