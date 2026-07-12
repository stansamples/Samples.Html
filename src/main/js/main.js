let _selected = undefined
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

function renderStartItems(selected) {
    StartItems.querySelectorAll('.StartItem').forEach((it) => {
        it.classList.toggle('selected', it.dataset.id === selected)
    })
}

async function renderMainScreen(selected) {
    const url = `./src/main/html/${selected}.html`
    const res = await fetch(url)
    const text = await res.text()
    MainScreen.innerHTML = text
    MainScreen.scrollTop = 0
}

function renderSelected(selected) {
    _selected = selected
    location.hash = selected
    renderStartItems(selected)
    renderMainScreen(selected)
}

StartItems.addEventListener('click', (event) => {
    const item = event.target.closest('.StartItem')
    console.log('clicked', item.dataset.id)
    renderSelected(item.dataset.id)
})

window.addEventListener('hashchange', () => {
    const selected = location.hash.slice(1) || 'foo'
    if (_selected !== selected) {
        renderSelected(selected)
    }
})

//

renderColors(_colors)
renderSelected(location.hash.slice(1) || 'foo')
