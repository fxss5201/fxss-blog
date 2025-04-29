import { access, writeFile, constants, readdir, readFile, unlink } from 'fs/promises'
import path from 'path'
import { consola } from 'consola'
import dayjs from 'dayjs'

interface FileTitleType {
  title: string,
  order: number,
  filePath: string
}

/**
 * 转换 type-challenges 题目
 */
async function main () {
  const filePath = path.resolve(path.resolve(), 'src', 'type-challenges')
  try {
    await access(filePath, constants.F_OK)
    const mdPath = path.resolve(filePath, 'README.md')
    let fileTitleList: FileTitleType[] = []
    const mdFileContent = await readFile(mdPath, 'utf-8')
    const mdFileContentArr = mdFileContent.split('\n')
    mdFileContentArr.forEach(line => {
      if (line.startsWith('- [')) {
        const titleStart = line.indexOf('- [') + 3
        const titleEnd = line.indexOf('](')
        const title = line.slice(titleStart, titleEnd)
        const order = parseInt(title)
        const filePath = line.slice(titleEnd + 2, line.length - 1)
        fileTitleList.push({
          title,
          order,
          filePath
        })
      }
    })



    let fileList = await readdir(filePath)
    fileList = fileList.filter(file => file.endsWith('.ts'))

    for (let idx = 0; idx < fileList.length; idx++) {
      const file = fileList[idx]
      const fileContent = await readFile(path.resolve(filePath, file), 'utf-8')
      const fileContentArr = fileContent.split('\n')
      const title = fileContentArr[1].trimStart().replace('\r', '')
      const order = parseInt(title)
      const fileMdArr: string[] = []
      if (fileTitleList.findIndex(file => file.order === order) === -1) {
        fileTitleList.push({
          title,
          order,
          filePath: `./${file.replace('.ts', '.md')}`
        })
      }

      // try {
      //   await access(path.resolve(filePath, file.replace('.ts', '.md')), constants.F_OK)
      //   await unlink(path.resolve(filePath, file))
      //   consola.success(`${file} 已经转换过`)
      // } catch (error) {
        let fileYaml = `---
title: ${title}
order: ${order}
isOriginal: true
category:
  - type-challenges
date: ${dayjs().format('YYYY-MM-DD')}
---
`

        let mdStart = false

        fileContentArr.forEach(line => {
          const lineTrim = line.trim()
          if (!['/*', '*/'].includes(lineTrim)) {
            if (mdStart) {
              fileMdArr.push(line.replace('  ', ''))
            } else {
              if (line.includes('你的代码')) {
                fileMdArr.push('### 代码')
                fileMdArr.push('')
                fileMdArr.push('```ts')
                fileMdArr.push(line)
              } else if (line.includes('测试用例')) {
                fileMdArr.push('```')
                fileMdArr.push('')
                fileMdArr.push('### 测试用例')
                fileMdArr.push('')
                fileMdArr.push('```ts')
                fileMdArr.push(line)
              } else if (line.includes('下一步')) {
                fileMdArr.push('```')
                fileMdArr.push('')
                fileMdArr.push('### 相关链接')
                fileMdArr.push('')
              } else {
                fileMdArr.push(line)
              }
            }
          } else if (lineTrim === '/*') {
            mdStart = true
          } else if (lineTrim === '*/') {
            mdStart = false
          }
        })
        
        const fileMd = fileYaml + '\n' + fileMdArr.join('\n')
        await writeFile(path.resolve(filePath, file.replace('.ts', '.md')), fileMd)
        await unlink(path.resolve(filePath, file))
        consola.success(`${file} 转换成功`)
      }
    // }

    fileTitleList = fileTitleList.sort((a, b) => a.order - b.order)
    const mdTitleList = fileTitleList.map(file => `- [${file.title}](${file.filePath})`)
    const mdContent = `---
title: type-challenges
order: 0
category:
  - type-challenges
date: 2025-04-28
---

## type-challenges

[type-challenges](https://github.com/type-challenges/type-challenges)：TypeScript 类型体操姿势合集。
` + '\n' + mdTitleList.join('\n') + '\n'
    await writeFile(mdPath, mdContent)
    consola.success('README.md 转换成功')

  } catch (error) {
    consola.error('type-challenges 目录不存在')
  }
}

main()
