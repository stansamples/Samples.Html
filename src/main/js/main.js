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
let _opened = undefined

const OpenedSwitch = document.getElementById('OpenedSwitch')
const StartBar = document.getElementById('StartBar')
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
    onStateChange({ colors: colors })
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
        onStateChange({ selected: item.dataset.id, opened: false }, true)
    }
})

//

function renderOpened(opened) {
    _opened = opened
    OpenedSwitch.textContent = _opened === true ? 'close' : 'open'
    StartBar.classList.toggle('opened', _opened === true)
}

OpenedSwitch.addEventListener('click', () => {
    const opened = _opened === true ? false : true
    onStateChange({ opened: opened })
})

//

function onStateChange({ selected = _selected, colors = _colors, opened = _opened }, needsToPush = false) {
    if (_selected !== selected) {
        renderSelected(selected)
    }
    if (_colors !== colors) {
        renderColors(colors)
    }
    if (_opened !== opened) {
        renderOpened(opened)
    }
    const expected = getState({ selected: selected, colors: colors })
    if (location.hash !== expected) {
        if (needsToPush) {
            history.pushState(null, '', expected)
        } else {
            history.replaceState(null, '', expected)
        }
    }
}

function onPopState(opened) {
    const params = new URLSearchParams(location.hash.slice(1))
    const selected = screenOf(params.get('selected'))
    const colors = colorsOf(params.get('colors'))
    onStateChange({ selected: selected, colors: colors, opened: opened })
}

window.addEventListener('popstate', onPopState)

//

onPopState(false)
