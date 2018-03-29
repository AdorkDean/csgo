<template>
    <div>
        <v-header :headLine="headLine" :type="type"></v-header>
        <div class="page-navbar">
            
            <mt-navbar class="page-part" v-model="selected">
                <mt-tab-item id="1">未开始</mt-tab-item>
                <mt-tab-item id="2">进行中</mt-tab-item>
                <mt-tab-item id="3">已完赛</mt-tab-item>
            </mt-navbar> 
            <div id="content">
                <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                    <mt-tab-container v-model="selected">
                            <mt-tab-container-item id="1">
                                <v-competition :msg="jingData" :arr="arr" :oTitle="oTitle"></v-competition>
                            </mt-tab-container-item>
                            <mt-tab-container-item id="2">
                                <v-competition :msg="jingData" :arr="arr" :oTitle="oTitle"></v-competition>
                            </mt-tab-container-item>
                            <mt-tab-container-item id="3">
                                <v-competition :msg="jingData" :arr="arr" :oTitle="oTitle"></v-competition>
                            </mt-tab-container-item>
                        
                    </mt-tab-container>
                </mt-loadmore>
            </div>
        </div>
        <v-loading v-show="isLoading"></v-loading>
        <v-emptyPage v-show="isEmpty"></v-emptyPage>
        
    </div>
