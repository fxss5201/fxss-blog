import { access, writeFile, constants, readFile, mkdir } from 'fs/promises'
import path from 'path'
import { consola } from 'consola'

/**
 * 为 type-challenges 中的文章转换为不同平台的格式
 * CSDN：添加公众号说明
 * 掘金：添加公众号说明和公众号图片链接
 */
async function main () {
  const codeNamePrompt = '请输入文件名称'
  let codeName = await consola.prompt(codeNamePrompt, {
    type: 'text'
  })
  while (!codeName) {
    consola.error('请输入代码段名称')
    codeName = await consola.prompt(codeNamePrompt, {
      type: 'text'
    })
  }
  if (!codeName.endsWith('.md')) {
    codeName = `${codeName}.md`
  }
  const filePath = path.resolve(path.resolve(), 'src', 'type-challenges', codeName)
  try {
    await access(filePath, constants.F_OK)
    const codeContent = await readFile(filePath, 'utf-8')
    let codeContentArr = codeContent.split('\n')
    let titleEndIndex = 1
    while(codeContentArr[titleEndIndex].trim() !== '---') {
      titleEndIndex++
    }
    while(codeContentArr[titleEndIndex + 1].trim().replace('\r', '') === '') {
      titleEndIndex++
    }
    codeContentArr.splice(0, titleEndIndex + 1)
    codeContentArr[1] = `type-challenges（ts类型体操）: ${codeContentArr[0]}`
    codeContentArr[0] = `# ${codeContentArr[0]}`
    const keys = Object.keys(config)
    for (let key of keys) {
      if (key === 'gzh') {
        codeContentArr[1] = ``
      }
      const writeFilePath = path.resolve(path.resolve(), 'dist', codeName.replace('.md', ''), `${key}.md`)
      await mkdir(path.dirname(writeFilePath), { recursive: true })
      const writeFileContent = codeContentArr.join('\n') + config[key]
      await writeFile(writeFilePath, writeFileContent)
      consola.success(`转换成功：`, writeFilePath)
    }
  } catch (error) {
    console.log(error)
  }
}

const config: Record<string, string> = {
  gzh: ``,
  csdn: `
下面是我的公众号，欢迎关注。关注后有新的功能点会及时收到推送。

> 实战为王！专注于汇总各种功能点，致力于打造一系列能够帮助工程师实现各种功能的想法思路的优质文章。
`
  ,
  juejin: `
下面是我的公众号，欢迎关注。关注后有新的功能点会及时收到推送。

> 实战为王！专注于汇总各种功能点，致力于打造一系列能够帮助工程师实现各种功能的想法思路的优质文章。

![前端功能点](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/4bdeec99a0154e7aa73c1c6765f3dcf0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgZnhzcw==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMzcwMjgxMDg5Mjg1NjgwOCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1770360215&x-orig-sign=PMCJuaaBkgWE%2FHKqZLV2DElA4AY%3D)
`
}

main()
