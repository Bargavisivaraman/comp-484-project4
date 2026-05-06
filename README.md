# ⚡ Speed Typing Test

A professional-grade typing test application built with vanilla JavaScript, HTML, and CSS. Test your typing speed and accuracy with real-time feedback and persistent high scores.

## 🌐 Live Demo

[Add your GitHub Pages link here after deployment]

## ✨ Features

### Core Functionality
- **Precision Timer**: Displays time in 00:00:00 format (minutes:seconds:hundredths)
- **Input Validation**: Real-time accuracy checking using substring comparison
- **Event Handling**: Responsive keyboard input and button interactions
- **Reset Logic**: Complete state cleanup and new test generation

### Advanced Features
- **Dynamic Visual Feedback**:
  - 🔵 Blue border: Typing correctly
  - 🔴 Red border: Typo detected
  - 🟢 Green border: Test completed successfully
  
- **Data Persistence**: Top 3 fastest scores saved in localStorage
- **Content Randomization**: 7 different text paragraphs
- **Live Performance Metrics**:
  - Real-time WPM (Words Per Minute) calculation
  - Error counter tracking mistyped characters
  
- **Progress Bar**: Visual completion indicator
- **Paste Prevention**: Ensures users actually type the text
- **Responsive Design**: Works on mobile and desktop
- **Focus Management**: Auto-focus for seamless user experience

## 🎯 Key Implementation Details

### The Accuracy Algorithm
Uses `.substring()` to compare user input with the expected text portion:
```javascript
const targetSubstring = currentText.substring(0, typedLength);
if (typedText === targetSubstring) {
    // User is correct so far
}
```

### Timer Precision
Prevents timer stacking with a boolean flag:
```javascript
if (!timerRunning) {
    interval = setInterval(runTimer, 10); // 10ms precision
    timerRunning = true;
}
```

### WPM Calculation
Standard formula: `(Characters / 5) / (Seconds / 60)`
```javascript
const wpm = Math.round((typedCharacters / 5) / (totalSeconds / 60));
```

### Formatting the Clock
Helper function adds leading zeros:
```javascript
function leadingZero(time) {
    return time < 10 ? '0' + time : time;
}
```

### Local Storage Integration
```javascript
// Save
localStorage.setItem('typingScores', JSON.stringify(scores));

// Load
const scores = JSON.parse(localStorage.getItem('typingScores')) || [];
```

### Numerical Sorting
Callback function ensures proper time-based ranking:
```javascript
scores.sort((a, b) => a.seconds - b.seconds);
```

## 🚀 Deployment Instructions

### GitHub Pages Setup

1. **Create a new repository** on GitHub
2. **Upload these files**:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`

3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Click Save

4. **Get your URL**:
   - Your site will be live at: `https://[username].github.io/[repo-name]/`
   - Add this URL to the top of your README.md

5. **Update README**:
   ```markdown
   ## 🌐 Live Demo
   https://yourusername.github.io/typing-test/
   ```

## 📁 Project Structure

```
typing-test/
│
├── index.html      # Main HTML structure
├── style.css       # Styling and responsive design
├── script.js       # All JavaScript logic
└── README.md       # Project documentation
```

## 🎓 Grading Rubric Compliance

| Category | Implementation | ✅ |
|----------|---------------|-----|
| **Basic Logic (40%)** | Timer with 00:00:00 format, input validation | ✅ |
| **Visual Feedback (20%)** | Grey/Blue/Red/Green border states | ✅ |
| **Persistence (15%)** | Top 3 scores in localStorage | ✅ |
| **Code Quality (15%)** | Clean code, comments, descriptive variables | ✅ |
| **UX & Creativity (10%)** | Random text, WPM/errors, progress bar, paste prevention | ✅ |

## 🎤 Presentation Topics

Choose two unique topics from the project requirements list for your presentation.

**Suggested Topics** (based on what's available):
1. **Local Storage Integration** - Show JSON.stringify/parse logic
2. **The Completion Trigger** - Explain exact match vs length check
3. **Randomization Strategy** - Demonstrate Math.random() paragraph selection
4. **Paste Prevention** - Show event.preventDefault() security
5. **Focus Management** - Demonstrate .focus() for UX

## 💻 Technologies Used

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- LocalStorage API

## 🎨 Design Features

- Modern gradient background
- Smooth transitions and animations
- Responsive layout for all screen sizes
- Professional color scheme
- Clear visual hierarchy

## 📝 License

This project is created for educational purposes as part of a web development course.

---

Built with ❤️ for Project 4
