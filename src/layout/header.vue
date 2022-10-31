<template>
  <div class="container">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in list " :key="item.item">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 退出登录 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        退出<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><span @click="logout">退出登录</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "headerCompoent",
  data() {
    return {
      list:[],
    };
  },
  watch:{
    $route(){
      this.titleWord();
    }
  }, 
  mounted(){
    this.titleWord()
  },
  methods: {
    // 退出
    async logout() {//这里后端后端传回来的数据有问题。所以写死了
        let res = await this.$store.dispatch('user/logoutUser');
        this.$store.state.user.roles = '';
        if(res){
          this.$router.push('/login');
          location.reload();//退出后刷新，重置动态路由的缓存
        }
    },
    // 面包屑
    titleWord(){
      this.list = [];
      let meta = this.$route.meta;
      if(meta.item){
        this.list.push(meta.item)
      }
      if(meta.item2){
        this.list.push(meta.item2)
      }
    }
  },
};
</script>

<style>
.container{
  position: relative;
}
.el-dropdown{
  position: absolute;
  height: 40px;
  font-size: large;
  font-weight: 400;
  top:0px;
  right: 20px;
}
.el-dropdown-menu{
  position: absolute;
  top:50px
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-breadcrumb{
  line-height: 60px;
  font-size: large;
  font-weight: 600;
}
.el-icon-arrow-right{
  color:black
}
</style>
