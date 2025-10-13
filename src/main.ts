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

//Upgrade text elements
const upgrades: HTMLButtonElement[] = [];
const upgradeTimes: number[] = [0, 0, 0];
const upgradeTexts: HTMLParagraphElement[] = [];

//Replace the upgrade consts with an interface
interface Item {
  name: string;
  cost: number;
  rate: number;
}

const availableItems: Item[] = [
  { name: "Clowns", cost: 10, rate: 0.1 },
  { name: "Ball Pits", cost: 100, rate: 2 },
  { name: "Ball Factory", cost: 1000, rate: 50 },
];

//Three upgrade texts
for (let i = 0; i < 3; i++) {
  upgradeTexts[i] = document.createElement("p");
  document.body.appendChild(upgradeTexts[i]);
  upgradeTexts[i].textContent = `${availableItems[i].name}: ${
    upgradeTimes[i]
  } times`;
}

//Create the upgrade buttons
for (let i = 0; i < availableItems.length; i++) {
  upgrades[i] = document.createElement("button");
  document.body.appendChild(document.createElement("br"));
  document.body.appendChild(document.createElement("br"));
  document.body.appendChild(upgrades[i]);
  upgrades[i].textContent = `${availableItems[i].name}: +${
    availableItems[i].rate
  } balls/sec (Cost: ${availableItems[i].cost.toFixed(2)})`;

  upgrades[i].disabled = true;

  upgrades[i].onclick = () => {
    if (redBallClicks >= availableItems[i].cost) {
      redBallClicks -= availableItems[i].cost;

      growthRate += availableItems[i].rate;
      delay = 1000 / growthRate;

      setInterval(IncrementRedBall, delay);

      upgradeTimes[i] = (upgradeTimes[i] || 0) + 1;
      availableItems[i].cost *= 1.15;
      upgrades[i].textContent = `${availableItems[i].name}: +${
        availableItems[i].rate
      } balls/sec (Cost: ${availableItems[i].cost.toFixed(2)})`;
      growthText.textContent = `Growth Rate: ${1 / (delay * 0.001)} balls/sec`;
      UpdateUpgradeTimesText();

      if (redBallClicks < availableItems[i].cost) {
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
    if (redBallClicks >= availableItems[i].cost) {
      upgrades[i].disabled = false;
    }
  }
}

//Helper function for Update upgrade times text
function UpdateUpgradeTimesText(): void {
  for (let i = 0; i < upgradeTimes.length; i++) {
    upgradeTexts[i].textContent = `${availableItems[i].name}: ${
      upgradeTimes[i]
    } times`;
  }
}
