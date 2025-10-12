import "./style.css";

//Work starts here

//Step 1
const myButton = document.createElement("button");
document.body.appendChild(myButton);

myButton.textContent = "🔴";

//Step 2

let redBallClicks: number = 0;

//Text element to show number of clicks
let size: number = 16;
const myText = document.createElement("p");
myText.textContent = `Red balls: ${redBallClicks}`;

//Button click event
myButton.onclick = () => {
  IncrementRedBall();
};

//Step 3

//Helper function for clicking redball
function IncrementRedBall(): void {
  redBallClicks++;
  myText.textContent = `Red balls: ${redBallClicks}`;

  //Enable upgrade button
  if (redBallClicks >= upgradeCost) {
    upgradeButton.disabled = false;
  }
}

//SetInterval
let delay = 0;
//setInterval(IncrementRedBall, delay);

//Step 4
requestAnimationFrame(animate);

function animate() {
  AdjustFontSize();
  requestAnimationFrame(animate);
}

//Helper function for adjusting font size
function AdjustFontSize(): void {
  const currentFontSize = size;
  const targetFontSize = 16 + redBallClicks;
  const difference = targetFontSize - currentFontSize;

  size += difference * 0.1;

  myText.style.fontSize = `${size}px`;
}

//Step 5

//Create the button
let upgradeCost = 10;
const upgradeButton = document.createElement("button");
document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"));
document.body.appendChild(upgradeButton);
upgradeButton.textContent = `Upgrade automatic clicking (Cost: ${upgradeCost})`;

//Disable the button
upgradeButton.disabled = true;

upgradeButton.onclick = () => {
  if (redBallClicks >= upgradeCost) {
    redBallClicks -= upgradeCost;
    delay = Math.max(100, delay - 100); // Decrease delay but not below 100ms
    setInterval(IncrementRedBall, delay);

    upgradeCost *= 2;
    upgradeButton.textContent =
      `Upgrade automatic clicking (Cost: ${upgradeCost})`;
  }
};

document.body.appendChild(myText);
