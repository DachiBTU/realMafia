function toggleAudio() {
    const audioPlayer = document.getElementById('audioPlayer');
    const musicBTN = document.getElementById('musicBTN');
    musicBTN.textContent = 'II'; 
    if (audioPlayer.paused) {
        audioPlayer.play();
        musicBTN.textContent = 'II'; 
    } else {
        audioPlayer.pause();
        musicBTN.textContent = '▷';
    }
}
function getValue(){
    var  text = document.getElementById('name1');
    var txtValue = text.value;
}
function activeButton(selectedButton) {
    var buttons = selectedButton.parentNode.querySelectorAll('button');

    buttons.forEach(function(button) {
        button.style.backgroundColor = 'yellow';
    });

    selectedButton.style.backgroundColor = 'black';
}
function playerDied(selectedButton) {
    var buttons = selectedButton.parentNode.querySelectorAll('button');
    var inputFields = selectedButton.parentNode.querySelectorAll('input');
    var computedStyle = window.getComputedStyle(selectedButton);
    var backgroundColor = computedStyle.backgroundColor;
    if (backgroundColor === 'rgb(255, 255, 0)'){
    buttons.forEach(function (button) {
        button.disabled = true;
        if (button === selectedButton) {
            button.textContent = '🤍';
            button.style.backgroundColor = 'green';
            button.disabled = false;
        }
    });
    inputFields.forEach(function (inputField) {
        inputField.disabled = true;
    });
}else{
    buttons.forEach(function (button) {
        button.disabled = false;
        if (button === selectedButton) {
            button.textContent = '❌';
            if (button.style.backgroundColor !== 'black') button.style.backgroundColor = 'yellow';
            button.disabled = false;
        }
    });
    inputFields.forEach(function (inputField) {
        inputField.disabled = false;
    });
}
}
function foulBtn(clickedButton) {
    var playerContainer = clickedButton.parentNode;
    var foulContainer = playerContainer.querySelector('.foul-container');

    // If the foul container doesn't exist, create it and position it absolutely
    if (!foulContainer) {
        foulContainer = document.createElement('div');
        foulContainer.classList.add('foul-container');
        foulContainer.style.position = 'absolute'; // Set absolute positioning
        foulContainer.style.top = playerContainer.offsetTop + 'px'; // Adjust as needed
        foulContainer.style.left = (window.innerWidth - 150) + 'px'; // Adjust as needed
        playerContainer.appendChild(foulContainer);
    }

    var yellowButtons = foulContainer.querySelectorAll('.yellow');

    // Check if the maximum limit (4) is reached
    if (yellowButtons.length < 4) {
        // Create a new yellow button
        var newButton = document.createElement('button');
        newButton.textContent = '🟡';
        newButton.style.backgroundColor = 'yellow';
        newButton.disabled = true;
        newButton.classList.add('yellow');

        // Set position to absolute within the foul container
        newButton.style.position = 'absolute';
        newButton.style.top = '0';
        newButton.style.left = ((4 - yellowButtons.length - 1) * 30) + 'px'; // Reverse order calculation

        // Append the new button to the foul container
        foulContainer.appendChild(newButton);
    }

    // Your existing code for playerDied can be called here if needed
    // playerDied(clickedButton);
}

function resetFoulButtons(resetButton) {
    var playerContainer = resetButton.parentNode;
    var foulContainer = playerContainer.querySelector('.foul-container');

    // Reset all yellow buttons in the foul container
    if (foulContainer) {
        foulContainer.innerHTML = '';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const timer = document.getElementById('timer');
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');

    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval;

    function startTimer() {
        startTime = Date.now() - elapsedTime;

        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            timer.textContent = formatTimer(elapsedTime);
        }, 10);

        startButton.disabled = true;
        stopButton.disabled = false;
    }

    function stopTimer() {
        clearInterval(timerInterval);
        startButton.disabled = false;
        stopButton.disabled = true;
    }

    function resetTimer() {
        clearInterval(timerInterval);
        elapsedTime = 0;
        timer.textContent = "00:00:00.00";
        startButton.disabled = false;
        stopButton.disabled = false;
    }

    function formatTimer(elapsedTime) {
        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
        const mseconds = Math.floor((elapsedTime % 1000) / 10);
        return (
            (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
            ":" +
            (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
            ":" +
            (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") +
            "." +
            (mseconds > 9 ? mseconds : "0" + mseconds)
        );
    }

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);
});
