<!--
 * @Author: CP
 * @Date: 2024-01-15 15:59:27
 * @LastEditors: Please set LastEditors
 * @Description: 
-->
<template>
  <div class="login-container" ref="login" @keyup.enter.native="handleLogin">
    <top-color v-show="false"></top-color>
    <!-- 中间主体 -->
    <div class="login_item animated bounceInDown">
      <!-- 中间内容 -->
      <div class="login_border">
        <!-- 表单内容 -->
        <div class="login_main">
          <h4 class="login_title">
            {{
              isLayout == 2
                ? !isPRD
                  ? 'QYWPT'
                  : '无人机全业务管控微应用'
                : !isPRD
                ? 'QSMZQ'
                : '设备全生命周期管控平台'
            }}
          </h4>
          <userLogin v-if="activeName === 'user'" ref="userLogin"></userLogin>
          <codeLogin v-else-if="activeName === 'code'"></codeLogin>
          <thirdLogin v-else-if="activeName === 'third'"></thirdLogin>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { dateFormat } from '@/util/date'
import { validatenull } from '@/util/validate'
import { getQueryString, getTopUrl } from '@/util/util'

import topLang from '@/page/index/top/top-lang'
import topColor from '@/page/index/top/top-color'

import userLogin from './userlogin'
import codeLogin from './codelogin'
import thirdLogin from './thirdlogin'

export default {
  name: 'login',
  components: {
    userLogin,
    codeLogin,
    thirdLogin,
    topLang,
    topColor
  },
  data() {
    return {
      time: '',
      activeName: 'user',
      socialForm: {
        tenantId: '000000',
        source: '',
        code: '',
        state: ''
      },
      isLayout: 2,
      isPRD: false
    }
  },
  watch: {
    $route() {
      this.handleLogin()
    }
  },
  created() {
    this.isPRD = window.isPRD
    this.handleLogin()
    this.getTime()
    localStorage.setItem('isLayout', this.isLayout)
  },
  mounted() {
    this.$refs.userLogin.init(2)
  },
  computed: {
    ...mapGetters(['website', 'tagWel'])
  },
  props: [],
  methods: {
    getTime() {
      setInterval(() => {
        this.time = dateFormat(new Date())
      }, 1000)
    },
    handleLogin() {
      const topUrl = getTopUrl()
      const redirectUrl = '/oauth/redirect/'
      this.socialForm.source = getQueryString('source')
      this.socialForm.code = getQueryString('code')
      this.socialForm.state = getQueryString('state')
      if (validatenull(this.socialForm.source) && topUrl.includes(redirectUrl)) {
        let source = topUrl.split('?')[0]
        source = source.split(redirectUrl)[1]
        this.socialForm.source = source
      }
      if (
        !validatenull(this.socialForm.source) &&
        !validatenull(this.socialForm.code) &&
        !validatenull(this.socialForm.state)
      ) {
        const loading = this.$loading({
          lock: true,
          text: '第三方系统登录中,请稍后...',
          spinner: 'el-icon-loading'
        })
        this.$store
          .dispatch('LoginBySocial', this.socialForm)
          .then(() => {
            window.location.href = topUrl.split(redirectUrl)[0]
            this.$router.push({ path: this.tagWel.value })
            loading.close()
          })
          .catch(() => {
            loading.close()
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-image: url('/img/bg/login2.png');
  background-size: 100% 100%;

  .login_item {
    margin: 0 auto;
    width: 1213px;
    height: 619px;
    background-image: url('/img/bg/logon2.png');
    background-size: 100% 100%;

    .login_border {
      width: 48%;
      height: 97%;
      margin: 10px;
      text-align: center;
      margin-left: 50%;

      .login_main {
        width: 75%;
        margin: 0 auto;

        .login_title {
          background-image: -webkit-linear-gradient(bottom, #058482, #058482);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 52px;
          font-weight: 500;
          font-size: 35px;
          font-weight: 900;
          text-align: center;
          letter-spacing: 4px;
        }
      }
    }
  }
}
</style>
