const Screen = Object.freeze({
  Foo: 'foo',
  Bar: 'bar',
  Baz: 'baz',
});

let _selected = undefined
let _colors = 'dark'

const Colors = document.getElementById('Colors')
const StartItems = document.getElementById('StartItems')
const MainScreen = document.getElementById('MainScreen')

function screenOf(name) {
    return Object.values(Screen).includes(name) ? name : Screen.Foo;
}

//

function renderColors(colors) {
    Colors.textContent = colors
    document.documentElement.setAttribute('data-colors', colors)
}

Colors.addEventListener('click', () => {
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
    renderStartItems(selected)
    renderMainScreen(selected)
}

StartItems.addEventListener('click', (event) => {
    const item = event.target.closest('.StartItem')
    if (!item) return
    if (_selected !== item.dataset.id) {
        history.pushState(null, '', `#${item.dataset.id}`)
        renderSelected(item.dataset.id)
    }
})

function onHashChange(raw) {
    const selected = screenOf(raw)
    if (_selected !== selected) {
        renderSelected(selected)
    }
    if (raw !== selected) {
        history.replaceState(null, '', `#${selected}`)
    }
}

window.addEventListener('hashchange', () => {
    onHashChange(location.hash.slice(1))
})

//

renderColors(_colors)
onHashChange(location.hash.slice(1))
