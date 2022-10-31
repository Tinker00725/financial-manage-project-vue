<template>
  <el-card>
<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="ruleForm.password" type="password"  autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="password2">
    <el-input v-model="ruleForm.password2" type="password"  autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="权限分配" prop="role_id" class="select">
    <el-radio-group v-model="ruleForm.role_id">
      <el-radio label="2">销售人员</el-radio>
      <el-radio label="1">审核人员</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</el-card>
</template>

<script>
export default {
    name:'permission-createAdministor',
    data() {
      let validatePassword = (rule,value,callback)=>{
        if(value !== this.ruleForm.password){
          callback(new Error('两次输入密码不一致!'))
        }else{
          callback()//不写会导致验证一致加载
        }
          }
      return {
        ruleForm: {
          name: '',
          password:'',
          password2:'',
          role_id:''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
          ], 
          password2: [
            { required: true, message: '请再次确认密码', trigger: 'blur' },
            {required:true,trigger:'blur',validator:validatePassword}
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let {name,password,role_id} = this.ruleForm;
            let info = {account:name,password,role_id}
            this.$store.dispatch('permission/submitCreate',info);
            this.$router.push('/layout/loan-permission/listShow')
          } else {
            this.$message({
              type:'error',
              message:'创建失败',
              duration:2000,
            })
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>

<style scoped>
.select{
  text-align: left;
}
</style>