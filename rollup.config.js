import inject from '@rollup/plugin-inject'

export default {
  plugins: [
    inject({
      include: ['**/*.js'], // Ограничьте только JS-файлы
      exclude: ['**/*.vue'] // Исключите Vue-файлы
    })
  ]
}
