<template>
  <div>
    <!-- 搜索栏 -->
    <searchComponent
      :getData="getData"
      :updateName="updateName"
    ></searchComponent>
    <el-table
      :data="tableData"
      :stripe="true"
      style="{width: 100%;}">
      <el-table-column prop="name" label="姓名" width="250"> </el-table-column>
      <el-table-column prop="identity_card" label="身份证号码" width="300">
      </el-table-column>
      <el-table-column prop="status" label="合同状态" width="300">
        <template slot-scope="{row}">
          <el-tag :type="row.status | filterContractStatus">{{row.status | filterContractContent}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" calss="action">
        <template slot-scope="{ row }">
          <el-button size="mini" type="primary" @click="createContract(row)" :disabled="judgmentBtn(row.status)"
            >生成合同</el-button
          >
          <el-button size="mini" type="success" @click="downloadContract(row)" :disabled="!judgmentBtn(row.status)"
            >下载合同</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 页脚 -->
    <SearchPager
      :getData="getData"
      :updataPageSize="updataPageSize"
      :updataPageNo="updataPageNo"
      :info="info"
    ></SearchPager>
  </div>
</template>

<script>
import SearchComponent from "@/views/searchComponent";
import SearchPager from "@/views/searchPager";
import { mapState } from "vuex";
export default {
  name: "loan-contract",
  components: {
    SearchComponent,
    SearchPager,
  },
  data() {
    return {
      form: {},
      formLabelWidth: "120px",
    };
  },
  computed: {
    ...mapState("contract", ["info", "tableData"]),
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取数据
    async getData() {
      await this.$store.dispatch("contract/getcontracUser", this.info);
    },
    // 搜索数据1 更新name
    async updateName(str) {
      await this.$store.commit("contract/UPDATAINFONAME", str);
    },
    // 更新当前页码
    async updataPageSize(val) {
      this.$store.commit("contract/UPDATAPAGESIZE", val); //更新
    },
    // 更新页容量
    async updataPageNo(val) {
      await this.$store.commit("contract/UPDATAPAGENO", val); //更新
    },
    // 判断按钮是否可按
    judgmentBtn(state){
      return state == 5 ? false:true;
    },
    // 生成合同
    async createContract(row){
      try{
        await this.$store.dispatch('contract/createLoanerContrate',row)
        this.getData();
      }catch(e){
        console.log(e)
      }
    },
    // 下载合同
    async downloadContract(row){
      try{
        let res = await this.$store.dispatch('contract/downloadLoanerContract',row.id);
          this.$notify({
            title: "下载合同",
            message: "下载合同提交成功",
            type: "success",
            duration: 2000,
          });
          let {url} = res;//url地址不需要拼接，已设置代理；
          this.getDocument(url)
      }catch(e){
        console.log(e)
      }
    },
    // 获取流文件
    getDocument(url){
      let xhr = new XMLHttpRequest();
      xhr.open('GET',url,true);
      xhr.responseType = 'blob';
      xhr.setRequestHeader('token',sessionStorage.getItem('TOKEN'));
      xhr.onload = () => {
        if(xhr.status === 200){
          // console.log(xhr.responseURL)//可用于获取文件名
          // console.log(xhr.response)//blob文件
          const filename = xhr.responseURL.slice(xhr.responseURL.lastIndexOf('/')+1);
          this.saveAs(filename,xhr.response)
        }
      };
      xhr.send();
    },
    // 通过流文件解码url发送到下载地址
    saveAs(name,data){
      let urlObject = window.URL;//window.URL专门用于将blob读取成一个url
      let export_blob = new Blob([data]);//创建一个存放二进制数据的容器
      let save_link = document.createElement('a');
      save_link.href = urlObject.createObjectURL(export_blob);//通过URL.createObjectURL(blob)可以获取当前文件的一个内存URL
      save_link.download = name;
      save_link.click();
    }
  },
  filters:{
    // 合同状态(样式)
    filterContractStatus(value){
      return (value == 5)?"primay":'success';
    },
    // 合同状态内容
    filterContractContent(value){
      return value == 5 ? '未生成合同':'已生成合同';
    }
  }
};
</script>

<style></style>
