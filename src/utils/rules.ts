import type { FiledRule } from 'vant'
const mobileRules: FiledRule[] = [
  {
    required: true,
    message: '请输入手机号'
  },
  {
    pattern: /^1[3-9]\d{9}$/,
    message: '手机号格式错误'
  }
]
const passwordRules: [] = [
  {
    required: true,
    message: '请输入密码'
  },
  {
    pattern: /^\w{8,24}$/,
    message: '密码需8-24个字符'
  }
]

const codeRules: FiledRule[] = [
  {
    required: true,
    message: '请输入短信验证码'
  },
  {
    pattern: /^\d{6}$/,
    message: '验证码必须为6位'
  }
]

const nameRules: FiledRule[] = [
  {
    required: true,
    message: '请输入真实姓名'
  },
  {
    pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/,
    message: '中文字符2-16个字符'
  }
]

const idCardRules: FiledRule = [
  {
    required: true,
    message: '请输入正确的身份证号码'
  },
  {
    pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
    message: '身份证号格式不正确！'
  }
]
export { mobileRules, passwordRules, codeRules, nameRules, idCardRules }
