var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

var rankings = localStorage.getItem("rankings");
rankings = JSON.parse(rankings);

if (rankings !== null) {
    for (var i = 0; i < rankings.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = rankings[i].initials + " " + rankings[i].score;
        highScore.appendChild(createLi);
    }
}

goBack.addEventListener("click", function() {
    window.location.replace("index.html");
});