document.addEventListener('DOMContentLoaded', function () {
    setupGame();
});

const letters = "qwerasd";
let userInput = "";
let timer;
let keyIsPressed = false;
let gameStarted = false; // Añadir una variable para controlar si el juego ha comenzado

function setupGame() {
    resetGame(); // Clear the previous game state
    generateLetters(); // Generate new letters
    updateDisplay(); // Update the display

    document.getElementById('start-button').disabled = false;

    // Setup initial event listeners
    document.getElementById('start-button').addEventListener('click', startGame);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp); // Added keyup event listener
}

function startGame() {
    document.getElementById('start-button').disabled = true;

    resetGame(); // Clear the previous game state
    generateLetters(); // Generate new letters
    updateDisplay(); // Update the display

    let timeLeft = 6.5;
    timer = setInterval(function () {
        timeLeft -= 0.1;
        document.getElementById('timer-fill').style.width = (timeLeft / 6.5) * 100 + '%';

        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 100);

    document.addEventListener('keydown', handleKeyDown);

    gameStarted = true; // Establecer la bandera de que el juego ha comenzado
}

function generateLetters() {
    document.getElementById('row1').innerHTML = '';
    document.getElementById('row2').innerHTML = '';
    document.getElementById('row3').innerHTML = '';

    for (let i = 0; i < 6; i++) {
        document.getElementById('row1').appendChild(createCharacterContainer(getRandomLetter()));
        document.getElementById('row2').appendChild(createCharacterContainer(getRandomLetter()));
    }

    for (let i = 0; i < 3; i++) {
        document.getElementById('row3').appendChild(createCharacterContainer(getRandomLetter()));
    }
}

function createCharacterContainer(character) {
    const container = document.createElement('div');
    container.classList.add('character-container');
    container.innerText = character.toUpperCase();
    return container;
}

function getRandomLetter() {
    return letters[Math.floor(Math.random() * letters.length)];
}

function updateDisplay() {
    document.getElementById('timer-fill').style.width = '100%';
}

function endGame(success) {
    clearInterval(timer);
    displayOutcome(success);
    document.getElementById('start-button').disabled = false;
    document.removeEventListener('keydown', handleKeyDown);
    gameStarted = false; // Restablecer la bandera de que el juego ha comenzado
}


function resetGame() {
    clearInterval(timer); // Clear the timer
    document.getElementById('timer-fill').style.width = '0%'; // Reset the timer bar width
    userInput = "";
    displayHacking();
}

function handleKeyDown(event) {
    const pressedKey = event.key.toLowerCase();

    // Si el juego no ha comenzado, verificar si la tecla 'E' es presionada para iniciar el juego
    if (!gameStarted && pressedKey === 'e') {
        startGame();
        return;
    }

    // Check if the game has started before processing key input
    if (!gameStarted) {
        return;
    }

    // Check if the key is already pressed
    if (keyIsPressed || !letters.includes(pressedKey)) {
        return;
    }

    keyIsPressed = true;

    userInput += pressedKey;
    checkInput();
}

function handleKeyUp(event) {
    keyIsPressed = false;
}

function checkInput() {
    const characterContainers = document.querySelectorAll('.character-container');
    const lastTypedIndex = userInput.length - 1;

    if (characterContainers[lastTypedIndex].innerText.toLowerCase() === userInput[lastTypedIndex]) {
        characterContainers[lastTypedIndex].classList.add('correct');
    } else {
        characterContainers[lastTypedIndex].classList.add('incorrect');
        endGame(false);
    }

    if (userInput.length === 15) {
        clearInterval(timer);
        displayOutcome(true);
        document.getElementById('start-button').disabled = false;
        document.removeEventListener('keydown', handleKeyDown);
        gameStarted = false; // Restablecer la bandera de que el juego ha comenzado
    }
}

function displayOutcome(success) {
    const outcomeElement = document.getElementById('outcome');
    outcomeElement.innerText = success ? 'Logrado!' : 'Fallido!';
    outcomeElement.style.color = success ? '#0DE6B9' : '#AA6A6C';

    if (!success) {
        setTimeout(() => {
            location.reload();
        }, 30); // Recargar la página después de 3 segundos (3000 milisegundos)
    } else {
        setTimeout(() => {
            location.reload();
        }, 30); // Recargar la página después de 3 segundos (3000 milisegundos)
    }

    // After displaying the outcome, reattach the 'click' event listener to the start button
    // document.getElementById('start-button').addEventListener('click', startGame);
}

function displayHacking() {
    document.getElementById('outcome').innerText = 'HACKING...';
    document.getElementById('outcome').style.color = '#FFFFFF';
    document.getElementById('start-button').removeEventListener('click', startGame);
}

// dinamic tittle 

// Función para cambiar el título
function changeTitle() {
    // Verificar si la página está visible
    if (document.visibilityState === 'visible') {
        // Cambiar el título de la página
        document.title = "NoPixel-ChopShop";
    } else {
        // Cambiar el título de la página cuando no es visible
        document.title = "¡Te extrañamos!";
    }
}

// Llamar a la función cuando el estado de visibilidad cambie
document.addEventListener("visibilitychange", changeTitle);
