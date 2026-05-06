=========================================

const testWrapper = document.getElementById('test-wrapper');
const testArea = document.getElementById('test-area');
const originParagraph = document.getElementById('origin-paragraph');
const resetButton = document.getElementById('reset');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const errorsDisplay = document.getElementById('errors');
const progressBar = document.getElementById('progress-bar');
const scoreList = document.getElementById('score-list');

// Timer variables
let timer = [0, 0, 0]; // [minutes, seconds, hundredths]
let interval = null;
let timerRunning = false;

// Test state variables
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



// Load random text on page load
document.addEventListener('DOMContentLoaded', () => {
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
    // Add leading zero to numbers less than 10
    return time < 10 ? '0' + time : time;
}

function runTimer() {
    // Convert current time to string format 00:00:00
    let currentTime = leadingZero(timer[0]) + ':' + 
                     leadingZero(timer[1]) + ':' + 
                     leadingZero(timer[2]);
    timerDisplay.textContent = currentTime;
    
    // Increment hundredths
    timer[2]++;
    
    // Roll over to seconds
    if (timer[2] === 100) {
        timer[2] = 0;
        timer[1]++;
    }
    
    // Roll over to minutes
    if (timer[1] === 60) {
        timer[1] = 0;
        timer[0]++;
    }
}

function startTimer() {
    // Prevent timer stacking - only start if not already running
    if (!timerRunning) {
        interval = setInterval(runTimer, 10); // 10ms = hundredths precision
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
    
    // Get the substring of origin text that should match
    const targetSubstring = currentText.substring(0, typedLength);
    
    // Check if current input matches the origin text
    if (typedText === targetSubstring) {
        // Correct so far
        testWrapper.className = 'test-wrapper typing';
        
        // Check if test is complete (exact match with full text)
        if (typedText === currentText) {
            testComplete = true;
            testWrapper.className = 'test-wrapper complete';
            stopTimer();
            saveScore();
        }
    } else {
        // Incorrect - user made a typo
        testWrapper.className = 'test-wrapper incorrect';
        
        // Increment error count only if this is a new error
        // (not when user is backspacing through previous errors)
        if (typedLength > 0 && typedText !== targetSubstring) {
            const lastChar = typedText[typedLength - 1];
            const expectedChar = currentText[typedLength - 1];
            
            if (lastChar !== expectedChar) {
                errorCount++;
                errorsDisplay.textContent = errorCount;
            }
        }
    }
    
    // Update progress bar
    updateProgressBar(typedLength);
    
    // Calculate and display WPM
    calculateWPM(typedLength);
}


function calculateWPM(typedCharacters) {
    // WPM Formula: (Total Characters / 5) / (Total Seconds / 60)
    // Characters / 5 = word count (standard word = 5 characters)
    
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


// Input event - fires on every character typed
testArea.addEventListener('input', () => {
    // Start timer on first keypress
    if (!timerRunning && !testComplete) {
        startTimer();
    }
    
    // Check accuracy on every input
    if (!testComplete) {
        checkAccuracy();
    }
});

// Prevent paste - user must actually type
testArea.addEventListener('paste', (e) => {
    e.preventDefault();
    alert('Pasting is disabled! You must type the text yourself.');
});

// Reset button
resetButton.addEventListener('click', reset);


function reset() {
    // Stop and reset timer
    resetTimer();
    
    // Clear test area
    testArea.value = '';
    
    // Reset state variables
    errorCount = 0;
    testComplete = false;
    errorsDisplay.textContent = '0';
    wpmDisplay.textContent = '0';
    
    // Reset visual state
    testWrapper.className = 'test-wrapper';
    progressBar.style.width = '0%';
    
    // Load new random text
    loadRandomText();
    
    // Focus on textarea for immediate typing
    testArea.focus();
}

function saveScore() {
    // Get current scores from localStorage
    let scores = JSON.parse(localStorage.getItem('typingScores')) || [];
    
    // Calculate total time in seconds for comparison
    const totalSeconds = timer[0] * 60 + timer[1] + timer[2] / 100;
    
   
    const finalWPM = parseInt(wpmDisplay.textContent);
    
   
    const newScore = {
        time: timerDisplay.textContent,
        seconds: totalSeconds,
        wpm: finalWPM,
        errors: errorCount
    };
    
    // Add new score to array
    scores.push(newScore);
    
    // Sort by time (fastest first) - numerical sorting
    scores.sort((a, b) => a.seconds - b.seconds);
    
    // Keep only top 3 scores
    scores = scores.slice(0, 3);
    
    // Save back to localStorage
    localStorage.setItem('typingScores', JSON.stringify(scores));
    
    // Update display
    loadHighScores();
}

function loadHighScores() {
    // Get scores from localStorage
    const scores = JSON.parse(localStorage.getItem('typingScores')) || [];
    
    // Clear current list
    scoreList.innerHTML = '';
    
    if (scores.length === 0) {
        // No scores yet
        scoreList.innerHTML = '<li class="no-scores">No scores yet. Complete a test!</li>';
    } else {
        // Display top 3 scores
        scores.forEach((score) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="score-time">${score.time}</span>
                <span class="score-wpm">${score.wpm} WPM • ${score.errors} errors</span>
            `;
            scoreList.appendChild(li);
        });
    }
}


window.addEventListener('load', () => {
    testArea.focus();
});


testArea.addEventListener('blur', () => {
    if (!testComplete) {
        testArea.value = testArea.value.trimEnd();
    }
});
