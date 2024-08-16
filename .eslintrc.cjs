/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // eslint代码风格
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true, // 单引号
        semi: false, // 没有分号
        printWidth: 80, // 行宽为80
        trailingComma: 'none', // 对象和数组最后一个不需要逗号
        endOfLine: 'auto' // 换行字符自动
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index']
      }
    ],
    'vue/no-setup-props-destructure': ['off'],
    // 💡 添加未定义变量错误提示，create-vue@3.6.3 关闭，这里加上是为了支持下一个章节演示。
    'no-undef': 'error'
  }
}
