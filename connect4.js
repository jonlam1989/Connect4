let p1_container = document.querySelector('.player-1')
let p2_container = document.querySelector('.player-2')
let p1_text = document.querySelector('#player1-text')
let p2_text = document.querySelector('#player2-text')
let p1_colorInput = document.querySelector('#player1-chosenColor')
let p2_colorInput = document.querySelector('#player2-chosenColor')

let p1_colorHexValue;
let p2_colorHexValue;

p1_colorInput.addEventListener('input', (e)=>{
    p1_colorHexValue = e.target.value
    p1_text.style.color = p1_colorHexValue
    p1_container.style.boxShadow = `0 0 18px ${p1_colorHexValue}`
})
p2_colorInput.addEventListener('input', (e)=>{
    p2_colorHexValue = e.target.value
    p2_text.style.color = p2_colorHexValue
    p2_container.style.boxShadow = `0 0 18px ${p2_colorHexValue}`
})

