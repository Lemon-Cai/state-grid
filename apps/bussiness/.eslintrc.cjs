/*
 * @Author: CP
 * @Date: 2024-01-15 14:40:20
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  // 'extends': [
  //   'plugin:vue/vue3-essential',
  //   'eslint:recommended',
  //   '@vue/eslint-config-typescript',
  //   '@vue/eslint-config-prettier/skip-formatting'
  // ],
  extends: "../../eslintrc.cjs",
  parserOptions: {
    ecmaVersion: 'latest'
  },
}
