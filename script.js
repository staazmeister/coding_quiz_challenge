var currentTime = document.querySelector("#currentTime");
var startTimer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var ulCreate = document.createElement("ul");

var questions = [{
		question: "The condition in an if / else statement is enclosed within ____.",
		choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
		answer: "parentheses",
	},

	{
		question: "Commonly used data types DO NOT include:",
		choices: ["strings", "booleans", "alerts", "numbers"],
		answer: "alerts",
	},

	{
		question: "Arrays in Javascript can be used to store ____.",
		choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
		answer: "all of the above",
	},

	{
		question: "A very useful tool for used during development and debugging for printing content to the debugger is:",
		choices: ["Javascript", "terminal / bash", "for loops", "console log"],
		answer: "console log",
	},

	{
		question: "String values must be enclosed within ____ when being assigned to variables.",
		choices: ["commas", "curly brackets", "quotes", "parenthesis"],
		answer: "quotes",
	},
];

var score = 0;
var questionList = 0;
var timerCount = 76;
var timer = 0;
var penalty = 10;


//This fuctions starts the timer and the quiz
startTimer.addEventListener("click", function() {
	if (timer >= 0) {
		timer = setInterval(function() {
			timerCount--;
			currentTime.textContent = "Time Remaining: " + timerCount;

			if (timerCount <= 0) {
				clearInterval(timer);
				quizComplete();
				currentTime.textContent = "Time's up!";
			}
		}, 1000);
	}
	render(questionList);
});

//This functions allows the list of questions to render as soon as the start button is clicked
function render(questionList) {
	questionsDiv.innerHTML = "";
	ulCreate.innerHTML = "";
	for (var i = 0; i < questions.length; i++) {
		var userQuestion = questions[questionList].question;
		var userChoices = questions[questionList].choices;
		questionsDiv.textContent = userQuestion;
	}
	userChoices.forEach(function(newItem) {
		var listItem = document.createElement("li");
		listItem.textContent = newItem;
		questionsDiv.appendChild(ulCreate);
		ulCreate.appendChild(listItem);
		listItem.addEventListener("click", compare);
	});
}

//This function compares the user's choice against the correct answer and awards points or penalize the player for incorrect answer
function compare(event) {
	var element = event.target;
	if (element.matches("li")) {
		var createDiv = document.createElement("div");
		createDiv.setAttribute("id", "createDiv");
		if (element.textContent == questions[questionList].answer) {
			score++;
			createDiv.textContent = "Correct!";
		} else {
			timerCount = timerCount - penalty;
			createDiv.textContent = "Incorrect!";
		}
	}

	questionList++;

	if (questionList >= questions.length) {
		quizComplete();
		createDiv.textContent = "Quiz completed!" + " " + "You answered " + score + "/" + questions.length + " correct!";

	} else {
		render(questionList);
	}
	questionsDiv.appendChild(createDiv);
}

//This functions alerts the user that the quiz is over
function quizComplete() {
	questionsDiv.innerHTML = "";
	currentTime.innerHTML = "";

	var createH1 = document.createElement("h1");
	createH1.setAttribute("id", "createH1");
	createH1.textContent = "You're Done!";

	questionsDiv.appendChild(createH1);

	// This feautres stops time and tallys up the users score 
	if (timerCount >= 0) {
		var timeRemaining = timerCount;
		var createP = document.createElement("p");
		clearInterval(timer);
		createP.textContent = "Your final score is: " + timeRemaining;

		questionsDiv.appendChild(createP);
	}
	//This features allows the user to enter their initials for the scoreboard
	var createLabel = document.createElement("label");
	createLabel.setAttribute("id", "createLabel");
	createLabel.textContent = "Enter your initials: ";

	questionsDiv.appendChild(createLabel);

	var createInput = document.createElement("input");
	createInput.setAttribute("type", "text");
	createInput.setAttribute("id", "initials");
	createInput.textContent = "";

	questionsDiv.appendChild(createInput);

	var createSubmit = document.createElement("button");
	createSubmit.setAttribute("type", "submit");
	createSubmit.setAttribute("id", "Submit");
	createSubmit.textContent = "Submit";

	questionsDiv.appendChild(createSubmit);

	// This is how the users information is stored using local storage
	createSubmit.addEventListener("click", function() {
		var initials = createInput.value;

		if (!initials) {
			alert("Enter your intials!");
			return;
		} else {
			var finalScore = {
				initials: initials,
				score: timeRemaining,
			};
			console.log(finalScore);
			var allScores = localStorage.getItem("allScores");
			if (allScores === null) {
				allScores = [];
			} else {
				allScores = JSON.parse(allScores);
			}
			allScores.push(finalScore);
			allScores.sort((a, b) => {
				return b.score - a.score
			});
			var newScore = JSON.stringify(allScores);
			localStorage.setItem("allScores", newScore);
			window.location.replace("scoreboard.html");
		}
	});
}