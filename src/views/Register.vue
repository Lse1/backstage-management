<template>
  <div class="register">
    <h1>登录</h1>
    <el-form :model="ruleForm"
             status-icon
             :rules="rules"
             ref="ruleForm"
             label-width="100px"
             class="demo-ruleForm">
      <el-form-item label="用户名"
                    prop="login">
        <el-input v-model.number="ruleForm.login"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="pass">
        <el-input type="password"
                  v-model="ruleForm.pass"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getLogin } from '../api/index'
import { Message } from 'element-ui'
export default {
  name: 'register',
  data () {
    var checkLogin = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      }
      setTimeout(() => {
        callback()
      }, 1000)
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '123456',
        login: 'lse2'
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        login: [
          { validator: checkLogin, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          getLogin({ ruleForm: this.ruleForm })
            .then((res) => {
              // console.log(res)
              localStorage.setItem('token', res.token)
              // history.go(0)
              this.$router.push({ name: 'home' })
            }).catch((err) => {
              console.log(err)
              Message.error(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  width: 400px;
  height: 300px;
  margin: auto;
  margin-top: 200px;
  text-align: center;
  // transform: translateX(-50%);
  h1 {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 30px;
  }
}
</style>