</template>
<script>
    import header from '../Header/header.vue'
    import competition from '../Competition/competition.vue'
    import { Navbar, TabItem } from 'mint-ui'
    import { Loadmore } from 'mint-ui'
    import emptyPage from '../EmptyPage/emptyPage.vue'
    import loading from '../Loading/loading.vue'
    import Bus from '../Bus/bus.vue'

    export default {
        name: 'jingEvents',
        mounted() {
            Bus.$on('dateSelect', (oTime) => {
                this.dateTime = oTime
                this.onLoad()
            })
            this.isLoading = true
            this.onLoad()
        },
        data() {
            return {
                jingData: '',
                headLine: '竞猜赛事',
                arr: [],
                oTitle: false,
                type: true,
                selected: '1',
                page: 1,
                isLoading: false,
                isEmpty: false,
                allLoaded: false,//是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了 
                dateTime: ''
            }
        },
        watch: {
            selected() {
                this.jingData =  []
                this.isLoading = true
                this.onLoad()
            }
        },
        methods: {
            loadTop: function () { // 组件提供的下拉触发方法  
                //下拉加载  
                this.page = 1;
                this.onLoad();
                this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位  
            },
            loadBottom: function () {
                // 上拉加载  
                this.more();// 上拉触发的分页查询  
                this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位  
            },  
            onLoad() {
                this.isLoading = true
                if(!this.dateTime){
                    var a = '/interface/v2/matchListWithOdds/' + this.selected + '?page=1&pageSize=10'
                }else{
                    var a = '/interface/v2/matchListWithOdds/' + this.selected +'?page=1&pageSize=10' + '&day=' + this.dateTime
                } 
                console.log(a)
                this.$http.get(a)
                    .then(response => {
                        this.jingData = response.data.result
                        this.isLoading = false
                        if (!this.jingData.length) { this.isEmpty = true }else{ this.isEmpty = false}
                        //console.log(this.jingData)
                        let oData = response.data.result
                        let window = this
                        let arr = []
                        oData.forEach(function (item, index, input) {
                            if(item.markets.length!=0){
                                
                                 //赔率表格
                                let oddTable1 = item.markets[0].selections[0].selectionAlls;//主胜赔率
                                //console.log(oddTable1)
                                let oddTable2 = item.markets[0].selections[1].selectionAlls;//客胜赔率
                                let a = item.markets[0].selections[0].id;
                                let b = item.markets[0].selections[1].id;
                                let setObject = window.$options.methods.setObject(a, b, oddTable1, oddTable2)
                                arr.push(setObject)
                            }else{
                                 arr.push('')
                            }
                           
                        })
                        this.arr = arr;
                       
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            more: function () {
                this.isLoading = true
                 // 分页查询  
                this.page = this.page + 1
                if (!this.dateTime) {
                    var a = '/interface/v2/matchListWithOdds/' + this.selected + '?' + this.page +'&pageSize=10'
                } else {
                    var a = '/interface/v2/matchListWithOdds/' + this.selected + '?' + this.page +'&pageSize=10' + '&day=' + this.dateTime
                } 
                this.$http.get(a)
                    .then(response => {
                        this.jingData = this.jingData.concat(response.data.result)
                        this.isLoading = false
                        if (!this.jingData.length) { this.isEmpty = true }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            setObject: function (a, b, oddTable1, oddTable2) {
                var a1 = [];
                //判断赔率字体颜色
                for (var i = 0; i < oddTable1.length - 1; i++) {
                    //console.log(i)
                    for (var j = i + 1; j < oddTable1.length; j++) {

                        if (Number(oddTable1[i].decimal) < Number(oddTable1[j].decimal)) {
                            oddTable1[i].status = 0;
                        } else if (Number(oddTable1[i].decimal) == Number(oddTable1[j].decimal)) {
                            oddTable1[i].status = 1;
                        } else {
                            oddTable1[i].status = 2;
                        }
                        break;
                    }
                }
                for (var i = 0; i < oddTable2.length - 1; i++) {
                    //console.log(i)
                    for (var j = i + 1; j < oddTable2.length; j++) {

                        if (Number(oddTable2[i].decimal) < Number(oddTable2[j].decimal)) {
                            oddTable2[i].status = 0;
                        } else if (Number(oddTable2[i].decimal) == Number(oddTable2[j].decimal)) {
                            oddTable2[i].status = 1;
                        } else {
                            oddTable2[i].status = 2;
                        }
                        break;
                    }
                }

                $(oddTable1).each(function (index, item) {
                    item.id = a;
                })
                $(oddTable2).each(function (index, item) {
                    item.id = b;
                })

                var array1 = oddTable1
                var array2 = []

                $(oddTable2).each(function (index, item) {
                    var object2 = {};
                    for (let key in item) {
                        object2[key + '1'] = item[key];
                    }
                    array2.push(object2);

                })

                var nerArr = [];
                for (var i = 0; i < array1.length; i++) {
                    for (var j = 0; j < array2.length; j++) {
                        if (i == j) {
                            var f = $.extend(array1[i], array2[j]);
                        }
                    }
                    nerArr.push(f)

                    //return nerArr;
                }
                //console.log(nerArr);
                return nerArr;
            }
        },
        components: {
            'v-header': header,
            'v-competition': competition,
            'v-emptyPage': emptyPage,
            'v-loading': loading
        }
    }
</script>
<style>
#content{overflow: scroll;}
  /*竞猜赛事*/
nav.guess-nav,nav.shaix-nav{ background:rgb(255,255,255); font-size: 1.5rem; height: 4rem; position: relative; color:#6E86A7; border-bottom:.1rem solid #AABCD6;width:100%;top:0;}
nav.guess-nav ul,nav.shaix-nav ul{ width:100%; display: flex; justify-content: space-between; position: absolute; left: 0; top: 0;}
nav.guess-nav li.guess-hover,nav.shaix-nav li.shaix-hover{  background: url(../../static/img/cs_bj1.png) no-repeat bottom; background-size: 100% .5rem;  border-bottom: none;  color: #EF6095;}
nav.guess-nav li,nav.shaix-nav li{ width: 100%; text-align:center; border-right: none; height: 4rem; line-height: 4rem; position:relative;}
nav.shaix-nav li a{display:block;width: 100%; text-align:center; border-right: none; height: 4rem; line-height: 4rem; position:relative;}
nav.guess-nav li i,nav.shaix-nav li i{ position: absolute; top: .4rem; right: 0; width: 0; height: 3rem; border-right: .1rem solid #DDDDDD;}


.mint-tab-item-label { color: inherit;font-size: 1.5rem;line-height: 1;}
.mint-navbar .mint-tab-item.is-selected { border-bottom: 3px solid #EF6095;color: #EF6095;margin-bottom: -3px;}
.mint-tab-container { overflow: hidden; position: relative;top: .5rem;}
.mint-tab-item{border-right:1px solid #DDD}
.mint-navbar{border-bottom: 1px solid #DDD}
.mint-navbar .mint-tab-item { padding: 12px 0;font-size: 15px;}
   
.mint-datetime-action {color: #EF6095;}
    
    
    

.loader {
    position: fixed;
    z-index: 999999;
    opacity: 0.5;
    width: 100px;
    height: 80px;
    background: url(../../static/img/loader.gif) #000000 center 6px no-repeat;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    margin: -40px 0 0 -50px;
    text-align: center;
    color: #979797;
    line-height: 130px;
}
.vs-fc-vs{font-size: 2.4rem}
</style>