<template>
    <div>
        <v-header :headLine="headLine" :type="type"></v-header>
        <div id="content">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <v-competition :msg="livingData" :arr="arrNull" :oTitle="oTitle"></v-competition>
            </mt-loadmore>
        </div>
        <v-loading v-show="isLoading"></v-loading>
        <v-emptyPage v-show="isEmpty"></v-emptyPage>
    </div>
</template>
<script>
    
    import header from '../Header/header.vue'
    import competition from '../Competition/competition.vue'
    import emptyPage from '../EmptyPage/emptyPage.vue'
    import loading from '../Loading/loading.vue'
    import { Loadmore } from 'mint-ui'
    import Bus from '../Bus/bus.vue'

    export default {
        name: 'LivingEvents',
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
                livingData: [],
                arrNull: [],
                oTitle: false,
                headLine: '实况赛事',
                type: true,
                page: 1,
                allLoaded: false ,//是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了 
                isLoading: false,
                isEmpty: false,
                dateTime: ''
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
                if (!this.dateTime) {
                    var a = '/interface/v2/matchListWithOutOdds?page=' + this.page + '&pageSize=10'
                } else {
                    var a = '/interface/v2/matchListWithOutOdds?page=' + this.page + '&pageSize=10' + '&day=' + this.dateTime
                }
                this.$http.get(a)
                    .then(response => {
                        this.livingData = response.data.result.dataList
                        //console.log(this.livingData)
                        this.isLoading = false
                        if(!this.livingData.length) {this.isEmpty = true}
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            more: function () {
                // 分页查询  
                this.page = this.page + 1
                if (!this.dateTime.length) {
                    var a = '/interface/v2/matchListWithOutOdds?page=' + this.page + '&pageSize=10'
                } else {
                    var a = '/interface/v2/matchListWithOutOdds?page=' + this.page + '&pageSize=10' + '&day=' + this.dateTime
                }
                this.$http.get(a)
                    .then(response => {
                        this.livingData = this.livingData.concat(response.data.result.dataList)
                        console.log(this.livingData)
                    })
                    .catch(error => {
                        console.log(error)
                    })
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



</style>