/**
    * Created by zhaozhiqiang on 2018/1/03.
*/
        function statusFont(status, num) {
            if (num == 2) {
                if (status == 'PreGame' || status == 'Warmup' || status == null) {
                    return '未开始'
                }
                else if (status == 'MapInProgress' || status == 'InPlay' || status == 'GameAbandoned' || status == 'BreakInPlay') {
                    return '进行中'
                }
                else if (status == 'MapFinished' || status == 'PostGame' || status == 'Abandoned') {

                    return '已完赛'
                }
                else {

                }
            } else {
                if (status == 'PreGame' || status == 'Warmup' || status == null) {
                    return 'color-coming'
                }
                else if (status == 'MapInProgress' || status == 'InPlay' || status == 'GameAbandoned' || status == 'BreakInPlay') {
                    return 'color-starting'
                }
                else if (status == 'MapFinished' || status == 'PostGame' || status == 'Abandoned') {
                    return 'color-ending'
                }

            }
        }
        /* statusFontColor: function (status) {
            //console.log(status)
            if (status == 'PreGame' || status == 'Warmup' || status == null) {
                return 'evt-txt-date'
            }
            else if (status == 'MapInProgress' || status == 'InPlay' || status == 'GameAbandoned' || status == 'BreakInPlay') {
                return 'evt-ing-colr'
            }
            else if (status == 'MapFinished' || status == 'PostGame' || status == 'Abandoned') {
                return 'evt-dat-colr'
            }
        },
        //主页时间操作
        getTime: function (time, num) {
            if (num == 1) {
                var time = time.slice(5, 7) + '月' + time.slice(8, 10) + '日';
            } else if (num == 2) {
                var time = time.slice(11, 16);
            }
            return time;
        },
        //获取主页比赛规则
        judgeRule: function (itm) {
            var a = itm.match(/\(([^)]+)\)/)[1];
            //console.log(a)
            return a.substr(0, 3)
        },
        statusHandle: function (status) {
            if (status == 'PreGame' || status == 'Warmup' || status == null) {
                return '1'
            }
            else if (status == 'MapInProgress' || status == 'InPlay' || status == 'GameAbandoned' || status == 'BreakInPlay') {
                return '2'
            }
            else if (status == 'MapFinished' || status == 'PostGame' || status == 'Abandoned') {

                return '3'
            }
        },
        handleData: function (arr) {
            var temporaryStorage = arr;
            arr.forEach(function (item, index) {
                var str = item.selectionAlls;
                for (var i = 0; i < str.length - 1; i++) {
                    //console.log(i)
                    for (var j = i + 1; j < str.length; j++) {

                        if (str[i].decimal < str[j].decimal) {
                            str[i].status = 0;
                        } else if (str[i].decimal == str[j].decimal) {
                            str[i].status = 1;
                        } else {
                            str[i].status = 2;
                        }
                        break;
                    }
                }
                for (var j = 0; j < temporaryStorage.length; j++) {
                    temporaryStorage[j].selectionAlls = str;
                }

            })
            return temporaryStorage;

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
                for (key in item) {
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
        },
        producTime: function (tim) {
            var oTime = tim.slice(5, 7) + '/' + tim.slice(8, 10) + ' ' + tim.slice(11, 16);
            return oTime
        },
        judgeColor: function (str) {
            if (str == 0) {
                return '<img src="img/jt_b.png">'
            } else if (str == 1) {
                return ''
            } else if (str == 2) {
                return '<img src="img/jt_t.png">'
            } else {
                return ''
            }
        },
        judgeFontColor: function (str) {
            if (str == 0) {
                return 'evt-green'
            } else if (str == 1) {
                return ''
            } else if (str == 2) {
                return 'evt-red'
            } else {
                return ''
            }
        },
        overAllOdd: function (odd) {
            if (localStorage.getItem("setRule") == 2) {
                return odd.numerator + '/' + odd.denominator;
            } else if (localStorage.getItem("setRule") == 1 || !localStorage.getItem("setRule")) {
                return odd.decimal;
            }
        },
        tableOdd: function (odd, a) {

            if (a == 1) {
                if (localStorage.getItem("setRule") == 2) {
                    return odd.numerator + '/' + odd.denominator;
                } else if (localStorage.getItem("setRule") == 1 || !localStorage.getItem("setRule")) {
                    return odd.decimal;
                }
            } else if (a == 2) {
                if (localStorage.getItem("setRule") == 2) {
                    return odd.numerator1 + '/' + odd.denominator1;
                } else if (localStorage.getItem("setRule") == 1 || !localStorage.getItem("setRule")) {
                    return odd.decimal1;
                }
            }
        },
        tip: function () {
            return '<section class="kong-pop tc"><img src="img/nn.png"></section>';
        },
        tipNoCenter: function () {
            return '<section class="tc"><img src="img/nn.png"></section>';
        },
        arrRepet: function (Array) {

            var temp = []; //一个新的临时数组
            for (var i = 0; i < Array.length; i++) {
                if (temp.indexOf(Array[i]) == -1) {
                    temp.push(Array[i]);
                }
            }
            return temp;
        },
        deletElement: function (arr, b) {
            var temp = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] != b) {
                    temp.push(arr[i])
                }
            }
            localStorage.setItem("a", temp)
            console.log(temp)
            //return temp
        },
        arrEnd: function () {
            var arrEnd = [];
            $(".shaix-nav li").each(function () {
                if ($(this).attr("class") == "shaix-hover" && $(this).text() == '热门') {
                    $(".screen-box-living div").each(function () {
                        if ($(this).attr("data-xuan") == 1) {
                            arrEnd.push($(this).attr("data-id"));
                        }
                    })
                    console.log(arrEnd)

                } else {
                    $(".screen-box-living div").each(function () {
                        if ($(this).attr("data-xuan") == 1) {
                            arrEnd.push($(this).attr("data-id"));
                        }
                    })

                }


            })
            var a = arrEnd;
            //			console.log(a)
            function unique(a) {
                var res = a.filter(function (item, index, array) {
                    return array.indexOf(item) === index;
                });

                return res.join(',');
            }
            //console.log(unique(a))
            return unique(a);
        },
        chioceAlling: function () {

            var arr = [];
            //var flag = false;
            $(".screen-box-living div").each(function () {

                $(this).click(function () {

                    if ($(this).attr('data-select') == 0) {

                        $(this).attr("data-xuan", 1);
                        $(this).addClass("fonActive");
                        $(this).find('.scr-img2 img').attr("src", 'img/gouxuan.png');
                        $(this).find('.scr-img img').attr("src", 'img/csgo05.png');
                        $(this).attr('data-select', 1);
                        var arrEnd = [];
                        $(".screen-box-living div").each(function () {
                            if ($(this).attr("data-xuan") == 1) {
                                arrEnd.push($(this).attr("data-id"));
                            }
                        })
                        if ($(".screen-box-living div").length == arrEnd.length) {
                            //$(".zhao").show();
                            $('.scr-fot-img img').attr("src", 'img/gouxuan.png');
                        }
                    } else {
                        console.log(777)
                        $(this).attr("data-xuan", 0);
                        $(this).removeClass("fonActive");
                        $(this).find('.scr-img2 img').attr("src", 'img/weixuan.png');
                        $(this).find('.scr-img img').attr("src", 'img/csgo04.png');
                        $(this).attr('data-select', 0)
                        var arrEnd = [];
                        $(".screen-box-living div").each(function () {
                            if ($(this).attr("data-xuan") == 1) {
                                arrEnd.push($(this).attr("data-id"));
                            }
                        })
                        if ($(".screen-box-living div").length != arrEnd.length) {
                            //$(".zhao").hide();
                            $('.scr-fot-img img').attr("src", 'img/weixuan.png')
                        }
                    }

                })



            });
            //点击全选
            //var oFlag = false;
            $(".all-select-living").click(function () {
                var allEnd = [];
                $(".screen-box-living div").each(function () {
                    if ($(this).attr("data-select") == 1) {
                        allEnd.push($(this).attr("data-id"));
                    }
                })
                if ($(".screen-box-living div").length == allEnd.length) {
                    $(".screen-box-living div").attr("data-xuan", 0);
                    $('.scr-fot-img img').attr("src", 'img/weixuan.png');
                    $('.screen-box-living img').attr("src", 'img/weixuan.png');
                    $(".screen-box-living div").removeClass("fonActive");
                    $(".screen-box-living div").find('.scr-img img').attr("src", 'img/csgo04.png');
                    //$(".zhao").hide();
                    $(".screen-box-living div").each(function () {
                        $(this).attr("data-select", 0);
                    })
                } else {
                    $('.scr-fot-img img').attr("src", 'img/gouxuan.png');
                    $(".screen-box-living div").attr("data-xuan", 1);
                    $('.screen-box-living .scr-img2 img').attr("src", 'img/gouxuan.png');
                    $(".screen-box-living div").addClass("fonActive");
                    $(".screen-box-living div").find('.scr-img img').attr("src", 'img/csgo05.png');
                    //$(".zhao").show();
                    $(".screen-box-living div").each(function () {
                        $(this).attr("data-select", 1);
                    })
                }
            })
        },
        loader: function (val) {
            $("#loader").remove();
            if (!val || val == "hide") return false;
            h = '<div class="loader" id="loader">加载中</div>';
            $("body").prepend(h);
            return false;
        },
        loaderDown: function (val) {
            $("#loader").remove();
            if (!val || val == "hide") return false;
            h = '<div class="loaderDown" id="loader">加载中</div>';
            $("body").prepend(h);
            return false;
        },
        //插入不同页面
        statusType: function (status) {
            if (status == '1') {
                return '#coming'
            }
            else if (status == '2') {
                return '#starting'
            }
            else if (status == '3') {

                return '#ending'
            }
        },
        allSelect: function () {
            return '<section class="screen-footer"><div class="all_select"><div class="dl scr-fot-img" id=""><img src="img/weixuan.png"></div><div class="dl t15">全选</div></div><a href="javascript:;" class="dr enter">确定</a></section>';
        },
        //url/对象互转
        get_url_num: function () {
            var url = location.search;
            // console.log(url);
            json = {};
            if (url.indexOf("?") === -1) return {};
            var arr = url.substr(1).split("&");
            for (var i = 0, len = arr.length; i < len; i++) {
                json[arr[i].split("=")[0]] = arr[i].split("=")[1];
            }
            //console.log(json);
            return json;
        },
        judge_score_current_color_zhu: function (winner) {
            if (winner == 'TeamOne') {
                return 'oneColor';
            } else if (winner == 'TeamTwo') {
                return '';
            } else {
                return '';
            }
        },
        judge_score_current_color_ke: function (winner) {
            if (winner == 'TeamOne') {
                return '';
            } else if (winner == 'TeamTwo') {
                return 'oneColor';
            } else {
                return '';
            }
        },
        judgeWinnerZhu: function (str) {
            if (str == "Winner") {
                return '<img src="img/pop5.png">';
            } else {
                return '';
            }

        },
        judgeWinnerKe: function (str) {

            if (str == "Winner") {
                return '<img src="img/pop5.png">';
            } else {
                return '';
            }

        },
        setStringZhu: function (string, str) {
            var str_before = string.split(str)[0];
            return str_before;
        }
        setStringKe: function (string, str) {
            var str_after = spliceString(string.split(str)[1], '(')
            function spliceString(a, b) {
                return a.split(b)[0];
            }
            return str_after;

        }
        setData: function (str) {
            console.log(str)
            var month = str.slice(5, 7);//月
            var day = str.slice(8, 11);//日
            var year = str.slice(0, 4);//年

            return year + '-' + month + '-' + day;
        } */