let _selected = 'foo'
let _colors = 'dark'

const Colors = document.getElementById('Colors')
const StartItems = document.getElementById('StartItems')
const MainScreen = document.getElementById('MainScreen')

//

function renderColors(colors) {
    Colors.textContent = colors
    document.documentElement.setAttribute('data-colors', colors)
}

Colors.addEventListener('click', (event) => {
    const newColors = _colors === 'dark' ? 'light' : 'dark'
    _colors = newColors
    renderColors(newColors)
})

//

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
    renderMainScreen(item.dataset.id)
})

//

async function renderMainScreen(selected) {
  const url = `./src/main/html/${selected}.html`
  const res = await fetch(url)
  MainScreen.innerHTML = await res.text()
}

//

renderColors(_colors)
renderStartItems()
renderMainScreen(_selected)
