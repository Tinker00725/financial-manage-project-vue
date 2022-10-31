<template>
   <div class="block">
    <el-pagination
    ref="pager"
        background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="info.pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="info.pageSize"
      layout="total,sizes, prev, pager, next, jumper"
      :total="+info.rows">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name:'Pagenation',
  props:['updataPageSize','getData','updataPageNo','info'],
  methods:{
    // pager当前pageSize改变的时候调用
    handleSizeChange(val){
      this.updataPageSize(val);
      this.getData(this.info)
    },
    // pager当前pageNo改变的时候调用
    handleCurrentChange(val){
      this.updataPageNo(val)
      this.getData(this.info)
    },
    
  }
}
</script>

<style>
.block{
    margin-top:20px;
}

</style>