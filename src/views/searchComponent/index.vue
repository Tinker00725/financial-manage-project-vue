<template>
      <el-form ref="info">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" class="container">
          <el-form-item prop="name" class="input" >
            <el-input v-model="str" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="search" @click="startSearch" >搜索</el-button>
            <!-- type表示button样式 -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
</template>

<script>
import { msgBox } from '@/utils/message';
import { mapState } from 'vuex';
export default {
    name:'SearchComponent',
    props:['getData','updateName'],
    data(){
      return {
        str:''
      }
    },
    computed:{
      ...mapState('loan',['info'])
    },
    methods:{
      async startSearch(){
        if(!this.str){
          return msgBox('warning','搜索不能为空')
        }
        this.updateName(this.str);
        this.getData();
      }
    }
}
</script>

<style scoped>
.container{
  display: flex;
  width: 80%;
  justify-content: space-between;
}
.input{
  width: 100%;
}
.search{
  margin-left: 20px;
}
</style>