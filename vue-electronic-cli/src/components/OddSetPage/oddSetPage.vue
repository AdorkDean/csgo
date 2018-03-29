<template>
    <div id="OddSetPage">
        <header>
            <a href="javascript:;" class="sx-return" @click="clickBack">
                <img src="static/img/cs_p2.png">
            </a>
            <center>赔率设置</center>
        </header>
        <section class="set-box shezhi-box">
            <div class="set-list" :class="[count=='十进制'?a:b]" @click="oddClickImgTop($event)">
                <div class="set-number" :class="[count=='十进制'?f:b]">10
                    <i :class="[count=='十进制'?s:b]"></i>
                </div>
                <div class="set-tit" :class="[count=='十进制'?f:b]">十进制</div>
                <div class="scr-img2">
                    <img :src="count=='十进制'?gouxuan:weixuan">
                </div>
            </div>
            <div class="set-list set-list2" :class="[count!='分数'?b:a]" @click="oddClickImgBottom($event)">
                <div class="set-number set-nmb2" :class="[count!='分数'?b:f]">分
                    <i :class="[count!='分数'?b:s]"></i>
                </div>
                <div class="set-tit" :class="[count!='分数'?b:f]">分数</div>
                <div class="scr-img2">
                    <img :src="count!='分数'?weixuan:gouxuan">
                </div>
            </div>
        </section>
        <div id="maskLayer" v-show="showHide">
            <section class="set-pop oh">
                <div class="set-pop-tit t18 tc">
                    <i class="dl"></i>
                    <span>确认设置</span>
                    <i class="dr"></i>
                </div>
                <div class="tc set-lgh">确定选择
                    <span id="setW">{{count}}</span>作为您的赔率？</div>
                <div class="set-btn">
                    <a href="javascript:;" class="dl tc" @click="cancle">取消</a>
                    <a href="javascript:;" class="dr tc" @click="confirm">确定</a>
                </div>
            </section>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                selectStatus:true,
                gouxuan: 'static/img/gouxuan.png',
                weixuan: 'static/img/weixuan.png',
                a: 'active',
                f: 'fonActive',
                s: 'squActive',
                b: '',
                backStatus: false,
                showHide: false
            }
        },
        computed:{
            count(){
                //通过 store.state 来获取状态对象
                return this.$store.state.setStr
            }
        },
        methods: {
            oddClickImgTop(event) {
                this.selectStatus = !this.selectStatus
                //this.setStr = '十进制'
                this.$store.commit('switchOddShi');
            },
            oddClickImgBottom(event) {
                this.selectStatus = !this.selectStatus
                this.$store.commit('switchOddFen')
                // this.setStr = '分数'
                this.backStatus = true
            },
            clickBack() {
                if(this.backStatus == true){
                    if(this.a != true){
                        this.showHide = !this.showHide 
                    }
                }else{
                    this.$router.push({
                        path: '/home'
                    })
                }
                
            },
            cancle() {
                this.showHide = !this.showHide
            },
            confirm() {
                this.$router.back(-1);
            }
        }
    }
</script>
<style scoped>
.set-box{ padding:1rem; background:rgb(255,255,255);}
.set-list{border:.1rem solid #57607C; margin-bottom: 1rem; height: 4.4rem; line-height: 4.4rem;border-radius: .8rem; position: relative;}
.set-number{ text-align:center; width:4.2rem;line-height:4.4rem; height:4.4rem; font-size:1.4rem;}
.set-number i{ border:.1rem solid #57607C;;display:block;width:2rem; height:2rem; transform:rotate(45deg); position:absolute; left:1rem; top:50%;margin-top:-1rem; }
.set-tit{ position:absolute; top:0; left:5.2rem; font-size:1.5rem;}
.set-list2{border:.1rem solid #57607C; color: #57607C; }
.set-nmb2 i{border:.1rem solid #57607C;}
.set-box{ position:relative;}
.set-pop{ width:28rem; background:rgb(255,255,255); padding:2rem; margin:0 auto;margin-top:16rem; border-radius:.5rem;}
.set-pop-tit{ color:#EF6095; padding-bottom:2rem; border-bottom:.1rem solid #FCF;}
.set-pop-tit i{ width:.8rem; height:.8rem; background:#EF6095; transform:rotate(45deg); margin-top:.8rem;}
.set-lgh{ line-height:6rem; height:6rem; font-size:1.5rem;}
.set-btn{ margin-top:2rem;}
.set-btn a{ text-decoration:none; line-height:4.4rem; height:4.4rem; width:9.9rem; color:rgb(255,255,255); background:#18D2BA; border-radius:.5rem; font-size:1.4rem;}
.set-btn a:nth-child(2){ background:#FB6D9D; }
#main-bg{ background: white;}
.kong-pop img,.kong-pop2 img,.guide-box img{ width:100%;}
.kong-pop,.kong-pop2{ padding:0 1rem; position:absolute; top:50%; margin-top:-1.6rem; width:100%;}
.kong-pop2{ position:absolute; top:50%;margin-top:-8rem;}
.guide-box{ position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,.6); z-index:999; padding: 0 2.5rem; padding-top:23%; }
.guide-box img{ width:100%;}
.scr-img img{ position:absolute; left:-.3rem; top:-.1rem; height:4.4rem; display:block;}
.scr-img2 img{ position:absolute; right:1rem; top:50%; height:2.1rem; display:block; margin-top:-1.05rem;}
.sx-return { position:absolute; left:1rem; top:0rem; padding-right:2rem;}
.sx-return img{ height: 1.8rem;}
.screen-banner{ width:100%; height:4rem;}
.screen-banner img{ width:100%; height:100%;}
.navImg{position:relative ;top:4.4rem;left:0;}

.active{border: .1rem solid #FB6D9D;}
.fonActive{color: #FB6D9D;}
.squActive{border: .1rem solid #FB6D9D!important;}
</style>