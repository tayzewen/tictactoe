const boxes = document.querySelectorAll('div.box')
const gameboard = document.getElementById('gameboard')
const CIRCLE_CLASS = "circle"
const X_CLASS = "x"
let circleTurn
const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]

let winMessage = document.getElementById('winning-text')
let winningMessageElement = document.getElementById('winning-message')
const playAgainBtn = document.getElementById('playAgainBtn')

startGame()

playAgainBtn.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    boxes.forEach(box => {
        box.classList.remove(X_CLASS)
        box.classList.remove(CIRCLE_CLASS)
        box.removeEventListener("click", handleClick)
        box.addEventListener('click', handleClick, { once: true })
    })

    setBoardHover()
    winningMessageElement.classList.remove('show')
}


function handleClick(e) {
    const box = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(box, currentClass)
    if (checkWin(currentClass)) {
        endGame()
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHover()
    }
}

function placeMark(box, currentClass) {
    box.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHover() {
    gameboard.classList.remove(X_CLASS)
    gameboard.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        gameboard.classList.add(CIRCLE_CLASS)
    } else {
        gameboard.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBOS.some(combination => {
        return combination.every(index => {
            return boxes[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        winMessage.innerText = "Draw!"
    } else {
        winMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...boxes].every(box => {
        return box.classList.contains(X_CLASS) || box.classList.contains(CIRCLE_CLASS)
    })
}