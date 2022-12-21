import { SqlsParser } from './parser.js'

const modalContainer = document.querySelector('.modal-container')
const btnShowAliasList = document.querySelector('#show-alias-list')
const btnCloseModal = document.querySelector('.close-modal')

const aliasList = document.querySelector('.alias-list-container')

const container = document.querySelector('.container')
const title = document.querySelector('.title')
const content = document.querySelector('.content')

const sourceSqls = document.querySelector('#source-sqls')
const resultSql = document.querySelector('#result-sql')

window.addEventListener('load', () => {})

btnShowAliasList.addEventListener('click', () => {
    let html = ''
    for (let key in SqlsParser.aliases) {
        html += `
		<div class="alias-list-item">
			<div class="alias-key">${key}</div>
			<div class="alias-value">${SqlsParser.aliases[key]}</div>
		</div>`
    }
    aliasList.innerHTML = html

    modalContainer.style.visibility = 'visible'
    modalContainer.style.opacity = 100
})

// modalContainer.addEventListener('click', () => {
//     modalContainer.style.visibility = 'hidden'
//     modalContainer.style.opacity = 0
// })

btnCloseModal.addEventListener('click', () => {
    modalContainer.style.visibility = 'hidden'
    modalContainer.style.opacity = 0
})

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
    const selStart = sourceSqls.selectionStart
    resultSql.value = SqlsParser.parse(sourceSqls.value)
    resultSql.scrollTop = selStart
})
