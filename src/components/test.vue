<template>
    <div>
        测试 <el-button @click="test">test</el-button>
        <div id="main" style="width: 600px; height: 400px"></div>
    </div>
</template>
<script>
const echarts = require("echarts");
export default {
    name: "Test",
    data() {},
    methods: {
        test() {
            let date = Date.parse("2020-01-02");
            console.log(date, Date.now(), date > Date.now(), date < Date.now());
        },
        myEcharts() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById("main"));

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: "ECharts 入门示例",
                },
                tooltip: {},
                legend: {
                    data: ["销量"],
                },
                xAxis: {
                    data: [
                        "衬衫",
                        "羊毛衫",
                        "雪纺衫",
                        "裤子",
                        "高跟鞋",
                        "袜子",
                    ],
                },
                yAxis: {},
                series: [
                    {
                        name: "销量",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 20],
                    },
                ],
            };
            // SaleEChart() {
            //     var SaleChart = echarts.init(document.getElementById("main"));
            //     var option={
            //         title:{
            //             text:"月度销量统计",
            //         },
            //         tooltip:{},
            //         legend:{
            //             data:["销量"],
            //         },
            //         xAxis:{
            //             data:[

            //             ]
            //         },
            //         yAxis:{},
            //         series:[
            //             {

            //             }
            //         ]
            //     };
            //     SaleChart.setOption(option);
            // },

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
    },
    mounted() {
        this.myEcharts();
    },
};
</script>
<style scoped>
</style>