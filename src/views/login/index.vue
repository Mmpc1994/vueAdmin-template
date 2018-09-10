<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">海行旅行</h3>
      <el-form-item prop="userName">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="phone" type="text" v-model="loginForm.userName" autoComplete="on" placeholder="phone" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="submit" v-model="loginForm.password" autoComplete="on"
          placeholder="password"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="submit">
          登入
        </el-button>
      </el-form-item>
      <div style="text-align: right">
        <a @click="$router.push({name: 'SignUp'})">没有账号立即注册</a>
      </div>
    </el-form>
  </div>
</template>

<script>
import { UserLoginDTO } from '../user/dtos/user-login.dto';
import { userService } from '../user/user.service';

export default {
  name: 'login',
  data() {
    return {
      loginForm: new UserLoginDTO(),
      // loading : false;

      loginRules: {
        userName: [{
          min: 11,
          max: 11,
          required: true,
          trigger: 'blur',
          massage: '请输入合法手机号'
        }],
        password: [{
          required: true,
          trigger: 'blur',
          message: '请输入密码'
        }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    submit() {
      this.loading = true
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const response = await userService.login(this.loginForm);
          if (response.code === 200) {
            this.$store.commit('SET_USER_TOKEN', response.data);
            userService.getUserInfo().then(resp => {
              if (resp.code === 200) {
                this.$store.commit('SET_USER_INFO', resp.data);
                this.loading = false;
                this.$message('登入成功');
                this.$router.replace({
                  name: 'AirTicket'
                });
              }
            })

          }
        }
        this.loading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./login.scss";
</style>
