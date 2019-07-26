<template>
  <div class="login-container">
      <div class="title-container">
        <h3 class="title" @click='getUser'>Login Form</h3>
        <el-button type="primary" @click="login">登录</el-button>

      </div>
  </div>
</template>

<script>
import axios from 'axios'
// eslint-disable-next-line
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  data() {
    return {

    }
  },
  methods: {
    login() {
      this.$api.login().then((res) => {
        Cookies.set('token', res.data.token)
        console.log('login', res)
      })
    },
    getUser() {
      axios.get('/user').then(res => {
        console.log('res', res)
      })
    }
  }
}
</script>


