let totalBadCheesePercentage = 0;
let iterations = 0;
let percentages = [];
let globalBadCheesePercentage = null;
let initialBadCheeses = 0;

function generateCheeseBoard(size, percentage) {
  const board = document.getElementById("cheeseBoard");
  board.className = size > 16 ? "largeGrid" : "";
  const totalCheeses = size * size;
  const badCheeses = Math.floor(totalCheeses * (percentage / 100));
  initialBadCheeses = badCheeses;
  let cheeses = Array(totalCheeses).fill("good");
  const gridTemplateColumnsValue = `repeat(${size}, 1fr)`;
  board.style.gridTemplateColumns = gridTemplateColumnsValue;

  for (let i = 0; i < badCheeses; i++) {
    let j;
    do {
      j = Math.floor(Math.random() * totalCheeses);
    } while (cheeses[j] === "bad");
    cheeses[j] = "bad";
  }

  cheeses = shuffleArray(cheeses);

  board.innerHTML = "";
  cheeses.forEach((type) => {
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
  console.log("Revelando queso:", type);
  cheeseDiv.classList.add("revealed");

  cheeseDiv.textContent = type === "good" ? "B" : "M";
  cheeseDiv.style.color = "black";

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

function revealGeneralPercentage() {
  document.getElementById("prom-general").style.display = "inline";
}

function revealAllCheeses() {
  const cheeses = document.querySelectorAll("#cheeseBoard .cheese");
  cheeses.forEach((cheese) => {
    if (!cheese.classList.contains("revealed")) {
      const type = cheese.classList.contains("good") ? "good" : "bad";
      revealCheese(cheese, type);
    }
  });

  const totalCheeses = cheeses.length;
  const badCount = initialBadCheeses;
  const goodCount = totalCheeses - badCount;
  updateCheeseCounters(goodCount, badCount, "allRevealed");
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
    totalCheese > 0 ? ((bad / totalCheese) * 100).toFixed(2) : 0;
  document.getElementById(percentageId).innerText = goodCheesePercentage + "%";
}

function addGoodCheese() {
  var count = parseInt(document.getElementById("good-cheese-count").innerText);
  count++;
  document.getElementById("good-cheese-count").innerText = count;
  document.getElementById("good-cheese-count-new").innerText = count;
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
  board.className = "fixedGrid";
  const totalCheeses = size * size;
  const gridTemplateColumnsValue = `repeat(${size}, 1fr)`;
  board.style.gridTemplateColumns = gridTemplateColumnsValue;

  if (globalBadCheesePercentage === null) {
    globalBadCheesePercentage = Math.floor(Math.random() * (30 - 5 + 1)) + 5;
    document.getElementById("prom-general").textContent =
      globalBadCheesePercentage + "%";
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
  board.innerHTML = "";

  cheeses.forEach((type) => {
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
  var sampleSize = parseInt(document.getElementById("sampleSize").value);
  var cheeses = document.querySelectorAll("#cheeseBoardOtra .cheese");

  cheeses.forEach((cheese) => {
    cheese.classList.remove("revealed");
    cheese.textContent = "";
  });
  cheeses = shuffleArray(Array.from(cheeses));
  sampleSize = Math.min(sampleSize, cheeses.length);

  let badCheeseCount = 0;
  let goodCheeseCount = 0;

  for (let i = 0; i < sampleSize; i++) {
    let type = cheeses[i].classList.contains("bad") ? "bad" : "good";
    revealCheese(cheeses[i], type);

    if (type === "bad") {
      badCheeseCount++;
    } else {
      goodCheeseCount++;
    }
  }

  let badCheesePercentage = (badCheeseCount / sampleSize) * 100;
  percentages.push(badCheesePercentage);

  const averagePercentage =
    percentages.reduce((acc, val) => acc + val, 0) / percentages.length;

  document.getElementById("bad-cheese-percentage-new").textContent =
    badCheesePercentage.toFixed(2) + "%";
  document.getElementById("average-porcent").textContent =
    averagePercentage.toFixed(2) + "%";
  updateCheeseCounters(goodCheeseCount, badCheeseCount, "new");
}

function resetearPorcentaje() {
  percentages = [];
  document.getElementById("prom-general").style.display = "none";
  /*  Comentado, para que no se genere un promedio nuevo al resetear tablero.
  globalBadCheesePercentage = null;
  globalBadCheesePercentage = Math.floor(Math.random() * (30 - 5 + 1)) + 5;
  */
  document.getElementById("prom-general").textContent =
    globalBadCheesePercentage ? globalBadCheesePercentage + "%" : "0%";

  document.getElementById("good-cheese-count-new").textContent = "0";
  document.getElementById("bad-cheese-count-new").textContent = "0";
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

function applyCheeseConfig() {
  var config = document.getElementById("cheeseConfig").value.split(",");
  generateCheeseBoard(parseInt(config[0]), parseInt(config[1]));
}
