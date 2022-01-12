var currentTime = document.querySelector("#currentTime");
var startTimer = document.querySelector("#startTime");
var questionsQuiz = document.querySelector("#questionsQuiz");
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

//This function allows the list of questions and choices to render as soon as the start button is clicked
function render(questionList) {
	questionsQuiz.innerHTML = "";
	ulCreate.innerHTML = "";
	for (var i = 0; i < questions.length; i++) {
		var userQuestion = questions[questionList].question;
		var userChoices = questions[questionList].choices;
		questionsQuiz.textContent = userQuestion;
	}
	userChoices.forEach(function(newItem) {
		var listItem = document.createElement("li");
		listItem.textContent = newItem;
		questionsQuiz.appendChild(ulCreate);
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
	questionsQuiz.appendChild(createDiv);
}

//This function alerts the user that the quiz is over
function quizComplete() {
	questionsQuiz.innerHTML = "";
	currentTime.innerHTML = "";

	var createH1 = document.createElement("h1");
	createH1.setAttribute("id", "createH1");
	createH1.textContent = "You're Done!";

	questionsQuiz.appendChild(createH1);

	// This feautre stops the timer and tallies up the user's score 
	if (timerCount >= 0) {
		var timeRemaining = timerCount;
		var createP = document.createElement("p");
		clearInterval(timer);
		createP.textContent = "Your final score is: " + timeRemaining;

		questionsQuiz.appendChild(createP);
	}
	//This features allows the user to enter their initials for the scoreboard
	var createLabel = document.createElement("label");
	createLabel.setAttribute("id", "createLabel");
	createLabel.textContent = "Enter your initials: ";

	questionsQuiz.appendChild(createLabel);

	var createInput = document.createElement("input");
	createInput.setAttribute("type", "text");
	createInput.setAttribute("id", "initials");
	createInput.textContent = "";

	questionsQuiz.appendChild(createInput);

	var createSubmit = document.createElement("button");
	createSubmit.setAttribute("type", "submit");
	createSubmit.setAttribute("id", "Submit");
	createSubmit.textContent = "Submit";

	questionsQuiz.appendChild(createSubmit);

	// This is how the user's information is stored using local storage
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
			var rankings = localStorage.getItem("rankings");
			if (rankings === null) {
				rankings = [];
			} else {
				rankings = JSON.parse(rankings);
			}
			rankings.push(finalScore);
			rankings.sort((a, b) => {
				return b.score - a.score
			});
			var newScore = JSON.stringify(rankings);
			localStorage.setItem("rankings", newScore);
			window.location.replace("scoreboard.html");
		}
	});
}