<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="account"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      width="180">
    </el-table-column>
    <el-table-column
      prop="reg_time"
      label="创建时间">
      <template slot-scope="{row}">
        {{row.reg_time | timeFilter}}
      </template>
    </el-table-column>
    <el-table-column
      prop="creator"
      label="创建者">
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="权限分配">
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
    name:'permisson-listShow',
    data() {
      return {
      }
    },
    mounted(){
      this.getData();
    },
    computed:{
      ...mapState('permission',['tableData']),
    },
    methods:{
      // 获取数据
      getData(){
        this.$store.dispatch('permission/showUserList')
      }
    },
    filters:{
      // 时间过滤器
      timeFilter(value){
        return value.split('T')[0]
      }
    }
}
</script>

<style>

</style>