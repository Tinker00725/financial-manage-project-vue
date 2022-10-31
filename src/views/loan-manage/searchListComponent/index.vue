<template>
    <div>
      <el-table
    :data="tableData"
    :stripe='true'
    style="{width:100%}">
    <el-table-column
      prop="name"
      label="姓名"
      width="100"
     >
    </el-table-column>
    <el-table-column
      prop="birthday"
      label="出生日期"
      width="100"
      >
      <template slot-scope="scope">
        <span>{{scope.row.birthday | birthdatFilter}}</span>
        <!-- 过滤器 -->
    </template>
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="90"
      >
      <template slot-scope="scope">
        <span>{{scope.row.sex | sexFilter}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="education"
      label="教育程度"
      width="100"
    >
    <template slot-scope="scope">
      <span>{{scope.row.education | educationFilter}}</span>
    </template>
    </el-table-column>
    <el-table-column
      prop="address1"
      label="居住地址" width="200px">
    </el-table-column>
    <el-table-column
      prop="mobile_phone"
      label="手机号"
      width="120px"
     >
    </el-table-column>
    <el-table-column
      prop="status"
      label="申请状态"
      width="100px"
      >
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | getStatustype" plain class="showType" >{{scope.row.status | statusCondition}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作" 
      calss="action">
      <template slot-scope="{row}">
        <el-button
        size="mini"
        type='primary'
        :disabled="disableCase(row.status)"
        @click="showEditBox(row)"
        >编辑</el-button>
        <el-button
        size="mini"
        type="danger"
        :disabled="disableCase(row.status)"
        @click="deleteUser(row)"
        >删除</el-button>
          <el-button
          size="mini"
          type="success"
          :disabled="disableCase(row.status)"
          @click="submitUser(row)"
          >提交审核</el-button>
          
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出对话框 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" center>
        <el-form :model="form" >
          <el-form-item label="名字" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form.sex" placeholder="请选择性别" style="width:300px">
              <el-option label="男" value="man"></el-option>
              <el-option label="女" value="woman"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelEditBox">取 消</el-button>
      <el-button type="primary" @click="confirmEditBox">确 定</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
import statusJudgement from '@/views/loan-manage/searchListComponent/statusJudgement'
import { mapState } from 'vuex';
import { msgBox } from '@/utils/message';
export default {
    name:'SearchList',
    data(){
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          sex: '',
        },
        confirmBox:{},
        formLabelWidth: '120px'
      }
    },
  computed:{
    ...mapState('loan',['tableData','info']),
  },
  methods:{
    // 获取信息
    getData(){
      this.$store.dispatch('loan/getManegeUser',this.info)
    },
        // 按钮禁用的情况
    disableCase(status){
        let disCondition = [1,4,5,7];
        return (disCondition.includes(status))?true:false;
    },
    // 显示编辑框
    showEditBox(row){
      this.dialogFormVisible = true;
      this.form.name = row.name;
      this.form.sex = row.sex;
      this.confirmBox = {...row};
    },
    // Edit点击取消后
    cancelEditBox(){
      this.dialogFormVisible = false;
      msgBox('warning','取消输入');
    },

    // 点击Edit的确定后
    async confirmEditBox(){
      this.dialogFormVisible = false;
    // 有修改
      if(this.form.name !== this.confirmBox.name || this.form.sex !== this.confirmBox.sex){
        let person = {...this.confirmBox,...this.form}
        await this.$store.dispatch('loan/updateLoanUserInfo',person)//更新信息
        this.confirmBox = {};//init对比框
        this.form = {name:'',sex:''}//init双向绑定框
        return this.getData()//重新获取数据
        //采用发送请求的方式比刷新页面更加温和,没有白色刷新(体验不好)
      }
      // 无修改
      msgBox('error','无效修改')
      this.confirmBox = {};
    },
    // 删除用户
    async deleteUser(row){
      let {id} = row;
      try{
        await this.$store.dispatch('loan/deleteUser',id)
        await this.getData();
      }catch(e){
        console.log(e)
      }
    },
    // 提交审核
    async submitUser(row){
      let {id} = row;
      try{
        await this.$store.dispatch('loan/submitUserToApprove',id);
        await this.getData();
      }catch(e){
        console.log(e)
      }

    }
  },

  filters:{
    // 出生日期过滤器
    birthdatFilter(birthday){
      let StrArr = birthday.split('T');
      return StrArr[0];
    },
    // 性别过滤器
    sexFilter(sex){
      if(sex === 'woman') return '女'
      return '男'
    },
    // 教育程度过滤器
    educationFilter(education){
      if(education === 'highschool') return '高中'
      return '本科'
    },
        // 申请状态内容
        statusCondition(status){
        return statusJudgement(status);
    },
        // 申请状态样式
        getStatustype(status){
        return (status == 3 || status == 6)?'danger':'success';
    },
  },

}
</script>

<style>
</style>