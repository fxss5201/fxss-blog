import { access, writeFile, constants, readFile, mkdir } from 'fs/promises'
import path from 'path'
import { consola } from 'consola'

/**
 * 为 type-challenges 中的文章的知识点填充内容
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
    let codeContent = await readFile(filePath, 'utf-8')
    const keys = Array.from(config.keys())
    for (let key of keys) {
      const keyTitle = `### \`${key}\``
      if (codeContent.includes(keyTitle)) {
        const keyContent = config.get(key)
        const keyFile = path.resolve(path.resolve(), 'src', 'type-challenges', 'operator', keyContent as string)
        let keyFileContent = await readFile(keyFile, 'utf-8')
        const keyFileContentArr = keyFileContent.split('\n')
        keyFileContent = keyFileContentArr.slice(8).join('\n')
        codeContent = codeContent.replace(keyTitle, keyFileContent)
      }
    }
    await writeFile(filePath, codeContent)
    consola.success(`转换成功：`, filePath)
  } catch (error) {
    console.log(error)
  }
}

const config: Map<string, string> = new Map()
config.set('as', 'as.md')
config.set('extends', 'extends.md')
config.set('in', 'in.md')
config.set('infer', 'infer.md')
config.set('keyof', 'keyof.md')
config.set('Omit', 'Omit.md')
config.set('readonly', 'readonly.md')
config.set('&', 'And.md')
config.set('|', 'Or.md')
config.set('T[number]', 'TNumber.md')
config.set('Record', 'Record.md')
config.set('unknown', 'unknown.md')
config.set('never', 'never.md')
config.set('...infer', 'MatchInfer.md')

main()
