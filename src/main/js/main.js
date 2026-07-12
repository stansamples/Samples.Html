let _selected = 'StartItems:foo'
let _colors = 'dark'

const StartItems = document.getElementById('StartItems')
const Colors = document.getElementById('Colors')

function renderStartItems() {
  StartItems.querySelectorAll('.StartItem').forEach((it) => {
    it.classList.toggle('selected', it.dataset.id === _selected)
  })
}

StartItems.addEventListener('click', (event) => {
    const item = event.target.closest('.StartItem')
    console.log('clicked', item.dataset.id)
    _selected = item.dataset.id
    renderStartItems()
})

Colors.addEventListener('click', (event) => {
    const newColors = _colors === 'dark' ? 'light' : 'dark'
    _colors = newColors
    document.documentElement.setAttribute('data-colors', newColors)
})

renderStartItems()
