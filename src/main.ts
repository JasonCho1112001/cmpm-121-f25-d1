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

//SetIntervals
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
let growthRate: number = 0;

//growthRate text
const growthText = document.createElement("p");
document.body.appendChild(growthText);
growthText.textContent = `Growth Rate: ${growthRate} balls/sec`;

//upgradeTimes text
const upgradeTimesText = document.createElement("p");
document.body.appendChild(upgradeTimesText);
upgradeTimesText.textContent = `__Upgrades__`;

//Upgrade bonanza
const upgrades: HTMLButtonElement[] = [];
const upgradeCosts: number[] = [10, 100, 1000];
const upgradeTimes: number[] = [0, 0, 0];
const upgradeValues: number[] = [0.1, 2.0, 50.0];
const upgradeTexts: HTMLParagraphElement[] = [];
const upgradeNames: string[] = ["Clowns", "Ball Pits", "Ball Factory"];

//Three upgrade texts
for (let i = 0; i < 3; i++) {
  upgradeTexts[i] = document.createElement("p");
  document.body.appendChild(upgradeTexts[i]);
  upgradeTexts[i].textContent = `${upgradeNames[i]}: ${upgradeTimes[i]} times`;
}

//Create the upgrade button three times
for (let i = 0; i < 3; i++) {
  upgrades[i] = document.createElement("button");
  document.body.appendChild(document.createElement("br"));
  document.body.appendChild(document.createElement("br"));
  document.body.appendChild(upgrades[i]);
  upgradeCosts[i] = Math.pow(10, i) * 10; //10, 100, 1000
  upgrades[i].textContent = `${upgradeNames[i]}: +${
    upgradeValues[i]
  } balls/sec (Cost: ${upgradeCosts[i]})`;

  //Disable the button
  upgrades[i].disabled = true;

  upgrades[i].onclick = () => {
    if (redBallClicks >= upgradeCosts[i]) {
      redBallClicks -= upgradeCosts[i];

      growthRate += upgradeValues[i];
      delay = 1000 / growthRate;

      setInterval(IncrementRedBall, delay);

      upgradeTimes[i] = (upgradeTimes[i] || 0) + 1;
      upgradeCosts[i] *= 1.15;
      upgrades[i].textContent = `${upgradeNames[i]}: +${
        upgradeValues[i]
      } balls/sec (Cost: ${upgradeCosts[i]})`;
      growthText.textContent = `Growth Rate: ${1 / (delay * 0.001)} balls/sec`;
      UpdateUpgradeTimesText();

      if (redBallClicks < upgradeCosts[i]) {
        upgrades[i].disabled = true;
      }
    }
  };
}

document.body.appendChild(myText);

//Helper functions

//Clicking redball
function IncrementRedBall(): void {
  redBallClicks++;
  myText.textContent = `Red balls: ${redBallClicks}`;

  //Enable upgrade buttons
  for (let i = 0; i < upgrades.length; i++) {
    if (redBallClicks >= upgradeCosts[i]) {
      upgrades[i].disabled = false;
    }
  }
}

//Helper function for Update upgrade times text
function UpdateUpgradeTimesText(): void {
  for (let i = 0; i < upgradeTimes.length; i++) {
    upgradeTexts[i].textContent = `${upgradeNames[i]}: ${
      upgradeTimes[i]
    } times`;
  }
}
