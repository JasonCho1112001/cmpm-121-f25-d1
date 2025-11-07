import "./style.css";

//Replace the upgrade consts with an interface
interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Clowns",
    cost: 10,
    rate: 0.1,
    description: "A clown procures the occaisonal red ball",
  },
  {
    name: "Ball Thrower",
    cost: 50,
    rate: 0.5,
    description: "Ball Throwers always keep a basket full of balls near them",
  },
  {
    name: "Ball Pits",
    cost: 100,
    rate: 2,
    description: "Ball Pit. Enough said.",
  },
  {
    name: "Ball Factory",
    cost: 1000,
    rate: 50,
    description: "Ball Factories produce all the balls in the world",
  },
  {
    name: "Ball Cascade",
    cost: 50000,
    rate: 500,
    description:
      "You've got so many balls, you can some how make a waterfall of them.",
  },
];

//Step 1
const myButton = document.createElement("button");
// style a big red ball
myButton.className = "red-ball-button";
myButton.textContent = "🔴";
document.body.appendChild(myButton);

//Step 2

let redBallClicks: number = 0;

//Text element to show number of clicks
let size: number = 16;
const myText = document.createElement("p");
myText.textContent = `Red balls: ${redBallClicks}`;

// Helper: format numbers for display (no long trailing decimals)
function formatDisplay(n: number, decimals = 2): string {
  if (!isFinite(n)) return String(n);
  if (decimals <= 0) return Math.round(n).toString();
  // If it's effectively an integer, show without decimals
  if (Math.abs(n - Math.round(n)) < 1e-9) return Math.round(n).toString();
  // Otherwise show up to `decimals` and trim trailing zeros
  return n.toFixed(decimals).replace(/\.0+$|(?<=\.[0-9]*[1-9])0+$/, "");
}

//Button click event
// When clicked: spawn a visual ball and increment the counter
myButton.onclick = () => {
  spawnBouncingBall();
  IncrementRedBall();
};

// Create a bouncing/fading ball visual
// CREDIT FOR FUN ANIMATION WHEN CLICKING: <https://t4ylo.github.io/cmpm-121-25-d1-taylorpearce/>
function spawnBouncingBall() {
  const el = document.createElement("div");
  el.className = "flying-ball";
  document.body.appendChild(el);

  // start at center of the red-ball button
  const btnRect = myButton.getBoundingClientRect();
  const startX = btnRect.left + btnRect.width / 2 - 18;
  const startY = btnRect.top + btnRect.height / 2 - 18;

  let x = startX;
  let y = startY;

  // velocities px/sec
  const vx = (Math.random() - 0.5) * 400;
  let vy = -300 - Math.random() * 300;

  const gravity = 1500;
  const damping = 0.6;

  const lifetime = 3000; // ms
  const fadeStart = 2200; // ms
  const start = performance.now();

  // initial placement
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.opacity = "1";

  let last = start;

  function step(now: number) {
    const dt = (now - last) / 1000; // seconds
    last = now;

    vy += gravity * dt;
    x += vx * dt;
    y += vy * dt;

    const ground = globalThis.innerHeight - 18; // bottom position (center offset)
    // bounce on ground
    if (y > ground) {
      y = ground;
      vy = -vy * damping;
    }

    // bounce on left/right
    if (x < 0) {
      x = 0;
    }
    if (x + 36 > globalThis.innerWidth) {
      x = globalThis.innerWidth - 36;
    }

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    const elapsed = now - start;
    if (elapsed > fadeStart) {
      const t = Math.min(1, (elapsed - fadeStart) / (lifetime - fadeStart));
      el.style.opacity = `${1 - t}`;
    }

    if (elapsed < lifetime) {
      requestAnimationFrame(step);
    } else {
      el.remove();
    }
  }

  requestAnimationFrame(step);
}

//SetIntervals
let delay = 0;

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
let autoClicksPerSecond: number = 0;

//autoClicksPerSecond text
const growthText = document.createElement("p");
document.body.appendChild(growthText);
growthText.textContent = `Growth Rate: ${
  formatDisplay(autoClicksPerSecond, 2)
} balls/sec`;

//upgradeTimes text
const upgradeTimesText = document.createElement("p");
document.body.appendChild(upgradeTimesText);
upgradeTimesText.textContent = `__Upgrades__`;

//Upgrade text elements
const upgrades: HTMLButtonElement[] = [];
const upgradeTimes: number[] = [0, 0, 0, 0, 0];
const upgradeTexts: HTMLParagraphElement[] = [];

//Upgrade texts
for (let i = 0; i < availableItems.length; i++) {
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

      autoClicksPerSecond += availableItems[i].rate;
      delay = 1000 / autoClicksPerSecond;

      setInterval(IncrementRedBall, delay);

      upgradeTimes[i] = (upgradeTimes[i] || 0) + 1;
      availableItems[i].cost *= 1.15;
      upgrades[i].textContent = `${availableItems[i].name}: +${
        formatDisplay(
          availableItems[i].rate,
          2,
        )
      } balls/sec (Cost: ${formatDisplay(availableItems[i].cost, 2)})`;
      growthText.textContent = `Growth Rate: ${
        formatDisplay(autoClicksPerSecond, 2)
      } balls/sec`;
      UpdateUpgradeTimesText();

      if (redBallClicks < availableItems[i].cost) {
        upgrades[i].disabled = true;
      }
    }
  };
}

document.body.appendChild(myText);

// Cheat: Press P to receive 100000 red balls instantly
document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key && e.key.toLowerCase() === "p") {
    redBallClicks += 100000;
    myText.textContent = `Red balls: ${formatDisplay(redBallClicks, 0)}`;

    // Update upgrade buttons enabled state after giving balls
    for (let i = 0; i < upgrades.length; i++) {
      // if the item has a cost greater than current balance, keep it disabled
      upgrades[i].disabled = redBallClicks < availableItems[i].cost;
    }
  }
});

//Helper functions

//Clicking redball
function IncrementRedBall(): void {
  redBallClicks++;
  myText.textContent = `Red balls: ${formatDisplay(redBallClicks, 0)}`;

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
