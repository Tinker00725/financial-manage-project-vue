<template>
  <el-aside width="200px">
        <!-- 导航栏 -->
        <el-menu 
        router
          :default-active="path" 
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
        <!-- 首页 -->
        <el-menu-item index="/layout/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <!--贷款申请  -->
          <el-menu-item index="/layout/loan-application">
            <i class="el-icon-s-order"></i>
            <span slot="title">贷款申请</span>
          </el-menu-item>
          <!-- 申请管理 -->
          <el-menu-item index="/layout/loan-manage">
            <i class="el-icon-menu"></i>
            <span slot="title">申请管理</span>
          </el-menu-item>
          <!-- 贷款审批，有子集-->
          <el-submenu index="/layout/loan-approve">
            <template slot="title">
              <i class="el-icon-s-platform"></i>
              <span>贷款审批</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/layout/loan-approve/first">初审</el-menu-item>
              <el-menu-item index="/layout/loan-approve/end">终审</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 标的管理 -->
          <el-menu-item index="/layout/loan-target">
            <i class="el-icon-s-management"></i>
            <span slot="title">标的管理</span>
          </el-menu-item>
          <!-- 权限管理，有子集 -->
          <el-submenu index="/layout/loan-permission">
            <template slot="title">
              <i class="el-icon-s-grid"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/layout/loan-permission-createAdministor">创建管理员</el-menu-item>
              <el-menu-item index="/layout/loan-permission-listShow">列表展示</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
export default {
    name:'navListComponent',
    data(){
      return {
        path:''
      }
    },
    mounted(){
        this.path = '/layout/'+this.$route.name
    },
    watch:{
      $route(){
        this.path = '/layout/'+this.$route.name
      }
    },
}
</script>

<style>
.el-menu{
  height: 100%;
  /* 适应屏幕宽度vw,适应屏幕高度vh */
}
</style>