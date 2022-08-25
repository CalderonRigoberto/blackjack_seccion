const myModule = (()=>{
    'use strict'
    /**
    2C -> TREBOLES,
    2D -> DIAMANTES,
    2H -> HEARTS,
    2S -> SPADES
*/
    let requestCardBtn  = document.getElementById("takeCard"),
        stopGame        = document.getElementById("stopGame"),
        restartGame     = document.getElementById("restartGame");

    let scorePlayer         = document.getElementById("scorePlayer"),
        scoreComputer       = document.getElementById("scoreComputer"),
        playerContainer     = document.getElementById("jugador-cartas"),
        computerContainer   = document.getElementById("computadora-cartas"),
        scorePlayerPoints   = 0,
        scoreComputerPoints = 0;

    let constantsValues     = ['C', 'D', 'H', 'S',],
        especialsCards      = ['A', 'J', 'K', 'Q',],
        deck                = [];

    //Crea baraja
    const createDeck = () => {
        for(let i = 2; i <= 10; i++ ){
            for(let j = 0; j < constantsValues.length; j++){
                deck.push(i+constantsValues[j]);
            }
        }

        for(let tipo of constantsValues){
            for(let special of especialsCards){
                deck.push(special+tipo);
            }
        }
        deck = _.shuffle(deck);
        return deck;
    }

    createDeck();

    //Tomar carta

    const takeCard = () => {
        
        if(deck.length === 0){
            throw 'No hay cartas en el deck';
        }

        const card = Math.floor(Math.random() * (deck.length - 0 + 1) + 0);
        const selectedCard = deck.splice(card, 1);
        
        return selectedCard[0];
    }


    const valueCard = (card) => {
        const valueCardPosition = card.substring(0, card.length - 1);
        return (!isNaN(valueCardPosition))  ? (valueCardPosition * 1) :
            (valueCardPosition === "A") ? 11 : 10;
    }

    const computerTurn = (minimumPoints) => {
        do{
            processGame(2);
            if(scoreComputerPoints > 21){
                requestCardBtn.disabled = true;
                scoreComputer.innerText = `Haz perdido con una puntuación de ${scoreComputerPoints}`;
            }else if(scoreComputerPoints <= 21 && scoreComputerPoints > minimumPoints){
                requestCardBtn.disabled = true;
                scoreComputer.innerText = `Haz ganado con una puntuación de ${scoreComputerPoints}`;
            }else if(minimumPoints > 21){
                requestCardBtn.disabled = true;
                stopGame.disabled = true;
                scoreComputer.innerText = `Haz ganado con una puntuación de ${scoreComputerPoints}`;
                break;
            }

        }while((scoreComputerPoints < minimumPoints) && (scoreComputer <= 21));
    }

    //const result = valueCard(takeCard());

    requestCardBtn.addEventListener('click', () => {
        processGame(1);
        if(scorePlayerPoints > 21){
            requestCardBtn.disabled = true;
            scorePlayer.innerText = `Haz perdido con una puntuación de ${scorePlayerPoints}`;
            computerTurn(scorePlayerPoints);
        }else if(scorePlayerPoints === 21 ){
            requestCardBtn.disabled = true;
            scorePlayer.innerText = `Haz ganado con una puntuación de ${scorePlayerPoints}`;
            computerTurn(scorePlayerPoints);
        }
    });

    stopGame.addEventListener('click', () => {
        requestCardBtn.disabled   = true;
        stopGame.disabled = true;
        computerTurn( scorePlayerPoints );
    });

   const restartGameEvent = ( () => {
        deck = [];
        deck = createDeck();
        
        scoreComputerPoints     = 0;
        scorePlayerPoints = 0;
        
        scoreComputer.innerText = 0;
        scorePlayer.innerText = 0;

        computerContainer.innerHTML = '';
        playerContainer.innerHTML = '';

        requestCardBtn.disabled   = false;
        stopGame.disabled = false;
    });

    const processGame = (value) => {
        switch(value){
            case 1: 
                let cardSelectedPlayer = takeCard();
                scorePlayerPoints +=  valueCard(cardSelectedPlayer);
                scorePlayer.innerText = scorePlayerPoints;
            
                let newCardPlayer = document.createElement("img");
                newCardPlayer.src = `./assets/${cardSelectedPlayer}.png`;
                newCardPlayer.classList.add("carta");
        
                playerContainer.append(newCardPlayer);
                break;
            case 2:
                let cardSelected = takeCard();
                scoreComputerPoints +=  valueCard(cardSelected);
                scoreComputer.innerText = scoreComputerPoints;
            
                let newCard = document.createElement("img");
                newCard.src = `./assets/${cardSelected}.png`;
                newCard.classList.add("carta");

                computerContainer.append(newCard);
                break;
            default:
                console.log("No existe este modulo");
                break;

        }
        
    }

    return {
        newGame: restartGameEvent
    };
})();

