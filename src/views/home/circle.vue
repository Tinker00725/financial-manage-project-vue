<template>
  <div ref="chart" style="width: 600px; height: 400px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "CircleComponent",
  methods: {
    show() {
      var myChart = echarts.init(this.$refs.chart);
      var option;

      option = {
        title: {
          text: "月度贷款金额",
          subtext: "Monthly loan amount",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "图表",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "第一星期" },
              { value: 580, name: "第二星期" },
              { value: 484, name: "第三星期" },
              { value: 300, name: "第四星期" },
            ],
            emphasis: {//hover阴影
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
  mounted(){
    this.show()
  }
};
</script>

<style></style>
