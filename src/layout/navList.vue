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
        <TinyList v-for="route of routes" :key="route.name" :item="route" :basePath="route.path"></TinyList>
        </el-menu>
    </el-aside>
</template>

<script>
import TinyList from '@/layout/navListTiny.vue'
import { mapState } from 'vuex';
export default {
    name:'navListComponent',
    components:{TinyList},
    data(){
      return {
        path:''
      }
    },
    computed:{
      ...mapState('routeGuard',['routes'])
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