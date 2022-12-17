import { SqlsParser } from './parser.js'

const container = document.querySelector('.container')
const title = document.querySelector('.title')
const content = document.querySelector('.content')

const sourceSqls = document.querySelector('#source-sqls')
const resultSql = document.querySelector('#result-sql')

window.addEventListener('load', () => {})

sourceSqls.addEventListener('keydown', e => {
    if (e.keyCode == 9) {
        e.preventDefault()
        const content = sourceSqls.value
        const selStart = sourceSqls.selectionStart
        const selEnd = sourceSqls.selectionEnd
        console.log(selStart, selEnd)
        sourceSqls.value = content.substring(0, selStart) + '\t' + content.substring(selEnd)
        sourceSqls.selectionStart = sourceSqls.selectionEnd = selStart + 1

        return false
    }
})

sourceSqls.addEventListener('keyup', e => {
    resultSql.value = SqlsParser.parse(sourceSqls.value)
    sourceSqls.scrollTop = sourceSqls.scrollHeight
    resultSql.scrollTop = resultSql.scrollHeight
})
