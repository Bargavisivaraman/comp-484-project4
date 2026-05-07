// ==========================
// Part 1: Date Display
// ==========================

const today = new Date();

// get current date parts
let month = today.getMonth() + 1; // add 1 since months start at 0
let day = today.getDate();
let year = today.getFullYear();

// add leading zeros if needed
if (month < 10) {
  month = "0" + month;
}
if (day < 10) {
  day = "0" + day;
}

const dateMessage = "Today is " + month + "/" + day + "/" + year;

document.getElementById("dateOutput").textContent = dateMessage;

// ==========================
// Part 2: Number Conversion
// ==========================

// test values - some valid numbers, one invalid
const value1 = "42";
const value2 = "19.75";
const value3 = "hello";
const value4 = "100";

// convert to numbers
const num1 = Number(value1);
const num2 = Number(value2);
const num3 = Number(value3);
const num4 = Number(value4);

// build result strings
let result1 = "Original: '" + value1 + "' → Converted: " + num1 + 
              " → isNaN: " + Number.isNaN(num1) + 
              " → isInteger: " + Number.isInteger(num1);

let result2 = "Original: '" + value2 + "' → Converted: " + num2 + 
              " → isNaN: " + Number.isNaN(num2) + 
              " → isInteger: " + Number.isInteger(num2);

let result3 = "Original: '" + value3 + "' → Converted: " + num3 + 
              " → isNaN: " + Number.isNaN(num3) + 
              " → isInteger: " + Number.isInteger(num3);

let result4 = "Original: '" + value4 + "' → Converted: " + num4 + 
              " → isNaN: " + Number.isNaN(num4) + 
              " → isInteger: " + Number.isInteger(num4);

// check if value is NaN and show message
let nanMessage = "";
if (Number.isNaN(num3)) {
  nanMessage = "<p><strong>Note:</strong> The value 'hello' is not a valid number.</p>";
}

// combine all results
const allResults = "<p>" + result1 + "</p>" + 
                   "<p>" + result2 + "</p>" + 
                   "<p>" + result3 + "</p>" + 
                   "<p>" + result4 + "</p>" + 
                   nanMessage;

document.getElementById("numberConversionOutput").innerHTML = allResults;

// ==========================
// Part 3: Math & Formatting
// (Option B: Grade Score Calculator)
// ==========================

// define grade scores
const exam1 = 85;
const exam2 = 92;
const exam3 = 78;
const homework = 88;
const project = 95;

// calculate total and average
const totalScore = exam1 + exam2 + exam3 + homework + project;
const averageScore = totalScore / 5;

// format average to 2 decimal places
const formattedAverage = averageScore.toFixed(2);

// build output
let mathResults = "<h3>Grade Breakdown</h3>";
mathResults += "<p><strong>Exam 1:</strong> " + exam1 + "</p>";
mathResults += "<p><strong>Exam 2:</strong> " + exam2 + "</p>";
mathResults += "<p><strong>Exam 3:</strong> " + exam3 + "</p>";
mathResults += "<p><strong>Homework:</strong> " + homework + "</p>";
mathResults += "<p><strong>Project:</strong> " + project + "</p>";
mathResults += "<h3>Results</h3>";
mathResults += "<p><strong>Total Score:</strong> " + totalScore + " points</p>";
mathResults += "<p><strong>Average Score:</strong> " + formattedAverage + "</p>";

// check if passing (70 or higher)
if (averageScore >= 70) {
  mathResults += "<p style='color: green;'><strong>✓ Status: Passing</strong></p>";
} else {
  mathResults += "<p style='color: red;'><strong>✗ Status: Not Passing</strong></p>";
}

document.getElementById("mathOutput").innerHTML = mathResults;
