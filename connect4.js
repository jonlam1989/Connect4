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
        this.currPlayer = undefined
        this.handleClick = this.handleClick.bind(this)
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

        //check for edge cases
        if (this.p1.color === this.p2.color)  {
            alert('Please select a different color from your opponent')
            return
        } else if (this.p1.color === '#ffffff' || this.p2.color === '#ffffff') {
            alert('Please select a color that is not white')
            return
        } else {
            this.currPlayer = this.p1
        }
        
        //clear pre-game menu
        let preGameMenu = document.querySelector('.players-container')
        preGameMenu.style.display = 'none'

        //display game board
        this.makeHTMLBoard()

        //create in-game memory
        this.makeBoard()

        //show player's turn via color
        this.hover()
    }

    makeHTMLBoard() {
        //create top row for players to drop in their pieces
        let topRow = document.createElement('tr')
        
        for (let i = 0; i < this.width; i++) {
            let cell = document.createElement('td')
            cell.setAttribute('id', i)
            cell.addEventListener('click', this.handleClick)
            topRow.append(cell)
        }

        this.htmlBoard.append(topRow)

        //create the rest of the rows
        for (let i = 0; i < this.height; i++) {
            let row = document.createElement('tr')

            for (let j = 0; j < this.width; j++) {
                let coordinates = `${i}, ${j}`
                let cell = document.createElement('td')
                cell.setAttribute('id', coordinates)
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

    hover() {
        //create hover effect to show whose turn it is
        let topRowCells = Array.from(document.querySelectorAll('#board tr:first-child td'))

        for (let cell of topRowCells) {
            cell.style.cursor = 'pointer'
            cell.style.border = `2px dashed ${this.currPlayer.color}`
            cell.style.filter = 'brightness(2)'
            cell.addEventListener('mouseover', ()=>{
                cell.style.border = `2px dashed white`
                cell.style.filter = 'brightness(2)'
            })
            cell.addEventListener('mouseout', ()=>{
                cell.style.border = `2px dashed ${this.currPlayer.color}`
            })
        }
    }

    handleClick(e) {
        //handleClick will turn off once all empty spots are filled
        let col = Number(e.target.id)
        let row = this.findEmptySpot(col)
        if (row === null) return

        //append game piece to htmlBoard and in-game memory board
        this.appendGamePiece(row, col)

        //change player
        this.currPlayer = this.currPlayer !== this.p1 ? this.p1 : this.p2
        this.hover()
    }

    findEmptySpot(col) {
        for (let row = this.height - 1; row >= 0; row--) {
            if (!this.board[row][col]) {
                return row
            } 
        }
        return null
    }

    appendGamePiece(row, col) {
        let gamePiece = document.createElement('div')
        gamePiece.classList.add('gamePiece')
        gamePiece.style.backgroundColor = this.currPlayer.color

       let foundCell = document.getElementById(`${row}, ${col}`)
       foundCell.append(gamePiece)
        
        this.board[row][col] = this.currPlayer.num
    }
}

new Game(7, 8)