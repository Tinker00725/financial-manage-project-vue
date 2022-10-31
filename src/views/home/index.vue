<template>
  <div>
    <h3 class="title">首页</h3>
    <ShowBoxs></ShowBoxs>
    <div class="chartBox">
      <Chart></Chart>
      <CircleComponent></CircleComponent>
    </div>
  </div>
</template>

<script>
import ShowBoxs from '@/views/home/showBoxs.vue';
import Chart from './chart.vue';
import CircleComponent from './circle.vue';
export default {
  name:'home',
  components:{
    ShowBoxs,
    Chart,
    CircleComponent,
  }
}
</script>

<style scoped>
.chartBox{
  display: flex;
}
.title{
  line-height: 30px;
  text-align: left;
  margin:0;
  margin-bottom: 15px;
}
</style>