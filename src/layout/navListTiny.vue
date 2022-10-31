<template>
  <div>
    <!-- 无子集 -->
    <el-menu-item :index="resolvePath(item.path)" v-if="!judgmentChild(item)">
        <span slot="title">{{item.meta.item}}</span>
    </el-menu-item>
    <!-- 有子集 -->
    <el-submenu :index="item.path" v-else>
        <template slot="title">
              <span>{{item.meta.item}}</span>
            </template>
        <navListTiny v-for="route of item.children" :key="route.name" :item="route" :basePath="item.path"></navListTiny>
        <!-- 递归实现无限极目录，自身已判断好有无子集展示，调用自身获取有子集的子集 -->
    </el-submenu>
  </div>
</template>

<script>

export default {
    name:'navListTiny',
    props:['item','basePath'],
    methods:{
        judgmentChild(item){//判断有无子集
            return item.hasOwnProperty('children')         
        },
        resolvePath(routePath){//合并无子集的导航路径
            if(routePath == this.basePath){
                return this.basePath;
            }else{
                return this.basePath+'/'+routePath
            }
        }
    }
}
</script>

<style>

</style>