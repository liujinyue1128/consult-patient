<script setup lang="ts">
import { ref, onUnmounted, onMounted } from 'vue'
import { showToast, showSuccessToast, type FormInstance } from 'vant'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules.ts'
import { useUserStore } from '@/stores'
import { loginByPassword, loginByCode, login } from '@/services/user.ts'
import { useRoute, useRouter } from 'vue-router'
const store = useUserStore()
const router = useRouter()
const route = useRoute()
const mobile = ref('')
const password = ref('')
const code = ref('')

const isAgree = ref(true)
const isPass = ref(true)
const time = ref(0)
const isShow = ref(false) // 动态显示/隐藏密码
const form = ref<FormInstance>()
let timer: number
onMounted(() => {
  // eslint-disable-next-line no-undef
  QC.Login({
    btnId: 'qq'
  })
})
const clickright = () => {
  console.log('我是注册按钮')
}

const loginBtn = async () => {
  try {
    if (!isAgree.value) {
      return showToast('请勾选协议后再进行登录')
    }
    const res = isPass.value
      ? await loginByPassword(mobile.value, password.value)
      : await login(mobile.value, code.value)
    console.log(res, '这是我登录返回的数据')
    if (res.data) {
      store.setUser(res.data)
      // 如果有回跳地址就进行会跳，没有跳转就进入个人中心
      router.push((route.query.returnUrl as string) || '/user')
      showSuccessToast('登录成功！')
      router.push('/')
    }
  } catch (err) {
    showToast(err)
  }
}

const sendCode = async () => {
  if (time.value > 0) return
  await form.value?.validate('mobile')
  await loginByCode(mobile.value, 'login')
  showSuccessToast('发送成功')
  time.value = 60
  timer = setInterval(() => {
    if (time.value >= 0) {
      time.value--
      if (time.value <= 0) {
        window.clearInterval(timer)
      }
    }
  }, 1000)
}
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <!--注意：在components文件夹下的组件可以自动注册，不需要引入 -->
  <div class="login-page">
    <cp-nav-bar rightText="注册" @click-right="clickright"></cp-nav-bar>

    <!-- <cp-nav-bar right-text="注册" @click-right="$router.push('/register')"></cp-nav-bar> -->
    <!-- 头部 -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;" @click="isPass = !isPass">
        <span>{{ isPass ? '短信验证码登录' : '密码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" ref="form">
      <van-field
        name="mobile"
        autocomplete="off"
        placeholder="请输入手机号"
        type="tel"
        v-model="mobile"
        :rules="mobileRules"
      ></van-field>
      <van-field
        autocomplete="off"
        placeholder="请输入密码"
        :type="isShow ? 'text' : 'password'"
        v-model="password"
        :rules="passwordRules"
        v-if="isPass"
      >
        <template #button>
          <!-- 密码可见不可见 -->
          <cp-icon :name="`login-eye-${isShow ? 'on' : 'off'}`" @click="isShow = !isShow"></cp-icon>
        </template>
      </van-field>
      <van-field
        v-else
        placeholder="短信验证码"
        type="password"
        v-model="code"
        :rules="codeRules"
        autocomplete="off"
      >
        <template #button>
          <span class="btn-send" :class="{ active: time > 0 }" @click="sendCode">{{
            time > 0 ? `${time}s后在次发送` : '发送验证码'
          }}</span>
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="isAgree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit" @click="loginBtn"
          >登 录</van-button
        >
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
    <!-- 底部 -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <!-- <a
        class="icon"
        href="http://consult-patients.itheima.net/login/callback#access_token=B417C0C3EBF93A380A22A188A9C491A4&expires_in=7776000"
      >
        <img src="@/assets/qq.svg" alt="" />
      </a> -->

      <div class="icon" id="qq" @click="qqLogin">
        <img src="@/assets/qq.svg" alt="" />
        <!-- <cp-icon name="consult-wechat"></cp-icon> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/login.scss';
</style>
