<template>
		<section id="">
			<div class="bg4" v-show="oTitle"></div>
			<section id="live-events" class="live-events" @click="goEvents(arr)" v-show="oTitle">
				<div class="dl ev-t"><i></i></div>
				<div class="dl">{{!arr.length?'实况赛事':'竞猜赛事'}}</div>
				<div class="dr ev-more"><a href="javascript:;"><i></i><i></i><i></i></a></div>
			</section>
			<section v-for="(item,index) in msg" @click="enterDetail(arr,item.id,item.status,item.homeName,item.awayName,item.competitionName,item.name,item.startTime,item.homeScore,item.awayScore)">
				
				<section class="event-box">
					<a href="javascript:;">
						<div class="evt-title">
							<div class="evt-lf dl" :class="fontbgColor">{{statusFont(item.status)}}</div>
							<div class="tc evt-con">{{item.competitionName.substr(6,22)}}</div>
							<div class="evt-lr dr"><img src="static/img/cs_p1.png"></div>
						</div> 
						<div class="evt-text">
							<div class="evt-txt-vs">
								<div class="evt-vs-fl">
									<div>{{item.homeName?item.homeName.substr(0,12):setStringZhu(item.name,'v')}}</div>
									<div>{{item.markets.length!=0?'赔率'+item.markets[0].selections[0].decimal:''}}</div>
								</div>
								<div class="evt-vs-fc">
									<div class="vs-fc-vs">
										<span v-show="item.homeScore?true:false">{{item.homeScore}}</span>
										<span class="vs-mgn">{{item.homeScore?':':'VS'}}</span>
										<span v-show="item.homeScore?true:false">{{item.awayScore}}</span>
									</div>
								</div>
								<div class="evt-vs-fr">
									<div>{{item.awayName?item.awayName.substr(0,12):setStringKe(item.name,'v')}}</div>
									<div>{{item.markets.length!=0?'赔率'+item.markets[0].selections[1].decimal:''}}</div>
								</div>
							</div>
							<div class="evt-txt-date tc t14">
								<div>{{getTime(item.startTime,1)}}</div>
								<div>{{getTime(item.startTime,2)}}</div>
								<div class="evt-nm">{{judgeRule(item.name)}}</div>
							</div>
						</div>
					
						<div class="evt-table" v-show="!arr.length?false:true">
							<ul v-show="item.markets.length!=0?true:false">
								<li>变化时间</li>
								<li>{{item.markets.length!=0?item.markets[0].selections[0].outComeName:'主胜'}}</li>
								<li>{{item.markets.length?item.markets[0].selections[1].outComeName:'客胜'}}</li>
							</ul>
							<ul v-for="(itm,index) in arr[index]" v-show="item.markets.length!=0?true:false">
								<li>
									<span>{{producTime(itm.messageTime)}}</span>
									<span class="evt-mg"></span>
									<span v-show="index==0?true:false">(最新)</span>
								</li>
								<li>
									<span class="mg-rg">{{tableOdd(itm,1).substr(0,4)}}</span>
									<span class="img-a" v-html="judgeColor(itm.status)">	
									</span>
								</li>
								<li>
									<span class="mg-rg">{{tableOdd(itm,2).substr(0,4)}}</span>
									<span class="img-a" v-html="judgeColor(itm.status1)">	 
									</span>
								</li>
								
							</ul>
						</div>
					</a>
				</section>
				<div class="bg4"></div>
			</section> 
		</section> 

</template>
<script>

	import axios from 'axios'
	import Vue from 'vue'
	import Bus from '../Bus/bus.vue'
		
    export default {
		mounted() {
			
		},
        data() {
			return {
				fontbgColor: '',
				fontColor: ''
			}
		},
		props: ["msg","arr","oTitle"],
		methods: {
			statusFont: function(status) {
				//console.log(status)
					   if (status === 'PreGame' || status === 'Warmup' || status === null) {
						    this.fontbgColor = 'color-coming'
							return '未开始'
						}
						else if (status === 'MapInProgress' || status === 'InPlay' || status === 'GameAbandoned' || status === 'BreakInPlay') {
							this.fontbgColor = 'color-starting'
							return '进行中'
						}
						else if (status === 'MapFinished' || status === 'PostGame' || status === 'Abandoned') {
							this.fontbgColor = 'color-ending'
							return '已完赛'
						}
			},
			getTime: function (time, num) {
				if (num == 1) {
					var time = time.slice(5, 7) + '月' + time.slice(8, 10) + '日';
				} else if (num == 2) {
					var time = time.slice(11, 16);
				}
				return time;
			},
			judgeRule: function (itm) {
				var a = itm.match(/\(([^)]+)\)/)[1];
				//console.log(a)
				return a.substr(0, 3)
			},
			judgeColor: function (str) {
				if (str == 0) {
					return '<img src="static/img/jt_b.png">'
				} else if (str == 1) {
					return ''
				} else if (str == 2) {
					return '<img src="static/img/jt_t.png">'
				} else {
					return ''
				}
			},
			goEvents: function(arr){
				if(!arr.length){
					this.$router.push({
						path: '/LivingEvents'
					})
				}else{
					this.$router.push({
						path: '/JingEvents'
					})
				}
			},
			producTime: function (tim) {
				var oTime = tim.slice(5, 7) + '/' + tim.slice(8, 10) + ' ' + tim.slice(11, 16);
				return oTime
			},
			tableOdd: function (odd, a) {
				//console.log(this.setOdd)
				if (a == 1) {
					if (this.$store.state.setStr == '十进制') {
						return odd.decimal;
					} else {
						return odd.numerator + '/' + odd.denominator;
					}
				} else if (a == 2) {
					if (this.$store.state.setStr == '十进制') {
						return odd.decimal1;
					} else  {
						return odd.numerator1 + '/' + odd.denominator1;
					}
				}
			},
			setStringZhu: function (string, str) {
				var str_before = string.split(str)[0];
				return str_before;
			},
			setStringKe: function (string, str) {
				var str_after = spliceString(string.split(str)[1], '(')
				function spliceString(a, b) {
					return a.split(b)[0];
				}
				return str_after;

			},
			enterDetail: function (arr,id,status,homeName,awayName, leaName, leaRule,time, homeScore,awayScore){
				let obj = {
					status: status,
					homeName: homeName,
					awayName: awayName,
					leaName: leaName,
					leaRule: leaRule,
					time: time,
					homeScore: homeScore,
					awayScore: awayScore
				}
				let str = JSON.stringify(obj)
				localStorage.setItem("headerList", str)
				if (!arr.length) {
					this.$router.push({
						path: '/LivingDetail',
						query: { id: id }
					})
				} else {
					this.$router.push({
						path: '/JingDetail',
						query: { id: id}
					})
				}
			}
		}
    }
</script>
<style scoped>
	
	.color-coming{background:linear-gradient(-135deg, transparent 2em, #ef6095 0);}
	.color-starting{background: linear-gradient(-135deg, transparent 2em, #18d2bb 0);}
	.color-ending{background: linear-gradient(-135deg, transparent 2em, #abbcd6 0);}
</style>