const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

module.exports = {
  plugins: [
    autoprefixer({
      browsers: ['last 10 versions']
    }),
    cssnano({ preset: 'default' })
  ]
}
