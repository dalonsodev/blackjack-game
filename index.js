// Initial game state
const gameState = {
   cards: [],
   sum: 0,
   message: "",
   hasBlackJack: false,
   isAlive: false,
   deck: []
}

// grab elements to work with
const messageEl = document.getElementById("message-el")
const cardsEl = document.getElementById("cards-el")
const sumEl = document.getElementById("sum-el")
const resetBtn = document.getElementById("reset-btn")

// Get the card's suit to style with css (black or red depending on suit)
function getSuitClass(cardName) {
   if (cardName.endsWith("♠")) return "suit-spades"
   if (cardName.endsWith("♣")) return "suit-clubs"
   if (cardName.endsWith("♥")) return "suit-hearts"
   if (cardName.endsWith("♦")) return "suit-diamonds"
   return ""
}

// Create a random deck
function createDeck() {
   const suits = ["♠", "♣", "♥", "♦"]
   const values = [
      {name: "A", value: 11},
      {name: "2", value: 2},
      {name: "3", value: 3},
      {name: "4", value: 4},
      {name: "5", value: 5},
      {name: "6", value: 6},
      {name: "7", value: 7},
      {name: "8", value: 8},
      {name: "9", value: 9},
      {name: "10", value: 10},
      {name: "J", value: 10},
      {name: "Q", value: 10},
      {name: "K", value: 10},
   ]
   gameState.deck = []
   for (let suit of suits) {
      for (let value of values) {
         gameState.deck.push({name: `${value.name}${suit}`, value: value.value})
      }
   }
   // Shuffle deck
   gameState.deck.sort(() => Math.random() - 0.5)
}


function getRandomCard() {
   if (gameState.deck.length === 0) createDeck()
   return gameState.deck.pop()
}

function renderGame() {
   const cardsHtml = gameState.cards.map( card => 
      `<span class="card ${getSuitClass(card.name)}">${card.name}</span>`)
      .join(" ")
   cardsEl.innerHTML = `Cards: ${cardsHtml}`
   gameState.sum = gameState.cards.reduce((sum, card) => sum + card.value, 0)
   sumEl.textContent = `Sum: ${gameState.sum}`
   
   if (gameState.sum <= 20) {
      gameState.message = "Do you want to draw a new card?"
   }
   else if (gameState.sum === 21) {
      gameState.message = "You've got Blackjack!"
      gameState.hasBlackJack = true
   }
   else {
      gameState.message = "You're out of the game!"
      gameState.isAlive = false
   }
   messageEl.textContent = gameState.message
}

function startGame() {
   gameState.isAlive = true
   gameState.hasBlackJack = false
   gameState.cards = [getRandomCard(), getRandomCard()]
   resetBtn.classList.remove("hidden")
   renderGame()
}

function newCard() {
   if (gameState.isAlive && !gameState.hasBlackJack) {
      gameState.cards.push(getRandomCard())
      renderGame()
   }
}

function resetGame() {
   gameState.cards = []
   gameState.sum = 0
   gameState.message = ""
   gameState.isAlive = false
   gameState.hasBlackJack = false
   messageEl.textContent = "Want to play a round?"
   cardsEl.textContent = "Cards: "
   sumEl.textContent = "Sum: "
   resetBtn.classList.add("hidden")
}

document.getElementById("start-btn").addEventListener("click", startGame)
document.getElementById("new-card-btn").addEventListener("click", newCard)
resetBtn.addEventListener("click", resetGame)

resetGame()