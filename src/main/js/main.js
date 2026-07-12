let selected = 'StartItems:foo'

const StartItems = document.querySelector('#StartItems')

function renderStartItems() {
  StartItems.querySelectorAll('.StartItem').forEach((el) => {
    el.classList.toggle('selected', el.dataset.id === selected)
  })
}

StartItems.addEventListener('click', (e) => {
    const item = e.target.closest('.StartItem')
    if (!item || !StartItems.contains(item)) return
    console.log('clicked', item.dataset.id)
    selected = item.dataset.id
    renderStartItems()
})

renderStartItems()
