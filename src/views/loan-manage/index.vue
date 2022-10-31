<template>
  <div>
    <!-- 搜索栏 -->
    <SearchComponent :getData="getData" :updateName="updateName"></SearchComponent>
    <!-- 表格 -->
    <SearchListComponent ></SearchListComponent>
    <!-- 分页 -->
    <SearchPagenation :getData="getData" :updataPageSize="updataPageSize" :updataPageNo="updataPageNo" :info="info"></SearchPagenation>
  </div>
</template>

<script>
import SearchComponent from "@/views/searchComponent";
import SearchListComponent from '@/views/loan-manage/searchListComponent';
import SearchPagenation from '@/views/searchPager'
import { mapState } from 'vuex';
export default {
  name: "loan-manage",
  components: {
    SearchComponent,
    SearchListComponent,
    SearchPagenation
  },
  computed:{
    pageInfo(){
      return this.$store.state.loan.info
    },
    ...mapState('loan',['info'])
  },
  mounted(){
    // 获取申请贷款管理的人员信息
    this.getData(this.info);
  },
  methods:{
    // 搜索数据2 获取数据
    async getData(info){
      await this.$store.dispatch('loan/getManegeUser',info)
    },
    // 搜索数据1 更新name
    async updateName(str){
      await this.$store.commit('loan/UPDATAINFONAME',str);
    },
    // 更新当前页码
    async updataPageSize(val){
      this.$store.commit('loan/UPDATAPAGESIZE',val);//更新
    },
    // 更新页容量
    async updataPageNo(val){
      await this.$store.commit('loan/UPDATAPAGENO',val)//更新
    }
  },
};
</script>
<style scoped>
</style>
