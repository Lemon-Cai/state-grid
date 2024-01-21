/*
 * @Author: CP
 * @Date: 2024-01-15 13:19:24
 * @Description:
 */
// theme-chalk/gulpfile.js
import path from 'path'
import autoprefixer from 'gulp-autoprefixer'
import gulp from 'gulp'
import sass from 'gulp-dart-sass'
// import cssmin from 'gulp-cssmin' //  不用 这个插件压缩css 。@types/gulp-cssmin 不存在，故没有用 gulpfile.ts
import cleanCSS  from 'gulp-clean-css'

const { series, src, dest, parallel } = gulp

// const { series, src, dest } = require('gulp')
// const sass = require('gulp-dart-sass')
// const autoprefixer = require('gulp-autoprefixer')
// const cssmin = require('gulp-cssmin')

function compile() {
  return src('./src/*.scss') // 找出所有的sass文件
    .pipe(sass.sync()) // 同步进行编译
    .pipe(autoprefixer({})) // 添加兼容性前缀
    // .pipe(cssmin())
    .pipe(
      cleanCSS({
        // advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
        // compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
        // keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
        // keepSpecialComments: '*' //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
      })
    ) // 进行压缩
    .pipe(dest('./lib')) // 结果生成到lib文件夹中
}

// 拷贝字体样式然后压缩
function copyfonts() {
  return src('./src/fonts/**').pipe(cleanCSS()).pipe(dest('./lib/fonts'))
}


/**
 * copy source file to packages
 * 把src源码copy到打包目录下
 */

export function copyThemeChalkSource() {
  return src(path.resolve(__dirname, 'src/**')).pipe(
    dest(path.resolve(__dirname, 'lib', 'src'))
  )
}

// 先编译第一个方法然后执行拷贝方法
// exports.build = series(compile, copyfonts)
export const build: gulp.TaskFunction  = parallel(
  copyThemeChalkSource,
  series(compile, copyfonts)
)

export default build