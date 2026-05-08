const testWrapper = document.getElementById('test-wrapper');
const testArea = document.getElementById('test-area');
const originParagraph = document.getElementById('origin-paragraph');
const resetButton = document.getElementById('reset');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const errorsDisplay = document.getElementById('errors');
const progressBar = document.getElementById('progress-bar');
const scoreList = document.getElementById('score-list');

let timer = [0, 0, 0];
let interval = null;
let timerRunning = false;
let errorCount = 0;
let testComplete = false;
let currentText = '';

const textArray = [
    "The quick brown fox jumps over the lazy dog near the riverbank. This pangram contains every letter of the alphabet and serves as a perfect typing test. Practice makes perfect when it comes to improving your typing speed and accuracy.",
    "JavaScript is a versatile programming language that powers the modern web. From simple DOM manipulation to complex server-side applications, JavaScript continues to evolve and shape the future of software development across multiple platforms.",
    "Mountain peaks pierce through clouds as hikers navigate winding trails. The crisp air fills their lungs while scenic vistas reward their efforts. Nature's beauty reminds us to slow down and appreciate the world around us in all its glory.",
    "Artificial intelligence transforms industries by automating tasks and providing insights. Machine learning algorithms analyze vast datasets to uncover patterns invisible to human observers. The future promises even more revolutionary advances in this field.",
    "Coffee brewing is both an art and a science. The perfect cup requires precise water temperature, optimal grind size, and careful timing. Enthusiasts debate methods endlessly, from pour-over to espresso, each technique offering unique flavor profiles.",
    "Ancient civilizations built magnificent structures that still inspire awe today. From Egyptian pyramids to Roman aqueducts, these engineering marvels demonstrate human ingenuity. Modern archaeologists continue uncovering secrets buried beneath layers of time and earth.",
    "Ocean waves crash against rocky shores while seabirds circle overhead. Marine ecosystems teem with life, from microscopic plankton to massive whales. Protecting these vital habitats ensures future generations can enjoy the wonders of the sea."
];

document.addEventListener('DOMContentLoaded', function() {
    loadRandomText();
    loadHighScores();
    testArea.focus();
});

function loadRandomText() {
    const randomIndex = Math.floor(Math.random() * textArray.length);
    currentText = textArray[randomIndex];
    originParagraph.textContent = currentText;
}

function leadingZero(time) {
    return time < 10 ? '0' + time : time;
}

function runTimer() {
    let currentTime = leadingZero(timer[0]) + ':' + leadingZero(timer[1]) + ':' + leadingZero(timer[2]);
    timerDisplay.textContent = currentTime;
    timer[2]++;
    if (timer[2] === 100) {
        timer[2] = 0;
        timer[1]++;
    }
    if (timer[1] === 60) {
        timer[1] = 0;
        timer[0]++;
    }
}

function startTimer() {
    if (!timerRunning) {
        interval = setInterval(runTimer, 10);
        timerRunning = true;
    }
}

function stopTimer() {
    clearInterval(interval);
    timerRunning = false;
}

function resetTimer() {
    stopTimer();
    timer = [0, 0, 0];
    timerDisplay.textContent = '00:00:00';
}

function checkAccuracy() {
    const typedText = testArea.value;
    const typedLength = typedText.length;
    const targetSubstring = currentText.substring(0, typedLength);
    
    if (typedText === targetSubstring) {
        testWrapper.className = 'test-wrapper typing';
        if (typedText === currentText) {
            testComplete = true;
            testWrapper.className = 'test-wrapper complete';
            stopTimer();
            saveScore();
        }
    } else {
        testWrapper.className = 'test-wrapper incorrect';
        if (typedLength > 0 && typedText !== targetSubstring) {
            const lastChar = typedText[typedLength - 1];
            const expectedChar = currentText[typedLength - 1];
            if (lastChar !== expectedChar) {
                errorCount++;
                errorsDisplay.textContent = errorCount;
            }
        }
    }
    
    updateProgressBar(typedLength);
    calculateWPM(typedLength);
}

function calculateWPM(typedCharacters) {
    const totalSeconds = timer[0] * 60 + timer[1] + timer[2] / 100;
    if (totalSeconds > 0) {
        const wpm = Math.round((typedCharacters / 5) / (totalSeconds / 60));
        wpmDisplay.textContent = wpm;
    } else {
        wpmDisplay.textContent = '0';
    }
}

function updateProgressBar(typedLength) {
    const percentage = (typedLength / currentText.length) * 100;
    progressBar.style.width = percentage + '%';
}

testArea.addEventListener('input', function() {
    if (!timerRunning && !testComplete) {
        startTimer();
    }
    if (!testComplete) {
        checkAccuracy();
    }
});

testArea.addEventListener('paste', function(e) {
    e.preventDefault();
    alert('Pasting is disabled! You must type the text yourself.');
});

resetButton.addEventListener('click', reset);

function reset() {
    resetTimer();
    testArea.value = '';
    errorCount = 0;
    testComplete = false;
    errorsDisplay.textContent = '0';
    wpmDisplay.textContent = '0';
    testWrapper.className = 'test-wrapper';
    progressBar.style.width = '0%';
    loadRandomText();
    testArea.focus();
}

function saveScore() {
    let scores = JSON.parse(localStorage.getItem('typingScores')) || [];
    const totalSeconds = timer[0] * 60 + timer[1] + timer[2] / 100;
    const finalWPM = parseInt(wpmDisplay.textContent);
    const newScore = {
        time: timerDisplay.textContent,
        seconds: totalSeconds,
        wpm: finalWPM,
        errors: errorCount
    };
    scores.push(newScore);
    scores.sort(function(a, b) { return a.seconds - b.seconds; });
    scores = scores.slice(0, 3);
    localStorage.setItem('typingScores', JSON.stringify(scores));
    loadHighScores();
    alert('Score saved! Time: ' + newScore.time);
}

function loadHighScores() {
    const scores = JSON.parse(localStorage.getItem('typingScores')) || [];
    scoreList.innerHTML = '';
    if (scores.length === 0) {
        scoreList.innerHTML = '<li class="no-scores">No scores yet. Complete a test!</li>';
    } else {
        scores.forEach(function(score) {
            const li = document.createElement('li');
            li.innerHTML = '<span class="score-time">' + score.time + '</span><span class="score-wpm">' + score.wpm + ' WPM • ' + score.errors + ' errors</span>';
            scoreList.appendChild(li);
        });
    }
}

window.addEventListener('load', function() {
    testArea.focus();
});
