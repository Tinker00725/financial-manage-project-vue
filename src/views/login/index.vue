<template>
  <div class="container">
    <div class="mask"></div>
    <!-- 卡片 -->
    <el-card class="box-card" style="z-index:1">
  <div slot="header" class="clearfix">
    <span>登录</span>
  </div>
  <!-- 登录内容 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

  <el-form-item label="用户名" prop="account">
    <el-input v-model="ruleForm.account"></el-input>
  </el-form-item>

  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="ruleForm.password"></el-input>
  </el-form-item>
  <el-form-item >
    <el-button type="primary" @click="submitForm('ruleForm')" class="login">登录</el-button>
  </el-form-item>
</el-form>
</el-card>
  </div>
</template>

<script>
import { msgBox } from '@/utils/message';
export default {
  name:'login',
  data() {
      return {
        ruleForm: {//ruleForm是表单的model部分
          account:'',
          password:'',
        },
        rules: {
          account: [//trigger 触发时机（现在是失焦触发）
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [//trigger 触发时机（现在是失焦触发）
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      // 账号密码的校验
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {//校验成功
            let result = await this.$store.dispatch('user/getToken',this.ruleForm)
            if(result){
              this.$router.push('/layout/home')
            }
          } else {
            let str = '请填写正确的账号密码'
            msgBox('warning',str)
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped >

.container{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background:url('@/assets/img/星空图.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.mask{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(1, 1, 1, 0.1);
  backdrop-filter: blur(2px);
  z-index: 1;
}
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .clearfix{
    text-align: center;
  }

  .box-card {
    width: 480px;
  }
</style>