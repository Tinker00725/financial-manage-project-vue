<template>
   <div ref="chart" style="width: 600px;height:400px;"></div>
</template>

<script>
import * as echarts from 'echarts';//echarts5的引入方式
export default {
    name:'chart',
    methods:{
        show(){
        var myChart = echarts.init(this.$refs.chart);

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '贷款季度数据'
        },
        tooltip: {},
        legend: {
          data: ['数额']
        },
        xAxis: {
          data: [ '第一季度', '第二季度', '第三季度', '第四季度']
        },
        yAxis: {},
        series: [
          {
            name: '数额',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
        }
    },
    mounted(){
        this.show();
    }
}
</script>

<style>

</style>