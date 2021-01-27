<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{'current': item.isActive}" v-for="item in menuTab" :key="item.id" @click="toggleMenu(item)">
          {{ item.txt }}
        </li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form">
        <el-form-item prop="email" class="item-form">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.email" autocomplete="off" size="medium"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.password" autocomplete="off" size="medium" minlength='6'
                    maxlength='20'></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" class="item-form" v-if="ruleForm.isShowCheckPass">
          <label>重复密码</label>
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" size="medium" minlength='6'
                    maxlength='20'></el-input>
        </el-form-item>
        <el-form-item prop="vCode" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.vCode" size="medium" minlength='6' maxlength='6'></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="item-form">
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {validateEmailStr, validatePasswordStr, validateVCode} from '@/utils/validate';
import {reactive, ref, isRef, isReactive, onMounted} from '@vue/composition-api'

export default {
  name: 'login',
  setup(prpos, ctx) {
    let validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (!validateEmailStr(value)) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!validatePasswordStr(value)) {
        callback(new Error('6-20位，包含大写字母，小写字母，数字，特殊字符'));
      } else {
        callback();
      }
    };
    let validateCheckPass = (rule, value, callback) => {
      if (ruleForm.isShowCheckPass) {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (!validatePasswordStr(value)) {
          callback(new Error('6-20位，包含大写字母，小写字母，数字，特殊字符'));
        } else if (ruleForm.password !== value) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      }
    };
    let checkVCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('验证码不能为空'));
      } else if (!validateVCode(value)) {
        return callback(new Error('验证码格式不正确'));
      } else {
        callback();
      }
    };

    //setup 中放置data数据，生命周期，自定义函数
    const menuTab = reactive([
      {txt: '登录', isActive: true},
      {txt: '注册', isActive: false}
    ])
    const isActive = ref(true)

    const ruleForm = reactive({
      email: '',
      password: '',
      checkPass: '',
      isShowCheckPass: false,
      vCode: ''
    })

    const rules = reactive({
      email: [
        {validator: validateEmail, trigger: 'blur'}
      ],
      password: [
        {validator: validatePass, trigger: 'blur'}
      ],
      checkPass: [
        {validator: validateCheckPass, trigger: 'blur'}
      ],
      vCode: [
        {validator: checkVCode, trigger: 'blur'}
      ]
    })

    /**
     * 生命周期
     */
    onMounted(() => {

    })

    /**
     * 声明函数
     */
    const toggleMenu = (data => {
      menuTab.forEach(menu => {
        menu.isActive = false
      })
      data.isActive = true
      ruleForm.isShowCheckPass = data.txt === '注册';
    })

    const submitForm = (formName => {
      ctx.refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    })
    return {
      menuTab,
      isActive,
      ruleForm,
      rules,
      toggleMenu,
      submitForm
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}

.login-wrap {
  width: 330px;
  margin: auto;
}

.menu-tab {
  text-align: center;

  li {
    display: inline-block;
    width: 88px;
    font-size: 14px;
    line-height: 36px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
}

.current {
  background-color: rgba(0, 0, 0, .1);
}

.login-form {
  margin-top: 29px;

  label {
    display: block;
    font-size: 14px;
    color: #fff;
    margin-top: 3px;
  }
}

.item-form {
  margin-bottom: 13px;
}

.block {
  display: block;
  width: 100%;
}

.login-btn {
  margin-top: 19px;
}
</style>