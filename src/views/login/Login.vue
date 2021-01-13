<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li :class="{'current': item.isActive}" v-for="item in menuTab" :key="item.id" @click="toggleMenu(item)">{{item.txt}}</li>
            </ul>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form">
                <el-form-item prop="email" class="item-form">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.email" autocomplete="off" size="medium"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass" class="item-form">
                    <label>密码</label>
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"  size="medium" minlength='6' maxlength='20'></el-input>
                </el-form-item>
                <el-form-item prop="vCode" class="item-form">
                    <label>验证码</label>
                     <el-row :gutter="10">
                    <el-col :span="15"><el-input v-model.number="ruleForm.vCode"  size="medium" minlength='6' maxlength='6'></el-input></el-col>
                    <el-col :span="9"><el-button type="success" class="block">获取验证码</el-button></el-col>
                </el-row>
                </el-form-item>
                <el-form-item  class="item-form">
                    <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data(){
      var validateEmail = (rule, value, callback) => {
        let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if(!reg.test(value)){
          callback(new Error('请输入正确的邮箱'));
        }else{
            callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        let reg = /^.*(?=.{6,20})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if(!reg.test(value)){
            callback(new Error('6-20位，包含大写字母，小写字母，数字，特殊字符'));
        }else{
          callback();
        }
      };
      var checkVCode = (rule, value, callback) => {
        let reg = /^[a-z\d]{6}$/;
        if (value === '') {
          return callback(new Error('验证码不能为空'));
        }else if (!reg.test(value)){
            return callback(new Error('验证码格式不正确'));
        }else{
            callback();
        }
      };
      return {
        menuTab:[
                {txt:'登录',isActive:true},
                {txt:'注册',isActive:false}
            ],
        isActive: true,
        ruleForm: {
          email: '',
          checkPass: '',
          vCode: ''
        },
        rules: {
          email: [
            { validator: validateEmail, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          vCode: [
            { validator: checkVCode, trigger: 'blur' }
          ]
        }
      };
    },
    methods:{
        toggleMenu(data){
            this.menuTab.forEach(menu =>{
                menu.isActive = false
            })
            data.isActive = true
        },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
}
</script>

<style lang="scss" scoped>
#login{
    height: 100vh;
    background-color: #344a5f;
}
 .login-wrap{
     width: 330px;
     margin: auto;
 }

 .menu-tab{
     text-align: center;
     li{
         display: inline-block;
         width: 88px;
         font-size: 14px;
         line-height: 36px;
         color: #fff;
         border-radius: 2px;
         cursor: pointer;
     }
 }

 .current{
     background-color: rgba(0, 0, 0, .1);
 }

 .login-form{
     margin-top: 29px;
     label{
         display: block;
         font-size: 14px;
         color: #fff;
         margin-top: 3px;
     }
 }
 .item-form{
     margin-bottom: 13px;
 }
 .block{
     display: block;
     width: 100%;
 }
 .login-btn{
     margin-top: 19px;
 }
</style>