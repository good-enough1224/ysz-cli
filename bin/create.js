const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const { clone } = require('./download')
const log = content => console.log(chalk.green(content))

const spawn = async (...args) => {
  const { spawn } = require('child_process');
  return new Promise(resolve => {
    console.log(...args);
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
}

module.exports = async name => {
  // 打印欢迎画⾯
  clear()
  const data = await figlet('welcome')
  log(data)
  log('创建项⽬:' + name)
  // 从github克隆项⽬到指定⽂件夹
  await clone('github:su37josephxia/vue-template', name)
  log('安装依赖')
  await spawn('npm', ['install'], {
    cwd: `./${name}`,
    shell: true // win 
  })
  log(chalk.green(`
      安装完成：
      To get Start:
      ===========================
      cd ${name}
      npm run serve
      ===========================
   `))
}


