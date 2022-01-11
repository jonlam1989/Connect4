class Player {
    constructor(color, num) {
        this.color = color
        this.num = num
    }
}

class Game {
    constructor(height, width) {
        this.height = height
        this.width = width
        this.htmlBoard = document.querySelector('#board')
        this.board = []
        this.preGame()
    }

    preGame() {
        const p1_container = document.querySelector('.player-1')
        const p2_container = document.querySelector('.player-2')
        const p1_text = document.querySelector('#player1-text')
        const p2_text = document.querySelector('#player2-text')
        const p1_colorInput = document.querySelector('#player1-chosenColor')
        const p2_colorInput = document.querySelector('#player2-chosenColor')

        //p1+p2 containers: added animation
        p1_colorInput.addEventListener('input', (e)=>{
            p1_text.style.color = e.target.value
            p1_container.style.backgroundColor = 'rgb(43, 40, 40)'
            p1_container.style.boxShadow = `0 0 20px ${e.target.value}`
        })
        p2_colorInput.addEventListener('input', (e)=>{
            p2_text.style.color = e.target.value
            p2_container.style.backgroundColor = 'rgb(43, 40, 40)'
            p2_container.style.boxShadow = `0 0 20px ${e.target.value}`
        })

        //p1+p2 inputs: added animation
        p1_colorInput.addEventListener('mousedown', ()=>{
            p1_colorInput.style.transform = 'translate(2px, -1px)'
        })
        p1_colorInput.addEventListener('mouseup', ()=>{
            p1_colorInput.style.transform = 'translate(-2px, 1px)'
        })
        p2_colorInput.addEventListener('mousedown', ()=>{
            p2_colorInput.style.transform = 'translate(2px, -1px)'
        })
        p2_colorInput.addEventListener('mouseup', ()=>{
            p2_colorInput.style.transform = 'translate(-2px, 1px)'
        })

        //startGame-button: added animation
        let startGame = document.querySelector('#startGame')
        
        startGame.addEventListener('mousedown', ()=>{
            startGame.style.boxShadow = 'none'
            startGame.style.transform = 'translate(3px, 3px)'
        })
        startGame.addEventListener('mouseup', ()=>{
            startGame.style.boxShadow = '3px 3px 0px black'
            startGame.style.transform = 'translate(-3px, -3px)'
        })
        startGame.addEventListener('click', this.startGame.bind(this))
    }
    
    startGame() { 
        //create p1 + p2 instances
        this.p1 = new Player(document.querySelector('#player1-chosenColor').value, 1)
        this.p2 = new Player(document.querySelector('#player2-chosenColor').value, 2)

        if (this.p1.color === this.p2.color) {
            alert('Please select different colors')
            return
        } 
        
        //clear pre-game menu
        let preGameMenu = document.querySelector('.players-container')
        preGameMenu.style.display = 'none'

        //display game board
        this.makeHTMLBoard()

        //create in-game memory
        this.makeBoard()
    }

    makeHTMLBoard() {
        //create top row for players to drop in their pieces
        let topRow = document.createElement('tr')
        
        for (let i = 0; i < this.width; i++) {
            let cell = document.createElement('td')
            topRow.append(cell)
        }
        
        this.htmlBoard.append(topRow)

        //create the rest of the rows
        for (let i = 0; i < this.height; i++) {
            let row = document.createElement('tr')

            for (let j = 0; j < this.width; j++) {
                let cell = document.createElement('td')
                row.append(cell)
            }

            this.htmlBoard.append(row)
        }
    }

    makeBoard() {
        //create in-game memory
        for (let i = 0; i < this.height; i++) {
            this.board.push(Array.from({length: this.width}))
        }
    }
}

new Game(7, 8)