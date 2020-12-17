import gulp from 'gulp'
import babel from 'gulp-babel'
import watch from 'gulp-watch'
import log from 'fancy-log'
import fs from 'fs'
import path from 'path'
import mjml2html from 'mjml'
import { registerComponent } from 'mjml-core'

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file))
  })
  return filelist
}

const watchedComponents = walkSync('./components')
const templates = walkSync('./templates')

const compile = () =>
  gulp
    .src(path.normalize('components/**/*.js'))
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      }),
    )
    .on('error', log)
    .pipe(gulp.dest('lib'))
    .on('end', () => {
      watchedComponents.forEach(compPath => {
        const fullPath = path.join(process.cwd(), compPath.replace(/^components/, 'lib'))
        delete require.cache[fullPath]
        registerComponent(require(fullPath).default)
      })

      templates.forEach(templPath => {
        fs.readFile(path.normalize(templPath), 'utf8', (err, data) => {
          if (err) throw err
          const result = mjml2html(data, { minify: true, minifyCSS: true })
          const basename = path.basename(templPath)
          const targetDir = path.normalize(`html/${basename.replace('.mjml', '.html')}`)

          fs.writeFileSync(targetDir, result.html, {
            flag: 'w',
          })
          console.log(`${targetDir} written successfuly!`)
        })
      })
    })

gulp.task('build', compile)

gulp.task('watch', () => {
  console.log(`Templates: ${templates}`)
  console.log(`Watched components: ${watchedComponents}`)
  compile()
  return watch(
    [path.normalize('components/**/*.js'), path.normalize('templates/**/*.mjml')],
    compile,
  )
})
