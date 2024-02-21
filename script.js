let totalBadCheesePercentage = 0;
let iterations = 0;
let percentages = [];
let globalBadCheesePercentage = null;

function generateCheeseBoard(size, percentage) {
  const board = document.getElementById("cheeseBoard");
  const totalCheeses = size * size;
  const badCheeses = Math.floor(totalCheeses * (percentage / 100));
  let cheeses = Array(totalCheeses).fill("good");
  for (let i = 0; i < badCheeses; i++) {
    let j;
    do {
      j = Math.floor(Math.random() * totalCheeses);
    } while (cheeses[j] === "bad");
    cheeses[j] = "bad";
  }
  cheeses = shuffleArray(cheeses);
  board.style.gridTemplateColumns = `repeat(${size}, 50px)`;
  board.innerHTML = "";
  cheeses.forEach((type, index) => {
    const cheeseDiv = document.createElement("div");
    cheeseDiv.className = `cheese ${type}`;
    cheeseDiv.addEventListener("click", function () {
      revealCheese(this, type);
    });
    board.appendChild(cheeseDiv);
  });
  updateCheeseCounters(0, 0);
}

function revealCheese(cheeseDiv, type) {
  /* 
  console.log("Revelando queso:", type);
  */
  cheeseDiv.classList.add("revealed");
  cheeseDiv.textContent = type === "good" ? "B" : "M";

  const goodCountElement = document.getElementById("good-cheese-count");
  const badCountElement = document.getElementById("bad-cheese-count");
  let goodCount = parseInt(goodCountElement.textContent, 10);
  let badCount = parseInt(badCountElement.textContent, 10);

  if (type === "good") {
    goodCount += 1;
  } else {
    badCount += 1;
  }

  updateCheeseCounters(goodCount, badCount);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function revealAllCheeses() {
  updateCheeseCounters(0, 0);
  const cheeses = document.querySelectorAll("#cheeseBoard .cheese");
  cheeses.forEach((cheese) => {
    const type = cheese.classList.contains("good") ? "good" : "bad";
    revealCheese(cheese, type);
  });
}

function updateCheeseCounters(good, bad, context) {
  var goodCountId =
    context === "new" ? "good-cheese-count-new" : "good-cheese-count";
  var badCountId =
    context === "new" ? "bad-cheese-count-new" : "bad-cheese-count";
  var percentageId =
    context === "new" ? "good-cheese-percentage-new" : "good-cheese-percentage";

  document.getElementById(goodCountId).textContent = good;
  document.getElementById(badCountId).textContent = bad;

  var totalCheese = good + bad;
  var goodCheesePercentage =
    totalCheese > 0 ? ((good / totalCheese) * 100).toFixed(2) : 0;
  document.getElementById(percentageId).innerText = goodCheesePercentage + "%";
}

function addGoodCheese() {
  var count = parseInt(document.getElementById("good-cheese-count").innerText);
  count++;
  document.getElementById("good-cheese-count").innerText = count;
  document.getElementById("good-cheese-count-new").innerText = count;
  updateCheeseCounters();
}

function addBadCheese() {
  var count = parseInt(document.getElementById("bad-cheese-count").innerText);
  count++;
  document.getElementById("bad-cheese-count").innerText = count;
  document.getElementById("bad-cheese-count-new").innerText = count;
  updateCheeseCounters();
}

function generateFixedCheeseBoard() {
  const board = document.getElementById("cheeseBoardOtra");
  const size = 20;
  const totalCheeses = size * size;

  if (globalBadCheesePercentage === null) {
    globalBadCheesePercentage = Math.floor(Math.random() * (30 - 5 + 1)) + 5;
    document.getElementById("prom-general").textContent =
      globalBadCheesePercentage + "%";
      console.log(globalBadCheesePercentage + "%")
  }

  const badCheeses = Math.floor(
    totalCheeses * (globalBadCheesePercentage / 100)
  );

  let cheeses = Array(totalCheeses).fill("good");
  for (let i = 0; i < badCheeses; i++) {
    let j;
    do {
      j = Math.floor(Math.random() * totalCheeses);
    } while (cheeses[j] === "bad");
    cheeses[j] = "bad";
  }

  cheeses = shuffleArray(cheeses);
  board.style.gridTemplateColumns = `repeat(${size}, 50px)`;
  board.innerHTML = "";

  cheeses.forEach((type, index) => {
    const cheeseDiv = document.createElement("div");
    cheeseDiv.className = `cheese ${type}`;
    cheeseDiv.addEventListener("click", function () {
      revealCheese(this, type);
    });
    board.appendChild(cheeseDiv);
  });

  updateCheeseCounters(0, 0);
}

function generateRandomSample() {
  generateFixedCheeseBoard();
  var sampleSize = parseInt(document.getElementById("sampleSize").value);
  var cheeses = document.querySelectorAll(
    "#cheeseBoardOtra .cheese:not(.revealed)"
  );

  cheeses = shuffleArray(Array.from(cheeses));
  sampleSize = Math.min(sampleSize, cheeses.length);

  let badCheeseCount = 0;

  for (let i = 0; i < sampleSize; i++) {
    revealCheese(cheeses[i]);
    if (cheeses[i].classList.contains("bad")) {
      badCheeseCount++;
    }
  }

  let badCheesePercentage =
    sampleSize > 0 ? (badCheeseCount / sampleSize) * 100 : 0;
  percentages.push(badCheesePercentage);

  const averagePercentage =
    percentages.reduce((acc, val) => acc + val, 0) / percentages.length;

  document.getElementById("bad-cheese-percentage-new").textContent =
    badCheesePercentage.toFixed(2) + "%";

  document.getElementById("average-porcent").textContent =
    averagePercentage.toFixed(2) + "%";
}

function resetearPorcentaje() {
  percentages = [];

  globalBadCheesePercentage = null;
  globalBadCheesePercentage = Math.floor(Math.random() * (30 - 5 + 1)) + 5;
  document.getElementById("prom-general").textContent =
    globalBadCheesePercentage ? globalBadCheesePercentage + "%" : "0%";

  /*
  document.getElementById("good-cheese-count-new").textContent = "0";
  document.getElementById("bad-cheese-count-new").textContent = "0";
  */
  document.getElementById("bad-cheese-percentage-new").textContent = "0%";
  document.getElementById("average-porcent").textContent = "0%";
  generateFixedCheeseBoard();
}

function revealRealPercentage() {
  if (globalBadCheesePercentage !== null) {
    document.getElementById("prom-general").textContent =
      globalBadCheesePercentage + "%";
  } else {
    document.getElementById("prom-general").textContent = "No establecido";
  }
}
