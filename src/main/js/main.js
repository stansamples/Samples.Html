const Screen = Object.freeze({
  Foo: 'foo',
  Bar: 'bar',
  Baz: 'baz',
});

const Colors = Object.freeze({
  Dark: 'dark',
  Light: 'light',
});

let _selected = undefined
let _colors = undefined

const ColorsSwitch = document.getElementById('ColorsSwitch')
const StartItems = document.getElementById('StartItems')
const MainScreen = document.getElementById('MainScreen')

function getState({ selected = _selected, colors = _colors } = {}) {
    return `#selected=${selected}&colors=${colors}`
}

function screenOf(name) {
    return Object.values(Screen).includes(name) ? name : Screen.Foo;
}

function colorsOf(name) {
    return Object.values(Colors).includes(name) ? name : Colors.Dark;
}

//

function renderColors(colors) {
    _colors = colors
    ColorsSwitch.textContent = colors
    document.documentElement.setAttribute('data-colors', colors)
}

ColorsSwitch.addEventListener('click', () => {
    const colors = _colors === Colors.Dark ? Colors.Light : Colors.Dark
    renderColors(colors)
    history.replaceState(null, '', getState({ colors: colors }))
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
        history.pushState(null, '', getState({ selected: item.dataset.id }))
        renderSelected(item.dataset.id)
    }
})

function onHashChange() {
    const params = new URLSearchParams(location.hash.slice(1))
    const selected = screenOf(params.get('selected'))
    if (_selected !== selected) {
        renderSelected(selected)
    }
    const colors = colorsOf(params.get('colors'))
    if (_colors !== colors) {
        renderColors(colors)
    }
    const expected = getState({ selected: selected, colors: colors })
    if (location.hash !== expected) {
        history.replaceState(null, '', expected)
    }
}

window.addEventListener('hashchange', () => {
    onHashChange()
})

//

onHashChange()
