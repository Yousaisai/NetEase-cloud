/*
 * @Descripttion: 
 * @Author: Mr.You
 * @Date: 2020-10-12 14:47:41
 * @LastEditTime: 2021-04-29 11:33:09
 */
const path = require('path');
function resolve(dir) {
  // 路径可能与你的项目不同
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    // config.plugins.delete('prefetch')  //关闭预加载
    config.module
      .rule('svg')
      .uses.clear()
    config.module
      .rule('svg1')
      .test(/\.svg$/)
      .use('svg-sprite')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
      .include
      .add(resolve('src/icons'))
      .end()
  }
}