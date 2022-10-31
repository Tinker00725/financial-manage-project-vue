<template>
    <div>
      <!-- 搜索栏 -->
      <searchComponent :getData="getData" :updateName="updateName"></searchComponent>
      <el-table
        :data="tableData"
        :stripe="true"
        style="{width: 100%;}"
      >
        <el-table-column prop="name" label="姓名" width="400"> </el-table-column>
        <el-table-column prop="identity_card" label="身份证号码" width="400">
        </el-table-column>
        <el-table-column prop="address" label="操作" calss="action">
          <template slot-scope="{ row }">
            <el-button size="mini" type="primary" @click="showEditBox(row)"
              >查看</el-button
            >
            <el-button size="mini" type="success" @click="approveFirstPass(row)"
              >通过</el-button
            >
            <el-button size="mini" type="danger" @click="approveFirstReject(row)"
              >拒绝</el-button
            >
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 页脚 -->
      <SearchPager :getData="getData" :updataPageSize="updataPageSize" :updataPageNo="updataPageNo" :info="info"></SearchPager>
      <!-- 弹出对话框 -->
      <el-dialog title="贷款审批-查看详情" :visible.sync="dialogFormVisible" center>
        <el-form :model="form">
          <el-form-item label="ID:" :label-width="formLabelWidth">
              <span>{{form.id}}</span>
          </el-form-item>
          <el-form-item label="姓名:" :label-width="formLabelWidth">
              <span>{{form.name}}</span>
          </el-form-item>
          <el-form-item label="出生日期:" :label-width="formLabelWidth">
              <span>{{form.birthday}}</span>
          </el-form-item>
          <el-form-item label="性别:" :label-width="formLabelWidth">
              <span>{{form.sex | sexFlt}}</span>
          </el-form-item>
          <el-form-item label="教育程度:" :label-width="formLabelWidth">
              <span>{{form.education | educationFlt}}</span>
          </el-form-item>
          <el-form-item label="居住地址:" :label-width="formLabelWidth">
              <span>{{form.address1}}</span>
          </el-form-item>
          <el-form-item label="手机号:" :label-width="formLabelWidth">
              <span>{{form.mobile_phone}}</span>
          </el-form-item>
          <el-form-item label="身份证号:" :label-width="formLabelWidth">
              <span>{{form.identity_card}}</span>
          </el-form-item>
  
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelEditBox">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import SearchComponent from "@/views/searchComponent";
  import SearchPager from "@/views/searchPager";
  import { mapState } from "vuex";
  export default {
    name: "loan-approve-end",
    components: {
      SearchComponent,
      SearchPager,
    },
    data() {
      return {
        dialogFormVisible: false,
        form: {},
        formLabelWidth: "120px",
      };
    },
    computed: {
      ...mapState("end", ["info", "tableData"]),
    },
    mounted() {
      this.getData();
    },
    methods: {
      // 获取数据
      getData() {
        this.$store.dispatch("end/getFirstUser", this.info);
      },
      // Edit点击取消后
      cancelEditBox() {
        this.dialogFormVisible = false;
      },
      // 搜索数据2 获取数据
      async getData() {
        await this.$store.dispatch("end/getFirstUser", this.info);
      },
      // 搜索数据1 更新name
      async updateName(str) {
        await this.$store.commit("end/UPDATAINFONAME", str);
      },
      // 显示编辑框
      showEditBox(row){
      this.dialogFormVisible = true;
      this.form = row;
      this.form.birthday = this.form.birthday.split('T')[0];
    },
        // 更新当前页码
        async updataPageSize(val){
        this.$store.commit('end/UPDATAPAGESIZE',val);//更新
      },
      // 更新页容量
      async updataPageNo(val){
        await this.$store.commit('end/UPDATAPAGENO',val)//更新
      },
      // 终审通过
      async approveFirstPass(row){
        this.$confirm('此操作将通过当前终审对象, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            try{
          await this.$store.dispatch('end/passUserLoanEnd',row.id)
          this.getData();
      }catch(e){
          console.log(e)
        }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });          
          });
        
      },
      // 终审拒绝
      async approveFirstReject(row){
        this.$confirm('此操作将拒绝当前终审对象, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async() => {
            await this.$store.dispatch('end/rejectLoanUser',row.id)
            this.getData();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });          
          });
      }
  },
  filters:{
      sexFlt(value){
          if(value == 'woman') return '女';
          return '男'
      },
      educationFlt(value) {
          if(value == 'highschool') return '高中';
          return '本科'
      },
  }
  };
  </script>
  
  <style></style>
  