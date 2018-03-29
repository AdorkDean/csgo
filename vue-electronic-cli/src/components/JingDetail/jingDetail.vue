<template>
    <div id="jingDetail">
        <v-header :headLine="leaName" :type="type"></v-header>
        <section class="event-box score-middle">
            <div class="evt-text header-score">
                <div class="evt-txt-vs">
                    <div class="evt-vs-fl">
                        <div>{{homeName}}</div>
                        <div>赔率1.11</div>
                    </div>
                    <div class="evt-vs-fc">
                        <div class="vs-fc-vs">
                            <span>{{homeScore}}</span>
                            <span class="vs-mgn">:</span>
                            <span>{{awayScore}}</span>
                        </div>
                    </div>
                    <div class="evt-vs-fr">
                        <div>{{awayName}}</div>
                        <div>赔率1.11</div>
                    </div>
                </div>
                <div class="evt-txt-date tc t14" :class="fontbgColor">
                    <div>{{getTime(headerList.time,1)}}</div>
                    <div>{{getTime(headerList.time,2)}}</div>
                    <div class="evt-nm">{{leaRule}}</div>
                </div>
            </div>
        </section>
        <div class="bg4"></div>
    </div>
</template>
<script>

    import header from '../Header/header.vue'

    export default {
        name: 'jingDetail',
        data() {
            return {
                headerList: [],
                type: false,
                fontbgColor: ''
            }
        },
        created() {
            this.onLoad()
        },
        computed: {
            leaName() {
                return this.headerList.leaName.substr(6, 22)
            },
            homeName() {
                return this.headerList.homeName.substr(0,6)
            },
            awayName() {
                return this.headerList.awayName.substr(0, 6)
            },
            homeScore() {
                var status = this.headerList.status
               return status == 'MapInProgress' || status == 'InPlay' || status == 'GameAbandoned' || status == 'BreakInPlay' || status == 'MapFinished' || status == 'PostGame' || status == 'Abandoned' ? this.headerList.homeScore : '';
            },
            awayScore() {
                var status = this.headerList.status
                return status == 'MapInProgress' || status == 'InPlay' || status == 'GameAbandoned' || status == 'BreakInPlay' || status == 'MapFinished' || status == 'PostGame' || status == 'Abandoned' ? this.headerList.awayScore : '';
            },
            leaRule() {
                var a = this.headerList.leaRule.match(/\(([^)]+)\)/)[1];
                return a.substr(0, 3)
            }
        },
        methods: {
            onLoad() {
                this.headerList = JSON.parse(localStorage.getItem("headerList")) 
                let status = this.headerList.status
                this.$options.methods.statusFontColor(status)
            },
            statusFontColor: function (status) {
                //console.log(status)
                if (status == 'PreGame' || status == 'Warmup' || status == null) {
                    this.fontbgColor = 'colorComing'
                }
                else if (status == 'MapInProgress' || status == 'InPlay' || status == 'GameAbandoned' || status == 'BreakInPlay') {
                    this.fontbgColor = 'colorStarting'
                }
                else if (status == 'MapFinished' || status == 'PostGame' || status == 'Abandoned') {
                   this.fontbgColor = 'colorEnding'
                }
            },
            getTime: function (time, num) {
                if (num == 1) {
                    var time = time.slice(5, 7) + '月' + time.slice(8, 10) + '日';
                } else if (num == 2) {
                    var time = time.slice(11, 16);
                }
                return time;
            }
        },
        components: {
            'v-header': header
        }
    }
</script>
<style>
.colorComing{color:#ef6095!important}
.colorStarting{color:#18d2bb!important}
.colorEnding{color:#abbcd6!important}
</style>