
const StartItems = document.querySelector('#StartItems')
StartItems.addEventListener('click', (e) => {
    const item = e.target.closest('.StartItem')
    if (!item || !StartItems.contains(item)) return
    console.log('clicked', item.dataset.id)
})
