<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="12" :lg="6" v-for="list of lists" :key="list.name">
      <div
        class="grid-content bg-purple"
        :style="{background:list.color}"
      >
      <!-- 动态的style绑定 -->
        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ list.name }}
          </div>
          <CountTo
            :start-val="0"
            :end-val="list.number"
            :duration="list.duration"
          ></CountTo>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";
export default {
  name: "showBoxs",
  data() {
    return {
      lists: [
        {
          name: "最高可借金额",
          color: "#67ca3a",
          number: 13594,
          duration: 1500,
        },
        {
          name: "回报率",
          color: "#f60",
          number: 9833,
          duration: 1500,
        },
        {
          name: "业绩领跑",
          color: "#f56c6c",
          number: 8888,
          duration: 1500,
        },
        {
          name: "安稳底薪战队",
          color: "#409eff",
          number: 6666,
          duration: 1500,
        },
      ],
    };
  },
  components: {
    CountTo,
  },
};
</script>

<style lang="scss">
.card-panel-description {
  height: 150px;
  line-height: 40px;
  font-weight: bolder;
  font-size: larger;
  color: white;
}
.card-panel-text {
  font-weight: 800;
  font-size: larger;
  height: 60px;
  line-height: 60px;
  color: black;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
