//import png from './assets/back.png';
import "./styles/main.scss";
import "./styles/header.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/variables.scss";

import { submitTrip } from "./js/app";

document.addEventListener('DOMContentLoaded', () => {
    const button_submit = document.getElementById("submitTrip");
    button_submit.addEventListener("click", submitTrip);
});


export { submitTrip };
