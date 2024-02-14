function generateCheeseBoard() {
  const size = document.getElementById("size").value;
  const percentage = document.getElementById("percentage").value;
  const board = document.getElementById("cheeseBoard");
  const totalCheeses = size * size;
  const badCheeses = Math.floor(totalCheeses * (percentage / 100));
  let cheeses = Array(totalCheeses).fill("good");
  for (let i = 0; i < badCheeses; i++) {
    cheeses[i] = "bad";
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

function updateCheeseCounters(good, bad) {
  document.getElementById("good-cheese-count").textContent = good;
  document.getElementById("bad-cheese-count").textContent = bad;
}
