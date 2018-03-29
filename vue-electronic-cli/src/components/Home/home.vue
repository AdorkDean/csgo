<template>
<section>
	<v-header :headLine="headLine" :type="type"></v-header>
	<v-slider></v-slider>
	<v-imgBox></v-imgBox>	
	<v-competition :msg="livingEventData" :arr="arrNull" :oTitle="true" :idx="idx"></v-competition>
	<v-competition :msg="jingEventData" :arr="arr" :oTitle="true" :idx="idxx"></v-competition>
</section>
</template>
<script>

	import header from '../Header/header.vue'
	import slider from '../Slider/slider.vue'
	import imgBox from '../ImgBox/imgBox.vue'
	import competition from '../Competition/competition.vue'

    export default {
		name: 'home',
		mounted() {
			this.oLoad()
		},
        data() {
            return {
				livingEventData: [],
				jingEventData: [],
				arr: [],
				arrNull:[],
				headLine: '电子竞技',
				type: false,
				idx:[],
				idxx: []
            }
		},
		methods: {
			oLoad() {
				this.$http.get('/interface/v2/homePage')
					.then(response => {
						this.livingEventData = response.data.result.skArr;
						this.jingEventData = response.data.result.plArr;
						let jingData = response.data.result.plArr;
						let window = this;
						let arr = []
						let idx = []
						let idxx = []
						jingData.forEach(function (item, index, input) {
							//赔率表格
							let oddTable1 = item.markets[0].selections[0].selectionAlls;//主胜赔率
							//console.log(oddTable1)
							let oddTable2 = item.markets[0].selections[1].selectionAlls;//客胜赔率
							let a = item.markets[0].selections[0].id;
							let b = item.markets[0].selections[1].id;
							let setObject = window.$options.methods.setObject(a, b, oddTable1, oddTable2)
							arr.push(setObject)
							idx.push(index)
						})
						this.arr = arr
						this.idx = idx
						this.idxx = idxx
					})
					.catch(error => {
						console.log(error);
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
					item.id = a
				})
				$(oddTable2).each(function (index, item) {
					item.id = b
				})

				var array1 = oddTable1
				var array2 = []

				$(oddTable2).each(function (index, item) {
					var object2 = {};
					for (let key in item) {
						object2[key + '1'] = item[key]
					}
					array2.push(object2)
				})

				var nerArr = []
				for (var i = 0; i < array1.length; i++) {
					for (var j = 0; j < array2.length; j++) {
						if (i == j) {
							var f = $.extend(array1[i], array2[j])
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
			'v-slider': slider,
			'v-imgBox': imgBox,
			'v-competition': competition
		}
    }
</script>
<style>
	/* .fo-img{ position:absolute; z-index:99; width:100%;height:100%} */
</style>