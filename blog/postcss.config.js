const autoprefixer = require('autoprefixer')
//postcss 优化css代码
module.exports = {
  plugins: [
    autoprefixer() //自动处理wbkit等css前缀
  ]
}