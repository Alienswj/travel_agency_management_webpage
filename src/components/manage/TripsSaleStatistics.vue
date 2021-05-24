<template>
    <div class="Echarts">
        <div id="main" style="width: 600px; height: 400px"></div>
    </div>
</template>

<script>
const echarts = require("echarts");
export default {
    name: "Echarts",
    data() {
        return {
            months: [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月",
            ],
            sale: [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        };
    },
    methods: {
        SaleEChart() {
            // 基于准备好的dom，初始化echarts实例
            var SaleChart = echarts.init(document.getElementById("main"));
            var option = {
                title: {
                    text: "月度销量统计",
                },
                tooltip: {},
                legend: {
                    data: ["销量"],
                },
                xAxis: {
                    data: this.months,
                },
                yAxis: {},
                series: [
                    {
                        name: "销量",
                        type: "bar",
                        data: this.sale,
                    },
                ],
            };
            SaleChart.setOption(option);
        },
    },
    mounted() {
        this.$getRequest("/get_sale_group_by_month").then((resp) => {
            console.log(resp);
        });
        this.SaleEChart();
    },
};
</script>

<style scoped>
</style>