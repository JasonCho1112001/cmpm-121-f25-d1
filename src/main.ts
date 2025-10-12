import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

//Work starts here
let myButton = document.createElement("button");
document.body.appendChild(myButton);

myButton.textContent = "🔴";
