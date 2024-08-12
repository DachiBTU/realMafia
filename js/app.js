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
    if (selectedButton.style.backgroundColor === 'black' ) {
        selectedButton.style.backgroundColor = 'yellow';
    }
    else
    {
    var buttons = selectedButton.parentNode.querySelectorAll('button');

    buttons.forEach(function(button) {
        button.style.backgroundColor = 'yellow';
    });

    selectedButton.style.backgroundColor = 'black';
}


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

        newButton.style.zIndex = 60; 
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
    let spacePressCount = 0;
    
function startTimer() {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;

        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            timer.textContent = formatTimer(elapsedTime);
        }, 10);

        startButton.disabled = true;
        stopButton.disabled = false;
    }
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        startButton.disabled = false;
        stopButton.disabled = true;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    timer.textContent = "00:00:00.00";
    startButton.disabled = false;
    stopButton.disabled = false;
    spacePressCount = 0;
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

    // Event listener for space key press
    document.addEventListener('keydown', function(event) {
        if (event.code === 'PageUp') {
            startTimer();
        } else if (event.code === 'PageDown') {
            stopTimer();
        } else if (event.code === 'End') {
            resetTimer();
        }
    });
});

// Event listener for keydown event on the document
document.addEventListener('keydown', function(event) {
    // Check if the pressed key is Enter or Space
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'PageUp' || event.key === 'PageDown' || event.key === 'End') {
        // Check if the previously focused element was a button
        if (document.activeElement.tagName === 'BUTTON') {
            // Prevent the default action
            event.preventDefault();
        }
    }
});


function toggleVisibility() {
    var hiddenDiv = document.getElementById("hiddenDivId");

    if (hiddenDiv.style.display === "none" || hiddenDiv.style.display === "") {
        hiddenDiv.style.display = "block";
    } else {
        hiddenDiv.style.display = "none";
    }
}




document.addEventListener('DOMContentLoaded', function() {
    const rolebi = document.querySelector('.rolebi p'); // Selecting the paragraph inside .rolebi
    const resetRoleBtn = document.getElementById('resetRoleBtn');
    const blurRoleBtn = document.getElementById('blurRoleBtns');
    const generateRoleBtn = document.getElementById('generateRoleBtn');

    const roles = ['მაფია','მაფია', 'დონი', 'სერიული', 'ექიმი', 'დეტექტივი', 'მოქალაქე', 'მოქალაქე', 'მოქალაქე', 'მოქალაქე', 'მოქალაქე'];
    let availableRoles = roles.slice(); // Create a copy of the roles array
    let usedRoles = [];
    var counter = 0;
    let divid = "";
    let buttons1 = null;
    let divs = null;

    // Event listener for the "Reset" button
    resetRoleBtn.addEventListener('click', function() {

        let allButtons = document.getElementsByTagName("button");
        for (let i = 0; i < allButtons.length; i++) {
            allButtons[i].style.background = 'yellow';
        }


        rolebi.textContent = 'როლები'; // Resetting the content to "Roles"
        usedRoles = []; // Resetting used roles array
        availableRoles = roles.slice(); // Resetting availableRoles to all roles
        rolebi.style.filter = 'blur(0px)';
        counter = 0;



    });

    // Event listener for the "Blur" button
    blurRoleBtn.addEventListener('click', function() {
        rolebi.textContent = 'დააჭირე NEW-ს';
    });

    // Event listener for the "New" button
    generateRoleBtn.addEventListener('click', function() {
        if (availableRoles.length === 0) {
            rolebi.textContent = 'ყველა როლი დაკავებულია'; // Display message when all roles are used
            return; // Exit function if all roles are used
        }
        rolebi.style.filter = 'blur(0px)';
        counter +=1;


        const randomIndex = Math.floor(Math.random() * availableRoles.length);
        const newRole = availableRoles[randomIndex]; // Get a random role from availableRoles
        rolebi.textContent = newRole; // Display the new role in rolebi
        usedRoles.push(newRole); // Add the role to usedRoles array
        availableRoles.splice(randomIndex, 1); // Remove the role from availableRoles

        //player1
        divid = "buttons" + counter;
        divs = document.getElementById(divid);
        console.log(divid);
        buttons1 = divs.getElementsByTagName("button");

        if (newRole == "მოქალაქე") buttons1[2].style.background = 'black';
        else if (newRole == "ექიმი") buttons1[3].style.background = 'black';
        else if (newRole == "დეტექტივი") buttons1[4].style.background = 'black';
        else if (newRole == "სერიული") buttons1[5].style.background = 'black';
        else if (newRole == "მაფია") buttons1[6].style.background = 'black';
        else if (newRole == "დონი") buttons1[7].style.background = 'black';


        //player2

        //player3

        //player4

        //player5

        //player6

        //player7

        //player8

        //player9

        //player10

        //player11

    });
});