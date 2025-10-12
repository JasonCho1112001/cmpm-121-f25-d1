import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

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
document.body.appendChild(myText);

//Button click event
myButton.onclick = () => {
  IncrementRedBall();
};

//Step 3

//Helper function for clicking redball
function IncrementRedBall(): void {
  redBallClicks++;
  myText.textContent = `Red balls: ${redBallClicks}`;
}

//SetInterval
setInterval(IncrementRedBall, 1000);

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

  if (currentFontSize < targetFontSize) {
    size += difference * 0.1;
  }

  myText.style.fontSize = `${size}px`;
}
